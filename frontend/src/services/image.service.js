import axios from "axios";

const API_URL = "http://localhost:3000/"; // Replace with your actual API URL

// Fetch all images
const getAllImages = () => {
  return axios
    .get(`${API_URL}api/images`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
      throw error;
    });
};

// Upload a new image
const uploadImage = (image) => {
  return axios
    .post(`${API_URL}api/upload`, image)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error uploading an image:", error);
      throw error;
    });
};

// Update an image
const updateImage = (s3Key, updatedImage) => {
  return axios
    .put(`${API_URL}api/images/${s3Key}`, updatedImage)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating the image:", error);
      throw error;
    });
};

// Delete an image
const deleteImage = (imageId) => {
  return axios
    .delete(`${API_URL}api/images/${imageId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting the image:", error);
      throw error;
    });
};

const ImageService = {
  getAllImages,
  uploadImage,
  updateImage,
  deleteImage,
};

export default ImageService;
