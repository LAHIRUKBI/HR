import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Sign_up from './pages/Sign_up';
import Role from './pages/Role';
import Admin from './pages/Admin';
import Employees from './pages/Employees';
import Employees_View from './pages/Employees_View';
import Employee_Update from './pages/Employee_Update';


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
        <Route path="/Employees_View" element={<Employees_View />} />
        <Route path="/employees/edit/:id" element={<Employee_Update />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}
