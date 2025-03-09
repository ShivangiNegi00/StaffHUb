import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import EmployeeTable from './EmployeeTable';
import UpdateEmployee from './UpdateEmployee';

const EmDashboard = () => {
  var isLoggedIn = true;
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    isLoggedIn = false;
    navigate("/");
  };
  
  return (
    <div>
      <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      
      <div className="background relative ">
        <Routes>

          <Route index element= { <EmployeeTable/>}/>
          <Route path="/" element={<EmployeeTable/>}/>
           <Route path="/addEmployee" element={<AddEmployee/>}/>
           <Route path="/editEmployee/:id" element={<UpdateEmployee/>}/>

        </Routes>
       
      </div>
    </BrowserRouter>
    </div>
  )
}

export default EmDashboard
