// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BookCard from '../components/BookCard';

// function HomePage() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [sortType, setSortType] = useState('');
//   const [category, setCategory] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get('http://localhost:9090/book/all');
//         setBooks(response.data);
//         setFilteredBooks(response.data);

//         const uniqueCategories = [...new Set(response.data.map(book => book.category))];
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     let tempBooks = [...books];

//     if (search) {
//       tempBooks = tempBooks.filter(book =>
//         book.title.toLowerCase().includes(search.toLowerCase()) ||
//         book.author.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category) {
//       tempBooks = tempBooks.filter(book => book.category === category);
//     }

//     if (sortType === 'titleAsc') {
//       tempBooks.sort((a, b) => a.title.localeCompare(b.title));
//     } else if (sortType === 'titleDesc') {
//       tempBooks.sort((a, b) => b.title.localeCompare(a.title));
//     } else if (sortType === 'priceLowHigh') {
//       tempBooks.sort((a, b) => a.price - b.price);
//     } else if (sortType === 'priceHighLow') {
//       tempBooks.sort((a, b) => b.price - a.price);
//     }

//     setFilteredBooks(tempBooks);
//   }, [search, sortType, books, category]);

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Available Books</h2>

//       <div className="row mb-4">
//         <div className="col-md-4 mb-2">
//           <input
//             type="text"
//             placeholder="Search by title or author"
//             className="form-control"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="col-md-4 mb-2">
//           <select
//             className="form-select"
//             value={sortType}
//             onChange={(e) => setSortType(e.target.value)}
//           >
//             <option value="">Sort By</option>
//             <option value="titleAsc">Title (A-Z)</option>
//             <option value="titleDesc">Title (Z-A)</option>
//             <option value="priceLowHigh">Price (Low to High)</option>
//             <option value="priceHighLow">Price (High to Low)</option>
//           </select>
//         </div>

//         <div className="col-md-4 mb-2">
//           <select
//             className="form-select"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Filter by Category</option>
//             {categories.map((cat, index) => (
//               <option key={index} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="row">
//         {filteredBooks.length > 0 ? (
//           filteredBooks.map((book) => (
//             <div className="col-md-4 mb-4" key={book.id}>
//               <BookCard book={book} />
//             </div>
//           ))
//         ) : (
//           <div className="text-center mt-5">
//             <h5>No books found matching your search.</h5>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomePage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:9090/book/all');
        setBooks(response.data);
        setFilteredBooks(response.data);

        const uniqueCategories = [...new Set(response.data.map(book => book.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    let tempBooks = [...books];

    if (search) {
      tempBooks = tempBooks.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      tempBooks = tempBooks.filter(book => book.category === category);
    }

    if (sortType === 'titleAsc') {
      tempBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'titleDesc') {
      tempBooks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortType === 'priceLowHigh') {
      tempBooks.sort((a, b) => a.price - b.price);
    } else if (sortType === 'priceHighLow') {
      tempBooks.sort((a, b) => b.price - a.price);
    }

    setFilteredBooks(tempBooks);
  }, [search, sortType, books, category]);

  return (
    
    <div className="container mt-4" >

      {/* 🚀 Hero Banner */}
      <div className="bg-light p-5 rounded mb-4 shadow-sm text-center">
        <h1 className="display-5 fw-bold">Welcome to the Book Marketplace</h1>
        <p className="lead">Browse, discover, and grab your next great read!</p>
        <hr />
        <h5 className="mt-3">Featured Titles</h5>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-2">
          {books.slice(0, 3).map(book => (
            <span className="badge bg-primary text-light p-2 px-3 rounded-pill" key={book.id}>
              {book.title}
            </span>
          ))}
        </div>
      </div>

      <h2 className="text-center mb-4">Available Books</h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            placeholder="Search by title or author"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="titleAsc">Title (A-Z)</option>
            <option value="titleDesc">Title (Z-A)</option>
            <option value="priceLowHigh">Price (Low to High)</option>
            <option value="priceHighLow">Price (High to Low)</option>
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Filter by Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="col-md-4 mb-4" key={book.id}>
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h5>No books found matching your search.</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
