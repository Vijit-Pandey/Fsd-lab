import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  // Function to fetch books (GET request)
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Function to add a new book (POST request)
  const addBook = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', newBook);
      setBooks([...books, response.data]); // Add the new book to the existing list
      setNewBook({ title: '', author: '' }); // Clear the input fields
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="App">
      <h1>Book List</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title} by {book.author}</li>
        ))}
      </ul>

      <h2>Add a new book</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={newBook.title} 
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Author" 
        value={newBook.author} 
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} 
      />
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default App;