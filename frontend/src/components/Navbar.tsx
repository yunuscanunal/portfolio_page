import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbFileCv } from "react-icons/tb";
import "./Navbar.css";

const CustomNavbar: React.FC = () => {
  const [expanded, setExpanded] = useState(false); // Hamburger menü durumunu kontrol eden state

  const handleToggle = () => setExpanded(!expanded); // Aç/Kapat durumu
  const handleClose = () => setExpanded(false); // Menü öğesine tıklandığında kapat

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <Logo className="navbar-logo" />
        </Navbar.Brand>

        {/* Hamburger Menü */}
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />

        {/* Menü Öğeleri */}
        <Navbar.Collapse id="navbar-nav" onClick={handleClose}>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#experience">Experience</Nav.Link>
            <Nav.Link href="#projects">Lab</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
            <Nav.Link
              href="https://linkedin.com/in/yunuscanunal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Nav.Link>
            <Nav.Link
              href="https://github.com/yunuscanunal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Nav.Link>
            {/* CV Opener */}
            <Nav.Link
              href="https://drive.google.com/file/d/12J6zAhfSZ3dBBXT1yqUeECWRGyiY3d8B/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="cv-link"
            >
              <TbFileCv />
              <span className="tooltip">Click to see CV</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
