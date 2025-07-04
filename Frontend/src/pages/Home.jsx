import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaUser } from 'react-icons/fa';

export default function Home() {
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/departments');
        // Get top 3 departments with highest budgets
        const sortedDepts = response.data.sort((a, b) => b.budget - a.budget).slice(0, 3);
        setDepartments(sortedDepts);
        setLoadingDepts(false);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setLoadingDepts(false);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/roles/all');
        // Get top 3 roles
        const topRoles = response.data.slice(0, 3);
        setRoles(topRoles);
        setLoadingRoles(false);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setLoadingRoles(false);
      }
    };

    fetchDepartments();
    fetchRoles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to HRPro</h1>
          <p className="text-xl md:text-2xl mb-8">Empowering Your Organization's Success</p>
        </div>
      </div>

      {/* Featured Departments Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Our Premier Departments</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            These departments represent the pillars of our organization's success
          </p>
          
          {loadingDepts ? (
            <div className="text-center py-8">Loading departments...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <div 
                  key={dept._id} 
                  className={`bg-gradient-to-br rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 ${index % 3 === 0 ? 'from-blue-50 to-blue-100' : index % 3 === 1 ? 'from-purple-50 to-purple-100' : 'from-teal-50 to-teal-100'}`}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full ${index % 3 === 0 ? 'bg-blue-100 text-blue-600' : index % 3 === 1 ? 'bg-purple-100 text-purple-600' : 'bg-teal-100 text-teal-600'}`}>
                        <FaBuilding className="text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold ml-3 text-gray-800">{dept.name}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className={`mr-2 ${index % 3 === 0 ? 'text-blue-500' : index % 3 === 1 ? 'text-purple-500' : 'text-teal-500'}`} />
                        <span className="text-gray-700">{dept.location || 'Global'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FaMoneyBillWave className={`mr-2 ${index % 3 === 0 ? 'text-blue-500' : index % 3 === 1 ? 'text-purple-500' : 'text-teal-500'}`} />
                        <span className="text-gray-700">Budget: <span className="font-bold">${dept.budget?.toLocaleString() || '0'}</span></span>
                      </div>
                      
                      {dept.description && (
                        <p className="text-gray-600 mt-3 italic">"{dept.description}"</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Roles Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Key Organizational Roles</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            These roles define the structure and responsibilities within our organization
          </p>
          
          {loadingRoles ? (
            <div className="text-center py-8">Loading roles...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {roles.map((role, index) => (
                <div 
                  key={role.id} 
                  className={`bg-gradient-to-br rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 ${index % 3 === 0 ? 'from-blue-50 to-blue-100' : index % 3 === 1 ? 'from-purple-50 to-purple-100' : 'from-teal-50 to-teal-100'}`}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold ml-3 text-gray-800">{role.title}</h2>
                    <div className="flex items-center mb-4">
                      {/* Image section */}
                                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative">
                                        {role.imageUrl ? (
                                          <div className="w-full h-full flex items-center justify-center">
                                            <img
                                              src={role.imageUrl}
                                              alt={role.title}
                                              className="max-w-full max-h-full object-contain"
                                              onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '';
                                                e.target.parentElement.innerHTML = (
                                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <FaUser className="text-gray-500 text-5xl" />
                                                  </div>
                                                );
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <FaUser className="text-gray-500 text-5xl" />
                                          </div>
                                        )}
                                      </div>
                      
                    </div>

                    {/* Name display */}
                    {role.name && (
                      <div className="mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${index % 3 === 0 ? 'bg-blue-100 text-blue-800' : index % 3 === 1 ? 'bg-purple-100 text-purple-800' : 'bg-teal-100 text-teal-800'}`}>
                          {role.name}
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Description</h3>
                      <p className="text-gray-700">{role.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Employee Management</h3>
              <p className="text-gray-600">Efficiently manage all employee records, from personal details to employment history.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Department Structure</h3>
              <p className="text-gray-600">Organize your workforce with clear department hierarchies and reporting lines.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Role Management</h3>
              <p className="text-gray-600">Define and manage organizational roles with clear responsibilities and permissions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to transform your HR operations?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of companies who trust HRPro for their human resource management needs.</p>
          <Link 
            to="/Sign_in" 
            className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}