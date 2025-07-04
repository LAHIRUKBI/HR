import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Admin() {
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch employee and department counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [employeesResponse, departmentsResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/employees'),
          axios.get('http://localhost:8080/api/departments')
        ]);
        
        setEmployeeCount(employeesResponse.data.length);
        setDepartmentCount(departmentsResponse.data.length);
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const menuItems = [
    {
      title: "Manage Employees",
      description: "Add, edit, or remove employee records",
      action: () => navigate('/employees'),
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "View Employees",
      description: "Browse and search employee database",
      action: () => navigate('/Employees_View'),
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Manage Departments",
      description: "Create and organize departments",
      action: () => navigate('/DepartmentForm'),
      color: "from-green-500 to-green-600"
    },
    {
      title: "View Departments",
      description: "See all departments and their details",
      action: () => navigate('/DepartmentList'),
      color: "from-teal-500 to-teal-600"
    },
    {
      title: "Tickets Views",
      description: "View Employees Support Tickest",
      action: () => navigate('/Ticket_All_View'),
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Managers",
      description: "Managers Register",
      action: () => navigate('/Manager_Register'),
      color: "from-teal-500 to-teal-600"
    },
    {
      title: "Managers View",
      description: "Managers View",
      action: () => navigate('/Manager_Views'),
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">HR Management Portal</h1>
          <p className="text-lg text-gray-600">Centralized control for your organization's resources</p>
        </div>
        
        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              onClick={item.action}
              className={`bg-gradient-to-br ${item.color} rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
            >
              <div className="p-6 text-white">
                <div className="flex items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                    <p className="text-white text-opacity-80 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Employees</p>
              <p className="text-2xl font-bold text-gray-800">{employeeCount}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Active Departments</p>
              <p className="text-2xl font-bold text-gray-800">{departmentCount}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Recent Activity</p>
              <p className="text-2xl font-bold text-gray-800">--</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}