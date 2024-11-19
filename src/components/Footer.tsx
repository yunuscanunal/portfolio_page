import React from "react";
import "./Footer.css";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">Connect with me:</p>
        <div className="footer-icons">
          <a
            href="https://linkedin.com/in/yunuscanunal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/yunuscanunal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://instagram.com/yunuscanunal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} YunuscanUnal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
