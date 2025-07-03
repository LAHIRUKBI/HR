import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaUsers, FaMoneyBillWave, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';

export default function DepartmentList() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/departments');
        setDepartments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch departments');
        setLoading(false);
        console.error('Error fetching departments:', err);
      }
    };
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`http://localhost:8080/api/departments/${id}`);
        setDepartments(departments.filter(dept => dept._id !== id));
      } catch (err) {
        setError('Failed to delete department');
        console.error('Error deleting department:', err);
      }
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Loading departments...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          <button
            onClick={() => navigate('/departments/new')}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            <FaPlus className="mr-2" /> Add Department
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments by name, code, location or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredDepartments.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">No departments found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => (
              <div key={dept._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{dept.name}</h2>
                      <p className="text-sm text-gray-500 mb-2">Code: {dept.code}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/departments/edit/${dept._id}`)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(dept._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {dept.managerId && (
                      <div className="flex items-center text-gray-700">
                        <FaUserTie className="mr-2 text-gray-500" />
                        <span>Manager ID: {dept.managerId}</span>
                      </div>
                    )}
                    <div className="flex items-start text-gray-700">
                      <FaUsers className="mr-2 mt-1 text-gray-500 flex-shrink-0" />
                      <div>
                        <span className="block">Employees:</span>
                        {dept.employeeIds && dept.employeeIds.length > 0 ? (
                          <ul className="mt-1 space-y-1">
                            {dept.employeeIds.map((employeeId, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                {employeeId}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-sm text-gray-500">No employees</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaMoneyBillWave className="mr-2 text-gray-500" />
                      <span>Budget: ${dept.budget?.toLocaleString() || '0'}</span>
                    </div>
                    {dept.location && (
                      <div className="flex items-center text-gray-700">
                        <FaMapMarkerAlt className="mr-2 text-gray-500" />
                        <span>{dept.location}</span>
                      </div>
                    )}
                  </div>

                  {dept.description && (
                    <div className="mt-4">
                      <p className="text-gray-600 text-sm">{dept.description}</p>
                    </div>
                  )}

                  <button
                    onClick={() => navigate(`/departments/${dept._id}`)}
                    className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md transition duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}