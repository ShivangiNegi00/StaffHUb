import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = ({isLoggedIn, handleLogout}) => {

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/Login");
  };
  return (
    <header className="flex justify-around items-center bg-white px-6 py-4 shadow-md ">
    <h1 className="text-xl text-black font-bold ">Staff Hub</h1>
    <nav className="space-x-4 flex justify-between">
      <button className="bg-[#b97754] text-white px-4 py-2 rounded hover:bg-[#a56447] ">
        Home
      </button>
      <button className="bg-[#b97754] text-white px-4 py-2 rounded hover:bg-[#a56447] ">
        About
      </button>
      <div> 
     {isLoggedIn ? (
      <button onClick={handleLogout} className="bg-[#b97754] text-white px-4 py-2 rounded hover:bg-[#a56447] ">
        Logout
      </button>
     ) : 
      (<button
        onClick={handleLoginClick}
        className="bg-[#b97754] text-white px-4 py-2 rounded hover:bg-[#a56447] "
      >
        Login
      </button>
    )
}
      </div>
      
    </nav>
  </header>

  )
}

export default Navbar;