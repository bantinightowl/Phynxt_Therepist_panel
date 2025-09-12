import React, { useState, useEffect } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import { FaTrash } from "react-icons/fa";
import axios from "axios"; // Using axios instead of fetch for better CORS handling

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // Configure axios defaults
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/apis/userAuth/getAllUser", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      if (response.data.success) {
        setUsers(Array.isArray(response.data.data) ? response.data.data : [response.data.data]);
      } else {
        throw new Error(response.data.message || "Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      let errorMessage = "Failed to load users. Please try again.";
      
      if (error.response) {
        // Server responded with a status code outside 2xx
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "No response from server. Check your network connection.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ... rest of your component code remains the same ...

  return (
    <>
    {/* ... your existing JSX ... */}
    </>
  );
};

export default ManageUsers;