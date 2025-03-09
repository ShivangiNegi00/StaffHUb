import React from 'react'
import axios from 'axios'
import { useState } from 'react'


const AddTask = ({
    showModal,
    setShowModal,
    taskData,
    setTaskData,
    isEditMode,
    taskId,
    fetchTasks,

}) => {
  
  const handleChange = (e) => {
    const {name,value} = e.target;
    setTaskData((prevdata) => ({
      ...prevdata,
      [name] : value,

    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditMode ? `http://localhost:8080/api/tasks/update/${taskId}` : "http://localhost:8080/api/tasks/add";
    const method = isEditMode ? "put" : "post";
    axios
    ( {
      method: method,
      url : url,
      data : taskData,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        // alert("Task added Successfully");
        setShowModal(false);

        setTaskData({
          taskName: "",
          dueDate: "",
          remarks: "",
        });
        fetchTasks();

      })
      .catch((error) => {
        console.error("error adding task:", error);
      });
  };


  return (
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
           <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded"> 
           { isEditMode ? "Update" : "Add"}
           </button>
           </div> 
      </form>
    </div>
  </div>
  )
}

export default AddTask
