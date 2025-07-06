import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Manager_Profile() {
  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        // Get manager data from localStorage
        const manager = JSON.parse(localStorage.getItem('manager'));
        
        if (!manager || !manager.id) {
          toast.error('Please login first');
          navigate('/Manager_Signin');
          return;
        }

        // Fetch detailed manager data from backend
        const response = await axios.get(`http://localhost:8080/api/roles/${manager.id}`, {
    headers: {
        'Content-Type': 'application/json',
    },
    transformResponse: [function (data) {
        try {
            return JSON.parse(data);
        } catch (err) {
            return data;
        }
    }]
});

// Add debug logging:
console.log('Manager ID:', manager.id);
console.log('Response:', response);
        
        if (response.status === 404) {
          throw new Error('Manager profile not found');
        }
        
        if (response.status !== 200 || !response.data) {
          throw new Error(response.data?.error || 'Failed to load manager profile');
        }

        setManagerData(response.data);
      } catch (error) {
        console.error('Error fetching manager data:', error);
        setError(error.message);
        toast.error(error.message || 'Failed to load manager profile');
        
        // If unauthorized, redirect to login
        if (error.response?.status === 401) {
          navigate('/Manager_Signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchManagerData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading manager profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!managerData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">No manager data found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-center">
          <h1 className="text-2xl font-bold text-white">Manager Profile</h1>
        </div>
        
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-800 font-medium">{managerData.name || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium">{managerData.email || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="text-gray-800 font-medium">{managerData.title || 'Not specified'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Role Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-800">{managerData.description || 'Not specified'}</p>
                </div>
                {managerData.imageUrl && (
                  <div>
                    <p className="text-sm text-gray-500">Profile Image</p>
                    <img 
                      src={managerData.imageUrl} 
                      alt="Manager" 
                      className="w-32 h-32 rounded-full object-cover mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}