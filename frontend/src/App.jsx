import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';
import CartPage from './pages/books/CartPage';
import Checkout from './pages/books/Checkout';
import SingleBook from './pages/books/SingleBook';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import Order from './pages/books/Order';



function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* Routes with MainLayout (Navbar and Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Order/></PrivateRoute>} />
          <Route path="/books/:id" element={<SingleBook/>} />
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
