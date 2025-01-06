import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust this if needed

// Register user
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    return response.data; // Contains user and token
  } catch (error) {
    console.error("Error registering:", error);
    throw error.response?.data || error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Contains user and token
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response?.data || error;
  }
};
