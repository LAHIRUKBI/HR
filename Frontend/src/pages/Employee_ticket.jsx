import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Employee_ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [ticketData, setTicketData] = useState({
    fullName: '',
    email: '',
    employeeId: ''
  });

  useEffect(() => {
    if (location.state) {
      setTicketData({
        fullName: location.state.fullName,
        email: location.state.email,
        employeeId: location.state.employeeId
      });
    }
  }, [location]);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!message.trim()) {
    toast.error('Message cannot be empty');
    return;
  }

  if (message.length > 50) {
    toast.error('Message cannot exceed 50 characters');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: ticketData.fullName,
        email: ticketData.email,
        employeeId: ticketData.employeeId,
        message: message,
        status: 'Pending'
      })
    });

    const result = await response.text();
    
    if (!response.ok) {
      throw new Error(result);
    }

    toast.success(result);
    navigate('/');
  } catch (error) {
    console.error('Error:', error);
    toast.error(error.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-purple-600 px-6 py-4">
          <h1 className="text-xl font-bold text-white">Submit Support Ticket</h1>
        </div>
        
        <div className="px-6 py-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Employee</p>
            <p className="text-gray-800 font-medium">{ticketData.fullName}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="text-gray-800 font-medium">{ticketData.employeeId}</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message (max 50 characters)
              </label>
              <textarea
                id="message"
                rows="3"
                maxLength="50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {message.length}/50 characters
              </p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}