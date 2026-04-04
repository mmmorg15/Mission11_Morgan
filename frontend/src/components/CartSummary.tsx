import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Shows a compact cart badge with the running item count and total price.
const CartSummary = () => {
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((count, item) => count + item.bookQuantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + item.bookPrice * item.bookQuantity, 0);

    return (
        <div className="cart-summary" onClick={() => navigate("/cart")}>
            🛒 <strong>{itemCount}</strong> (${totalAmount.toFixed(2)})
        </div>
    );
};

export default CartSummary;
