import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS, GOOGLE_APPS_SCRIPT_URL } from '../utils/constants';

const MenuContext = createContext();

const CATEGORIES_STORAGE_KEY = 'supercrab_custom_categories_v2';
const ITEMS_STORAGE_KEY = 'supercrab_custom_menu_items_v2';

const normalizeCategoriesList = (catList) => {
  if (!Array.isArray(catList)) return MENU_CATEGORIES;
  return catList.map((cat) => {
    let images = [];
    if (Array.isArray(cat.listImages)) {
      images = cat.listImages.filter(Boolean);
    } else if (typeof cat.listImages === 'string' && cat.listImages.trim()) {
      images = cat.listImages.split(',').map((s) => s.trim()).filter(Boolean);
    } else if (cat.image) {
      images = [cat.image];
    }
    return {
      id: String(cat.id || ''),
      name: String(cat.name || ''),
      subtitle: String(cat.subtitle || ''),
      orderIndex: Number(cat.orderIndex || 0),
      listImages: images,
      status: cat.status || 'Active'
    };
  });
};

export function MenuProvider({ children }) {
  // 1. Initial State from localStorage or static fallback
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      return saved ? normalizeCategoriesList(JSON.parse(saved)) : MENU_CATEGORIES;
    } catch (e) {
      console.error('Failed to load categories from localStorage:', e);
      return MENU_CATEGORIES;
    }
  });

  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem(ITEMS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch (e) {
      console.error('Failed to load menu items from localStorage:', e);
      return MENU_ITEMS;
    }
  });

  // Sync state flags
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState(null);
  const [syncError, setSyncError] = useState(null);

  // 2. Fetch live data from Google Apps Script
  const fetchMenuFromSheet = useCallback(async (showLoading = true) => {
    if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
      return;
    }

    if (showLoading) setIsLoadingMenu(true);
    setSyncError(null);

    try {
      const res = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=get-menu`);
      const data = await res.json();

      if (data && data.success) {
        if (Array.isArray(data.categories) && data.categories.length > 0) {
          const normalizedCats = normalizeCategoriesList(data.categories);
          setCategories(normalizedCats);
          localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(normalizedCats));
        }

        if (Array.isArray(data.products) && data.products.length > 0) {
          // Normalize types
          const normalizedProducts = data.products.map((item) => ({
            id: String(item.id || ''),
            category: String(item.category || 'combos'),
            name: String(item.name || ''),
            price: typeof item.price === 'number' ? item.price.toFixed(2) : String(item.price || '0.00'),
            description: String(item.description || ''),
            image: String(item.image || '/images/combo_1.webp'),
            spiceLevel: Number(item.spiceLevel || 0),
            badge: String(item.badge || ''),
            badgeType: String(item.badgeType || 'popular'),
            featured: Boolean(item.featured === true || item.featured === 'TRUE'),
            isAvailable: item.isAvailable !== false && item.isAvailable !== 'FALSE'
          }));

          setMenuItems(normalizedProducts);
          localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(normalizedProducts));
        }

        setLastSyncedTime(new Date());
      }
    } catch (err) {
      console.warn('Unable to sync live menu from Google Sheets, using cached data:', err);
      setSyncError('Could not reach Google Sheet, using local copy.');
    } finally {
      if (showLoading) setIsLoadingMenu(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchMenuFromSheet(false);
  }, [fetchMenuFromSheet]);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories to localStorage:', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(menuItems));
    } catch (e) {
      console.error('Failed to save menu items to localStorage:', e);
    }
  }, [menuItems]);

  // Helper to send backend mutation
  const postToAppsScript = async (payload) => {
    if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
      return { success: false, error: 'Google Apps Script URL is not configured.' };
    }

    setIsSyncing(true);
    try {
      const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      setLastSyncedTime(new Date());
      return result;
    } catch (err) {
      console.error('Apps Script Sync Error:', err);
      return { success: false, error: err.toString() };
    } finally {
      setIsSyncing(false);
    }
  };

  // ==========================================
  // CATEGORY OPERATIONS
  // ==========================================
  const addCategory = async (categoryObj) => {
    const newCat = {
      id: categoryObj.id || categoryObj.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: categoryObj.name,
      subtitle: categoryObj.subtitle || '',
      orderIndex: categoryObj.orderIndex || categories.length + 1,
      listImages: categoryObj.listImages || '',
      status: categoryObj.status || 'Active'
    };

    setCategories((prev) => [...prev, newCat]);
    await postToAppsScript({ action: 'add-category', category: newCat });
    return newCat;
  };

  const updateCategory = async (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updatedFields } : cat))
    );
    await postToAppsScript({ action: 'update-category', id, category: updatedFields });
  };

  const deleteCategory = async (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    setMenuItems((prev) => prev.filter((item) => item.category !== id));
    await postToAppsScript({ action: 'delete-category', id });
  };

  // ==========================================
  // MENU ITEM OPERATIONS
  // ==========================================
  const addMenuItem = async (itemObj) => {
    const newItem = {
      id: itemObj.id || `item_${Date.now()}`,
      category: itemObj.category,
      name: itemObj.name,
      description: itemObj.description || '',
      price: typeof itemObj.price === 'number' ? itemObj.price.toFixed(2) : String(itemObj.price || '0.00'),
      image: itemObj.image || '/images/combo_1.webp',
      spiceLevel: Number(itemObj.spiceLevel || 0),
      featured: Boolean(itemObj.featured),
      badge: itemObj.badge || '',
      badgeType: itemObj.badgeType || 'popular',
      isAvailable: itemObj.isAvailable !== false
    };

    setMenuItems((prev) => [newItem, ...prev]);
    await postToAppsScript({ action: 'add-product', product: newItem });
    return newItem;
  };

  const updateMenuItem = async (id, updatedFields) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedFields,
              price:
                updatedFields.price !== undefined
                  ? typeof updatedFields.price === 'number'
                    ? updatedFields.price.toFixed(2)
                    : String(updatedFields.price)
                  : item.price
            }
          : item
      )
    );
    await postToAppsScript({ action: 'update-product', id, product: updatedFields });
  };

  const deleteMenuItem = async (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    await postToAppsScript({ action: 'delete-product', id });
  };

  const toggleItemAvailability = async (id) => {
    const targetItem = menuItems.find((i) => i.id === id);
    const newStatus = targetItem ? (targetItem.isAvailable === false ? true : false) : true;

    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAvailable: newStatus } : item))
    );

    await postToAppsScript({ action: 'toggle-availability', id, isAvailable: newStatus });
  };

  // ==========================================
  // GOOGLE DRIVE IMAGE UPLOAD HELPER
  // ==========================================
  const uploadProductImage = async (file) => {
    return new Promise((resolve) => {
      if (!file) {
        resolve({ success: false, error: 'No file provided.' });
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result;
        const result = await postToAppsScript({
          action: 'upload-image',
          filename: file.name,
          mimeType: file.type,
          base64: base64Data
        });
        resolve(result);
      };
      reader.onerror = (error) => {
        resolve({ success: false, error: 'Error reading file: ' + error.toString() });
      };
      reader.readAsDataURL(file);
    });
  };

  // ==========================================
  // FETCH ORDERS (FOR ADMIN DASHBOARD)
  // ==========================================
  const fetchOrdersFromSheet = async () => {
    if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
      return [];
    }

    try {
      const res = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=get-orders&_t=${Date.now()}`);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.orders)) {
        return data.orders;
      }
      return [];
    } catch (err) {
      console.error('Failed to fetch orders from Google Sheet:', err);
      return [];
    }
  };

  const updateOrderStatusInSheet = async (orderId, newStatus) => {
    if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
      return { success: false, error: 'Google Apps Script URL is not configured.' };
    }

    try {
      // 1. Send via GET parameters (Google Apps Script webapp standard with 0 CORS redirect issues)
      const getUrl = `${GOOGLE_APPS_SCRIPT_URL}?action=update-order-status&orderId=${encodeURIComponent(orderId)}&status=${encodeURIComponent(newStatus)}&_t=${Date.now()}`;
      const res = await fetch(getUrl);
      const data = await res.json();
      return data;
    } catch (e) {
      console.warn('GET status update failed, attempting POST fallback:', e);
      return await postToAppsScript({
        action: 'update-order-status',
        orderId,
        status: newStatus
      });
    }
  };

  const resetToDefaultMenu = () => {
    setCategories(MENU_CATEGORIES);
    setMenuItems(MENU_ITEMS);
    localStorage.removeItem(CATEGORIES_STORAGE_KEY);
    localStorage.removeItem(ITEMS_STORAGE_KEY);
  };

  return (
    <MenuContext.Provider
      value={{
        categories,
        menuItems,
        isLoadingMenu,
        isSyncing,
        lastSyncedTime,
        syncError,
        refetchMenu: () => fetchMenuFromSheet(true),
        addCategory,
        updateCategory,
        deleteCategory,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        uploadProductImage,
        fetchOrdersFromSheet,
        updateOrderStatusInSheet,
        resetToDefaultMenu
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
