import React, {useState, useEffect} from 'react'
import {db} from '../config/fireBaseConfig'
import {addDoc, collection ,getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import { Card } from 'react-bootstrap';

export const HomePage = () => {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const bookSnapshot = await getDocs(booksCollection);
      const bookList = bookSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(bookList);
    };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div>
        <h1>Welcome to the Home Page</h1>
        {/* TODO add a search bar */}
        {/* TODO add a add book button */}
        {/* TODO add list of all books available in the library */}
        {/* display them in a grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {books.length == 0  ? <li>No books available</li> : 
          books.map(book => (
            <li key={book.id}>
              <Card style={{ width: '18rem' }}>
                <h2>{book.title}</h2>
                <p>by {book.author}</p>
                <p>genres: {book.genres.join(", ")}</p>
                <p>{book.description}</p>
              </Card>
            </li>
          ))}
        </div>
    </div>
  )
}
