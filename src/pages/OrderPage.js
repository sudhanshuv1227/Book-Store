import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9090/orders/user/${user.id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary fw-bold border-bottom pb-2">📦 Order History</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">You haven't placed any orders yet.</div>
      ) : (
        orders.map(order => (
          <div className="card shadow-sm border-0 mb-4" key={order.id}>
            <div className="card-body">
              <h5 className="card-title text-success">{order.book.title}</h5>
              <ul className="list-unstyled mb-0">
                <li><strong>🧾 Quantity:</strong> {order.quantity}</li>
                <li><strong>💰 Total Price:</strong> ₹{order.totalPrice}</li>
                <li><strong>🗓️ Ordered On:</strong> {new Date(order.orderDate).toLocaleString()}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderPage;
