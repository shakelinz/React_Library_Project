import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { db } from "../config/fireBaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Card} from "react-bootstrap";

export const HomePage = () => {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const booksCollection = collection(db, "books");
    const bookSnapshot = await getDocs(booksCollection);
    const bookList = bookSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(bookList);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome to the Library
      </h1>
      {/* TODO add a search bar */}
      <input type="text" placeholder="Search books..." />
      <br />
      {/* TODO add list of all books available in the library */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {books.length == 0 ? (
          <div>No books available</div>
        ) : (
          books.map((book) => (
            <Link to={`/book/${book.id}`} key={book.id}>
              <Card
                style={{
                  width: "80%",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <h2>Name: {book.title}</h2>
                <p>By: {book.author}</p>
                <p>Genres: {book.genres.join(", ")}</p>
                <p>{book.description}</p>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
