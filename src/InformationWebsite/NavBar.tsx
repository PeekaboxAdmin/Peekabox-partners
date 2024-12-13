import React from "react";
import "./styles/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Peekabox</div>
      <ul className="navbar-links">
        <li>Discover</li>
        <li>How it Works</li>
        <li>About Us</li>
        <li>Log In</li>
        <li>Sign up your store</li>
      </ul>
    </nav>
  );
};

export default Navbar;
