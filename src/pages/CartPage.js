import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cart, setCart] = useState([]);
  const debounceTimers = useRef({});
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log("Fetching cart for user ID:", user.id);
      axios.get(`http://localhost:9090/cart/${user.id}`)
        .then(res => setCart(res.data))
        .catch(err => {
          console.error("Error fetching cart:", err);
        });
    } else {
      console.warn("User not found in localStorage.");
    }
  }, []);
  

  const handleRemove = (cartId) => {
    axios.delete(`http://localhost:9090/cart/remove/${cartId}`)
      .then(() => {
        setCart(cart.filter(item => item.id !== cartId));
      })
      .catch(err => console.error(err));
  };

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    // Update local cart state
    const updatedCart = cart.map(item =>
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);

    // Debounce backend update
    if (debounceTimers.current[cartItemId]) {
      clearTimeout(debounceTimers.current[cartItemId]);
    }

    debounceTimers.current[cartItemId] = setTimeout(() => {
      axios.put(`http://localhost:9090/cart/update/${cartItemId}`, { quantity: newQuantity })
        .then(() => {
          console.log('✅ Quantity updated in backend');
        })
        .catch(err => {
          console.error(err);
          alert('❌ Failed to update quantity');
        });
    }, 500); // Delay API call by 500ms
  };

  const handlePlaceOrder = () => {
    axios.post(`http://localhost:9090/orders/place-from-cart/${user.id}`)
      .then(() => {
        alert('✅ Order placed successfully!');
        navigate('/order-history');
      })
      .catch(err => {
        console.error(err);
        alert('❌ Failed to place order.');
      });
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.book.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.book.title}</td>
                  <td>{item.book.author}</td>
                  <td>₹{item.book.price}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </td>
                  <td>₹{item.book.price * item.quantity}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center">
            <h5>Total: ₹{getTotal()}</h5>
            <button className="btn btn-success" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
