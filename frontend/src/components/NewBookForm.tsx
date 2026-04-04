import { useState } from 'react';
import type { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
};

// Form for adding a new book to the catalog
const NewProjectForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
    // Initialize form with empty/default values for all book fields
    const [formData, setFormData] = useState<Book>({
        bookID: 0,
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        classification: "",
        category: "",
        pageCount: 0,
        price: 0.0
    });

    // Updates the matching field in formData when an input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Submits the new book to the API, then calls onSuccess to refresh the list
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addBook(formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <label> Book Name: <input type='text' name='title' value={formData.title} onChange={handleChange} /></label>
            <label> Author: <input type='text' name='author' value={formData.author} onChange={handleChange} /></label>
            <label> Publisher: <input type='text' name='publisher' value={formData.publisher} onChange={handleChange} /></label>
            <label> ISBN: <input type='text' name='isbn' value={formData.isbn} onChange={handleChange} /></label>
            <label> Classification: <input type='text' name='classification' value={formData.classification} onChange={handleChange} /></label>
            <label> Category: <input type='text' name='category' value={formData.category} onChange={handleChange} /></label>
            <label> Page Count: <input type='number' name='pageCount' value={formData.pageCount} onChange={handleChange} /></label>
            <label> Price: <input type='number' step='0.01' name='price' value={formData.price} onChange={handleChange} /></label>
            <button type="submit">Add Book</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
    
};



export default NewProjectForm;




//         [Key]
//         public int BookID { get; set; }
//         [Required]
//         public string Title { get; set; }
//         [Required]
//         public string Author { get; set; }
//         [Required]
//         public string Publisher { get; set; }
//         [Required]
//         public string ISBN { get; set; }
//         [Required]
//         public string Classification { get; set; }
//         [Required]
//         public string Category { get; set; }
//         [Required]
//         public int PageCount { get; set; }
//         [Required]
//         public double Price { get; set; }
//     }
// }
