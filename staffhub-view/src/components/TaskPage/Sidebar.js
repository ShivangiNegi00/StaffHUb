import React from 'react';
import { Nav } from 'react-bootstrap';


const Sidebar = ({ onNavigate, activeItem }) => {
 <div className="space-y-2">
    <button
      onClick={() => onNavigate('TaskDashboard')}
      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
        activeItem === 'TaskDashboard'
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      Task Dashboard
    </button>
    <button
      onClick={() => onNavigate('EmDashboard')}
      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
        activeItem === 'EmDashboard'
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      Employee Dashboard
    </button>
  </div>
};

export default Sidebar;