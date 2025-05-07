import React from 'react';
import axios from 'axios';

function BookCard({ book }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddToCart = () => {
    

    axios.post(`http://localhost:9090/cart/add`, null, {
      params: {
        userId: user.id,
        bookId: book.id,
        quantity: 1
      }
    })
    .then(res => {
      alert('✅ Book added to cart!');
    })
    .catch(err => {
      console.error(err);
      alert('❌ Failed to add to cart');
    });
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="card-img-top"
        style={{ height: "400px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
        <p className="card-text">Price: ₹{book.price}</p>
        <p className="card-text">{book.description}</p>
      </div>
      <div className="card-footer d-grid">
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default BookCard;
