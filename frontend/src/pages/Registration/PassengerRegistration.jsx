import React from "react";
import { usePassengerRegister } from "../../hooks/usePassengerRegister";
import { Link } from "react-router-dom";
import { useState } from "react";

const PassengerRegistration = () => {
  const { register } = usePassengerRegister();

  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(inputs);
  };

  return (
    <div className="min-h-[80vh] 2xl:min-h-[90vh] flex flex-row justify-center items-center bg-gray-200">
      <div className="flex flex-col justify-center w-4/5 md:max-w-[420px] mt-8 mb-8 rounded-lg bg-zinc-300">
        <h1 className="md:text-4xl text-3xl font-semibold text-center mt-8">
          Passenger Registration
        </h1>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-full md:p-8 p-4"
          >
            <input
              type="text"
              placeholder="Enter full name"
              className="p-2 rounded-md border-2 border-gray-400"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-2 rounded-md border-2 border-gray-400"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter your password"
              className="p-2 rounded-md border-2 border-gray-400"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Confirm your password"
              className="p-2 rounded-md border-2 border-gray-400"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />

            <div className="mt-2 mb-2">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
            <button className="bg-green-500 p-2 rounded-md mb-4">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassengerRegistration;
