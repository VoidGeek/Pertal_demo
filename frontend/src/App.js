// App.js

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import Contacts from "./components/Contacts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventBus from "./common/EventBus";
import ContactUs from "./pages/ContactUs";
import CreatePost from "./pages/Createpost";
import YourComponent from "./pages/imageUpload";
import Testimonial from "./pages/testimonial";
const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <Navbar showAdminBoard={showAdminBoard} currentUser={currentUser} logOut={logOut} />
      <div>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/admin" element={<BoardAdmin />} />
          <Route exact path="/admin/contacts" element={<Contacts />} />
          <Route exact path="/contactUs" element={<ContactUs />} />
          <Route exact path="/feeds" element={<CreatePost />} />
          <Route exact path="/upload" element={<YourComponent />} />
          <Route exact path="/testimonials" element={<Testimonial />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
