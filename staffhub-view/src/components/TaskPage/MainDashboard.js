
import React, { useState } from 'react';
import Sidebar from './Sidebar';
// import UserProfile from './UserProfile'; // Example of another component
// import Reports from './Reports'; // Example of another component
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar';
import TaskDashboard from './TaskDashboard';
import EmDashboard from '../EmDashboard';
import { Menu, X, ChevronRight } from 'lucide-react';


const MainDashboard = () => {
     const [activeComponent, setActiveComponent] = useState('TaskDashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  var isLoggedIn = true;

  // Function to render the appropriate component based on selection
  const renderComponent = () => {
    switch (activeComponent) {
      case 'TaskDashboard':
        return <TaskDashboard />;
      case 'EmDashboard':
        return <EmDashboard />;
      default:
        return <TaskDashboard />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    isLoggedIn = false;
    // navigate("/"); // You'll need to add your navigate logic here
    console.log("Logout clicked");
  };

  const getPageTitle = () => {
    switch (activeComponent) {
      case 'TaskDashboard':
        return 'Task Dashboard';
      case 'EmDashboard':
        return 'Employee Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse delay-2000"></div>
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-20 w-64 bg-black/20 backdrop-blur-sm border-r border-white/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-lg font-semibold text-white">Navigation</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <Sidebar onNavigate={setActiveComponent} activeItem={activeComponent} />
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 p-6 lg:ml-0">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center text-white/60 text-sm">
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-white">{getPageTitle()}</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{getPageTitle()}</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>

          {/* Dynamic Content */}
          <div className="space-y-6">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard
