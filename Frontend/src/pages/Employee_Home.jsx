import React from 'react';
import { FaHandsHelping, FaMedal, FaChartLine, FaUsers, FaHeart, FaGraduationCap, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

export default function Employee_Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Our Organization</h1>
          <p className="text-xl md:text-2xl mb-8">Together, we build excellence and drive innovation</p>
        </div>
      </div>

      {/* About Organization Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Organization</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We are a leading organization committed to excellence, innovation, and creating value for our customers and employees. 
              Founded in 2010, we've grown to become an industry leader with over 1,000 talented professionals across 5 countries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-blue-600 mb-4">
                <FaMedal className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Our Mission</h3>
              <p className="text-gray-600">
                To empower businesses through innovative solutions while creating meaningful opportunities for our team members.
              </p>
            </div>

            {/* Values */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-blue-600 mb-4">
                <FaHandsHelping className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Our Values</h3>
              <ul className="text-gray-600 list-disc pl-5">
                <li>Integrity</li>
                <li>Collaboration</li>
                <li>Innovation</li>
                <li>Excellence</li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-blue-600 mb-4">
                <FaChartLine className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Our Vision</h3>
              <p className="text-gray-600">
                To be the global leader in our industry while maintaining our commitment to employee growth and satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Benefits Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Employee Benefits</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We believe in taking care of our team members. Here are some of the benefits you enjoy as part of our organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Health Benefits */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <FaHeart className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Health & Wellness</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Comprehensive medical insurance</li>
                <li>Dental and vision coverage</li>
                <li>Mental health support</li>
                <li>Wellness programs</li>
              </ul>
            </div>

            {/* Learning & Development */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <FaGraduationCap className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Learning & Growth</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Tuition reimbursement</li>
                <li>Professional development budget</li>
                <li>Mentorship programs</li>
                <li>Internal mobility</li>
              </ul>
            </div>

            {/* Work-Life Balance */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <FaCalendarAlt className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Work-Life Balance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Flexible work arrangements</li>
                <li>Generous PTO policy</li>
                <li>Paid parental leave</li>
                <li>Remote work options</li>
              </ul>
            </div>

            {/* Financial Benefits */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="text-blue-600 mb-4">
                <FaDollarSign className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Financial Security</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Competitive compensation</li>
                <li>Retirement savings plans</li>
                <li>Performance bonuses</li>
                <li>Stock options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Culture & Community Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Culture & Community</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">A Supportive Work Environment</h3>
              <p className="text-gray-600 mb-4">
                We foster an inclusive culture where every team member is valued and respected. Our collaborative environment encourages creativity and innovation while maintaining a healthy work-life balance.
              </p>
              <p className="text-gray-600 mb-4">
                Regular team-building activities, employee resource groups, and open communication channels ensure that everyone has a voice in our organization.
              </p>
              <div className="flex items-center mt-6">
                <FaUsers className="text-blue-600 text-2xl mr-3" />
                <span className="text-gray-700 font-medium">Join our community of 1,000+ professionals</span>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team working together" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quick Links</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/employee-handbook" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 block text-center">
              <div className="text-blue-600 mb-3 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800">Employee Handbook</h3>
            </a>

            <a href="/time-off" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 block text-center">
              <div className="text-blue-600 mb-3 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800">Time Off Requests</h3>
            </a>

            <a href="/training" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 block text-center">
              <div className="text-blue-600 mb-3 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800">Training Resources</h3>
            </a>

            <a href="/benefits" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 block text-center">
              <div className="text-blue-600 mb-3 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800">Benefits Portal</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}