import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaImage, FaUserTie } from 'react-icons/fa';

export default function Manager_Register() {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    description: '',
    permissions: []
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const permissionsList = [
    "manage_employees",
    "approve_leave",
    "view_reports",
    "manage_payroll"
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('permissions', JSON.stringify(formData.permissions));
    if (image) data.append('image', image);

    try {
      await axios.post('http://localhost:8080/api/roles/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Role created successfully!');
      // Reset form
      setFormData({ title: '', description: '', permissions: [] });
      setImage(null);
      setPreview(null);
      
    } catch (error) {
      toast.error('Failed to create role: ' + (error.response?.data || error.message));
    }
  };

  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6 text-center">
          <h2 className="text-3xl font-bold">Create New Role</h2>
          <p className="text-sm mt-1">Define positions and their permissions</p>
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaUserTie className="text-blue-500" />
                Role Title
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., HR Manager"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaUserTie className="text-blue-500" />
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Responsibilities and duties..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <FaImage className="text-blue-500" />
                Role Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-700 py-2 px-3 border border-gray-300 rounded-lg"
              />
              {preview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={preview}
                    alt="Role preview"
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Permissions */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Permissions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {permissionsList.map(permission => (
                  <label key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm capitalize">
                      {permission.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Create Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}