import React from "react";

const Help = () => {
  return (
    <div className="flex flex-col justify-center p-4 md:px-10">
      <h1 className="text-4xl text-semibold text-center">Help</h1>
      <h2>Common Issues</h2>
      <h3>Security</h3>
      <ul>
        <li>How to secure user data?</li>
        <li>Preventing unauthorized access</li>
        <li>Implementing secure authentication</li>
      </ul>
      <h3>Features</h3>
      <ul>
        <li>How to find available rickshaws?</li>
        <li>Booking a rickshaw</li>
        <li>Tracking the location of a booked rickshaw</li>
      </ul>
    </div>
  );
};

export default Help;
