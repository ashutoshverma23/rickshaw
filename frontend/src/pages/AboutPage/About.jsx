import React from "react";
import aboutUs from "../../assets/aboutUs.png";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-green-800 mb-12">
          About Us
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-orange-100 p-6 md:p-8 lg:p-10">
              <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
                We are dedicated to revolutionizing urban transportation by
                connecting rickshaw drivers and passengers through an innovative
                platform. Our mission is to make daily commutes, rentals, and
                outstation trips easier and more comfortable for everyone.
              </p>
              <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                Our application provides a seamless way for passengers to find
                nearby rickshaws and for drivers to locate potential customers.
                By displaying real-time locations and active statuses on an
                interactive map, we're bridging the gap between service
                providers and users, creating a more efficient and user-friendly
                transportation ecosystem.
              </p>
            </div>
            <div className="bg-green-600 p-4 text-center">
              <a href="#" className="text-white font-semibold hover:underline">
                Learn More About Our Mission
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src={aboutUs}
              alt="Rickshaw driver and passenger"
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
