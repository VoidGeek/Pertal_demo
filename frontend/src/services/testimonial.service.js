import axios from "axios";

const API_URL = "http://localhost:3000/"; // Replace with your actual API URL

// Fetch all testimonials
const getAllTestimonials = () => {
  return axios
    .get(`${API_URL}api/testimonials`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching testimonials:", error);
      throw error;
    });
};

// Create a new testimonial
const createTestimonial = (newTestimonial) => {
  return axios
    .post(`${API_URL}api/testimonials`, newTestimonial)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating a testimonial:", error);
      throw error;
    });
};

// Update an existing testimonial
const updateTestimonial = (testimonialId, updatedTestimonial) => {
  return axios
    .put(`${API_URL}api/testimonials/${testimonialId}`, updatedTestimonial)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating the testimonial:", error);
      throw error;
    });
};

// Delete a testimonial
const deleteTestimonial = (testimonialId) => {
  return axios
    .delete(`${API_URL}api/testimonials/${testimonialId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting the testimonial:", error);
      throw error;
    });
};

// Get a testimonial by its ID
const getTestimonialById = (testimonialId) => {
  return axios
    .get(`${API_URL}api/testimonials/${testimonialId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching testimonial by ID:", error);
      throw error;
    });
};

const TestimonialService = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialById, // Add the new function here
};

export default TestimonialService;

