import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ showAdminBoard, showModeratorBoard, currentUser, logOut }) => {
  return (
    <nav className="bg-opacity-75 backdrop-blur-lg py-3 fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-black flex items-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Emblem_of_the_Ku_Klux_Klan.svg/2048px-Emblem_of_the_Ku_Klux_Klan.svg.png" alt="Logo" className="h-10 w-10" />
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to={"/home"} className="text-lg hover:text-blue-300 text-black">
            Home
          </Link>
          <Link to={"/home/services"} className="text-lg hover:text-blue-300 text-black">
            Services
          </Link>
          <Link to={"/home/feeds"} className="text-lg hover:text-blue-300 text-black">
            Feeds
          </Link>
          {showAdminBoard && (
            <Link to={"/admin"} className="text-lg hover:text-blue-300 text-black">
              Admin Board
            </Link>
          )}
          {showModeratorBoard && (
            <Link to={"/moderator"} className="text-lg hover:text-blue-300 text-black">
              Moderator Board
            </Link>
          )}
          {currentUser ? (
            <>
              <Link to={"/profile"} className="text-lg hover:text-blue-300 text-black">
                {currentUser.username}
              </Link>
              <a
                href="/login"
                className="text-md hover:text-blue-300 cursor-pointer text-white bg-gradient-to-r from-blue-200 to-blue-400 px-4 py-2 rounded-md"
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
