import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const CART_STORAGE_KEY = 'puretastebd_cart';
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCartItems(parsedCart);
          console.log('✅ Cart loaded from localStorage:', parsedCart.length, 'items');
        } else {
          console.log('ℹ️ Cart is empty in localStorage');
          setCartItems([]);
        }
      } else {
        console.log('ℹ️ No saved cart found in localStorage');
        setCartItems([]);
      }
    } catch (error) {
      console.error('❌ Error loading cart from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem(CART_STORAGE_KEY);
      setCartItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        console.log('💾 Cart saved to localStorage:', cartItems.length, 'items');
      } catch (error) {
        console.error('❌ Error saving cart to localStorage:', error);
        // Try to clear localStorage if it's full
        try {
          localStorage.removeItem(CART_STORAGE_KEY);
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (clearError) {
          console.error('❌ Failed to save cart after clearing:', clearError);
        }
      }
    }
  }, [cartItems, isLoaded]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.error('❌ Invalid product:', product);
      toast.error('Invalid product. Cannot add to cart.');
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log('➕ Updated cart item:', product.name, 'New quantity:', existingItem.quantity + quantity);
      } else {
        newItems = [...prevItems, { ...product, quantity }];
        console.log('➕ Added new item to cart:', product.name, 'Quantity:', quantity);
      }
      
      // Save immediately to localStorage
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
        console.log('💾 Cart saved immediately after add:', newItems.length, 'items');
      } catch (error) {
        console.error('❌ Error saving cart after add:', error);
      }
      
      toast.success(`${product.name} added to cart!`);
      return newItems;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const item = prevItems.find(item => item.id === productId);
      if (item) {
        toast.success(`${item.name} removed from cart`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      console.log('🗑️ Cart cleared from localStorage');
    } catch (error) {
      console.error('❌ Error clearing cart from localStorage:', error);
    }
    toast.success('Cart cleared');
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

