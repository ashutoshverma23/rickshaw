import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/HomePage/Home";
import About from "./pages/AboutPage/About";
import Help from "./pages/Help/Help";
import PassengerLogin from "./pages/Login/PassengerLogin";
import DriverLogin from "./pages/Login/DriverLogin";
import "./App.css";

function App() {
  const [isPassengerLoginOpen, setIsPassengerLoginOpen] = useState(false);
  const [isDriverLoginOpen, setIsDriverLoginOpen] = useState(false);

  const openPassengerLogin = () => setIsPassengerLoginOpen(true);
  const closePassengerLogin = () => setIsPassengerLoginOpen(false);
  const openDriverLogin = () => setIsDriverLoginOpen(true);
  const closeDriverLogin = () => setIsDriverLoginOpen(false);

  return (
    <div>
      <Nav
        openPassengerLogin={openPassengerLogin}
        openDriverLogin={openDriverLogin}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isPassengerLoginOpen={isPassengerLoginOpen}
              closePassengerLogin={closePassengerLogin}
              isDriverLoginOpen={isDriverLoginOpen}
              closeDriverLogin={closeDriverLogin}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/passenger-login" element={<PassengerLogin />} />
        <Route path="/driver-login" element={<DriverLogin />} />
      </Routes>
    </div>
  );
}

export default App;
