import type { Book } from "../types/Book";

interface fetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = "https://book-morgan-backend2-ctg6c5bcaddyc9hs.francecentral-01.azurewebsites.net/api/book";

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    sortByTitle: boolean,
    selectedCategories: string[]
): Promise<fetchBooksResponse> => {
    try {
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
