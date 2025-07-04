import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Ticket_Create() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state) {
      setFormData({
        fullName: location.state.fullName || '',
        employeeId: location.state.employeeId || '',
        email: location.state.email || '',
        message: ''
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 50) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8080/api/tickets', formData);
      toast.success('Ticket submitted successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit ticket');
      console.error('Error submitting ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Support Ticket</h1>
          <p className="mt-2 text-gray-600">Submit your issue or request</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Create New Ticket</h2>
          </div>

          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Read-only Info Cards */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <p className="text-sm font-medium text-gray-800">
                        {formData.fullName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Employee ID
                      </label>
                      <p className="text-sm font-medium text-gray-800">
                        {formData.employeeId}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Email
                      </label>
                      <p className="text-sm font-medium text-gray-800">
                        {formData.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                    <span className="ml-2 text-xs text-gray-500 font-normal">
                      ({50 - formData.message.length} characters remaining)
                    </span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      placeholder="Briefly describe your issue (max 50 characters)"
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={50}
                      required
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                      {formData.message.length}/50
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.message}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Ticket'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Our support team will respond to your ticket within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}