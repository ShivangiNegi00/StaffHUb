import React from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect,useCallback } from "react";
import axios from "axios";
import AddTask from "./AddTask";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    taskName: "",
    dueDate: "",
    remarks: "",
    completed: false,
  });
  const[taskId,setTaskId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode,setIsEditMode] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
 
  var isLoggedIn = true;
 
  const fetchTasks = useCallback(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:8080/api/tasks/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const updatedTasks = response.data.map(task=> ({
          ...task,
          completed:Boolean(task.completed)
        }));
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  },[token]);


  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  const handleFilter = (status) => {
    setFilter(status);
    if (status === "all") {
      setFilteredTasks(tasks);
    } else if (status === "completed") {
      setFilteredTasks(tasks.filter((task) => task.completed));
    } else if (status === "pending") {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    }
  };

  const deleteTask = async (taskId) => {
     if(!window.confirm("Are you sure you want to delete this task?")) return;

     try {
        await axios.delete(`http://localhost:8080/api/tasks/delete/${taskId}`, {
            headers: { Authorization : `Bearer ${token}`}
        });
        fetchTasks();
     } catch(error) {
        console.log("Error deleting task:",error);
     }

  }   

  const editTask = (task) => {
    console.log(task.completed);
       setTaskId(task.id);
       setTaskData(task);
       setIsEditMode(true);
       setShowModal(true);
  }

 const completeTask = async (taskId) => {
  try {
    await axios.put(`http://localhost:8080/api/tasks/complete/${taskId}`, {},{
       headers: { Authorization : `Bearer ${localStorage.getItem("token")}`
    }
    });
    fetchTasks();
 } catch(error) {
    console.log("Error marking the task as complete :",error);
 }

 }


  const handleAdd = () => {
    setTaskData ( {
      taskName: "",
      dueDate: "",
      remarks: "",
    });
    setIsEditMode(false);
    setShowModal(true);
  };

 




  return (
    <div className="flex flex-col h-screen bg-[#d19971] justify-between">
    

      <div className="flex justify-around items-center bg-[#996c4b] p-6 shadow-md w-1/2 self-center mt-5">
        <button  onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Task
        </button>

        {/* filter panel */}
        <div>
          <p>
            Completed: <span className="font-bold">{tasks.filter(task => task.completed).length}</span>
          </p>
          <p>
            Pending: <span className="font-bold">{tasks.filter(task => !task.complted).length}</span>
          </p>
          <p className="text-red-500">
            Past Due Date: <span className="font-bold">

              {tasks.filter(task => {
                const dueDate = new Date(task.DueDate);
                const today = new Date();
                return !task.complted && dueDate < today;
              }).length}
            </span>
          </p>
        </div>
      </div>

      {/* form for add new task */}
      {showModal && (
         <AddTask 
           showModal = {showModal}
           setShowModal = {setShowModal}
           taskData = {taskData}
           setTaskData = {setTaskData}
            isEditMode = {isEditMode}

         />
        )}
      
      <div className="flex-grow overflow-y-auto bg-[#f5d7c2] p-6 mt-6">
        <div>
          <button
            className="text-black hover:bg-[#d4a745] bg-[#f5d7c2] border border-black p-2 rounded"
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className="text-black hover:bg-[#d4a745] bg-[#f5d7c2] border border-black p-2 rounded"
            onClick={() => handleFilter("completed")}
          >
            Completed
          </button>
          <button
            className="text-black hover:bg-[#d4a745] bg-[#f5d7c2] border border-black p-2 rounded"
            onClick={() => handleFilter("pending")}
          >
            Pending
          </button>
        </div>

        <table className="w-full border-collapse border border-black">
          <thead className="bg-[#483b32]">
            <tr>
              <th className="border border-black p-2">Task ID</th>
              <th className="border border-black p-2">Task</th>
              <th className="border border-black p-2">Due Date</th>
              <th className="border border-black p-2">Remarks</th>
              <th className="border border-black p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#604330]">
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td className="border border-black p-2">{task.id}</td>
                <td className= {` rounded ${task.completed? "border border-black p-2  line-through" : "border border-black p-2"}`}>{task.taskName}</td>
                <td className="border border-black p-2">{task.dueDate}</td>
                <td className="border border-black p-2">{task.remarks}</td>
                <td className="border border-black p-2 flex justify-around">
                  <button onClick = {()=> editTask(task)} className="text-blue-500">Edit</button>
                  <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
                  <button  onClick={() => completeTask(task.id)} className= {` rounded ${task.completed? "bg-gray-500 " : "bg-green-500 hover:bg-green-600"}`}>{task.completed ? "Undo" : "Complete" }</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <AddTask
            showModal={showModal}
            setShowModal={setShowModal}
            taskData={taskData}
            setTaskData={setTaskData}
            isEditMode={isEditMode}
            taskId = {taskId}
            fetchTasks={fetchTasks}
          />
        )}
      </div>
      
    </div>

  );
};

export default TaskDashboard;
