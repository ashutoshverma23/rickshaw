import React from "react";
import background from "../../assets/rickshawBg.jpg";

const Hero = () => {
  return (
    <>
      <header
        className="bg-cover bg-center h-screen relative"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">
              Look around, there is some route.
            </h1>
            <div className="mt-8">
              <div className="bg-white text-black inline-block p-4 rounded-lg">
                <ul className="flex space-x-4 text-lg font-medium mb-4">
                  <li className="cursor-pointer">Daily</li>
                  <li className="cursor-pointer">Rental</li>
                  <li className="cursor-pointer">Outstation</li>
                </ul>
                <div className="flex flex-col md:flex-row md:gap-4 gap-4">
                  <input
                    type="text"
                    placeholder="Current Location"
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Enter Destination"
                    className="p-2 border border-gray-300 rounded"
                  />
                  <button className="bg-green-600 text-white px-4 py-2 rounded">
                    Search Rickshaw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Hero;
