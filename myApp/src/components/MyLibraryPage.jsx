import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { db } from "../config/fireBaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export const MyLibraryPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // ✅ Dialog state

  const handleDeleteBook = async (bookId) => {
    await deleteDoc(doc(db, "books", bookId));
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
  };

  const handleEditBook = (bookId) => {
    const bookToEdit = books.find((b) => b.id === bookId);
    setBook(bookToEdit);
    setOpenDialog(true); // ✅ open dialog
  };

  const setAfterEditBook = async () => {
    const bookRef = doc(db, "books", book.id);
    await updateDoc(bookRef, { ...book });
    setBooks((prev) => prev.map((b) => (b.id === book.id ? book : b)));
    setBook(null);
    setOpenDialog(false); // ✅ close after save
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRef = collection(db, "books");
      const q = query(booksRef, where("createdBy", "==", currentUser.email));
      const snapshot = await getDocs(q);
      setBooks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchBooks();
  }, [currentUser.email]);

  return (
    <div>
      <h2>My Library</h2>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          {book && (
            <form>
              <TextField
                label="Title"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Author"
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Genres"
                value={book.genres.join(", ")}
                onChange={(e) =>
                  setBook({ ...book, genres: e.target.value.split(", ") })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Description"
                value={book.description}
                onChange={(e) =>
                  setBook({ ...book, description: e.target.value })
                }
                fullWidth
                margin="dense"
              />
              <TextField
                label="Publication Date"
                value={book.publicationDate}
                onChange={(e) =>
                  setBook({ ...book, publicationDate: e.target.value })
                }
                fullWidth
                margin="dense"
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={setAfterEditBook}
              >
                Save
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <ul>
        {books.length > 0 ? (
          books.map((b) => (
            <Card key={b.id}>
              <CardHeader title={b.title} />
              <CardContent>
                <p>Author: {b.author}</p>
                <p>Genres: {b.genres.join(", ")}</p>
                <p>Description: {b.description}</p>
                <p>Publication Date: {b.publicationDate}</p>
                <button onClick={() => handleEditBook(b.id)}>Edit</button>
                <button onClick={() => handleDeleteBook(b.id)}>Delete</button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>
    </div>
  );
};
