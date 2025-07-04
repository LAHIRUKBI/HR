import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Manager_Views() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/roles/all');
      setRoles(response.data);
    } catch (error) {
      toast.error('Failed to fetch roles');
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await axios.delete(`http://localhost:8080/api/roles/${id}`);
        toast.success('Role deleted successfully');
        fetchRoles();
      } catch (error) {
        toast.error('Failed to delete role');
        console.error('Error deleting role:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Role Management</h1>
            <p className="text-xl text-gray-600">View and manage all system roles and permissions</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <Link
              to="/Manager_Register"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 whitespace-nowrap"
            >
              Add New Role
            </Link>
          </div>
        </div>
        {/* Role card */}
        {roles.length === 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-2xl mx-auto">
            <p className="text-xl text-gray-600">No roles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div 
                key={role.id} 
                className={`bg-gradient-to-br rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${index % 3 === 0 ? 'from-blue-50 to-blue-100' : index % 3 === 1 ? 'from-purple-50 to-purple-100' : 'from-teal-50 to-teal-100'}`}
              >
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

                {/* Content section */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${index % 3 === 0 ? 'bg-blue-100 text-blue-600' : index % 3 === 1 ? 'bg-purple-100 text-purple-600' : 'bg-teal-100 text-teal-600'}`}>
                      <FaUser className="text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold ml-3 text-gray-800">{role.title}</h2>
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

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <Link
                      to={`/edit-role/${role.id}`}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${index % 3 === 0 ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : index % 3 === 1 ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' : 'bg-teal-100 text-teal-600 hover:bg-teal-200'}`}
                    >
                      <FaEdit className="mr-2" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}