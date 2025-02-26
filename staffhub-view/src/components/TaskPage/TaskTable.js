import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TaskTable = () => {
      const [tasks, setTasks] = useState([]);
      const [filter, setFilter] = useState("all");
      const [filteredTasks, setFilteredTasks] = useState([]);
      const [taskData, setTaskData] = useState({
        taskName: "",
        dueDate: "",
        remarks: "",
      });
      const token = localStorage.getItem("token");
   

      useEffect(() => {
        fetchTasks();
      }, []);

      const fetchTasks = () => {
        const userId = localStorage.getItem("userId");
        axios
          .get(`http://localhost:8080/api/tasks/user/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then((response) => {
            setTasks(response.data);
            setFilteredTasks(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      }


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


      return (
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
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border border-black p-2">{task.id}</td>
                <td className="border border-black p-2">{task.taskName}</td>
                <td className="border border-black p-2">{task.dueDate}</td>
                <td className="border border-black p-2">{task.remarks}</td>
                <td className="border border-black p-2 flex justify-around">
                  <button className="text-blue-500">Edit</button>
                  <button onClick={() => deleteTask(task.id)} className="text-red-500">Delete</button>
                  <button className="text-green-500">Completed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      );
};

export default TaskTable;