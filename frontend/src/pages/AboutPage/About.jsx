import React from "react";
// import background from "../assets/about.jpg";
import background from "../../assets/rickshawBg.jpg";
import Footer from "../../components/Footer";

const About = () => {
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
            <h1 className="text-4xl font-bold">About Us</h1>
            <div className="mt-8">
              <div className="bg-white text-black inline-block p-4 rounded-lg md:w-2/3 w-10/12">
                <p className="md:text-lg text-sm font-medium mb-4">
                  We are working to provide a platform for the rickshaw drivers
                  as well as the passengers to connect with each other and make
                  their journey easy and comfortable. This Application provides
                  an easy way to for passenges to look for a nearby rickshaw for
                  thei daily commute, rental or outstation trips and for the
                  drivers to get the location of passengers that want to travel.
                  This can be done by showing the location of the driver and the
                  passenger on the map and their active status that can be
                  turned on and off through a button.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Footer />
    </>
  );
};

export default About;
