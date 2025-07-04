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
import Sign_in from './pages/Sign_in';
import Employee_profile from './pages/Employee_profile';
import DepartmentForm from './pages/DepartmentForm';
import DepartmentList from './pages/DepartmentList';
import Department_Update from './pages/Department_Update';
import Ticket_Create from './pages/Ticket_Create';
import Ticket_View from './pages/Ticket_View';
import Ticket_All_View from './pages/Ticket_All_View';
import Manager_Register from './pages/Manager_Register';


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
        <Route path="/Sign_in" element={<Sign_in />} />
        <Route path="/Employee_profile" element={<Employee_profile />} />

        <Route path="/DepartmentForm" element={<DepartmentForm />} />
        <Route path="/DepartmentList" element={<DepartmentList />} />
        <Route path="/Department_Update/:id" element={<Department_Update />} />

        <Route path="/Ticket_Create" element={<Ticket_Create />} />
        <Route path="/Ticket_View" element={<Ticket_View />} />
        <Route path="/Ticket_All_View" element={<Ticket_All_View />} />

        <Route path="/Manager_Register" element={<Manager_Register />} />
        

      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}
