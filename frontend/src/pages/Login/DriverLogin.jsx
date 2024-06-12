import React from "react";

const DriverLogin = () => {
  return (
    // <div className="flex flex-row justify-center">
    <div className="flex flex-col w-full justify-center">
      <h1 className="md:text-4xl text-3xl font-semibold text-center">
        Driver Login
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
          <span>Do you have Driving License?</span>
          <div className="flex md:flex-row  space-x-8 md:mx-5">
            <label className="items-center">
              <input
                type="radio"
                name="drivingLicense"
                className="form-radio h-5 w-5 text-gray-600 "
              />
              <span className="md:ml-2 text-gray-700">Yes</span>
            </label>
            <label className="items-center">
              <input
                type="radio"
                name="drivingLicense"
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="md:ml-2 text-gray-700">No</span>
            </label>
          </div>
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
  );
};

export default DriverLogin;
