import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ReactComponent as Logo } from "../assets/logo.svg";
import "./Navbar.css";

const CustomNavbar: React.FC = () => {
  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <Logo className="navbar-logo" />
        </Navbar.Brand>

        {/* Hamburger Menü */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Menü Öğeleri */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#lab">Lab</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
