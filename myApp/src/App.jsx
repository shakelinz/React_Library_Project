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

      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addBook" element={<AddNewBookPage />} />
        <Route path="/bookDetails/:id" element={<BookDetailsPage />} />
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
