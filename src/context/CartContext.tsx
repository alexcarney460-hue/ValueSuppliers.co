'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type PurchasePlan = 'one-time' | 'autoship';

export type CartItem = {
  id: string;       // product slug
  name: string;
  price: number;    // unit price already accounting for plan/tier
  quantity: number;
  plan: PurchasePlan;
  img: string;
  unit: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, plan: PurchasePlan) => void;
  updateQty: (id: string, plan: PurchasePlan, qty: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('vs-cart');
    if (!saved) return [];
    try {
      const parsed: CartItem[] = JSON.parse(saved);
      return parsed.map((item) => ({ ...item, plan: item.plan ?? 'one-time' }));
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vs-cart', JSON.stringify(items));
  }, [items]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((current) => {
      const existing = current.find((i) => i.id === newItem.id && i.plan === newItem.plan);
      if (existing) {
        return current.map((i) =>
          i.id === newItem.id && i.plan === newItem.plan
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...current, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string, plan: PurchasePlan) => {
    setItems((current) => current.filter((i) => !(i.id === id && i.plan === plan)));
  };

  const updateQty = (id: string, plan: PurchasePlan, qty: number) => {
    if (qty < 1) {
      removeItem(id, plan);
      return;
    }
    setItems((current) =>
      current.map((i) => i.id === id && i.plan === plan ? { ...i, quantity: qty } : i)
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      total, count, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
