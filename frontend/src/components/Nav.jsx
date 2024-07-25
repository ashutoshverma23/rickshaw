import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4 relative">
      <div className="text-xl font-bold cursor-pointer">
        <Link to="/">RickShaw</Link>
      </div>
      <div className="md:hidden">
        <button
          onClick={toggleNavbar}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/help" className="hover:underline">
          Help
        </Link>
        <Link to="/passenger-login">
          <button className="bg-gray-800 px-4 py-2 rounded">
            Login as Passenger
          </button>
        </Link>
        <Link to="/driver-login">
          <button className="bg-green-600 px-4 py-2 rounded">
            Login as Driver
          </button>
        </Link>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-black z-50">
          <Link to="/about" className="block px-4 py-2 hover:bg-gray-400">
            About
          </Link>
          <Link to="/help" className="block px-4 py-2 hover:bg-gray-400">
            Help
          </Link>
          <Link to="/passenger-login">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-400">
              Login as Passenger
            </button>
          </Link>
          <Link to="/driver-login">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-400">
              Login as Driver
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
