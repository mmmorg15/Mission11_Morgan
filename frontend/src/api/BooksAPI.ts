import type { Book } from "../types/Book";
import { API_URL } from "./apiConfig";

interface fetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

// Fetches a paginated, optionally sorted and category-filtered list of books
export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    sortByTitle: boolean,
    selectedCategories: string[]
): Promise<fetchBooksResponse> => {
    try {
        // Build category query params if any categories are selected
        const categoryParams = selectedCategories.map((cat) => `bookCategory=${encodeURIComponent(cat)}`).join('&');

        const response = await fetch(
            `${API_URL}/allbooks?pageSize=${pageSize}&pageNum=${pageNum}&sortByTitle=${sortByTitle}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

// Sends a POST request to add a new book to the database
export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/addbook?`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }

};

// Sends a PUT request to update an existing book by ID
export const updateBook = async (bookID: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/updatebook/${bookID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBook)

        });
        return await response.json();
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }

}

// Sends a DELETE request to remove a book by ID
export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/deletebook/${bookID}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }

}
