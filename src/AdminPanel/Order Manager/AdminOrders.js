import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9090/orders/all')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center text-primary">All Orders (Admin View)</h3>

      {/* Bootstrap Table for a structured layout */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Book Title</th>
              <th>User</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.book.title}</td>
                  <td>{order.user.username}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-warning">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* In case no orders */}
      {orders.length === 0 && (
        <div className="alert alert-warning mt-4" role="alert">
          No orders have been placed yet.
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
