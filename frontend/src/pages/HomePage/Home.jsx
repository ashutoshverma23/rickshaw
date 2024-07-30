import React from "react";
import Hero from "./Hero";
import Section1 from "./Section1";
import RouteMap from "../TravelPage/RouteMap";

const Home = () => {
  return (
    <>
      <div>
        <Hero />
        <RouteMap />
        <Section1 />
      </div>
    </>
  );
};

export default Home;
