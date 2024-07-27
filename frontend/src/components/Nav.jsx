import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      setShowLoginDropdown(false);
    }
    if (registerRef.current && !registerRef.current.contains(event.target)) {
      setShowRegisterDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false);
    setShowLoginDropdown(false);
    setShowRegisterDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("User");
    setAuthUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4 relative">
      <div className="text-xl font-bold cursor-pointer">
        <Link to="/" onClick={handleLinkClick}>
          RickShaw
        </Link>
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
        <Link to="/travel" className="hover:underline">
          Travel
        </Link>
        {authUser ? (
          <>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-500 hover:bg-red-600 rounded-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="relative">
              <button
                onClick={() => {
                  setShowLoginDropdown(!showLoginDropdown);
                  setShowRegisterDropdown(false);
                }}
                className="px-4 py-1 bg-green-500 hover:bg-green-600 rounded-sm"
              >
                Login
              </button>
              {showLoginDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-green-200 shadow-md z-10 text-black rounded-lg">
                  <Link to="/passenger-login" onClick={handleLinkClick}>
                    <button className="w-full text-left px-4 py-2 hover:bg-orange-400 rounded-t-lg">
                      Login as Passenger
                    </button>
                  </Link>
                  <Link to="/driver-login" onClick={handleLinkClick}>
                    <button className="block w-full text-left px-4 py-2 hover:bg-orange-400 rounded-b-lg">
                      Login as Driver
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div className="relative inline-block">
              <button
                onClick={() => {
                  setShowRegisterDropdown(!showRegisterDropdown);
                  setShowLoginDropdown(false);
                }}
                className="px-4 py-1 bg-blue-500 hover:bg-blue-600 font-medium rounded-sm"
              >
                Register
              </button>
              {showRegisterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-100 shadow-md z-10 text-black rounded-lg">
                  <Link to="/passenger-register" onClick={handleLinkClick}>
                    <button className="block w-full text-left px-4 py-2 hover:bg-orange-400 rounded-t-lg">
                      Register as Passenger
                    </button>
                  </Link>
                  <Link to="/driver-register" onClick={handleLinkClick}>
                    <button className="block w-full text-left px-4 py-2 hover:bg-orange-400 rounded-b-lg">
                      Register as Driver
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile view */}
      {isOpen && (
        <div className="absolute top-16 w-[90%] bg-green-100 text-black z-50 mx-auto p-4 rounded-lg mt-2">
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-orange-300 rounded-sm hover:shadow-xl"
            onClick={handleLinkClick}
          >
            About
          </Link>
          <Link
            to="/help"
            className="block px-4 py-2 hover:bg-orange-300 rounded-sm hover:shadow-xl"
            onClick={handleLinkClick}
          >
            Help
          </Link>
          <Link
            to="/travel"
            className="block px-4 py-2 hover:bg-orange-300 rounded-sm hover:shadow-xl"
            onClick={handleLinkClick}
          >
            Travel
          </Link>
          {authUser ? (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-orange-300 rounded-sm hover:shadow-xl"
                onClick={handleLinkClick}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 rounded-sm hover:shadow-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="relative" ref={loginRef}>
                <button
                  onClick={() => {
                    setShowLoginDropdown(!showLoginDropdown);
                    setShowRegisterDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 bg-green-100 hover:bg-orange-300 rounded-sm hover:shadow-xl"
                >
                  Login
                </button>
                {showLoginDropdown && (
                  <div className="right-0 mt-2 bg-white shadow-md z-10">
                    <Link to="/passenger-login" onClick={handleLinkClick}>
                      <button className="block w-full text-left px-4 py-2 hover:bg-orange-300 rounded-sm hover:shadow-xl">
                        Login as Passenger
                      </button>
                    </Link>
                    <Link to="/driver-login" onClick={handleLinkClick}>
                      <button className="block w-full text-left px-4 py-2 hover:bg-orange-300 rounded-sm hover:shadow-xl">
                        Login as Driver
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative " ref={registerRef}>
                <button
                  onClick={() => {
                    setShowRegisterDropdown(!showRegisterDropdown);
                    setShowLoginDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 bg-green-100 hover:bg-orange-300 rounded-sm hover:shadow-xl"
                >
                  Register
                </button>
                {showRegisterDropdown && (
                  <div className="flex flex-col right-0 mt-2  bg-white shadow-md z-10">
                    <Link to="/passenger-register" onClick={handleLinkClick}>
                      <button className="block w-full text-left px-4 py-2 hover:bg-orange-300 rounded-sm hover:shadow-xl">
                        Register as Passenger
                      </button>
                    </Link>
                    <Link to="/driver-register" onClick={handleLinkClick}>
                      <button className="block w-full text-left px-4 py-2 hover:bg-orange-300 rounded-sm hover:shadow-xl">
                        Register as Driver
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
