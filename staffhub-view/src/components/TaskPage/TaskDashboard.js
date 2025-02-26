import React from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskTable from "./TaskTable";

const TaskDashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState({
    taskName: "",
    dueDate: "",
    remarks: "",
  });
 
  var isLoggedIn = true;

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/tasks/add", taskData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        alert("Task added Successfully");
        setShowModal(false);
        setTaskData({
          taskName: "",
          dueDate: "",
          remarks: "",
        });
      })
      .catch((error) => {
        console.error("error adding task:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    isLoggedIn = false;
    navigate("/");
  };

  const handleChange = (e) => {
    const {name,value} = e.target;
    setTaskData((prevdata) => ({
      ...prevdata,
      [name] : value,

    }));
  };

  return (
    <div className="flex flex-col h-screen bg-[#d19971] justify-between">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <div className="flex justify-around items-center bg-[#996c4b] p-6 shadow-md w-1/2 self-center mt-5">
        <button  onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Task
        </button>

        {/* filter panel */}
        <div>
          <p>
            Completed: <span className="font-bold">10</span>
          </p>
          <p>
            Pending: <span className="font-bold">5</span>
          </p>
          <p className="text-red-500">
            Past Due Date: <span className="font-bold">2</span>
          </p>
        </div>
      </div>

      {/* form for add new task */}
      {showModal && (
          <div className=" fixed h-1/2 w-1/2 top-52 left-1/4 flex  items-center justify-center bg-opacity-50 z-50 bg-[#d19971]">
            <div className="flex h-full w-full flex-col justiy-between">
              <h2>Add New Task</h2>
              <form onSubmit={handleSubmit} className="flex flex-col justify-between items-center h-2/3 text-black">
                <input
                  type="text"
                  placeholder="Task Name"
                  name="taskName"
                  value={taskData.taskName}
                  className="border rounded w-1/2"
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  name="dueDate"
                  value={taskData.dueDate}
                  className="border rounded w-1/2"
                  onChange ={handleChange}
                  
                  required/> 
                <textarea 
                 name ="remarks"
                 placeholder="Remarks"
                 value={taskData.remarks}
                 className="border rounded w-1/2"
                 onChange = {handleChange}
                 /> 
                 <div className="flex justify-between">
                   <button type="button" onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded"> Cancel </button>
                   <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded"> Submit</button>
                   </div> 
              </form>
            </div>
          </div>
        )}
      
      <TaskTable/>
      
    </div>

  );
};

export default TaskDashboard;
