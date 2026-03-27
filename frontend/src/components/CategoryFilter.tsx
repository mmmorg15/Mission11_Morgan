import { useEffect, useState } from "react";
import "./CategoryFilter.css";

function CategoryFilter({
    selectedCategories,
    setSelectedCategories,
}: {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void}) {
    const [categories, setCategories] = useState<string[]>([]);
    

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://localhost:5000/api/book/getbookcategories")
                const data = await response.json();
                console.log("Fetched categories:", data);
                setCategories(data)
            }
            catch (error) {
                console.error("Error fetching categories:", error);
            }
            
        }
        fetchCategories();
    },[]);

    function handleCheckboxChange({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((c) => c !== target.value)
            : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    }

    return (
        <div className="category-filter accordion" id="categoryFilterAccordion">
            <div className="accordion-item">
                <h2 className="accordion-header" id="categoryFilterHeading">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#categoryFilterCollapse"
                        aria-expanded="true"
                        aria-controls="categoryFilterCollapse"
                    >
                        Book Categories
                    </button>
                </h2>
                <div
                    id="categoryFilterCollapse"
                    className="accordion-collapse collapse show"
                    aria-labelledby="categoryFilterHeading"
                    data-bs-parent="#categoryFilterAccordion"
                >
                    <div className="accordion-body category-filter__list">
                        {categories.map((c) => (
                            <div className="category-filter__item" key={c}>
                                <input
                                    type="checkbox"
                                    id={c}
                                    value={c}
                                    checked={selectedCategories.includes(c)}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor={c}>{c}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div> 
        </div>
    );
} 

export default CategoryFilter;
