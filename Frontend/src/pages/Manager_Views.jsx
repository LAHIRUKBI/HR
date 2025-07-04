import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
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
        fetchRoles(); // Refresh the list
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">All Roles</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search roles..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
            <Link
              to="/Manager_Register"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add New Role
            </Link>
          </div>
        </div>

        {roles.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">No roles found</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {role.imageUrl ? (
                          <img
                            src={role.imageUrl}
                            alt={role.title}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{role.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">{role.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {role.permissions?.map((permission, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                            >
                              {permission.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/edit-role/${role.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(role.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="inline mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}