import React from "react";
import AuthService from "../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faIdCard, faPhone, faUsers } from "@fortawesome/free-solid-svg-icons";
import "../css/loading.css";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return (
      <div className="spinner-container">
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="h3">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </div>
            <div className="card-body">
              <p>
                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                <strong>ID:</strong> {currentUser.id}
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                <strong>Full Name:</strong> {currentUser.fullName}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <strong>Phone Number:</strong> {currentUser.phoneNo}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <strong>Phone Number:</strong> {currentUser.phoneNo}
              </p>
              <strong>
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                Authorities:
              </strong>
              <ul className="list-group list-group-flush">
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => (
                    <li key={index} className="list-group-item">
                      {role}
                    </li>
                  ))}
              </ul>
              
            </div>
          </div>
        </div>
        <div className="col-md-6">
  <div className="card">
    <div className="card-header bg-primary text-white">
      <h3 className="h3">User Images</h3>
    </div>
  </div>    
</div>

      </div>
    </div>
  );
};

export default Profile;
