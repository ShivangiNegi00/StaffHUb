import React,{useState} from 'react';
import axios from "axios" ;
import {useNavigate} from "react-router-dom";

const SignupForm = () => {
    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        role: "EMPLOYEE",
        password:"",
    });


    const [error,setError] = useState("");
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
      try 
      {const response = await axios.post("http//localhost:8080/auth/signup",formData);
      alert("Signup successful , login credentials sent to the employee email");
      // TODO : send email to the employee with login credentials
    } catch (err) {
      console.error("Signup Eror:" , err.response?.data || err.message);
      
    }
    
    };
    
  return (
    
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Sign Up</h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-600">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    
  )
}

export default SignupForm
