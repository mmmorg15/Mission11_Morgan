import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function CartPage() {
const navigate = useNavigate();
const { cartItems, removeFromCart } = useCart();

return (
<div>
    <h2>Your cart</h2>
    <div>
    {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
    ) : (
        <ul>
        {cartItems.map((item: CartItem) => (
            <li key={item.bookId}>
            {item.bookTitle}: ${item.bookPrice} x {item.bookQuantity} = ${(item.bookPrice * item.bookQuantity).toFixed(2)}
            <button onClick={() => removeFromCart(item.bookId)}>Remove</button>
            </li>
        ))}
        </ul>
    )}
    </div>
    <h3>Total: ${(cartItems.reduce((sum, item) => sum + item.bookPrice * item.bookQuantity, 0)).toFixed(2)}</h3>
    <button>Checkout</button>
    <button onClick={() => navigate('/books')}>Continue Shopping</button>
</div>
);
}

export default CartPage;
