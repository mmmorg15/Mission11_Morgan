import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomBand";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import { useState } from "react";

function BuyPage() {
    const navigate = useNavigate();
    const {bookTitle, bookId, price} = useParams();
    const {addtoCart} = useCart();
    const [quantityAmount, setQuantityAmount] = useState<number>();

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            bookTitle: String(bookTitle) || "",
            bookQuantity: Number(quantityAmount),
            bookPrice: Number(price) // This should be set to the actual price of the book
        };
            addtoCart(newItem);
            navigate('/cart');

        }
    return (
        <div className="simple-page container py-4">
            <WelcomeBand />
            <div className="buy-page__content">
                <h2 className="mb-3">Buy {bookTitle}</h2>

                <div className="buy-page__actions mb-3">
                    <input
                        type="number"
                        placeholder="Enter Quantity"
                        value={quantityAmount}
                        onChange={(x) => setQuantityAmount(Number(x.target.value))}
                    />
                    <button className="btn btn-primary" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>

                <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        </div>

    );
}

export default BuyPage;
