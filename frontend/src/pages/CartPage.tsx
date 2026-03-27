import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function CartPage() {
const navigate = useNavigate();
const { cartItems, removeFromCart } = useCart();
const totalAmount = cartItems.reduce((sum, item) => sum + item.bookPrice * item.bookQuantity, 0);

return (
<div className="simple-page container py-4">
    <div className="row g-4">
        <div className="col-12 col-lg-10 mx-auto">
            <div className="cart-page__content">
                <h2 className="mb-3">Your cart</h2>
                <div>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="cart-page__list">
                            {cartItems.map((item: CartItem) => (
                                <li className="cart-page__item" key={item.bookId}>
                                    <span>
                                        {item.bookTitle}: ${item.bookPrice} x {item.bookQuantity} = $
                                        {(item.bookPrice * item.bookQuantity).toFixed(2)}
                                    </span>
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => removeFromCart(item.bookId)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="row g-3 align-items-center">
                    <div className="col-12 col-md">
                        <h3 className="mb-0">Total: ${totalAmount.toFixed(2)}</h3>
                    </div>
                    <div className="col-12 col-md-auto">
                        <div className="cart-page__actions">
                            <button className="btn btn-primary">Checkout</button>
                            <button className="btn btn-outline-primary" onClick={() => navigate('/books')}>
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
);
}

export default CartPage;
