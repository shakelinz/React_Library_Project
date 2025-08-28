import React from 'react'
import {useParams} from 'react-router-dom'
import { useState, useEffect } from "react";
import { db } from "../config/fireBaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
export const MyLibraryPage = () => {
  const { userId } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRef = collection(db, "books");
      const q = query(booksRef, where("borrowedBy", "==", userId));
      const snapshot = await getDocs(q);
      const borrowedBooks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(borrowedBooks);
    };

    fetchBooks();
  }, [userId]);

  return (
    <div>
      <h2>My Library</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  )
}
