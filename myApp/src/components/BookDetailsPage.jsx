import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
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

export const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const bookDoc = doc(db, "books", id);
      const bookSnapshot = await getDoc(bookDoc);
      if (bookSnapshot.exists()) {
        setBook(bookSnapshot.data());
      } else {
        console.log("No such book!");
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div>
      <h1>Book details page</h1>
      {/* add the details of the book here */}
      <div>
        {book ? (
          <>
            <h5>{book.title}</h5>
            <p>Author: {book.author}</p>
            <p>Genres: {book.genres.join(", ")}</p>
            <p>{book.description}</p>
          </>
        ) : (
          <p>Loading book details...</p>
        )}
      </div>

    </div>
  )
}
