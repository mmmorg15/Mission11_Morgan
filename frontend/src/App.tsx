
import './App.css'
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

// Wires the app routes together and keeps cart state available across all pages.
function App() {
  
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path ="/books" element={<BooksPage />} />
        <Route path="/buy/:bookTitle/:bookId/:price" element={<BuyPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/adminbooks" element={<AdminBooksPage />} />
        <Route path="/admin/books" element={<AdminBooksPage />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App
