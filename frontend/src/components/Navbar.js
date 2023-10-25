import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ showAdminBoard, currentUser, logOut }) => {
  return (
    <nav className="bg-opacity-75 backdrop-blur-md py-3 fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center"> {/* This div holds the logo */}
          <a href="/" className="text-2xl font-bold text-black flex items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Emblem_of_the_Ku_Klux_Klan.svg/2048px-Emblem_of_the_Ku_Klux_Klan.svg.png" alt="Logo" className="h-10 w-10" />
          </a>
        </div>
        <div className="flex space-x-4"> {/* This div holds the links */}
          <Link to={"/home"} className="text-lg hover:text-blue-300 text-black">
            Home
          </Link>
          {showAdminBoard && (
            <Link to={"/admin"} className="text-lg hover:text-blue-300 text-black">
              Admin Board
            </Link>
          )}
          {currentUser ? (
            <>
              <Link to={"/profile"} className="text-lg hover:text-blue-300 text-black">
                {currentUser.username}
              </Link>
              <a
                href="/login"
                className="text-lg hover:text-blue-300 cursor-pointer text-black"
                onClick={logOut}
              >
                Log Out
              </a>
            </>
          ) : (
            <>
              <Link to={"/login"} className="text-lg hover:text-blue-300 text-black">
                Login
              </Link>
              <Link to={"/register"} className="text-lg hover:text-blue-300 text-black">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
