import React from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 0.95,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
};

const Layout = () => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition} // Ensure this matches your navbar background
  >
    <Outlet />
  </motion.div>
);

export default Layout;
