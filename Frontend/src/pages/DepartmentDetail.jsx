import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBuilding, FaUsers, FaMoneyBillWave, FaMapMarkerAlt, FaEdit, FaArrowLeft } from 'react-icons/fa';

export default function DepartmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const deptResponse = await axios.get(`http://localhost:8080/api/departments/${id}`);
        setDepartment(deptResponse.data);
        
        // Fetch all employees
        const empResponse = await axios.get('http://localhost:8080/api/employees');
        setEmployees(empResponse.data);
        
        // Find manager if exists
        if (deptResponse.data.managerId) {
          const manager = empResponse.data.find(emp => emp._id === deptResponse.data.managerId);
          setManager(manager);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch department details');
        setLoading(false);
        console.error('Error fetching department:', err);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading department details...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!department) return <div className="text-center py-8">Department not found</div>;

  const departmentEmployees = employees.filter(emp => 
    department.employeeIds && department.employeeIds.includes(emp._id)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/departments')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back to Departments
        </button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{department.name}</h1>
                <p className="text-blue-100">Code: {department.code}</p>
              </div>
              <button
                onClick={() => navigate(`/departments/edit/${department._id}`)}
                className="flex items-center bg-white text-blue-600 px-3 py-1 rounded-md text-sm"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FaBuilding className="mr-2 text-blue-500" /> Department Information
                </h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Location:</span> {department.location || 'Not specified'}</p>
                  <p><span className="font-medium">Budget:</span> ${department.budget?.toLocaleString() || '0'}</p>
                  {manager && (
                    <p>
                      <span className="font-medium">Manager:</span> {manager.firstName} {manager.lastName} ({manager.employeeId})
                    </p>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FaUsers className="mr-2 text-blue-500" /> Employees ({departmentEmployees.length})
                </h2>
                {departmentEmployees.length > 0 ? (
                  <ul className="space-y-2">
                    {departmentEmployees.slice(0, 5).map(emp => (
                      <li key={emp._id}>
                        {emp.firstName} {emp.lastName} ({emp.employeeId})
                      </li>
                    ))}
                    {departmentEmployees.length > 5 && (
                      <li className="text-blue-600">+ {departmentEmployees.length - 5} more</li>
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-500">No employees assigned</p>
                )}
              </div>
            </div>
            
            {department.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-700">{department.description}</p>
              </div>
            )}
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Employee List</h2>
              {departmentEmployees.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Employee ID</th>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentEmployees.map(emp => (
                        <tr key={emp._id} className="border-b">
                          <td className="py-2 px-4">{emp.employeeId}</td>
                          <td className="py-2 px-4">{emp.firstName} {emp.lastName}</td>
                          <td className="py-2 px-4">{emp.email}</td>
                          <td className="py-2 px-4">{emp.position || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No employees in this department</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}