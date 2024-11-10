import "./App.css";
import AddEmployee from "./components/AddEmployee";
import EmployeeTable from "./components/EmployeeTable";
import Navbar from "./components/Navbar";
import{BrowserRouter,Routes,Route} from "react-router-dom";
import UpdateEmployee from "./components/UpdateEmployee";


function App() {
  return (
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
  );
}

export default App;
