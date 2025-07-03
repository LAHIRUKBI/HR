import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Home from './pages/Home';


export default function App() {
  return (
    
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}
