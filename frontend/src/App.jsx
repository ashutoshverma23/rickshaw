import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/HomePage/Home";
import About from "./pages/AboutPage/About";
import Help from "./pages/Help/Help";
import PassengerLogin from "./pages/Login/PassengerLogin";
import DriverLogin from "./pages/Login/DriverLogin";
import PassengerRegister from "./pages/Registration/PassengerRegistration";
import VerifyEmail from "./pages/Registration/VerifyEmail";
import DriverRegister from "./pages/Registration/DriverRegistration";
import TravelPage from "./pages/TravelPage/TravelPage";
import Footer from "./components/Footer";
import "./App.css";
import DriverProfile from "./pages/ProfilePage/DriverProfile";
import PassengerProfile from "./pages/ProfilePage/PassengerProfile";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="min-h-svh">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/passenger-login" element={<PassengerLogin />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/passenger-register" element={<PassengerRegister />} />
        <Route
          path="/passenger/verify-email/:token"
          element={<VerifyEmail userType="passenger" />}
        />
        <Route
          path="/driver/verify-email/:token"
          element={<VerifyEmail userType="driver" />}
        />
        <Route path="/driver-register" element={<DriverRegister />} />
        <Route path="/travel" element={<TravelPage />} />
        {authUser?.role === "passenger" ? (
          <Route path="/profile" element={<PassengerProfile />} />
        ) : (
          <Route path="/profile" element={<DriverProfile />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
