import {useState} from 'react'
import { db } from "../config/fireBaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {Form, FormText} from 'react-bootstrap'
export const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const usersCollection = collection(db, "users");
    addDoc(usersCollection, formData)
      .then(() => {
        alert("User registered successfully!");
        window.location.href = "/login"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  }

  return (
    <div>
      <h1>Registration Page</h1>
      <Form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        <button type="submit">Register</button>
      </Form>
    </div>
  )
}
