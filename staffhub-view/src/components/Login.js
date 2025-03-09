import React,{useState} from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
// import {TaskDashboard} from './TaskDashboard';
import MainDashboard from './TaskPage/MainDashboard';

const Login = () => {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const credentials = { email, password };
  
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token",data.token);
          localStorage.setItem("userId",data.userId);
          // console.log(data.token);
          // console.log(data.userId);
            // alert("Login successful!");
          navigate("/MainDashboard");
          // console.log(data); // Handle successful login (e.g., save token)

        } else {
          alert("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred while logging in.");
      }
    };
  
    return (
      <div className="flex flex-col justify-start h-screen  bg-[#d19971]">
            <Navbar className="w-full"/>
        <div className='flex justify-center items-center h-full'>
        <div className=" bg-white w-1/3 p-8 rounded-lg shadow-lg text-black text-xl">
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-semibold">Enter Credentials</h2>
            <div className="w-full">
              <label htmlFor="email" className="block mb-2">Email</label> 
              <input
                id="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                id="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
        </div>
      </div>
    );
}

export default Login
