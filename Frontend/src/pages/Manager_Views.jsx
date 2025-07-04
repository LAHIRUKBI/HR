import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSearch, FaTrash, FaEdit, FaUser } from 'react-icons/fa';
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

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/roles/search?title=${searchTerm}`);
      setRoles(response.data);
    } catch (error) {
      toast.error('Failed to search roles');
      console.error('Error searching roles:', error);
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">All Roles</h1>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search roles..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 whitespace-nowrap"
              >
                Search
              </button>
              <Link
                to="/Manager_Register"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 whitespace-nowrap"
              >
                Add New Role
              </Link>
            </div>
          </div>
        </div>

        {roles.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">No roles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div key={role.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                {/* Image section - full width with proper aspect ratio */}
                <div className="w-full h-64 bg-gray-100 overflow-hidden relative">
                  {role.imageUrl ? (
                    <img
                      src={role.imageUrl}
                      alt={role.title}
                      className="w-full h-full object-cover absolute inset-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '';
                        e.target.parentElement.innerHTML = (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <FaUser className="text-gray-500 text-6xl" />
                          </div>
                        );
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FaUser className="text-gray-500 text-6xl" />
                    </div>
                  )}
                </div>

                {/* Content section */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{role.title}</h2>
                    {role.name && (
                      <p className="text-gray-600 mt-1">{role.name}</p>
                    )}
                  </div>

                  <div className="mb-4 flex-grow">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                    <p className="text-gray-700">{role.description}</p>
                  </div>
                  

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Permissions</h3>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions?.map((permission, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                        >
                          {permission.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <Link
                      to={`/edit-role/${role.id}`}
                      className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
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