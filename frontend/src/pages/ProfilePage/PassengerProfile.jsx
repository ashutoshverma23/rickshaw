import React, { useEffect, useState } from "react";
import passengerImage from "../../assets/passenger.png";

const PassengerProfile = () => {
  const [passenger, setPassenger] = useState(null);

  useEffect(() => {
    // Fetch driver details from the backend
    fetch("/api/passenger/profile")
      .then((response) => response.json())
      .then((data) => setPassenger(data));
  }, []);

  if (!passenger) {
    return <div>Loading...</div>;
  }

  console.log(passenger);

  return (
    <>
      <div className="min-h-[85vh]">
        <h1 className="text-6xl text-center mt-8 uppercase font-semibold">
          Passenger Profile
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-1/2 items-center flex flex-col text-2xl">
            <div className="text-left md:mt-10 mt-4">
              <p className="">Name: {passenger.fullName}</p>
              <p className="">Email: {passenger.email}</p>
            </div>
          </div>
          <div className="object-contain md:w-1/2 w-2/3 xl:max-w-[600px] md:max-w-[480px] 2xl:max-w-[720px] h-auto rounded-lg">
            <img src={passengerImage} alt="passenger waving hand" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PassengerProfile;
