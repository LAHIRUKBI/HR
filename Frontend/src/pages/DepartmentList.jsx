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
      const response = await axios.delete(`http://localhost:8080/api/departments/${id}`);
      if (response.status === 200) {
        setDepartments(departments.filter(dept => dept._id !== id));
      } else {
        setError(response.data?.error || 'Failed to delete department');
      }
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to delete department');
    }
  }
};

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl text-gray-600">Loading departments...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
            <p className="text-gray-600">Manage your organization's departments</p>
          </div>
          <button
            onClick={() => navigate('/departments/new')}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <FaPlus className="mr-2" /> Add Department
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredDepartments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
            <p className="text-gray-600">No departments found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDepartments.map((dept) => (
              <div key={dept._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{dept.name}</h2>
                      <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Code: {dept.code}</p>
                    </div>
                    <div className="flex space-x-3">
<button
  onClick={() => {
    console.log('Editing department with ID:', dept._id);
    navigate(`/departments/edit/${dept._id}`);
  }}
  className="text-blue-500 hover:text-blue-700 transition-colors"
  title="Edit"
>
  <FaEdit />
</button>
                      <button
                        onClick={() => handleDelete(dept._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {dept.managerId && (
                      <div className="flex items-center text-gray-700">
                        <FaUserTie className="mr-2 text-gray-400" />
                        <span className="text-sm">Manager: {dept.managerId}</span>
                      </div>
                    )}
                    
                    <div className="flex items-start text-gray-700">
                      <FaUsers className="mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                      <div>
                        <span className="text-sm">Employees: {dept.employeeIds?.length || 0}</span>
                        {dept.employeeIds && dept.employeeIds.length > 0 && (
                          <ul className="mt-1 space-y-1">
                            {dept.employeeIds.slice(0, 3).map((employeeId, index) => (
                              <li key={index} className="text-xs text-gray-500 truncate">
                                {employeeId}
                              </li>
                            ))}
                            {dept.employeeIds.length > 3 && (
                              <li className="text-xs text-gray-400">+{dept.employeeIds.length - 3} more</li>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <FaMoneyBillWave className="mr-2 text-gray-400" />
                      <span className="text-sm">Budget: <span className="font-medium">${dept.budget?.toLocaleString() || '0'}</span></span>
                    </div>
                    
                    {dept.location && (
                      <div className="flex items-center text-gray-700">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" />
                        <span className="text-sm">{dept.location}</span>
                      </div>
                    )}
                  </div>

                  {dept.description && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600 line-clamp-2">{dept.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}