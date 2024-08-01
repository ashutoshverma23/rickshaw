import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { BACKEND_URL } from "../../../constants.js";
const DriverProfile = () => {
  const [driver, setDriver] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDriverProfile();
  }, []);

  const fetchDriverProfile = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/driver/profile`);
      if (!response.ok) {
        throw new Error("Failed to fetch driver profile");
      }
      const data = await response.json();
      setDriver(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(driver);

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

  return (
    <div className="min-h-[85vh] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-center mb-12 uppercase font-bold text-gray-800">
          Driver Profile
        </h1>
        <div className="flex justify-center items-center bg-white shadow overflow-hidden sm:rounded-lg rounded-md">
          <div className="w-4/5 flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-1/2 p-6">
              <div className="space-y-4">
                <ProfileItem
                  icon={<FaUser />}
                  label="Name"
                  value={driver.fullName}
                />
                <ProfileItem
                  icon={<FaEnvelope />}
                  label="Email"
                  value={driver.email}
                />
                <ProfileItem
                  icon={<FaIdCard />}
                  label="License Number"
                  value={driver.licensePlate}
                />
                <ProfileItem
                  icon={
                    driver.isVerified ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )
                  }
                  label="Verified"
                  value={driver.isVerified ? "Yes" : "No"}
                />
              </div>

              <div className="mt-8"></div>
            </div>

            <div className="md:w-1/2 p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Driving License
              </h3>
              <img
                src={driver.drivingLicenseImagePath}
                alt="Driving License"
                className="h-96 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 text-gray-500 mr-3">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg text-gray-900">{value}</p>
    </div>
  </div>
);

export default DriverProfile;
