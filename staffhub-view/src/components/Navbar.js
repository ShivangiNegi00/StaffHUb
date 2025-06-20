import React from 'react';
import { Users, Home, Info, LogOut, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate("/Login");
    console.log("Navigate to login");
  };

  const handleHomeClick = () => {
    navigate("/");
    console.log("Navigate to home");
  };

  const handleAboutClick = () => {
    navigate("/about");
    console.log("Navigate to about");
  };

  return (
    <header className="relative z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Staff Hub
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            {/* Home Button */}
            <button 
              onClick={handleHomeClick}
              className="group flex items-center px-4 py-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden sm:inline">Home</span>
            </button>

            {/* About Button */}
            <button 
              onClick={handleAboutClick}
              className="group flex items-center px-4 py-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <Info className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden sm:inline">About</span>
            </button>

            {/* Login/Logout Button */}
            <div className="ml-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="group flex items-center px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="group flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  <LogIn className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;