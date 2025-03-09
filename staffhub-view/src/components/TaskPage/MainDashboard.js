
import React, { useState } from 'react';
import Sidebar from './Sidebar';
// import UserProfile from './UserProfile'; // Example of another component
// import Reports from './Reports'; // Example of another component
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar';
import TaskDashboard from './TaskDashboard';
import EmDashboard from '../EmDashboard';

const MainDashboard = () => {
     const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState('tasks');
    var isLoggedIn = true;
    // Function to render the appropriate component based on selection
    const renderComponent = () => {
      switch (activeComponent) {
        case 'TaskDashboard':
          return <TaskDashboard />;
        // case 'profile':
        //   return <UserProfile />;
        case 'EmDashboard':
          return <EmDashboard />;
        default:
          return <TaskDashboard />;
      }
    };
    
  const handleLogout = () => {
    localStorage.removeItem("token");
    isLoggedIn = false;
    navigate("/");
  };
  return (
    <div className="flex flex-col h-screen bg-[#d19971] justify-between">
    <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

   <div className="container-fluid">
      <div className="row">
        {/* Sidebar (fixed) */}
        <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <Sidebar onNavigate={setActiveComponent} activeItem={activeComponent} />
        </div>
        
        {/* Main content (changes based on navigation) */}
        <div className="col-md-9 col-lg-10 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">{activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}</h1>
          </div>
          {renderComponent()}
        </div>
      </div>
    </div>
  </div>
  )
}

export default MainDashboard
