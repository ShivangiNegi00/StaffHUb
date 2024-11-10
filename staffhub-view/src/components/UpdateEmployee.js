import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from '../service/EmployeeService'


const UpdateEmployee = () => {

    const {id} = useParams();
  const [employee, setEmployee] = useState({
    id: id,
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(employee,id)
    .then((response) => {
      console.log(response);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() =>{//load data automatically 
    const fetchData = async () => {
      try{
        const response = await EmployeeService.getEmployeeById(employee.id);
        setEmployee(response.data);
      }
      catch(error){
        console.log(error);
      }

    };
     fetchData();
  }, []);

  const navigate = useNavigate();
  

  return (
    <div className=" w-auto      bg-zinc-800  rounded shadow py-4 px-8">
      <div className="text-3xl tracking-wider fonr-bold text-center py-4 px-8">
        <p>Update New Employee</p>
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
        onClick={updateEmployee}
        className="bg-green-600 hover:bg-green-900 py-2 px-6 rounded mx-2">
          Update
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

export default UpdateEmployee;
