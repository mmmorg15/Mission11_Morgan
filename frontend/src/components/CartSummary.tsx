import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((count, item) => count + item.bookQuantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.bookPrice * item.bookQuantity, 0);

    return (
    <div
        style={{
        position: 'fixed',
        top: '10px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
        }}
        onClick={() => navigate('/cart')}
    >🛒 <strong>{itemCount}</strong> (${totalAmount.toFixed(2)})
    </div>
    );
};

export default CartSummary;