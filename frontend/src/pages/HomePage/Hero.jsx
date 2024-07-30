import React from "react";
import background from "../../assets/rickshawBg.jpg";

const Hero = () => {
  return (
    <>
      <header
        className="bg-cover bg-center sm:h-[90vh] h-[60vh] relative"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="relative bg-black bg-opacity-50 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold">RickShaw</h1>
            <h1 className="text-4xl font-bold mt-4">
              Look around, there is some route.
            </h1>
          </div>
          <p className="absolute bottom-4 text-white text-center md:text-sm text-xs w-11/12">
            An automation application to show location of Passengers and Drivers
            on their phone for easy commute.
          </p>
        </div>
      </header>
    </>
  );
};

export default Hero;
