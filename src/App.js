import React, { useState } from "react";
import { AuthProvider } from "./context/authContext"; // Import AuthProvider
import Login from "./components/login";
import Register from "./components/register";
import Header from "./components/header";
import ProductList from "./components/productlist";
import Footer from "./components/footer";
import Modal from "react-modal";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import { useAuth } from "./context/authContext";

Modal.setAppElement("#root");

// Buat komponen PrivateRoute untuk melindungi rute admin
function PrivateRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  console.log("Current user:", user); // untuk debugging
  console.log("Token exists:", !!token); // untuk debugging

  if (!user || !token || user.role !== "admin") {
    console.log("Access denied, redirecting..."); // untuk debugging
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRegisterClick = () => {
    setIsRegister(true);
  };

  const handleLoginClick = () => {
    setIsRegister(false);
  };

  return (
    <AuthProvider>
      {" "}
      {/* Wrap the application with AuthProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header openModal={openModal} />
                  <ProductList />
                  <Footer />
                </>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>

          {/* Modal for Login and Register */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Authentication Modal"
            className="modal"
            overlayClassName="overlay"
          >
            <div className="modal-header">
              <button onClick={closeModal} className="close-button">
                X
              </button>
            </div>

            {/* Conditionally Render Login or Register Form */}
            {isRegister ? (
              <Register closeModal={closeModal} openLogin={handleLoginClick} />
            ) : (
              <Login
                openRegister={handleRegisterClick}
                closeModal={closeModal}
              />
            )}
          </Modal>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
