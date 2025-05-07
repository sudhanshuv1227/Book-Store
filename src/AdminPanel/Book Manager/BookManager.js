// src/pages/AdminPanel/BookManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookManager() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    price: '',
    imageUrl: ''
  });
  const [editing, setEditing] = useState(null); // Track if we are editing a book
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch books when the component loads
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:9090/book/all')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  };

  const handleAddBook = () => {
    axios.post('http://localhost:9090/book/add/1', book) // Assuming userId = 1 for now
      .then(() => {
        setMessage('Book added successfully!');
        resetForm();
        fetchBooks(); // Refresh the list
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to add book!');
      });
  };

  const handleUpdateBook = () => {
    axios.put(`http://localhost:9090/book/${editing.id}`, book)
      .then(() => {
        setMessage('Book updated successfully!');
        resetForm();
        fetchBooks(); // Refresh the list
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to update book!');
      });
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios.delete(`http://localhost:9090/book/${bookId}`)
        .then(() => {
          setMessage('Book deleted successfully!');
          fetchBooks(); // Refresh the list
        })
        .catch(err => {
          console.error(err);
          setMessage('Failed to delete book!');
        });
    }
  };

  const resetForm = () => {
    setBook({
      title: '',
      author: '',
      description: '',
      category: '',
      price: '',
      imageUrl: ''
    });
    setEditing(null);
  };

  return (
    <div className="container mt-5">
      <h3>{editing ? 'Edit Book' : 'Add Book'}</h3>

      {/* Message */}
      {message && <div className="alert alert-info">{message}</div>}

      {/* Book Form */}
      <form onSubmit={e => e.preventDefault()}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={book.title}
            onChange={e => setBook({ ...book, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Author"
            value={book.author}
            onChange={e => setBook({ ...book, author: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={book.description}
            onChange={e => setBook({ ...book, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={book.category}
            onChange={e => setBook({ ...book, category: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={book.price}
            onChange={e => setBook({ ...book, price: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            value={book.imageUrl}
            onChange={e => setBook({ ...book, imageUrl: e.target.value })}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={editing ? handleUpdateBook : handleAddBook}
        >
          {editing ? 'Update Book' : 'Add Book'}
        </button>
      </form>

      {/* Book List */}
      <h4 className="mt-4">Books List</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>₹{book.price}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    setEditing(book);
                    setBook({ ...book });
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookManager;
