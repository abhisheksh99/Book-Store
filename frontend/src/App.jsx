import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';
import CartPage from './pages/books/CartPage';



function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with MainLayout (Navbar and Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
