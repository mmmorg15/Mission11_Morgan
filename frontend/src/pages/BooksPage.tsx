import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomBand";
import CartSummary from "../components/CartSummary";

function BooksPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const navigate = useNavigate();

    return (
        <div className="books-page container-fluid py-4">
            <CartSummary />
            <button className="btn btn-secondary mb-3" onClick={() => navigate("/admin/books")}>
                Admin
            </button>
            <div className="row g-4">
                <div className="col-12">
                    <WelcomeBand />
                </div>
            </div>
            <div className="row g-4 align-items-start">
                <aside className="col-12 col-md-4 col-lg-3 app-sidebar">
                    <CategoryFilter
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                </aside>
                <main className="col-12 col-md-8 col-lg-9">
                    <BookList selectedCategories={selectedCategories} />
                </main>
            </div>
        </div>
    );
}

export default BooksPage;
