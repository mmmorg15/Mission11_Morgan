import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({selectedCategories}: {selectedCategories: string[]}) {
const [books, setBooks] = useState<Book[]>([]);
const [pageSize, setPageSize] = useState<number>(5);
const [pageNum, setPageNum] = useState<number>(1);
const [totalItems, setTotalItems] = useState<number>(0);
const [sortByTitle, setSortByTitle] = useState<boolean>(false);
const navigate = useNavigate();
useEffect(() => {
const fetchBooks = async () => {
    const categoryParams = selectedCategories.map((cat) => `bookCategory=${encodeURIComponent(cat)}`).join('&');

    const response = await fetch(
    `https://localhost:5000/api/book/allbooks?pageSize=${pageSize}&pageNum=${pageNum}&sortByTitle=${sortByTitle}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );
    const data = await response.json();
    setBooks(data.books ?? []);
    setTotalItems(data.totalNumBooks ?? 0);
};

fetchBooks();
}, [pageSize, pageNum, sortByTitle, selectedCategories]);

const totalPages = Math.ceil(totalItems / pageSize);

return (
<div className="book-list py-4">
    

    {books.map((book) => (
    <div id="bookCard" className="card shadow-sm mb-3" key={book.bookID}>
        <div className="card-body">
        <h3 className="card-title mb-3">{book.title}</h3>
        <ul className="list-unstyled mb-0">
            <li>
            <strong>Author:</strong> {book.author}
            </li>
            <li>
            <strong>Publisher:</strong> {book.publisher}
            </li>
            <li>
            <strong>ISBN:</strong> {book.isbn}
            </li>
            <li>
            <strong>Classification:</strong> {book.classification}
            </li>
            <li>
            <strong>Category:</strong> {book.category}
            </li>
            <li>
            <strong>Number of Pages:</strong> {book.pageCount}
            </li>
            <li>
            <strong>Price:</strong> ${book.price}
            </li>
        </ul>

        <button className="btn btn-primary" onClick={() => navigate(`/buy/${book.title}/${book.bookID}/${book.price}`)}>Buy</button>
        </div>
    </div>
    ))}

    <div className="book-list__pagination mb-3">
    <button
        className="btn btn-outline-primary me-2 mb-2"
        disabled={pageNum === 1}
        onClick={() => setPageNum(pageNum - 1)}
    >
        Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
        <button
        className={`btn mb-2 me-2 ${
            pageNum === index + 1 ? 'btn-primary' : 'btn-outline-primary'
        }`}
        key={index + 1}
        onClick={() => setPageNum(index + 1)}
        >
        {index + 1}
        </button>
    ))}

    <button
        className="btn btn-outline-primary mb-2"
        disabled={pageNum === totalPages || totalPages === 0}
        onClick={() => setPageNum(pageNum + 1)}
    >
        Next
    </button>
    </div>

    <div className="book-list__controls d-flex flex-wrap gap-3 align-items-center">
    <label className="form-label mb-0">
        Results per page:
        <select
        className="form-select ms-2 d-inline-block w-auto"
        value={pageSize}
        onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPageNum(1);
        }}
        >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        </select>
    </label>

    <label className="form-label mb-0">
        Sort by title:
        <select
        className="form-select ms-2 d-inline-block w-auto"
        value={sortByTitle ? 'title' : 'default'}
        onChange={(event) => {
            setSortByTitle(event.target.value === 'title');
            setPageNum(1);
        }}
        >
        <option value="default">Default</option>
        <option value="title">Title (A-Z)</option>
        </select>
    </label>
    </div>
</div>
);
}

export default BookList;
