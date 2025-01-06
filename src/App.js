import React, { useState } from "react";
import { AuthProvider } from "./context/authContext"; // Import AuthProvider
import Login from "./components/login";
import Register from "./components/register";
import Header from "./components/header";
import ProductList from "./components/productlist";
import Footer from "./components/footer";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

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
      <div className="App">
        <Header openModal={openModal} />
        <ProductList />
        <Footer />

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
            <Login openRegister={handleRegisterClick} closeModal={closeModal} />
          )}
        </Modal>
      </div>
    </AuthProvider>
  );
}

export default App;
