import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [sortByTitle, setSortByTitle] = useState<boolean>(false);

    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchBooks(pageSize, pageNum, sortByTitle, []);
                setBooks(data.books ?? []);
                setTotalItems(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNum, sortByTitle]);

    const handleDelete = async (bookID: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            await deleteBook(bookID);
            setBooks(books.filter((book) => book.bookID !== bookID));
        } catch (error) {
            setError((error as Error).message);

        }
    }


    if (loading) {
        return (
            <div className="simple-page container py-4 admin-books-page">
                <p>Loading books...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="simple-page container py-4 admin-books-page">
                <p className="text-danger">Error loading books: {error}</p>
            </div>
        );
    }

    return (
        <div className="simple-page container py-4 admin-books-page">
            <div className="row g-4">
                <div className="col-12">
                    <div className="welcome-band admin-books-page__hero">
                        <h1 className="welcome-band__title">Admin Books</h1>
                        <p className="admin-books-page__subtitle">
                            Review the catalog and manage book records from one place.
                        </p>
                    </div>
                </div>

                {!showForm && (
                    <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>
                        Add Book
                    </button>
                )}

                {showForm && (
                    <div className="col-12">
                        <NewBookForm
                            onSuccess={() => {
                                setShowForm(false);
                                fetchBooks(pageSize, pageNum, sortByTitle, []).then((data) => {
                                    setBooks(data.books ?? []);
                                });
                            }}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                )}

                {editingBook && (
                    <div className="col-12">
                        <EditBookForm
                            book={editingBook}
                            onSuccess={() => {
                                setEditingBook(null);
                                fetchBooks(pageSize, pageNum, sortByTitle, []).then((data) => {
                                    setBooks(data.books ?? []);
                                });
                            }}
                            onCancel={() => setEditingBook(null)}
                        />
                    </div>
                )}

                <div className="col-12">
                    <div className="admin-books-page__table-wrap">
                        <div className="admin-books-page__table-header">
                            <div>
                                <h2 className="mb-1">Catalog</h2>
                                <p className="admin-books-page__summary">
                                    Showing {books.length} book{books.length === 1 ? "" : "s"} on this page
                                </p>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table admin-books-page__table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Author</th>
                                        <th>Publisher</th>
                                        <th>ISBN</th>
                                        <th>Classification</th>
                                        <th>Category</th>
                                        <th>Pages</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((book) => (
                                        <tr key={book.bookID}>
                                            <td>{book.author}</td>
                                            <td>{book.publisher}</td>
                                            <td>{book.isbn}</td>
                                            <td>{book.classification}</td>
                                            <td>{book.category}</td>
                                            <td>{book.pageCount}</td>
                                            <td>${book.price}</td>
                                            <td>
                                                <div className="admin-books-page__actions">
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => setEditingBook(book)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleDelete(book.bookID)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <Pagination
                        currentPage={pageNum}
                        totalPages={totalItems}
                        pageSize={pageSize}
                        onPageChange={setPageNum}
                        onPageSizeChange={setPageSize}
                        sortByTitle={sortByTitle}
                        onSortByTitleChange={setSortByTitle}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminBooksPage;
