import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomBand";
import CartSummary from "../components/CartSummary";

// Main page displaying the book catalog with category filtering and cart access
function BooksPage() {
    // Tracks which categories the user has selected for filtering
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const navigate = useNavigate();

    return (
        <div className="books-page container-fluid py-4">
            {/* Cart icon/summary shown at the top of the page */}
            <CartSummary />

            {/* Button to navigate to the admin book management page */}
            <button className="btn btn-secondary mb-3" onClick={() => navigate("/admin/books")}>
                Admin
            </button>

            {/* Welcome banner */}
            <div className="row g-4">
                <div className="col-12">
                    <WelcomeBand />
                </div>
            </div>

            {/* Sidebar filter and main book list layout */}
            <div className="row g-4 align-items-start">
                <aside className="col-12 col-md-4 col-lg-3 app-sidebar">
                    {/* Category filter updates selectedCategories state */}
                    <CategoryFilter
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                </aside>
                <main className="col-12 col-md-8 col-lg-9">
                    {/* BookList receives selected categories to filter displayed books */}
                    <BookList selectedCategories={selectedCategories} />
                </main>
            </div>
        </div>
    );
}

export default BooksPage;
