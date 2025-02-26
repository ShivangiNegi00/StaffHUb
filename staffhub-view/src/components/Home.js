import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
 
  return (
    <div className="h-screen bg-white">
    <Navbar />

      <main className="flex justify-center bg-[#d19971] border-2 border-black m-4 rounded-lg w-3/4 absolute left-52 h-5/6">
        <div className="flex flex-col justify-around items-center h-full space-y-8">
          <h2 className="text-4xl font-extrabold m-5">
            {" "}
            Be Part Of Staff Hub And{" "}
          </h2>
          <div className="flex flex-row text-center justify-around w-full h-min">
            <div className="bg-[#805840] text-white rounded-full shadow-lg w-36 h-36 flex items-center justify-center">
              Digitize and Simplify Employee Management{" "}
            </div>
            <p className="text-white text-center  text-xl font-medium flex  items-center justify-center">
              Update, track, and maintain employee records in a centralized
              system designed for speed, accuracy, and convenience.{" "}
            </p>
          </div>

          <div className=" flex flex-row  text-center justify-center w-full h-min">
            <p className="text-white text-center  text-xl font-medium flex  items-center justify-center ">
              Perform CRUD operations with ease and access critical data
              instantly, anytime, anywhere.{" "}
            </p>
            <div className="bg-[#805840] text-white  rounded-full shadow-lg w-36 h-36 flex items-center justify-center">
              Streamline Your Workforce Data
            </div>
          </div>

          <div className="flex flex-row items-center text-center justify-around w-full h-min">
            <div className="bg-[#805840] text-white  rounded-full shadow-lg w-36 h-36 flex items-center justify-center">
              Empower Your Team with Role-Based Access{" "}
            </div>
            <p className="text-white text-center  text-xl font-medium flex  flex-wrap items-center justify-center">
              Assign roles and permissions to ensure secure access to sensitive
              data and control who can view, edit, or manage employee
              information.{" "}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
