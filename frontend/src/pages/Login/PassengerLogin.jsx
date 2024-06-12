import React from "react";

const PassengerLogin = () => {
  return (
    // <div className="flex flex-row justify-center">
    <div className="flex flex-col w-full justify-center">
      <h1 className="md:text-4xl text-3xl font-semibold text-center">
        Passenger Login
      </h1>
      <div className="flex justify-center">
        <form className="flex flex-col space-y-4 w-full md:p-10 p-5">
          <input
            type="text"
            placeholder="Enter full name"
            className="p-2 rounded-md border-2 border-gray-400"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="p-2 rounded-md border-2 border-gray-400"
          />
          <input
            type="text"
            placeholder="Enter Mobile Number"
            className="p-2 rounded-md border-2 border-gray-400"
            pattern="\d*"
          />
          <input
            type="text"
            placeholder="Enter OTP"
            className="p-2 rounded-md border-2 border-gray-400"
          />
          <button className="bg-green-500 p-2 rounded-md mb-4">Login</button>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default PassengerLogin;
