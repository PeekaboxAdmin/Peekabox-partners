import React from "react";
import "./styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Peekabox. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
