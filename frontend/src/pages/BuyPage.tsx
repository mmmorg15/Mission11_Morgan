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
            <div className="row g-4">
                <div className="col-12">
                    <WelcomeBand />
                </div>
                <div className="col-12 col-md-10 col-lg-8 mx-auto">
                    <div className="buy-page__content">
                        <h2 className="mb-3">Buy {bookTitle}</h2>

                        <div className="row g-3 align-items-end mb-3">
                            <div className="col-12 col-sm-6">
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Enter Quantity"
                                    value={quantityAmount}
                                    onChange={(x) => setQuantityAmount(Number(x.target.value))}
                                />
                            </div>
                            <div className="col-12 col-sm-auto">
                                <button className="btn btn-primary" onClick={handleAddToCart}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default BuyPage;
