// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light mt-2 py-4">
      <div className="container text-center">
        <p className="mb-1">📚 Book Marketplace &copy; {new Date().getFullYear()}</p>
        <p className="mb-0">
          Built with ❤️ using React, Bootstrap & Spring Boot
        </p>
      </div>
    </footer>
  );
}

export default Footer;
