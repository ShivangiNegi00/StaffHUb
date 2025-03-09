import React from 'react';
import { Nav } from 'react-bootstrap';


const Sidebar = ({ onNavigate, activeItem }) => {
  return (
    <Nav className="flex-column">
      <Nav.Link 
        className={activeItem === 'TaskDashboard' ? 'active' : ''} 
        onClick={() => onNavigate('TaskDashboard')}
      >
        Tasks
      </Nav.Link>
      {/* <Nav.Link 
        className={activeItem === 'profile' ? 'active' : ''} 
        onClick={() => onNavigate('profile')}
      >
        Profile
      </Nav.Link> */}
      <Nav.Link 
        className={activeItem === 'EmDashboard' ? 'active' : ''} 
        onClick={() => onNavigate('Emdashboard ')}
      >
        Check Employee
      </Nav.Link>
    </Nav>
  );
};

export default Sidebar;