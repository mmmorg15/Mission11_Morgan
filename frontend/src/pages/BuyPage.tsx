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
        <>
        <WelcomeBand />
        <h2>Buy {bookTitle}</h2>

        <div>
            <input type="number" placeholder="Enter Quantity" value={quantityAmount} onChange={(x) => setQuantityAmount(Number(x.target.value))}/>
            <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>

        <button className="btn btn-outline-primary" onClick={() => navigate(-1)}  >
            Go Back
        </button>
        </>

    );
}

export default BuyPage;
