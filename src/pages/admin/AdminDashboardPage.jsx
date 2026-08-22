import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  LogOut,
  RotateCcw,
  UtensilsCrossed,
  CheckCircle,
  XCircle,
  Layers,
  Check,
  X,
  RefreshCw,
  ShoppingBag,
  UploadCloud,
  FileImage,
  Clock,
  Phone,
  DollarSign,
  Calendar,
  AlertCircle,
  Bell,
  Volume2,
  VolumeX,
  Printer,
  Eye,
  FileText,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMenu } from '../../contexts/MenuContext';
import SEOHead from '../../components/layout/SEOHead';
import './AdminDashboardPage.css';

export default function AdminDashboardPage() {
  const { isAdminAuthenticated, logoutAdmin, adminUser } = useAuth();
  const {
    categories,
    menuItems,
    isLoadingMenu,
    isSyncing,
    lastSyncedTime,
    syncError,
    refetchMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    uploadProductImage,
    fetchOrdersFromSheet,
    updateOrderStatusInSheet,
    addCategory,
    updateCategory,
    deleteCategory,
    resetToDefaultMenu
  } = useMenu();

  const navigate = useNavigate();

  // Active page view tab ('orders' | 'items' | 'categories')
  const [activeTab, setActiveTab] = useState('orders');

  // Active filters for items
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Orders Tab State & Notifications
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState(null);
  const [newOrderAlert, setNewOrderAlert] = useState(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isUpdatingOrderStatus, setIsUpdatingOrderStatus] = useState(false);
  const [hasInitialLoadedOrders, setHasInitialLoadedOrders] = useState(false);
  const [unreadOrdersCount, setUnreadOrdersCount] = useState(0);
  const [confirmStatusModal, setConfirmStatusModal] = useState(null); // { orderId, newStatus, currentStatus, customerName, total }

  // Item Modal state
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Category Modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Item Form Fields
  const [itemForm, setItemForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    badge: '',
    featured: false,
    isAvailable: true
  });

  // Category Form Fields
  const [catForm, setCatForm] = useState({
    id: '',
    name: '',
    subtitle: ''
  });

  // Audio Chime Synthesizer for instant new order sound alerts
  const playOrderChime = () => {
    if (!isSoundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Chime note 1: High crisp bell
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      gain1.gain.setValueAtTime(0.4, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.4);

      // Chime note 2: Harmonic resolving bell
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain2.gain.setValueAtTime(0.45, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.8);
    } catch (err) {
      console.log('Audio chime prevented by browser auto-play policy:', err);
    }
  };

  // Load and sync orders from Google Sheet (NEWEST FIRST)
  const STATUS_OVERRIDES_KEY = 'supercrab_order_status_overrides';

  const loadOrders = async (isBackgroundPoll = false) => {
    if (!isBackgroundPoll) setIsLoadingOrders(true);
    try {
      const rawOrders = await fetchOrdersFromSheet();

      // Read local overrides to prevent polling overwrite
      let overrides = {};
      try {
        const saved = localStorage.getItem(STATUS_OVERRIDES_KEY);
        if (saved) overrides = JSON.parse(saved);
      } catch (e) {}

      // Apply overrides and reverse array so newest is at top
      const latestOrders = Array.isArray(rawOrders)
        ? rawOrders
            .map((ord) => {
              const curId = ord['Order ID'] || ord.orderId;
              if (curId && overrides[curId]) {
                return {
                  ...ord,
                  'Payment Status': overrides[curId],
                  status: overrides[curId]
                };
              }
              return ord;
            })
            .reverse()
        : [];
      
      // Detect if new orders arrived during background polling
      if (hasInitialLoadedOrders && latestOrders.length > 0 && orders.length > 0) {
        const latestId = String(latestOrders[0]['Order ID'] || latestOrders[0].orderId || '');
        const currentTopId = String(orders[0]['Order ID'] || orders[0].orderId || '');
        
        if (latestId && latestId !== currentTopId && latestOrders.length > orders.length) {
          const newest = latestOrders[0];
          playOrderChime();
          setNewOrderAlert({
            id: newest['Order ID'] || newest.orderId,
            customer: newest['Customer Name'] || newest.customerName || 'Customer',
            total: newest['Total Amount'] || newest.totalAmount || '$0.00',
            pickup: newest['Pickup Time'] || newest.pickupTime || 'ASAP'
          });
          setUnreadOrdersCount((prev) => prev + (latestOrders.length - orders.length));
        }
      }

      setOrders(latestOrders);
      if (!hasInitialLoadedOrders) setHasInitialLoadedOrders(true);
    } catch (e) {
      console.error('Error fetching orders:', e);
    } finally {
      if (!isBackgroundPoll) setIsLoadingOrders(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadOrders();
  }, []);

  // Background Auto-polling every 12 seconds for Real-time Order Notifications
  useEffect(() => {
    const pollInterval = setInterval(() => {
      loadOrders(true);
    }, 12000);

    return () => clearInterval(pollInterval);
  }, [hasInitialLoadedOrders, orders, isSoundEnabled]);

  // Handle Changing Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setIsUpdatingOrderStatus(true);

    // Save override to localStorage to guarantee status is never lost during polling
    try {
      const overrides = JSON.parse(localStorage.getItem(STATUS_OVERRIDES_KEY) || '{}');
      overrides[orderId] = newStatus;
      localStorage.setItem(STATUS_OVERRIDES_KEY, JSON.stringify(overrides));
    } catch (e) {}

    try {
      // Optimistic update
      setOrders((prev) =>
        prev.map((o) => {
          const curId = o['Order ID'] || o.orderId;
          return curId === orderId ? { ...o, 'Payment Status': newStatus, status: newStatus } : o;
        })
      );

      if (selectedOrderForModal) {
        setSelectedOrderForModal((prev) => ({
          ...prev,
          'Payment Status': newStatus,
          status: newStatus
        }));
      }

      await updateOrderStatusInSheet(orderId, newStatus);
    } catch (err) {
      console.error('Failed to update status on sheet:', err);
    } finally {
      setIsUpdatingOrderStatus(false);
    }
  };

  // Kitchen Thermal Receipt Printer
  const handlePrintReceipt = (order) => {
    const id = order['Order ID'] || order.orderId || 'SC-ORDER';
    const date = order['Date & Time'] || order.formattedDate || new Date().toLocaleString();
    const name = order['Customer Name'] || order.customerName || 'Customer';
    const phone = order['Phone Number'] || order.phone || 'N/A';
    const items = order['Items Ordered'] || order.itemsSummary || '';
    const pickup = order['Pickup Time'] || order.pickupTime || 'ASAP';
    const notes = order['Special Notes'] || order.specialNotes || '';
    const subtotal = order['Subtotal'] || '$0.00';
    const tax = order['Tax'] || '$0.00';
    const tip = order['Tip'] || '$0.00';
    const total = order['Total Amount'] || order.totalAmount || '$0.00';
    const status = order['Payment Status'] || order.status || 'Pending';

    const printHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt #${id} - Super Crab</title>
        <style>
          @page { size: 80mm auto; margin: 4mm; }
          body {
            font-family: 'Courier New', Courier, monospace;
            width: 72mm;
            margin: 0 auto;
            color: #000;
            font-size: 13px;
            line-height: 1.35;
          }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .divider { border-top: 1px dashed #000; margin: 8px 0; }
          .row { display: flex; justify-content: space-between; margin: 3px 0; }
          .tag { display: inline-block; border: 1px solid #000; padding: 2px 6px; font-weight: bold; }
          h2, h3 { margin: 4px 0; }
          .items-list { white-space: pre-wrap; font-size: 12px; margin: 6px 0; line-height: 1.4; }
        </style>
      </head>
      <body>
        <div class="center">
          <h2>SUPER CRAB</h2>
          <p>JUICY SEAFOOD & CAJUN BAR<br>Texas City, TX</p>
          <div class="divider"></div>
          <span class="tag">KITCHEN TICKET / ORDER</span>
          <h3>#${id}</h3>
          <p>${date}</p>
        </div>
        
        <div class="divider"></div>
        <div>
          <div><strong>CUSTOMER:</strong> ${name}</div>
          <div><strong>PHONE:</strong> ${phone}</div>
          <div><strong>PICKUP TIME:</strong> ${pickup}</div>
          ${notes ? `<div><strong>NOTES:</strong> ${notes}</div>` : ''}
        </div>

        <div class="divider"></div>
        <div class="bold">ITEMS ORDERED:</div>
        <div class="items-list">${items.split('|').map(i => '• ' + i.trim()).join('<br>')}</div>

        <div class="divider"></div>
        <div class="row"><span>Subtotal:</span><span>${subtotal}</span></div>
        <div class="row"><span>Tax (8.25%):</span><span>${tax}</span></div>
        <div class="row"><span>Tip:</span><span>${tip}</span></div>
        <div class="divider"></div>
        <div class="row bold" style="font-size: 15px;"><span>TOTAL:</span><span>${total}</span></div>
        <div class="row"><span>Status:</span><span class="bold">${status}</span></div>

        <div class="divider"></div>
        <div class="center" style="font-size: 11px; margin-top: 12px;">
          <p>Thank you for choosing Super Crab!<br>www.supercrabtx.com</p>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=400,height=600');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printHtml);
      printWindow.document.close();
    }
  };

  if (!isAdminAuthenticated) return null;

  // Filtered Menu Items
  const filteredItems = menuItems.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    const orderId = String(order['Order ID'] || order.orderId || '').toLowerCase();
    const customer = String(order['Customer Name'] || order.customerName || '').toLowerCase();
    const phone = String(order['Phone Number'] || order.phone || '').toLowerCase();
    const status = String(order['Payment Status'] || order.status || '');

    const matchesSearch =
      orderId.includes(orderSearchQuery.toLowerCase()) ||
      customer.includes(orderSearchQuery.toLowerCase()) ||
      phone.includes(orderSearchQuery.toLowerCase());

    const matchesStatus =
      orderStatusFilter === 'all' ||
      status.toLowerCase().includes(orderStatusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  // ITEM MODAL HANDLERS
  const handleOpenNewItemModal = () => {
    setEditingItem(null);
    setItemForm({
      name: '',
      price: '',
      category: categories[0]?.id || 'appetizers',
      description: '',
      image: '/images/combo_1.webp',
      badge: '',
      featured: false,
      isAvailable: true
    });
    setIsItemModalOpen(true);
  };

  const handleOpenEditItemModal = (item) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description || '',
      image: item.image || '',
      badge: item.badge || '',
      featured: Boolean(item.featured),
      isAvailable: item.isAvailable !== false
    });
    setIsItemModalOpen(true);
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const res = await uploadProductImage(file);
      if (res && res.success && res.url) {
        setItemForm((prev) => ({ ...prev, image: res.url }));
      } else {
        // Fallback to local Base64 preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setItemForm((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } catch (uploadErr) {
      console.error('Upload failed:', uploadErr);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();

    if (!itemForm.name || !itemForm.price || !itemForm.category) {
      alert('Please fill in Item Name, Price, and Category.');
      return;
    }

    if (editingItem) {
      await updateMenuItem(editingItem.id, itemForm);
    } else {
      await addMenuItem(itemForm);
    }

    setIsItemModalOpen(false);
  };

  const handleToggleStatus = (item) => {
    const isCurrentlyActive = item.isAvailable !== false;
    const message = isCurrentlyActive
      ? `Are you sure you want to HIDE "${item.name}" from the public menu?`
      : `Are you sure you want to DISPLAY "${item.name}" on the public menu?`;

    if (window.confirm(message)) {
      toggleItemAvailability(item.id);
    }
  };

  const handleDeleteItem = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMenuItem(id);
    }
  };

  // CATEGORY MODAL HANDLERS
  const handleOpenNewCategoryModal = () => {
    setEditingCategory(null);
    setCatForm({ id: '', name: '', subtitle: '' });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategoryModal = (cat) => {
    setEditingCategory(cat);
    setCatForm({ id: cat.id, name: cat.name, subtitle: cat.subtitle || '' });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!catForm.name) {
      alert('Please enter a Category Name.');
      return;
    }

    if (editingCategory) {
      await updateCategory(editingCategory.id, { name: catForm.name, subtitle: catForm.subtitle });
    } else {
      await addCategory({ name: catForm.name, subtitle: catForm.subtitle });
    }

    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = (id, name) => {
    if (window.confirm(`Delete category "${name}" and all items assigned to it?`)) {
      deleteCategory(id);
    }
  };

  const handleResetMenu = () => {
    if (window.confirm('Reset all menu items and categories back to original defaults?')) {
      resetToDefaultMenu();
    }
  };

  const inactiveCount = menuItems.filter((i) => i.isAvailable === false).length;

  return (
    <div className="admin-dashboard-page">
      <SEOHead title="Admin Dashboard" description="Manage Menu Items & Categories" canonicalUrl="/admin" />

      {/* Top Admin Header */}
      <header className="admin-nav-header">
        <div className="container admin-nav-inner">
          <div className="admin-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} title="Go to public website">
            <img src="/logo.jpg" alt="Logo" className="admin-logo-img" />
            <div>
              <h1 className="admin-page-title">SUPERCRAB BACKEND PORTAL</h1>
              <span className="admin-user-tag">Welcome, {adminUser?.name || 'Administrator'}</span>
            </div>
          </div>

          <div className="admin-nav-actions">
            {/* Live Sync Status Badge */}
            <div className="sync-status-indicator">
              {isSyncing || isLoadingMenu ? (
                <span className="sync-pill syncing">
                  <RefreshCw size={14} className="spin-icon" /> Syncing with Sheet...
                </span>
              ) : syncError ? (
                <span className="sync-pill warning" title={syncError}>
                  <AlertCircle size={14} /> Offline Mode
                </span>
              ) : (
                <span className="sync-pill connected">
                  <span className="live-dot"></span> Google Sheets Live
                </span>
              )}
            </div>

            {/* Notification Bell Button */}
            <button
              type="button"
              className={`btn-admin-bell ${unreadOrdersCount > 0 ? 'has-unread' : ''}`}
              onClick={() => {
                setActiveTab('orders');
                setUnreadOrdersCount(0);
              }}
              title={unreadOrdersCount > 0 ? `${unreadOrdersCount} new order(s) arrived! Click to view.` : 'Orders Bell'}
            >
              <Bell size={18} className={unreadOrdersCount > 0 ? 'bell-wiggle-icon' : ''} />
              {unreadOrdersCount > 0 && <span className="bell-badge-pulse">{unreadOrdersCount}</span>}
            </button>

            <button
              type="button"
              className="btn-admin-nav-outline"
              onClick={refetchMenu}
              disabled={isLoadingMenu || isSyncing}
              title="Fetch fresh data from Google Sheet"
            >
              <RefreshCw size={15} className={isLoadingMenu ? 'spin-icon' : ''} />
              <span>Refresh Sheet</span>
            </button>

            <button type="button" className="btn-admin-nav-outline" onClick={() => navigate('/')} title="View public website">
              <span>🌐 View Website</span>
            </button>

            <button type="button" className="btn-admin-nav-outline" onClick={handleResetMenu} title="Reset menu to factory defaults">
              <RotateCcw size={15} />
              <span>Reset Defaults</span>
            </button>

            <button type="button" className="btn-admin-nav-logout" onClick={logoutAdmin}>
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Header Navigation Tabs */}
      <div className="admin-tabs-bar">
        <div className="container admin-tabs-container">
          {/* TAB 1: Orders Management */}
          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'orders' ? 'active' : ''} ${unreadOrdersCount > 0 ? 'tab-has-new' : ''}`}
            onClick={() => {
              setActiveTab('orders');
              setUnreadOrdersCount(0);
            }}
          >
            <ShoppingBag size={18} />
            <span>
              Orders Management{' '}
              {unreadOrdersCount > 0 ? (
                <span className="tab-badge-new">
                  <Bell size={12} /> {unreadOrdersCount} NEW
                </span>
              ) : orders.length > 0 ? (
                <span className="tab-badge">{orders.length}</span>
              ) : null}
            </span>
          </button>

          {/* TAB 2: Menu Items */}
          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'items' ? 'active' : ''}`}
            onClick={() => setActiveTab('items')}
          >
            <UtensilsCrossed size={18} />
            <span>Menu Items ({menuItems.length})</span>
          </button>

          {/* TAB 3: Categories */}
          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Layers size={18} />
            <span>Categories ({categories.length})</span>
          </button>

          {/* Sound Alert Toggle */}
          <div className="tab-actions-right" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              className={`btn-sound-toggle ${isSoundEnabled ? 'active' : ''}`}
              onClick={() => {
                const nextVal = !isSoundEnabled;
                setIsSoundEnabled(nextVal);
                if (nextVal) playOrderChime();
              }}
              title={isSoundEnabled ? 'Chime sound alert is ON' : 'Chime sound alert is MUTED'}
            >
              {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{isSoundEnabled ? 'Sound: ON' : 'Sound: Muted'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container admin-main-content">
        
        {/* Real-time New Order Alert Toast */}
        {newOrderAlert && (
          <div className="new-order-alert-banner animate-fade-in">
            <div className="alert-content-left">
              <div className="alert-bell-pulse">
                <Bell size={22} className="wiggle-anim" />
              </div>
              <div className="alert-text-body">
                <div className="alert-title-row">
                  <span className="alert-badge-live">🔥 NEW ORDER ARRIVED</span>
                  <strong className="alert-order-id">#{newOrderAlert.id}</strong>
                </div>
                <p className="alert-details">
                  Customer: <strong>{newOrderAlert.customer}</strong> • Total: <strong className="alert-price">{newOrderAlert.total}</strong> • Pickup: <strong>{newOrderAlert.pickup}</strong>
                </p>
              </div>
            </div>
            <div className="alert-content-right">
              <button
                type="button"
                className="btn-alert-view"
                onClick={() => {
                  setActiveTab('orders');
                  const targetOrd = orders.find((o) => (o['Order ID'] || o.orderId) === newOrderAlert.id);
                  if (targetOrd) setSelectedOrderForModal(targetOrd);
                  setNewOrderAlert(null);
                }}
              >
                <Eye size={16} /> View Details
              </button>
              <button
                type="button"
                className="btn-alert-dismiss"
                onClick={() => setNewOrderAlert(null)}
                title="Dismiss Notification"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
        
        {/* Statistics Overview Bar */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper red">
              <UtensilsCrossed size={24} />
            </div>
            <div>
              <span className="stat-num">{menuItems.length}</span>
              <span className="stat-label">Total Menu Items</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper navy">
              <Layers size={24} />
            </div>
            <div>
              <span className="stat-num">{categories.length}</span>
              <span className="stat-label">Declared Categories</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper green">
              <CheckCircle size={24} />
            </div>
            <div>
              <span className="stat-num">{menuItems.length - inactiveCount}</span>
              <span className="stat-label">Active (Visible)</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper orange">
              <ShoppingBag size={24} />
            </div>
            <div>
              <span className="stat-num">{orders.length}</span>
              <span className="stat-label">Orders Logged</span>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: MENU ITEMS & CATEGORY ASSIGNMENT */}
        {/* ==================================================== */}
        {activeTab === 'items' && (
          <div className="admin-page-section animate-fade-in">
            {/* Toolbar */}
            <div className="admin-toolbar">
              <div className="toolbar-left">
                <div className="admin-search-box">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search item by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
                      <X size={16} />
                    </button>
                  )}
                </div>

                <select
                  className="admin-cat-select"
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                >
                  <option value="all">All Categories ({menuItems.length})</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({menuItems.filter((i) => i.category === c.id).length})
                    </option>
                  ))}
                </select>
              </div>

              <div className="toolbar-right">
                <button type="button" className="btn-admin-primary" onClick={handleOpenNewItemModal}>
                  <Plus size={18} />
                  <span>Add New Menu Item</span>
                </button>
              </div>
            </div>

            {/* Items Table */}
            <div className="admin-table-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '70px' }}>Image</th>
                    <th>Item Name & Description</th>
                    <th>Assigned Category</th>
                    <th>Price ($)</th>
                    <th>Display Status</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="table-empty-cell">
                        No items found matching criteria. Click "Add New Menu Item" to create one!
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => {
                      const catObj = categories.find((c) => c.id === item.category);
                      const isAvailable = item.isAvailable !== false;

                      return (
                        <tr key={item.id} className={!isAvailable ? 'row-unavailable' : ''}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="table-item-img"
                              onError={(e) => {
                                e.target.src = '/images/combo_1.webp';
                              }}
                            />
                          </td>
                          <td>
                            <div className="table-item-name-box">
                              <span className="table-item-title">{item.name}</span>
                              {item.badge && <span className="table-item-badge">{item.badge}</span>}
                              {item.featured && <span className="table-featured-badge">Featured</span>}
                            </div>
                            {item.description && <p className="table-item-desc">{item.description}</p>}
                          </td>
                          <td>
                            <span className="table-cat-pill">{catObj ? catObj.name : item.category}</span>
                          </td>
                          <td>
                            <span className="table-price-tag">${parseFloat(item.price || 0).toFixed(2)}</span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className={`status-toggle-btn ${isAvailable ? 'in-stock' : 'out-stock'}`}
                              onClick={() => handleToggleStatus(item)}
                              title="Click to toggle display status"
                            >
                              {isAvailable ? <Check size={14} /> : <X size={14} />}
                              <span>{isAvailable ? 'Active (Visible)' : 'Inactive (Hidden)'}</span>
                            </button>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions-cell">
                              <button
                                type="button"
                                className="action-btn edit-btn"
                                onClick={() => handleOpenEditItemModal(item)}
                                title="Edit Item & Category Assignment"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                type="button"
                                className="action-btn delete-btn"
                                onClick={() => handleDeleteItem(item.id, item.name)}
                                title="Delete Item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: MENU CATEGORIES DECLARATION */}
        {/* ==================================================== */}
        {activeTab === 'categories' && (
          <div className="admin-page-section animate-fade-in">
            {/* Toolbar */}
            <div className="admin-toolbar">
              <div className="toolbar-left">
                <h3 className="section-tab-title">Menu Categories List ({categories.length})</h3>
              </div>

              <div className="toolbar-right">
                <button type="button" className="btn-admin-primary" onClick={handleOpenNewCategoryModal}>
                  <Plus size={18} />
                  <span>Declare New Category</span>
                </button>
              </div>
            </div>

            {/* Categories Table */}
            <div className="admin-table-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: '180px' }}>Category ID</th>
                    <th style={{ minWidth: '180px' }}>Category Name</th>
                    <th style={{ minWidth: '240px' }}>Subtitle / Description</th>
                    <th style={{ minWidth: '150px', whiteSpace: 'nowrap' }}>Items Count</th>
                    <th style={{ width: '120px', minWidth: '120px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="table-empty-cell">
                        No categories declared yet. Click "+ Declare New Category" to create one!
                      </td>
                    </tr>
                  ) : (
                    categories.map((cat) => {
                      const count = menuItems.filter((i) => i.category === cat.id).length;

                      return (
                        <tr key={cat.id}>
                          <td>
                            <code className="cat-id-code">{cat.id}</code>
                          </td>
                          <td>
                            <span className="table-item-title" style={{ fontSize: '1.05rem' }}>{cat.name}</span>
                          </td>
                          <td>
                            <span className="table-item-desc">{cat.subtitle || '—'}</span>
                          </td>
                          <td>
                            <span className="table-cat-pill">{count} items assigned</span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="table-actions-cell">
                              <button
                                type="button"
                                className="action-btn edit-btn"
                                onClick={() => handleOpenEditCategoryModal(cat)}
                                title="Edit Category"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                type="button"
                                className="action-btn delete-btn"
                                onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                title="Delete Category"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: ORDERS MANAGEMENT (LIVE FROM GOOGLE SHEET) */}
        {/* ==================================================== */}
        {activeTab === 'orders' && (
          <div className="admin-page-section animate-fade-in">
            {/* Toolbar */}
            <div className="admin-toolbar">
              <div className="toolbar-left">
                <div className="admin-search-box">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, Customer, or Phone..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                  />
                  {orderSearchQuery && (
                    <button type="button" className="clear-search-btn" onClick={() => setOrderSearchQuery('')}>
                      <X size={16} />
                    </button>
                  )}
                </div>

                <select
                  className="admin-cat-select"
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                >
                  <option value="all">All Payment Statuses</option>
                  <option value="Paid">Paid (Square)</option>
                  <option value="Pickup">Pay at Pickup</option>
                  <option value="Awaiting">Awaiting Payment</option>
                </select>
              </div>

              <div className="toolbar-right">
                <button
                  type="button"
                  className="btn-admin-nav-outline"
                  onClick={loadOrders}
                  disabled={isLoadingOrders}
                >
                  <RefreshCw size={16} className={isLoadingOrders ? 'spin-icon' : ''} />
                  <span>Refresh Orders</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="admin-table-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th style={{ width: '130px' }}>Order ID</th>
                    <th style={{ width: '150px' }}>Date & Time</th>
                    <th style={{ width: '180px' }}>Customer Info</th>
                    <th>Items Ordered</th>
                    <th style={{ width: '130px' }}>Pickup Time</th>
                    <th style={{ width: '100px' }}>Total</th>
                    <th style={{ width: '150px' }}>Payment Status</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingOrders ? (
                    <tr>
                      <td colSpan="8" className="table-empty-cell">
                        <RefreshCw size={24} className="spin-icon" style={{ margin: '0 auto 8px' }} />
                        <p>Loading live orders from Google Sheet...</p>
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="table-empty-cell">
                        No orders recorded in Google Sheet yet. Orders placed on the website will instantly appear here!
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord, idx) => {
                      const id = ord['Order ID'] || ord.orderId || `SC-${idx}`;
                      const date = ord['Date & Time'] || ord.formattedDate || '—';
                      const name = ord['Customer Name'] || ord.customerName || 'Guest';
                      const phone = ord['Phone Number'] || ord.phone || 'N/A';
                      const items = ord['Items Ordered'] || ord.itemsSummary || '—';
                      const pickup = ord['Pickup Time'] || ord.pickupTime || 'ASAP';
                      const total = ord['Total Amount'] || ord.totalAmount || '$0.00';
                      const status = ord['Payment Status'] || ord.status || 'Pending';
                      const notes = ord['Special Notes'] || ord.specialNotes || '';

                      const isPaid = status.toLowerCase().includes('paid') && !status.toLowerCase().includes('awaiting');
                      const isPickup = status.toLowerCase().includes('pickup');

                      return (
                        <tr key={id} style={{ cursor: 'pointer' }} onClick={() => setSelectedOrderForModal(ord)}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <code className="order-id-code">{id}</code>
                              {idx === 0 && <span className="badge-new-order">LATEST</span>}
                            </div>
                          </td>
                          <td>
                            <div className="order-date-box">
                              <Calendar size={13} />
                              <span>{date}</span>
                            </div>
                          </td>
                          <td>
                            <div className="customer-info-box">
                              <span className="customer-name">{name}</span>
                              <span className="customer-phone"><Phone size={12} /> {phone}</span>
                            </div>
                          </td>
                          <td>
                            <p className="order-items-summary">{items}</p>
                            {notes && <span className="order-notes-tag">📝 {notes}</span>}
                          </td>
                          <td>
                            <div className="order-pickup-box">
                              <Clock size={13} />
                              <span>{pickup}</span>
                            </div>
                          </td>
                          <td>
                            <span className="order-total-amount">{total}</span>
                          </td>
                          <td>
                            <span className={`order-status-badge ${isPaid ? 'paid' : isPickup ? 'pickup' : 'pending'}`}>
                              {status}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                            <div className="table-actions-cell">
                              <button
                                type="button"
                                className="action-btn edit-btn"
                                onClick={() => setSelectedOrderForModal(ord)}
                                title="View & Inspect Order Details"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                type="button"
                                className="action-btn print-btn"
                                onClick={() => handlePrintReceipt(ord)}
                                title="Print Kitchen Receipt"
                              >
                                <Printer size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* ITEM EDITOR MODAL (Gán món vào Menu Category & Upload Ảnh) */}
      {/* ==================================================== */}
      {isItemModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsItemModalOpen(false)}>
          <div className="admin-modal-card responsive-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingItem ? 'Edit Item & Category Assignment' : 'Add New Item & Assign to Menu'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setIsItemModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="admin-modal-body">
              <div className="modal-form-grid">
                
                {/* Item Name */}
                <div className="modal-form-group col-span-2">
                  <label className="modal-label">Item Name *</label>
                  <input
                    type="text"
                    required
                    value={itemForm.name}
                    onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                    placeholder="e.g. Crawfish (1 lb)"
                  />
                </div>

                {/* Price */}
                <div className="modal-form-group">
                  <label className="modal-label">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                    placeholder="16.95"
                  />
                </div>

                {/* Assigned Category Dropdown */}
                <div className="modal-form-group">
                  <label className="modal-label">Assign to Category *</label>
                  <select
                    value={itemForm.category}
                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image URL & File Upload to Google Drive */}
                <div className="modal-form-group col-span-2">
                  <label className="modal-label">Item Image (Upload File to Google Drive or Enter URL)</label>
                  <div className="image-input-flex">
                    <input
                      type="text"
                      value={itemForm.image}
                      onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                      placeholder="/images/combo_1.webp or Drive image URL..."
                      style={{ flex: 1 }}
                    />
                    <label className={`btn-upload-device ${isUploadingImage ? 'uploading' : ''}`}>
                      {isUploadingImage ? (
                        <>
                          <RefreshCw size={15} className="spin-icon" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud size={15} />
                          <span>Upload from Device</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingImage}
                        style={{ display: 'none' }}
                        onChange={handleImageFileUpload}
                      />
                    </label>
                  </div>

                  {itemForm.image && (
                    <div className="image-preview-bar">
                      <img
                        src={itemForm.image}
                        alt="Preview"
                        className="modal-img-preview"
                        onError={(e) => {
                          e.target.src = '/images/combo_1.webp';
                        }}
                      />
                      <div className="preview-info">
                        <span className="preview-text">Image Ready</span>
                        <span className="preview-subtext">{itemForm.image.substring(0, 45)}...</span>
                      </div>
                      <button
                        type="button"
                        className="btn-clear-img"
                        onClick={() => setItemForm({ ...itemForm, image: '' })}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="modal-form-group col-span-2">
                  <label className="modal-label">Description / Ingredients</label>
                  <textarea
                    rows="3"
                    value={itemForm.description}
                    onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                    placeholder="Short description of ingredients or cooking style..."
                  />
                </div>

                {/* Badge Tag + Preset Select Chips */}
                <div className="modal-form-group col-span-2">
                  <label className="modal-label">Badge Tag (Select Preset or Type Custom)</label>
                  <input
                    type="text"
                    value={itemForm.badge}
                    onChange={(e) => setItemForm({ ...itemForm, badge: e.target.value })}
                    placeholder="e.g. Popular Item, Chef Special"
                  />
                  <div className="preset-chips-row">
                    {['Popular Item', 'Chef Special', 'Most Ordered', 'Spicy Kick', 'New Arrival', 'House Signature'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className={`badge-preset-chip ${itemForm.badge === preset ? 'selected' : ''}`}
                        onClick={() => setItemForm({ ...itemForm, badge: itemForm.badge === preset ? '' : preset })}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Item Display Status Switch Button (Active / Inactive) */}
                <div className="modal-form-group col-span-2">
                  <label className="modal-label">Display Status (Show or Hide on Menu)</label>
                  <div className="stock-switch-wrapper">
                    <button
                      type="button"
                      className={`switch-toggle-btn ${itemForm.isAvailable ? 'active-switch' : 'inactive-switch'}`}
                      onClick={() => setItemForm((prev) => ({ ...prev, isAvailable: !prev.isAvailable }))}
                    >
                      <span className="switch-dot"></span>
                      <span className="switch-text">{itemForm.isAvailable ? 'ACTIVE (DISPLAY ON MENU)' : 'INACTIVE (HIDDEN FROM MENU)'}</span>
                    </button>
                  </div>
                </div>

              </div>

              <div className="admin-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setIsItemModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save" disabled={isUploadingImage}>
                  {editingItem ? 'Save Item Changes' : 'Create & Assign Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* CATEGORY EDITOR MODAL (Khai báo Menu Category) */}
      {/* ==================================================== */}
      {isCategoryModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsCategoryModalOpen(false)}>
          <div className="admin-modal-card sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingCategory ? 'Edit Category' : 'Declare New Menu Category'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setIsCategoryModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="admin-modal-body">
              <div className="modal-form-group">
                <label className="modal-label">Category Name *</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="e.g. House Specials"
                />
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => setIsCategoryModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-save">
                  {editingCategory ? 'Save Category' : 'Declare Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* ORDER DETAILS & INSPECTION MODAL */}
      {/* ==================================================== */}
      {selectedOrderForModal && (
        <div className="admin-modal-overlay" onClick={() => setSelectedOrderForModal(null)}>
          <div className="admin-modal-card order-inspect-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="admin-modal-header order-modal-header">
              <div className="order-modal-title-box">
                <span className="order-modal-tag">ORDER DETAILS</span>
                <h3>#{selectedOrderForModal['Order ID'] || selectedOrderForModal.orderId}</h3>
                <span className="order-modal-time">
                  <Calendar size={13} /> {selectedOrderForModal['Date & Time'] || selectedOrderForModal.formattedDate}
                </span>
              </div>
              <div className="order-modal-actions-top">
                <button
                  type="button"
                  className="btn-admin-nav-outline print-top-btn"
                  onClick={() => handlePrintReceipt(selectedOrderForModal)}
                  title="Print Kitchen Ticket"
                >
                  <Printer size={16} />
                  <span>Print Receipt</span>
                </button>
                <button type="button" className="admin-modal-close" onClick={() => setSelectedOrderForModal(null)}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="admin-modal-body order-modal-body">
              
              {/* Customer & Pickup Info Grid */}
              <div className="order-info-cards-grid">
                <div className="order-info-card">
                  <h4>👤 CUSTOMER INFORMATION</h4>
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <strong>{selectedOrderForModal['Customer Name'] || selectedOrderForModal.customerName || 'Guest'}</strong>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <a href={`tel:${selectedOrderForModal['Phone Number'] || selectedOrderForModal.phone}`} className="phone-link">
                      <Phone size={13} /> {selectedOrderForModal['Phone Number'] || selectedOrderForModal.phone || 'N/A'}
                    </a>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span>{selectedOrderForModal['Email'] || selectedOrderForModal.email || 'N/A'}</span>
                  </div>
                </div>

                <div className="order-info-card">
                  <h4>📍 PICKUP & INSTRUCTIONS</h4>
                  <div className="info-row">
                    <span className="info-label">Pickup Time:</span>
                    <strong style={{ color: '#0284c7' }}>
                      <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      {selectedOrderForModal['Pickup Time'] || selectedOrderForModal.pickupTime || 'ASAP'}
                    </strong>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Special Notes:</span>
                    <span>{selectedOrderForModal['Special Notes'] || selectedOrderForModal.specialNotes || 'None'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Payment Mode:</span>
                    <span>{selectedOrderForModal['Stripe/Square Session ID'] || selectedOrderForModal.sessionId || 'Direct Order'}</span>
                  </div>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="order-items-detail-box">
                <h4>🍽️ ORDERED DISHES & CUSTOMIZATIONS</h4>
                <div className="order-items-formatted-list">
                  {String(selectedOrderForModal['Items Ordered'] || selectedOrderForModal.itemsSummary || '')
                    .split('|')
                    .map((dish, i) => (
                      <div key={i} className="dish-item-row">
                        <span className="dish-bullet">🦐</span>
                        <span className="dish-text">{dish.trim()}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Billing Summary Box */}
              <div className="order-billing-summary">
                <div className="bill-row">
                  <span>Subtotal:</span>
                  <strong>{selectedOrderForModal['Subtotal'] || '$0.00'}</strong>
                </div>
                <div className="bill-row">
                  <span>Tax (8.25% Texas):</span>
                  <strong>{selectedOrderForModal['Tax'] || '$0.00'}</strong>
                </div>
                <div className="bill-row">
                  <span>Tip:</span>
                  <strong>{selectedOrderForModal['Tip'] || '$0.00'}</strong>
                </div>
                <div className="bill-row total-row">
                  <span>TOTAL AMOUNT:</span>
                  <span className="bill-total-price">
                    {selectedOrderForModal['Total Amount'] || selectedOrderForModal.totalAmount || '$0.00'}
                  </span>
                </div>
              </div>

              {/* Live Status Management Changer */}
              <div className="order-status-management-bar">
                <div className="status-current-label">
                  <span>Current Status:</span>
                  <span className={`order-status-badge ${
                    String(selectedOrderForModal['Payment Status'] || selectedOrderForModal.status || '').toLowerCase().includes('paid')
                      ? 'paid'
                      : String(selectedOrderForModal['Payment Status'] || selectedOrderForModal.status || '').toLowerCase().includes('pickup')
                      ? 'pickup'
                      : 'pending'
                  }`}>
                    {selectedOrderForModal['Payment Status'] || selectedOrderForModal.status}
                  </span>
                </div>

                <div className="status-btn-group">
                  <span className="change-label">Change Status:</span>
                  <button
                    type="button"
                    className="btn-status-action btn-set-paid"
                    disabled={isUpdatingOrderStatus}
                    onClick={() =>
                      setConfirmStatusModal({
                        orderId: selectedOrderForModal['Order ID'] || selectedOrderForModal.orderId,
                        newStatus: 'Paid',
                        currentStatus: selectedOrderForModal['Payment Status'] || selectedOrderForModal.status || 'Pending',
                        customerName: selectedOrderForModal['Customer Name'] || selectedOrderForModal.customerName || 'Guest',
                        total: selectedOrderForModal['Total Amount'] || selectedOrderForModal.totalAmount || '$0.00'
                      })
                    }
                  >
                    <Check size={14} /> Paid (Đã thu tiền)
                  </button>
                  <button
                    type="button"
                    className="btn-status-action btn-set-pickup"
                    disabled={isUpdatingOrderStatus}
                    onClick={() =>
                      setConfirmStatusModal({
                        orderId: selectedOrderForModal['Order ID'] || selectedOrderForModal.orderId,
                        newStatus: 'Pay at Pickup',
                        currentStatus: selectedOrderForModal['Payment Status'] || selectedOrderForModal.status || 'Pending',
                        customerName: selectedOrderForModal['Customer Name'] || selectedOrderForModal.customerName || 'Guest',
                        total: selectedOrderForModal['Total Amount'] || selectedOrderForModal.totalAmount || '$0.00'
                      })
                    }
                  >
                    <Clock size={14} /> Pay at Pickup
                  </button>
                  <button
                    type="button"
                    className="btn-status-action btn-set-awaiting"
                    disabled={isUpdatingOrderStatus}
                    onClick={() =>
                      setConfirmStatusModal({
                        orderId: selectedOrderForModal['Order ID'] || selectedOrderForModal.orderId,
                        newStatus: 'Awaiting Payment',
                        currentStatus: selectedOrderForModal['Payment Status'] || selectedOrderForModal.status || 'Pending',
                        customerName: selectedOrderForModal['Customer Name'] || selectedOrderForModal.customerName || 'Guest',
                        total: selectedOrderForModal['Total Amount'] || selectedOrderForModal.totalAmount || '$0.00'
                      })
                    }
                  >
                    <AlertCircle size={14} /> Awaiting Payment
                  </button>
                  <button
                    type="button"
                    className="btn-status-action btn-set-cancelled"
                    disabled={isUpdatingOrderStatus}
                    onClick={() =>
                      setConfirmStatusModal({
                        orderId: selectedOrderForModal['Order ID'] || selectedOrderForModal.orderId,
                        newStatus: 'Cancelled',
                        currentStatus: selectedOrderForModal['Payment Status'] || selectedOrderForModal.status || 'Pending',
                        customerName: selectedOrderForModal['Customer Name'] || selectedOrderForModal.customerName || 'Guest',
                        total: selectedOrderForModal['Total Amount'] || selectedOrderForModal.totalAmount || '$0.00'
                      })
                    }
                  >
                    <X size={14} /> Cancelled
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="admin-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setSelectedOrderForModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-modal-save"
                onClick={() => handlePrintReceipt(selectedOrderForModal)}
              >
                <Printer size={16} style={{ display: 'inline', marginRight: '6px' }} />
                Print Kitchen Ticket
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* CONFIRM ORDER STATUS CHANGE MODAL */}
      {/* ==================================================== */}
      {confirmStatusModal && (
        <div className="admin-modal-overlay" style={{ zIndex: 100030 }} onClick={() => setConfirmStatusModal(null)}>
          <div className="admin-modal-card sm confirm-status-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header" style={{ borderBottom: '1px solid #e2e8f0', background: '#ffffff', color: '#0f172a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Confirm Status Change</h3>
              </div>
              <button type="button" className="admin-modal-close" onClick={() => setConfirmStatusModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body" style={{ padding: '1.5rem 1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.95rem', color: '#334155', margin: '0 0 1rem', lineHeight: 1.5 }}>
                Are you sure you want to change status for order <strong style={{ color: '#0284c7', fontFamily: 'monospace' }}>#{confirmStatusModal.orderId}</strong>?
              </p>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  Customer: <strong style={{ color: '#0f172a' }}>{confirmStatusModal.customerName}</strong> • Total: <strong style={{ color: '#16a34a' }}>{confirmStatusModal.total}</strong>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.75rem' }}>
                  <span className="order-status-badge pending" style={{ fontSize: '0.75rem' }}>
                    {confirmStatusModal.currentStatus}
                  </span>
                  <span style={{ fontWeight: 900, color: '#94a3b8' }}>➔</span>
                  <span className={`order-status-badge ${confirmStatusModal.newStatus.toLowerCase().includes('paid') ? 'paid' : confirmStatusModal.newStatus.toLowerCase().includes('pickup') ? 'pickup' : 'pending'}`} style={{ fontSize: '0.75rem' }}>
                    {confirmStatusModal.newStatus}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                This action will update <strong>Column M (Payment Status)</strong> in Google Sheet in real-time.
              </p>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                disabled={isUpdatingOrderStatus}
                onClick={() => setConfirmStatusModal(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-save"
                disabled={isUpdatingOrderStatus}
                onClick={async () => {
                  const { orderId, newStatus } = confirmStatusModal;
                  setConfirmStatusModal(null);
                  await handleUpdateOrderStatus(orderId, newStatus);
                }}
              >
                {isUpdatingOrderStatus ? 'Updating...' : 'Yes, Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
