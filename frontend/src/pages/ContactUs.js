import React, { useState } from "react";
import ContactService from "../services/contact.service"; // Replace with the actual path

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    ContactService.createContact(formData)
      .then((response) => {
        console.log("Contact created:", response);
        setSubmitting(false);
        setSubmittedSuccessfully(true);
        // Clear form fields
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        // You can handle success messages or redirects
      })
      .catch((error) => {
        console.error("Error creating contact:", error);
        setSubmitting(false);
        // Handle the error (e.g., show an error message)
      });
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-green-500 min-h-screen flex justify-center items-center">
      <div className="w-50 shadow-md mx-auto p-6 rounded-lg  bg-opacity-70 backdrop-blur-100 mt-8 flex">
        <div className="w-50 p-6">
          <h3 className="text-2xl font-semibold text-center mb-4">Contact Us</h3>
          {submittedSuccessfully && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">Your message has been submitted successfully.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    fillRule="evenodd"
                    d="M14.293 5.293a1 1 0 010 1.414L11.414 10l2.879 2.879a1 1 0 01-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 111.414-1.414L10 8.586l2.879-2.879a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="relative mb-6">
              <input
                 type="text"
                 className="block w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent bg-opacity-70 backdrop-blur-lg"
                
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 relative">
              <input
                type="email"
                className="block w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent bg-opacity-70 backdrop-blur-lg"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {!isEmailValid(formData.email) && (
                <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p>
              )}
            </div>
            <div className="mb-3 relative">
              <textarea
                className="block w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent bg-opacity-70 backdrop-blur-lg"
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-auto mt-4  from-indigo-100 to-indigo-200 inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-mdtext-white hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-indigo active:bg-green-700 transition ease-in-out duration-150"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="w-50 p-4" style={{ marginTop: "50px" }}>
  <div className="flex">
    <img
      src="https://i.ibb.co/2t5sgyh/pngegg-3.png"
      alt=""
      className="w-30 h-30 mx-1"
    />
  </div>
</div>
      </div>
    </div>
  );
};

export default ContactUs;