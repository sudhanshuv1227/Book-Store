import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from './components/NavBar';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import CartPage from './pages/CartPage';
import AdminPanel from './pages/AdminPanel';
import OrderPage from './pages/OrderPage';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          {/* Redirect root based on login status */}
          <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
          
          <Route path="/admin" element={<AdminPanel />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />

          {/* Public route */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-history" element={<OrderPage />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
