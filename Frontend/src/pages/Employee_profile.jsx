import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function Employee_profile() {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const localEmployee = JSON.parse(localStorage.getItem('employee'));
        if (!localEmployee) {
          toast.error('Please login first');
          navigate('/Sign_in');
          return;
        }

        const response = await fetch(`http://localhost:8080/api/employees/${localEmployee.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch employee data');
        }

        setEmployeeData(data);
      } catch (error) {
        toast.error(error.message);
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [navigate]);

  const handleDownloadSlip = () => {
    if (!employeeData) return;

    try {
      const doc = new jsPDF();
      
      // Simple text only PDF
      doc.text('Employee Profile', 10, 10);
      doc.text(`Name: ${employeeData.firstName} ${employeeData.lastName}`, 10, 20);
      doc.text(`Employee ID: ${employeeData.employeeId}`, 10, 30);
      doc.text(`Email: ${employeeData.email}`, 10, 40);
      
      doc.save('simple_employee_profile.pdf');
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-4"></div>
          <p className="text-purple-700 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">Failed to load employee data</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-1 rounded-full mr-4">
              <div className="bg-white p-1 rounded-full">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {employeeData.profileImage ? (
                    <img src={employeeData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {employeeData.firstName} {employeeData.lastName}
              </h1>
              <p className="text-purple-600 font-medium">{employeeData.department}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
            >
              Dashboard
            </button>
            <button
              onClick={handleDownloadSlip}
              className="px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Slip
            </button>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Employee Profile</h2>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-semibold text-white">
                ID: {employeeData.employeeId}
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                </div>

                <div className="space-y-4 pl-11">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</p>
                    <p className="text-gray-800 font-medium">
                      {employeeData.firstName} {employeeData.lastName}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
                    <p className="text-gray-800 font-medium">
                      {employeeData.email}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</p>
                    <p className="text-gray-800 font-medium">
                      {employeeData.phoneNumber || 'Not provided'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</p>
                    <p className="text-gray-800 font-medium">
                      {employeeData.dateOfBirth ? new Date(employeeData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Employment Information</h3>
                </div>

                <div className="space-y-4 pl-11">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Department</p>
                    <p className="text-gray-800 font-medium">
                      {employeeData.department}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</p>
                    <p className="text-gray-800 font-medium">
                      {new Date(employeeData.hireDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</p>
                    <p className="text-gray-800 font-medium">
                      ${employeeData.salary?.toLocaleString() || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/Ticket_Create', {
                  state: {
                    fullName: `${employeeData.firstName} ${employeeData.lastName}`,
                    employeeId: employeeData.employeeId,
                    email: employeeData.email
                  }
                })}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Ticket
              </button>
              <button
                onClick={() => navigate('/Ticket_View', {
                  state: {
                    employeeId: employeeData.employeeId
                  }
                })}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}