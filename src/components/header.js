import React from "react";
import "./header.css";

function Header({ openModal }) {
  return (
    <header className="header">
      <div className="logo">
        <h1>Prinz</h1>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="icons">
        <a href="#">Cart</a>
        <a href="#" onClick={openModal}>
          Login
        </a>{" "}
        {/* Trigger modal on login click */}
      </div>
    </header>
  );
}

export default Header;
