import React, { useState } from 'react';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { MdOutlineEmail, MdLocationOn, MdLocalPhone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">
                HR Management System
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Streamlining your HR processes for better workforce management.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <MdOutlineEmail className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">hr@company.com</span>
              </div>
              <div className="flex items-start">
                <MdLocalPhone className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MdLocationOn className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">123 Business Ave, City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/employees" className="text-gray-400 hover:text-blue-300 transition text-sm">
                  Employee Directory
                </a>
              </li>
              <li>
                <a href="/departments" className="text-gray-400 hover:text-blue-300 transition text-sm">
                  Departments
                </a>
              </li>
              <li>
                <a href="/time-off" className="text-gray-400 hover:text-blue-300 transition text-sm">
                  Time Off Requests
                </a>
              </li>
              <li>
                <a href="/reports" className="text-gray-400 hover:text-blue-300 transition text-sm">
                  HR Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Admin */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-500 text-white flex items-center justify-center transition-all">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-500 text-white flex items-center justify-center transition-all">
                  <FaTwitter className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} HR Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}