import React, { useState } from "react";
import { db } from "../config/fireBaseConfig";
import { addDoc, collection } from "firebase/firestore";
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
});

export const AddNewBookPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre1: "",
    genre2: "",
    genre3: "",
    description: "",
    publicationDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    try {
      await addDoc(collection(db, "books"), {
        title: formData.title,
        author: formData.author,
        genres: [formData.genre1, formData.genre2, formData.genre3].filter(
          (g) => g.trim() !== ""
        ),
        description: formData.description,
        publicationDate: formData.publicationDate,
        createdBy: currentUser?.email,
      });
      alert("Book added successfully!");
      setFormData({
        title: "",
        author: "",
        genre1: "",
        genre2: "",
        genre3: "",
        description: "",
        publicationDate: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
      window.location = "/404";
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        minHeight="100vh"
        bgcolor="background.default"
        p={3}
      >
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            Add New Book
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                type="text"
                name="title"
                label="Book Title"
                variant="outlined"
                fullWidth
                value={formData.title}
                onChange={handleChange}
              />
              <TextField
                type="text"
                name="author"
                label="Author"
                variant="outlined"
                fullWidth
                value={formData.author}
                onChange={handleChange}
              />

              {/* Up to 3 genres */}
              <TextField
                type="text"
                name="genre1"
                label="Genre 1"
                variant="outlined"
                fullWidth
                value={formData.genre1}
                onChange={handleChange}
              />
              <TextField
                type="text"
                name="genre2"
                label="Genre 2"
                variant="outlined"
                fullWidth
                value={formData.genre2}
                onChange={handleChange}
              />
              <TextField
                type="text"
                name="genre3"
                label="Genre 3"
                variant="outlined"
                fullWidth
                value={formData.genre3}
                onChange={handleChange}
              />

              <TextField
                type="date"
                name="publicationDate"
                label="Publication Date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.publicationDate}
                onChange={handleChange}
              />

              <TextField
                multiline
                rows={4}
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                value={formData.description}
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.2, borderRadius: 2 }}
              >
                Add Book
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
