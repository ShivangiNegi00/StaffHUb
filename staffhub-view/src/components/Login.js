import React,{useState} from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
// import {TaskDashboard} from './TaskDashboard';
import MainDashboard from './TaskPage/MainDashboard';
import { Users, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const credentials = { email, password };
      setIsLoading(true);
  
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
  
        if (response.ok) {
          setIsLoading(false);
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
  
    const handleForgotPassword = () => {
      console.log("Forgot password clicked");
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Staff Hub
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2 text-white/80 hover:text-white transition-colors duration-300">
            Back to Home
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-white/70">Sign in to your Staff Hub account</p>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white/90">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white/90">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="password"
                    // type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-white/50 hover:text-white/70 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div> */}
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-300"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="group w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <span className="mr-2">Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              Don't have an account?{' '}
              <button className="text-purple-300 hover:text-purple-200 transition-colors duration-300 font-medium">
                Contact Administrator
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-6 border-t border-white/10">
        <p className="text-white/40 text-sm">
          Built with passion • Staff Hub © 2025
        </p>
      </div>
    </div>
    );
}

export default Login
