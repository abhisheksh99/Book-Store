import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';


function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with MainLayout (Navbar and Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Routes with AuthLayout (no Navbar or Footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
