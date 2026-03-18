import { useEffect, useState } from "react";
import type { Book } from "./types/Book";

function BookList(){
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch("https://localhost:5000/api/book/allbooks");
            const data = await response.json();
            setBooks(data);
        };
        fetchBooks();
    }, []);


    return (
        <>
            <h1>Book List</h1>
            <br/>
            {books.map((p)  =>
            <div id="bookCard">
                <h3>{p.title}</h3>
                <ul>
                    <li>Author: {p.author} </li>
                    <li>Publisher: {p.publisher} </li>
                    <li>ISBN: {p.isbn} </li>
                    <li>Classification/Category: {p.classification} </li>
                    <li>Number of Pages: {p.pageCount} </li>
                    <li>Price: {p.price} </li>
                </ul>
            </div>
        )}
        </>

    );
}

export default BookList;


// Title
// • Author
// • Publisher
// • ISBN
// • Classification/Category
// • Number of Pages
// • Price
