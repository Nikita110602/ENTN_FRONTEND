import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: "entnt@gmail.com",
    password: "12345678",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    navigate("/admin-dashboard");
  };
  const handleUserLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-500">Secure Access for Administrators</p>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </div>
        
        <div className="text-center">
          <button 
            onClick={handleUserLogin}
            className="text-blue-600 hover:underline"
          >
            Switch to User Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
