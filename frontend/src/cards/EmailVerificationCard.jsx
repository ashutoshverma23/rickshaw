import React from "react";

const EmailVerificationCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
      <p className="text-gray-600 mb-4">
        Please verify your email address to continue using our services.
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Verify Email
      </button>
    </div>
  );
};

export default EmailVerificationCard;
