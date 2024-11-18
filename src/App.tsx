import React from "react";
import CustomNavbar from "./components/Navbar";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import WorkExperience from "./components/WorkExperience";
import "./App.css";

function App() {
  return (
    <>
      <CustomNavbar />
      <Hero />
      <Summary />
      <WorkExperience></WorkExperience>
    </>
  );
}

export default App;
