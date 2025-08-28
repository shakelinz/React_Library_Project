import React, { useState } from "react";
import { db } from "../config/fireBaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

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
        genres: [formData.genre1, formData.genre2, formData.genre3],
        description: formData.description,
        publicationDate: formData.publicationDate,
        createdBy: currentUser.email,
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
    <div>
      <h2>Add New Book</h2>
      {/* TODO add a form to add a new book */}
      {/* style it well */}

      <form
        className="Form"
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          onChange={handleChange}
        />
        {/* give the option to add up to 3 genres */}
        <input
          type="text"
          name="genre1"
          placeholder="Genre1"
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre2"
          placeholder="Genre2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre3"
          placeholder="Genre3"
          onChange={handleChange}
        />
        <input
          type="text"
          name="publicationDate"
          placeholder="Publication Date"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        ></textarea>
        <button type="submit" onClick={handleSubmit}>
          Add Book
        </button>
      </form>
    </div>
  );
};
