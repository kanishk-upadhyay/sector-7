import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/api';
import { toast } from "sonner"

/**
 * Cart Item Interface
 * Extends the basic Product interface to include quantity for cart management.
 */
export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider Component
 * 
 * Manages the global shopping cart state using React Context.
 * Handles persistence to localStorage ('cart-storage') and provides methods
 * for adding, removing, and updating items.
 * 
 * @param children - Child components that will have access to the cart context
 */
export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        // Load from local storage if available
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cart-storage');
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to parse cart storage', e);
                }
            }
        }
        return [];
    });

    // Persist cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('cart-storage', JSON.stringify(items));
    }, [items]);

    /**
     * Adds a product to the cart.
     * If the item already exists, it increments the quantity.
     * Triggers a toast notification on success.
     */
    const addItem = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        toast.success(`Added ${product.name} to requisition list`);
    };

    /**
     * Removes an item completely from the cart.
     */
    const removeItem = (productId: string) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    /**
     * Updates the quantity of a specific item.
     * If quantity reaches 0 or less, the item is removed.
     */
    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

/**
 * Custom Hook: useCart
 * 
 * Provides direct access to the cart context values and methods.
 * Must be used within a CartProvider component.
 * 
 * @throws Error if used outside of CartProvider
 */
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
