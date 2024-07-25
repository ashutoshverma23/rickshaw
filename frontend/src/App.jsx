import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/HomePage/Home";
import About from "./pages/AboutPage/About";
import Help from "./pages/Help/Help";
import PassengerLogin from "./pages/Login/PassengerLogin";
import DriverLogin from "./pages/Login/DriverLogin";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/passenger-login" element={<PassengerLogin />} />
        <Route path="/driver-login" element={<DriverLogin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
