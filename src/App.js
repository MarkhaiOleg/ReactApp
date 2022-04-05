import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import About from './pages/About'
import Posts from './pages/Posts'
import './styles/App.css'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
