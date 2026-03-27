import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "../types/CartItem";

interface CartContextType {
    cartItems: CartItem[];
    addtoCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;    
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addtoCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingitem = prevCart.find((c) => c.bookId === item.bookId)
            const updatedCart = prevCart.map((c) => c.bookId === item.bookId ? {...c, bookQuantity: c.bookQuantity + item.bookQuantity} : c);  

            return existingitem ? updatedCart : [...prevCart, item];
        });
    };

    const removeFromCart = (bookId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.bookId !== bookId));
    };

    const clearCart = () => {
        setCart([]);
    }
    return(
        <CartContext.Provider value={{ cartItems: cart, addtoCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};


