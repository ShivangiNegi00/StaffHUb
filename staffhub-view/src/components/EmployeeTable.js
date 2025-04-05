import React,{useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom'
import EmployeeService from "../service/EmployeeService";

const EmployeeTable = () => {
   
  const[loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  useEffect(() =>{//load data automatically 
    const fetchData = async () => {
      setLoading(true);
      try{
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      }
      catch(error){
        console.log(error);
      }
        setLoading(false)

    };
     fetchData();
  }, []);
    const navigate = useNavigate();

    const deleteEmployee = (e,id) => {
      e.preventDefault();
      EmployeeService.deleteEmployeeById (id)
      .then(() => {
        if(employees){
          setEmployees((prevElement) => {
            return prevElement.filter((employee) => employee.id !== id);
          })
        }
        
      })
      
    }

    const editEmployee = (e,id) =>{
      e.preventDefault();
      navigate(`/editEmployee/${id}`)
    }
  return (
    <div className="conatiner w-full h-full flex  flex-col flex-wrap justify-start content-center">
      <div className="mx-5 my-2 ">
        <button onClick={()=> navigate("/addEmployee")}
        className="bg-amber-800 hover:bg-amber-950 px-2 py-2 semibold rounded ">
          Add Employee{" "}
        </button>
        </div>
        <div className="">
          <table className="shadow bg-neutral-400">
            <thead className="bg-zinc-700">
              <tr>
              <th className="px-6 py-3 uppercase tracking-wide"> Name  </th>
              <th className="px-6 py-3 uppercase tracking-wide"> Phone </th>
              <th className="px-6 py-3 uppercase tracking-wide"> Email</th>
              <th className="px-6 py-3 uppercase tracking-wide"> Action</th>
              </tr>
            </thead>

            {!loading && <tbody className="opacity-80">
              {employees.map((employee) => (
                 <tr key ={employee.id} className="bg- text-black hover:bg-stone-800 hover:text-white" >
                <td className="text-left px-6 py-4 whitespace-nonwrap">
                  {" "}
                  {employee.name}
                </td>
                <td className="text-left px-6 py-4 whitespace-nonwrap">
                  {" "}
                  {employee.phone}
                </td>
                <td className="text-left px-6 py-4 whitespace-nonwrap">
                  {" "}
                  {employee.email}
                </td>
                <td>
                <a href="#"
                onClick={(e,id) => editEmployee(e,employee.id)}
                className="text-blue-700 hover:text-teal-400 hover:cursor-pointer"> Edit 📝</a>
                <a href="#"
                onClick={(e,id) => deleteEmployee(e,employee.id)}
                className="text-blue-700 hover:text-amber-600 hover:cursor-pointer"> Delete 🗑️</a>
                </td>
               

              </tr>
            ))}
             
            </tbody>}
           
          </table>
        </div>
      
    </div>
  );
};

export default EmployeeTable;
