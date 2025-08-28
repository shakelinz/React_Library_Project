import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from './components/HomePage'
import { AddNewBookPage } from './components/AddNewBookPage'
import {BookDetailsPage} from './components/BookDetailsPage'
import {RegistrationPage} from './components/RegistrationPage'
import {LoginPage} from './components/LoginPage'
import {MyLibraryPage} from './components/MyLibraryPage'
import {NotFoundPage} from './components/NotFoundPage'
import {UserProfilePage} from './components/UserProfilePage'

function App() {

  return (
    <>
      <nav>
        <ul style={{display: 'flex', gap: '10px', listStyleType: 'none'}}>
          <li style={{fontWeight: 'bold', border: '2px solid white'}}><Link to="/">Home</Link></li>
          <li style={{fontWeight: 'bold', border: '2px solid white'}}><Link to="/addBook">Add New Book</Link></li>
          <li style={{fontWeight: 'bold', border: '2px solid white'}}><Link to="/register">Register</Link></li>
          <li style={{fontWeight: 'bold', border: '2px solid white'}}><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addBook" element={<AddNewBookPage />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/myLibrary' element={<MyLibraryPage />} />
        <Route path='/404' element={<NotFoundPage />} />
        <Route path='/profile' element={<UserProfilePage />} />
      </Routes>
    </>
  )
}

export default App
