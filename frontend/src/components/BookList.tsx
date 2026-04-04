import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({selectedCategories}: {selectedCategories: string[]}) {
const [books, setBooks] = useState<Book[]>([]);
const [pageSize, setPageSize] = useState<number>(5);
const [pageNum, setPageNum] = useState<number>(1);
const [totalItems, setTotalItems] = useState<number>(0);
const [sortByTitle, setSortByTitle] = useState<boolean>(false);
const navigate = useNavigate();
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState<boolean>(false);


useEffect(() => {
const loadBooks = async () => {
    try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, sortByTitle, selectedCategories);
    

    setBooks(data.books ?? []);
    setTotalItems(data.totalNumBooks ?? 0);
    }
    catch (error) {
        setError((error as Error).message);
    }
    finally{
        setLoading(false);
    }
};

loadBooks();
}, [pageSize, pageNum, sortByTitle, selectedCategories]);

const totalPages = Math.ceil(totalItems / pageSize);

if (loading) {
    return <p>Loading books...</p>
}
if (error) {
    return <p className="text-danger">Error loading books: {error}</p>
}



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
    <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={setPageSize}
            sortByTitle={sortByTitle}
            onSortByTitleChange={setSortByTitle}
        />

</div>
);
}

export default BookList;
