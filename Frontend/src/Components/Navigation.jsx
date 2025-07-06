import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navigation() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const employee = JSON.parse(localStorage.getItem('employee'));
    if (employee) {
      setIsLoggedIn(true);
      setUserEmail(employee.employeeId);
    }
  }, []);

  const handleAdminClick = (e) => {
    e.preventDefault();
    setIsAdminModalOpen(true);
  };

  const handleAdminLogin = () => {
    if (adminId === '23054') {
      navigate('/Admin');
      setIsAdminModalOpen(false);
    } else {
      setError('Invalid Admin ID');
    }
  };

  const handleLoginClick = () => {
    navigate('/Sign_in');
  };

  const handleLogout = () => {
    localStorage.removeItem('employee');
    setIsLoggedIn(false);
    setUserEmail('');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo and main nav */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-800">HR<span className="text-blue-600">Pro</span></span>
              </div>
              
              {/* Primary navigation */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  to="/" 
                  className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/Employee_Home" 
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Employees
                </Link>
                <Link 
                  to="/Department_Home" 
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Departments
                </Link>
                <button
                  onClick={handleAdminClick}
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Right side - Login/User info */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {isLoggedIn ? (
  <div className="flex items-center">
    <button 
      onClick={() => navigate('/Employee_profile')}
      className="mr-4 text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
    >
      {userEmail}
    </button>
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Logout
    </button>
  </div>
) : localStorage.getItem('manager') ? (
  <div className="flex items-center">
    <button 
      onClick={() => navigate('/Manager_Profile')}
      className="mr-4 text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
    >
      {JSON.parse(localStorage.getItem('manager')).email}
    </button>
    <button
      onClick={() => {
        localStorage.removeItem('manager');
        window.location.reload();
      }}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Logout
    </button>
  </div>
) : (
                <button
                  onClick={handleLoginClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Login Modal */}
      <Transition appear show={isAdminModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsAdminModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Admin Authentication
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Please enter your Admin ID to continue.
                    </p>
                  </div>

                  <div className="mt-4">
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Admin ID"
                      value={adminId}
                      onChange={(e) => {
                        setAdminId(e.target.value);
                        setError('');
                      }}
                    />
                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => setIsAdminModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleAdminLogin}
                    >
                      Login
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}