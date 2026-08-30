import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';
import { CART_STORAGE_KEY } from '../types';

interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  addStandardProduct: (product: Product) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCartState] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) setCartState(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((items: CartItem[]) => {
    setCartState(items);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, []);

  const addToCart = useCallback(
    (item: CartItem) => persist([...cart, item]),
    [cart, persist],
  );

  const addStandardProduct = useCallback(
    (product: Product) => {
      persist([
        ...cart,
        {
          id: `item-${Date.now()}`,
          type: 'standard-product',
          product,
          quantity: 1,
          unitPrice: product.pricePerSqFt * product.minSqFt,
          totalPrice: product.pricePerSqFt * product.minSqFt,
          dimensionsSummary: `Min ${product.minSqFt} sq.ft`,
        },
      ]);
    },
    [cart, persist],
  );

  const updateQuantity = useCallback(
    (id: string, qty: number) =>
      persist(cart.map((i) => (i.id === id ? { ...i, quantity: qty, totalPrice: i.unitPrice * qty } : i))),
    [cart, persist],
  );

  const removeItem = useCallback((id: string) => persist(cart.filter((i) => i.id !== id)), [cart, persist]);

  const clearCart = useCallback(() => persist([]), [persist]);

  const setCart = useCallback((items: CartItem[]) => persist(items), [persist]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.reduce((s, i) => s + i.quantity, 0),
        addToCart,
        addStandardProduct,
        updateQuantity,
        removeItem,
        clearCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
