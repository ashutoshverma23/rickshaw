import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDriverLogin } from "../../hooks/useDriverLogin.js";

const DriverLogin = () => {
  const { login } = useDriverLogin();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs);
  };

  return (
    <div className="min-h-[80vh] flex flex-row justify-center items-center bg-gray-200 mx-auto">
      <div className="flex flex-col w-4/5 justify-center md:w-3/4 md:max-w-sm bg-zinc-300 rounded-lg mt-8 mb-8 ">
        <h1 className="md:text-4xl text-3xl font-semibold text-center mt-8">
          Driver Login
        </h1>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-full md:p-8 p-4 "
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-2 rounded-md border-2 border-gray-400"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="p-2 rounded-md border-2 border-gray-400"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />

            <div className="mt-2 mb-2">
              <Link to="/signup">{"Don't"} have an account? Sign up</Link>
            </div>

            <button className="bg-green-500 p-2 rounded-md mb-4">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
