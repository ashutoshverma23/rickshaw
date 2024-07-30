import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../../pages/HomePage/Home";
import About from "../../pages/AboutPage/About";
import Help from "../../pages/Help/Help";
import PassengerLogin from "../../pages/Login/PassengerLogin";
import DriverLogin from "../../pages/Login/DriverLogin";
import PassengerRegister from "../../pages/Registration/PassengerRegistration";
import VerifyEmail from "../../pages/Registration/VerifyEmail";
import DriverRegister from "../../pages/Registration/DriverRegistration";
import TravelPage from "../../pages/TravelPage/TravelPage";
import DriverProfile from "../../pages/ProfilePage/DriverProfile";
import PassengerProfile from "../../pages/ProfilePage/PassengerProfile";
import { useAuthContext } from "../../context/AuthContext";

import { AnimatePresence } from "framer-motion";
import Layout from "../../utils/FramerLayout";

const AnimatedRoutes = () => {
  const { authUser } = useAuthContext();
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
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
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
