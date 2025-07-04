import React from 'react';
import { FaUsers, FaChartLine, FaLightbulb, FaHandshake, FaProjectDiagram, FaClipboardList } from 'react-icons/fa';

export default function Department_Home() {
  // Sample department data - replace with actual data from your API
  const department = {
    name: "Technology & Innovation",
    description: "Driving digital transformation and technological advancement across the organization.",
    mission: "To deliver cutting-edge solutions that empower our business and create competitive advantage through innovation.",
    manager: "Dr. Sarah Johnson",
    employeeCount: 87,
    projects: 24,
    established: "2015",
  };

  const keyFunctions = [
    "Software Development",
    "Cloud Infrastructure",
    "Data Analytics",
    "Cybersecurity",
    "AI & Machine Learning",
    "IT Support"
  ];

  const recentAchievements = [
    "Launched new customer portal (Q2 2023)",
    "Migrated 95% of systems to cloud (2022)",
    "Implemented enterprise-wide cybersecurity framework",
    "Reduced system downtime by 40% year-over-year",
    "Won 'Innovation in Technology' industry award"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Department Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{department.name} Department</h1>
          <p className="text-xl md:text-2xl max-w-3xl">{department.description}</p>
        </div>
      </div>

      {/* Department Overview */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Description */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Department Overview</h2>
              <div className="prose-lg text-gray-600 space-y-4">
                <p>
                  The {department.name} Department serves as the technological backbone of our organization, 
                  providing strategic direction and operational support for all digital initiatives. 
                  Our team of {department.employeeCount} professionals works collaboratively across 
                  {keyFunctions.length} key functional areas to deliver exceptional results.
                </p>
                <p>
                  Since our establishment in {department.established}, we've grown to become 
                  one of the most innovative and respected technology teams in our industry, 
                  currently managing {department.projects} active projects across the enterprise.
                </p>
                <p className="font-semibold">
                  "Our mission is {department.mission}"
                </p>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-blue-50 rounded-xl p-8 h-fit">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Department At a Glance</h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <FaUsers className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Team Members</h4>
                    <p className="text-gray-600">{department.employeeCount} professionals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaProjectDiagram className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Active Projects</h4>
                    <p className="text-gray-600">{department.projects} initiatives</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaHandshake className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Department Head</h4>
                    <p className="text-gray-600">{department.manager}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaLightbulb className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Established</h4>
                    <p className="text-gray-600">{department.established}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Functions */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Our Key Functions</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFunctions.map((func, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${index % 3 === 0 ? 'bg-blue-100 text-blue-600' : index % 3 === 1 ? 'bg-purple-100 text-purple-600' : 'bg-teal-100 text-teal-600'}`}>
                  <FaChartLine className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{func}</h3>
                <p className="text-gray-600">
                  {func === "Software Development" && "Designing and building custom applications to meet business needs"}
                  {func === "Cloud Infrastructure" && "Managing and optimizing our cloud computing environment"}
                  {func === "Data Analytics" && "Transforming data into actionable business insights"}
                  {func === "Cybersecurity" && "Protecting our systems and data from digital threats"}
                  {func === "AI & Machine Learning" && "Developing intelligent solutions to automate processes"}
                  {func === "IT Support" && "Providing technical assistance to employees across the organization"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Recent Achievements</h2>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="ml-3 text-lg text-gray-600">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaborating" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Department Resources */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Department Resources</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="/department-docs" className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 block text-center">
              <div className="text-blue-600 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Documentation</h3>
              <p className="text-gray-600">Access department policies, procedures, and guidelines</p>
            </a>

            <a href="/team-directory" className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 block text-center">
              <div className="text-blue-600 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Team Directory</h3>
              <p className="text-gray-600">Find contact information for department members</p>
            </a>

            <a href="/project-portal" className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 block text-center">
              <div className="text-blue-600 mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Project Portal</h3>
              <p className="text-gray-600">View current initiatives and status updates</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}