import React, { useState, useEffect } from "react";
import TestimonialService from "../services/testimonial.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";

const Testimonial = () => {
  const [formData, setFormData] = useState({
    testimonial_text: "",
    user_name: "",
    rating: 5,
    occupation: "",
    company: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [userTestimonials, setUserTestimonials] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedTestimonial, setUpdatedTestimonial] = useState({
    testimonial_text: "",
    user_name: "",
    rating: 5,
    occupation: "",
    company: "",
    image: [],
    _id: "", // To track which testimonial is being updated
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTestimonial({
      ...updatedTestimonial,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    TestimonialService.createTestimonial(formData)
      .then((testimonialResponse) => {
        console.log("Testimonial created:", testimonialResponse);
        setSubmitting(false);
        setSubmittedSuccessfully(true);
        // Clear form fields
        setFormData({
          testimonial_text: "",
          user_name: "",
          rating: 5,
          occupation: "",
          company: "",
          imgae: []
        });
        // Refresh the list of user testimonials
        fetchUserTestimonials();
      })
      .catch((error) => {
        console.error("Error creating testimonial:", error);
        setSubmitting(false);
        // Handle the error (e.g., show an error message)
      });
  };

  const handleUpdate = (testimonial) => {
    // Open the update modal with the selected testimonial
    setUpdatedTestimonial({ ...testimonial });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    TestimonialService.updateTestimonial(updatedTestimonial._id, updatedTestimonial)
      .then((testimonialResponse) => {
        console.log("Testimonial updated:", testimonialResponse);
        setSubmitting(false);
        setIsUpdateModalOpen(false);
        // Refresh the list of user testimonials
        fetchUserTestimonials();
      })
      .catch((error) => {
        console.error("Error updating testimonial:", error);
        setSubmitting(false);
        // Handle the error (e.g., show an error message)
      });
  };

  const handleDelete = (testimonialId) => {
    setSubmitting(true);

    TestimonialService.deleteTestimonial(testimonialId)
      .then((response) => {
        console.log("Testimonial deleted:", response);
        setSubmitting(false);
        // Refresh the list of user testimonials
        fetchUserTestimonials();
      })
      .catch((error) => {
        console.error("Error deleting testimonial:", error);
        setSubmitting(false);
        // Handle the error (e.g., show an error message)
      });
  };

  const fetchUserTestimonials = () => {
    // Fetch all testimonials for the current user
    TestimonialService.getAllTestimonials()
      .then((response) => {
        setUserTestimonials(response);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  };

  useEffect(() => {
    fetchUserTestimonials();
  }, []);

  const handleChangeImage = (e) => {


    // {
    //   id
    // }
    // setFormData({...formData, image: [{image: id}]})
  }

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold text-center mb-4">Add Testimonial</h3>
          {submittedSuccessfully && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">Your testimonial has been submitted successfully.</span>
              <span className="absolute top-0 right-0 px-4 py-3">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="mb-4">
            {/* Testimonial creation form */}
            <div className="mb-3 relative">
              <textarea
                className="mt-1 block w-full h-20 border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                id="testimonial_text"
                name="testimonial_text"
                placeholder="Your testimonial text"
                value={formData.testimonial_text}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 relative">
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                id="user_name"
                name="user_name"
                placeholder="Your user_name"
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 relative">
              <select
                className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>
            <div className="mb-3 relative">
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                id="occupation"
                name="occupation"
                placeholder="Your occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 relative">
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                id="company"
                name="company"
                placeholder="Your company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 relative">
              <input
                type="file"
                className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                id="company"
                name="company"
                placeholder="Your company"
                value={formData.company}
                onChange={handleChangeImage}
              />
            </div>
            <button
              type="submit"
              className="w-auto mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover-bg-indigo-500 focus-outline-none focus-border-indigo-700 focus-shadow-outline-indigo active-bg-indigo-700 transition ease-in-out duration-150"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      {userTestimonials.length > 0 && (
        <div className="my-8 max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-4">Your Testimonials</h3>
          {userTestimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold mb-2">{testimonial.user_name}</p>
              <p className="text-gray-600 mb-2">
                {testimonial.occupation} at {testimonial.company}
              </p>
              <div className="text-yellow-500">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>
              <p className="mt-2">{testimonial.testimonial_text}</p>
              <div className="mt-4 space-x-4">
                <button
                  className="px-4 py-2 border border-red-500 text-red-500 rounded hover-bg-red-500 hover-text-white focus-outline-none focus-border-red-700 focus-shadow-outline-red active-bg-red-700"
                  onClick={() => handleDelete(testimonial._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded hover-bg-indigo-500 hover-text-white focus-outline-none focus-border-indigo-700 focus-shadow-outline-indigo active-bg-indigo-700"
                  onClick={() => handleUpdate(testimonial)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-4">Update Testimonial</h3>
            <form onSubmit={handleUpdateSubmit}>
              {/* Testimonial update form */}
              <div className="mb-3 relative">
                <textarea
                  className="mt-1 block w-full h-20 border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                  id="updated_testimonial_text"
                  name="testimonial_text"
                  placeholder="Your updated testimonial text"
                  value={updatedTestimonial.testimonial_text}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="mb-3 relative">
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                  id="updated_user_name"
                  name="user_name"
                  placeholder="Your updated user_name"
                  value={updatedTestimonial.user_name}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="mb-3 relative">
                <select
                  className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2"
                  id="updated_rating"
                  name="rating"
                  value={updatedTestimonial.rating}
                  onChange={handleUpdateChange}
                >
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                  <option value="2">2 stars</option>
                  <option value="1">1 star</option>
                </select>
              </div>
              <div className="mb-3 relative">
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                  id="updated_occupation"
                  name="occupation"
                  placeholder="Your updated occupation"
                  value={updatedTestimonial.occupation}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="mb-3 relative">
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 shadow-sm sm:text-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 focus:border focus:border-indigo-500 pl-2 pt-2 placeholder-gray-400"
                  id="updated_company"
                  name="company"
                  placeholder="Your updated company"
                  value={updatedTestimonial.company}
                  onChange={handleUpdateChange}
                />
              </div>
              <button
                type="submit"
                className="w-auto mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover-bg-indigo-500 focus-outline-none focus-border-indigo-700 focus-shadow-outline-indigo active-bg-indigo-700 transition ease-in-out duration-150"
              >
                {submitting ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;

