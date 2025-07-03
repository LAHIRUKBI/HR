import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!employeeData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load employee data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            Employee Profile
          </h1>
        </div>
        
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Personal Information
              </h2>
              
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-800 font-medium">
                  {employeeData.firstName} {employeeData.lastName}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="text-gray-800 font-medium">
                  {employeeData.employeeId}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">
                  {employeeData.email}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-gray-800 font-medium">
                  {employeeData.phoneNumber || 'Not provided'}
                </p>
              </div>
            </div>
            
            {/* Employment Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Employment Information
              </h2>
              
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="text-gray-800 font-medium">
                  {employeeData.department}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Hire Date</p>
                <p className="text-gray-800 font-medium">
                  {new Date(employeeData.hireDate).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-800 font-medium">
                  {employeeData.dateOfBirth ? new Date(employeeData.dateOfBirth).toLocaleDateString() : 'Not provided'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="text-gray-800 font-medium">
                  ${employeeData.salary?.toLocaleString() || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Additional actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}