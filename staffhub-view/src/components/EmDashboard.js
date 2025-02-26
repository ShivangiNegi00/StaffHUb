import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function EmDashboard() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      
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
