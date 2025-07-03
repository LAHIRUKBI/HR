import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Sign_up from './pages/Sign_up';
import Role from './pages/Role';
import Admin from './pages/Admin';
import Employees from './pages/Employees';


export default function App() {
  return (
    
    <BrowserRouter>
    <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sign_up" element={<Sign_up />} />
        <Route path="/Role" element={<Role />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Employees" element={<Employees />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}
