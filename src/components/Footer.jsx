import React from "react";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">This app was created by Sofia Khizhnyak</p>
      <a
        href="https://www.linkedin.com/in/sofiakhizhnyak/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-icon"
      >
        <FaLinkedin size={18} />
      </a>
    </footer>
  );
}

export default Footer;
