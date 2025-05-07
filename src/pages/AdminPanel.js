// src/pages/AdminPanel.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminOrders from '../AdminPanel/Order Manager/AdminOrders';
import BookManager from '../AdminPanel/Book Manager/BookManager';
import UserManager from '../AdminPanel/User Manager/UserManager';


function AdminPanel() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user || user.role !== 'ADMIN') {
    navigate('/');
    return null;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary">📊 Admin Dashboard</h2>

      <div className="accordion" id="adminAccordion">

        {/* 👤 User Manager */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingUsers">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUsers">
              👤 Manage Users
            </button>
          </h2>
          <div id="collapseUsers" className="accordion-collapse collapse">
            <div className="accordion-body">
              <UserManager />
            </div>
          </div>
        </div>

        {/* 📚 Book Manager */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingBooks">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBooks">
              📚 Manage Books
            </button>
          </h2>
          <div id="collapseBooks" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <BookManager />
            </div>
          </div>
        </div>

        {/* 📦 Order Manager */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOrders">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOrders">
              📦 Manage Orders
            </button>
          </h2>
          <div id="collapseOrders" className="accordion-collapse collapse">
            <div className="accordion-body">
              <AdminOrders />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;
