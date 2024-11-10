import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from '../service/EmployeeService'


const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.saveEmployee(employee)
    .then((response) => {
      console.log(response);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const reset = (e) => {
    e.preventDefault();
    setEmployee({
      id: "",
      name: "",
      phone: "",
      email: "",
    });
  };
  const navigate = useNavigate();
  

  return (
    <div className=" w-auto      bg-zinc-800  rounded shadow py-4 px-8">
      <div className="text-3xl tracking-wider fonr-bold text-center py-4 px-8">
        <p>Add New Employee</p>
      </div>
      <div className="mx-10 my-2">
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={(e) => handleChange(e)}
          className="w-full py-2 my-4 text-slate-800"
          placeholder="Name"
        ></input>
        <input
          type="number"
          name="phone"
          value={employee.phone}
          onChange={(e) => handleChange(e)}
          className="w-full py-2 my-4 text-slate-800"
          placeholder="Phone"
        ></input>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={(e) => handleChange(e)}
          className="w-full py-2 my-4 text-slate-800"
          placeholder="Email"
        ></input>
      </div>

      <div className="flex my-4 w-full justify-center">
        <button 
        onClick={saveEmployee}
        className="bg-green-600 hover:bg-green-900 py-2 px-6 rounded mx-2">
          Save
        </button>
        <button 
        onClick={reset} // function reference
        className="bg-blue-600 hover:bg-blue-900 py-2 px-6 rounded mx-2">
          Clear
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-900 py-2 px-6 rounded mx-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
