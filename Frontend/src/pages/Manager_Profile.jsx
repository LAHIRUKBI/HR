import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserTie, FaEnvelope, FaIdCard, FaInfoCircle, FaImage } from 'react-icons/fa';

export default function Manager_Profile() {
  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const manager = JSON.parse(localStorage.getItem('manager'));
        
        if (!manager || !manager.id) {
          toast.error('Please login first');
          navigate('/Manager_Signin');
          return;
        }

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
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-purple-700 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!managerData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-gray-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Profile Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your manager profile</p>
          <button
            onClick={() => navigate('/Manager_Signin')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Sign In Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-1 rounded-full mr-4">
              <div className="bg-white p-1 rounded-full">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {managerData.imageUrl ? (
                    <img src={managerData.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FaUserTie className="w-10 h-10 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {managerData.name || 'Manager'}
              </h1>
              <p className="text-purple-600 font-medium">{managerData.title || 'Management Role'}</p>
            </div>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Manager Profile</h2>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <FaUserTie className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                </div>

                <div className="space-y-4 pl-11">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</p>
                    <p className="text-gray-800 font-medium">
                      {managerData.name || 'Not specified'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
                    <p className="text-gray-800 font-medium">
                      {managerData.email || 'Not specified'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Title</p>
                    <p className="text-gray-800 font-medium">
                      {managerData.title || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Information */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FaInfoCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Role Information</h3>
                </div>

                <div className="space-y-4 pl-11">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</p>
                    <p className="text-gray-800">
                      {managerData.description || 'No description provided'}
                    </p>
                  </div>
                  
                  {managerData.imageUrl && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Image</p>
                      <div className="mt-2">
                        <img 
                          src={managerData.imageUrl} 
                          alt="Manager" 
                          className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}