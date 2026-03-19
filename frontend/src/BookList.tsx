import { useEffect, useState } from 'react';
import type { Book } from './types/Book';

function BookList() {
const [books, setBooks] = useState<Book[]>([]);
const [pageSize, setPageSize] = useState<number>(5);
const [pageNum, setPageNum] = useState<number>(1);
const [totalItems, setTotalItems] = useState<number>(0);
const [sortByTitle, setSortByTitle] = useState<boolean>(false);

useEffect(() => {
const fetchBooks = async () => {
    const response = await fetch(
    `https://localhost:5000/api/book/allbooks?pageSize=${pageSize}&pageNum=${pageNum}&sortByTitle=${sortByTitle}`,
    );
    const data = await response.json();
    setBooks(data.books ?? []);
    setTotalItems(data.totalNumBooks ?? 0);
};

fetchBooks();
}, [pageSize, pageNum, sortByTitle]);

const totalPages = Math.ceil(totalItems / pageSize);

return (
<div className="container py-4">
    <h1 className="mb-4">Book List</h1>

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
            <strong>Classification/Category:</strong> {book.classification}
            </li>
            <li>
            <strong>Number of Pages:</strong> {book.pageCount}
            </li>
            <li>
            <strong>Price:</strong> ${book.price}
            </li>
        </ul>
        </div>
    </div>
    ))}

    <div className="mb-3">
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

    <div className="d-flex flex-wrap gap-3 align-items-center">
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
