import axios from "axios";

const API_URL = "http://localhost:3000/"; // Replace with your actual API URL

const getAllContacts = () => {
  return axios
    .get(`${API_URL}api/contacts`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching contacts:", error);
      throw error;
    });
};

const createContact = (newContact) => {
  return axios
    .post(`${API_URL}api/contacts`, newContact)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating a contact:", error);
      throw error;
    });
};

const deleteContact = (contactId) => {
  return axios
    .delete(`${API_URL}api/contacts/${contactId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting a contact:", error);
      throw error;
    });
};

const ContactService = {
  getAllContacts,
  createContact,
  deleteContact, // Add the deleteContact function
};


export default ContactService;
