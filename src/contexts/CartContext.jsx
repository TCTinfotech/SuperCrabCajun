import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'supercrab_cart_items';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalTab, setOrderModalTab] = useState('pickup');
  const [tipPercentage, setTipPercentage] = useState(0); // Default No Tip (Optional)
  const [customTip, setCustomTip] = useState(null);
  const [isCurbside, setIsCurbside] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  // Toast Notification state
  const [toastItem, setToastItem] = useState(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toastTimeoutRef = React.useRef(null);

  const triggerToast = (item) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastItem(item);
    setIsToastVisible(true);
    toastTimeoutRef.current = setTimeout(() => {
      setIsToastVisible(false);
    }, 2000);
  };

  const closeToast = () => {
    setIsToastVisible(false);
  };

  const openOrderModal = (tab = 'pickup') => {
    setOrderModalTab(tab);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (product, options = {}) => {
    if (product && product.isAvailable === false) {
      alert('This item is currently inactive and hidden from ordering.');
      return;
    }

    const { seasoning = '', spiceLevel = '' } = options;
    
    const cartItemId = `${product.id}${seasoning ? `_${seasoning}` : ''}${spiceLevel ? `_${spiceLevel}` : ''}`;
    const numPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + (options.qty || 1)
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          price: numPrice,
          image: product.image,
          category: product.category,
          qty: options.qty || 1,
          seasoning,
          spiceLevel
        }
      ];
    });

    triggerToast({
      name: product.name,
      qty: options.qty || 1,
      image: product.image,
      price: numPrice,
      seasoning,
      spiceLevel
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.cartItemId === cartItemId ? { ...item, qty: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const taxAmount = cartSubtotal * 0.0825;
  const tipAmount = customTip !== null ? customTip : cartSubtotal * (tipPercentage / 100);
  const orderTotal = cartSubtotal + taxAmount + tipAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        taxAmount,
        tipAmount,
        orderTotal,
        tipPercentage,
        setTipPercentage,
        customTip,
        setCustomTip,
        isCurbside,
        setIsCurbside,
        couponCode,
        setCouponCode,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isCartOpen,
        toggleCart,
        openCart,
        closeCart,
        isOrderModalOpen,
        orderModalTab,
        setOrderModalTab,
        openOrderModal,
        closeOrderModal,
        toastItem,
        isToastVisible,
        closeToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
