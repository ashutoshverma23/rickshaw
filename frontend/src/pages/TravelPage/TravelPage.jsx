import React from "react";
import Map from "../../components/maps/Map";
import { useAuthContext } from "../../context/AuthContext";
import { MdLocationPin } from "react-icons/md";

const TravelPage = () => {
  const { authUser } = useAuthContext();

  if (!authUser)
    return (
      <>
        <div>Loading....</div>
        <div className="min-h-[90vh] bg-gray-50 flex flex-col justify-center items-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 md:mb-8 mb-4">
            Travel Page
          </h1>
          <p>
            You need to Register/Login before accessing this feature, cause it
            needs your location!!!
          </p>
        </div>
      </>
    );

  if (authUser.role === "driver") {
    return (
      <>
        <div className="md:min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 md:mb-8 mb-4">
            Travel Page
          </h1>

          <div className="bg-orange-100 rounded-lg shadow-md w-full max-w-2xl mb-8 md:p-6 p-4">
            <ul className="space-y-2">
              <li className="flex items-center text-lg md:text-xl">
                <MdLocationPin className="text-red-500 mr-3 h-8 w-6" />
                <p>Red Icon represents your location</p>
              </li>
              <li className="flex items-center text-lg md:text-xl">
                <MdLocationPin className="text-green-500 mr-3 h-8 w-6" />
                <p>Green Icons show passengers in your area</p>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <Map />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="md:min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
            Travel Page
          </h1>

          <div className="bg-orange-100 rounded-lg shadow-md w-full max-w-2xl mb-8 p-6">
            <ul className="space-y-2">
              <li className="flex items-center text-lg md:text-xl">
                <MdLocationPin className="text-green-500 mr-3 h-8 w-6" />
                <p>Green Icons show your Location</p>
              </li>
              <li className="flex items-center text-lg md:text-xl">
                <MdLocationPin className="text-red-500 mr-3 h-8 w-6" />
                <p>Red Icon represents Rickshaw drivers in you area</p>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <Map />
          </div>
        </div>
      </>
    );
  }
};

export default TravelPage;
