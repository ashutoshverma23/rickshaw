import React, { useState } from "react";
import { useDriverRegister } from "../../hooks/useDriverRegister";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DriverRegistration = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    licensePlate: "",
  });

  const [drivingLicense, setDrivingLicense] = useState(null);
  const [hasDrivingLicense, setHasDrivingLicense] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useDriverRegister();
  const navigate = useNavigate();

  const handleRadioChange = (event) => {
    setHasDrivingLicense(event.target.value);
  };

  const handleFileChange = (event) => {
    setDrivingLicense(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await register({ ...inputs, drivingLicense });
      toast.success("Registration successful!");
      setTimeout(() => navigate("/"), 2000); // Navigate after 2 seconds
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-row justify-center items-center bg-gray-200 mx-auto">
      <div className="flex flex-col w-4/5 justify-center md:w-3/4 md:max-w-sm bg-zinc-300 rounded-lg mt-8 mb-8 ">
        <h1 className="md:text-4xl text-3xl font-semibold text-center mt-8">
          Driver Registration
        </h1>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-full md:p-8 p-4 "
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
              type="password"
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
            <span>Do you have a Driving License?</span>
            <div className="flex md:flex-row space-x-8 md:mx-5">
              <label className="items-center">
                <input
                  type="radio"
                  name="drivingLicense"
                  value="yes"
                  checked={hasDrivingLicense === "yes"}
                  onChange={handleRadioChange}
                  className="form-radio h-5 w-5 text-gray-600"
                />
                <span className="md:ml-2 text-gray-700">Yes</span>
              </label>
              <label className="items-center">
                <input
                  type="radio"
                  name="drivingLicense"
                  value="no"
                  checked={hasDrivingLicense === "no"}
                  onChange={handleRadioChange}
                  className="form-radio h-5 w-5 text-gray-600"
                />
                <span className="md:ml-2 text-gray-700">No</span>
              </label>
            </div>
            {hasDrivingLicense === "yes" && (
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="p-2 rounded-md border-2 border-gray-400 bg-white text-gray-500"
                onChange={handleFileChange}
              />
            )}
            <input
              type="text"
              placeholder="Enter your License Plate"
              className="p-2 rounded-md border-2 border-gray-400"
              value={inputs.licensePlate}
              onChange={(e) =>
                setInputs({ ...inputs, licensePlate: e.target.value })
              }
            />

            <button
              className={`bg-green-500 p-2 rounded-md mb-4 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-600"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverRegistration;
