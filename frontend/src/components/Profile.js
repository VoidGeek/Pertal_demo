import React from "react";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faIdCard, faPhone, faUsers } from "@fortawesome/free-solid-svg-icons";
import "../css/loading.css";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-green-200 flex justify-center items-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-opacity-70 backdrop-blur-100 shadow-md p-4 border rounded-md ">
            <div className="bg-gradient-to-br from-blue-400 to-blue-100 text-white p-4 text-center">
              <h3 className="text-2xl ">
                <FontAwesomeIcon icon={faUser} className="mr-2 " />
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </div>
            <div className="p-4">
              <p className="flex items-center">
                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                <strong>ID:</strong> {currentUser.id}
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                <strong>Full Name:</strong> {currentUser.fullName}
              </p>
              <p className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <strong>Phone Number:</strong> {currentUser.phoneNo}
              </p>
              <strong className="flex items-center">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Authorities:
              </strong>
              <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => (
                  <li key={index} className="mb-2">
                    {role === "ROLE_MODERATOR" || role === "ROLE_ADMIN" ? (
                      <span className="bg-gradient-to-br from-[#FF5733] to-[#FFC300] text-white p-0.5 rounded">
                        {role}
                      </span>
                    ) : (
                      role
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
