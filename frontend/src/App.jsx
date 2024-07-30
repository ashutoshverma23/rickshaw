import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Footer from "./components/Footer/Footer";

import ScrollToTop from "./utils/ScrollToTop";
import AnimatedRoutes from "./components/routes/AnimatedRoutes";

const AppLayout = () => {
  return (
    <div className="App">
      <Nav />
      <AnimatedRoutes />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
