import React, { useEffect, useState } from "react";
import driverImage from "../../assets/rickshaw-driver.png";

const DriverProfile = () => {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    // Fetch driver details from the backend
    fetch("/api/driver/profile")
      .then((response) => response.json())
      .then((data) => setDriver(data));
  }, []);

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-[85vh]">
        <h1 className="text-6xl text-center mt-8 uppercase font-semibold">
          Driver Profile
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-1/2 flex flex-col text-2xl items-center">
            <div className="text-left">
              <p className="">Name: {driver.fullName}</p>
              <p className="">Email: {driver.email}</p>
              <p>License Number: {driver.licensePlate}</p>
            </div>
          </div>
          <div className="object-contain md:w-1/2 w-2/3 xl:max-w-[600px] md:max-w-[480px] 2xl:max-w-[720px] h-auto rounded-lg">
            <img src={driverImage} alt="rickshaw driver waving hand" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverProfile;
