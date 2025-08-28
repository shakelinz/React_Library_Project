import { useState } from "react";
import { db } from "../config/fireBaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { Form, FormText } from "react-bootstrap";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", formData.email));
    getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        if (userData.password === formData.password) {
          alert("Login successful!");
          window.location.href = "/myLibrary"; // Redirect to My Library page
        } else {
          alert("Invalid password.");
        }
      } else {
        alert("User not found.");
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <button type="submit">Login</button>
      </Form>
    </div>
  );
};
