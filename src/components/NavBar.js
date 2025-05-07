import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">📚 Book Marketplace</Link>

        {user?.role === "ADMIN" && (
          <Link to="/admin" className="btn btn-outline-warning me-3">Admin Panel</Link>
        )}

        <div className="ms-auto d-flex align-items-center gap-2">
          {user ? (
            <div className="dropdown">
              <button 
                className="btn btn-outline-light dropdown-toggle px-3" 
                type="button" 
                data-bs-toggle="dropdown"
              >
                👤 {user.username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeIn">
                <li><Link className="dropdown-item" to="/order-history">📦 Order History</Link></li>
                <li><Link className="dropdown-item" to="/cart">🛒 Cart</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>🚪 Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">🔐 Login</Link>
              <Link className="btn btn-outline-success" to="/register">📝 Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
