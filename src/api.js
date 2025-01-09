import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Konfigurasi axios default
axios.defaults.withCredentials = true;

// Register user
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Register API Response:", response.data);

    if (!response.data.user || !response.data.token) {
      throw new Error("Invalid response format from server");
    }

    return response.data;
  } catch (error) {
    console.error("Register API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("API Response:", response.data);

    if (!response.data.user || !response.data.token) {
      throw new Error("Invalid response format from server");
    }

    return response.data;
  } catch (error) {
    console.error("Login API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
