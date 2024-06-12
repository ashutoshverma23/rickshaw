import React from "react";
import Hero from "./Hero";
import Section1 from "./Section1";
import Footer from "../../components/Footer";
import PassengerLogin from "../Login/PassengerLogin"; // Import PassengerLogin component
import DriverLogin from "../Login/DriverLogin"; // Import DriverLogin component

const Home = ({
  isPassengerLoginOpen,
  closePassengerLogin,
  isDriverLoginOpen,
  closeDriverLogin,
}) => {
  return (
    <>
      {isPassengerLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg md:w-1/3 w-2/3  my-auto">
            <div className="m-4 items-end flex justify-end">
              {" "}
              {/* Add flex justify-end */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill=" none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={closePassengerLogin}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <PassengerLogin />
          </div>
        </div>
      )}

      {isDriverLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg md:w-1/3 w-2/3  my-auto">
            <div className="m-4 items-end flex justify-end">
              {" "}
              {/* Add flex justify-end */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill=" none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={closeDriverLogin}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <DriverLogin />
          </div>
        </div>
      )}

      <div
        className={
          isPassengerLoginOpen || isDriverLoginOpen ? "filter blur-sm" : ""
        }
      >
        <Hero />
        <Section1 />
        <Footer />
      </div>
    </>
  );
};

export default Home;
