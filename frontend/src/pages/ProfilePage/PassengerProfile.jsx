import React, { useEffect, useState } from "react";
import passengerImage from "../../assets/passenger.png";
import { useAuthContext } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { BACKEND_URL } from "../../../constants.js";

const PassengerProfile = () => {
  const [passenger, setPassenger] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      fetchPassengerProfile();
    } else {
      setIsLoading(false);
    }
  }, [authUser]);

  const fetchPassengerProfile = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/passenger/profile`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch passenger profile");
      }
      const data = await response.json();
      setPassenger(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[85vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[85vh] flex justify-center items-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-[90vh] bg-gray-50 flex flex-col justify-center items-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 md:mb-8 mb-4">
          Profile Section
        </h1>
        <p className="text-xl text-gray-600">
          You need to Register/Login before accessing this feature
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[85vh] flex-col bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 justify-center items-center">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-center mb-12 uppercase font-bold text-gray-800">
          Passenger Profile
        </h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg rounded-md">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <div className="space-y-4">
                <ProfileItem
                  icon={<FaUser />}
                  label="Name"
                  value={passenger.fullName}
                />
                <ProfileItem
                  icon={<FaEnvelope />}
                  label="Email"
                  value={passenger.email}
                />
                <ProfileItem
                  icon={
                    passenger.isVerified ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )
                  }
                  label="Verified"
                  value={passenger.isVerified ? "Yes" : "No"}
                />
                {/* Add more profile items here if needed */}
              </div>
            </div>

            <div className="md:block hidden md:w-1/2 p-6 items-center justify-center">
              <img
                src={passengerImage}
                alt="Passenger waving hand"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-8">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 text-gray-500 mr-3 mt-6">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg text-gray-900">{value}</p>
    </div>
  </div>
);

export default PassengerProfile;
