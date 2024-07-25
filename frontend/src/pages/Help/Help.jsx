import React, { useState } from "react";

const Help = () => {
  // State to manage visibility of answers
  const [visibleAnswers, setVisibleAnswers] = useState({});

  // Function to toggle visibility
  const toggleAnswerVisibility = (index) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const securityQuestions = [
    {
      question: "How to secure user data?",
      answer:
        "Use encryption, secure passwords, and other best practices to protect user data. Also, ensure that data is stored securely and access is restricted to authorized personnel only.",
    },
    {
      question: "Preventing unauthorized access",
      answer:
        "Implement strong authentication mechanisms, monitor access logs, and use security software.",
    },
    {
      question: "Implementing secure authentication",
      answer:
        "Use multi-factor authentication, strong passwords, and OAuth 2.0 for secure authentication.",
    },
  ];

  const featureQuestions = [
    {
      question: "How to find available rickshaws?",
      answer:
        "Use the app's search feature to find available rickshaws in your area.",
    },
    {
      question: "Booking a rickshaw",
      answer:
        "Select a rickshaw from the available list and follow the booking process in the app.",
    },
    {
      question: "Tracking the location of a booked rickshaw",
      answer:
        "Use the app's tracking feature to see the real-time location of your booked rickshaw.",
    },
  ];

  return (
    <div className="flex flex-col justify-center p-4 md:px-10 ">
      <h1 className="text-4xl font-semibold text-center">Help</h1>
      <h3 className="md:text-3xl">Security</h3>
      <ul>
        {securityQuestions.map((item, index) => (
          <li key={index} className="relative">
            <button
              className="question"
              onClick={() => toggleAnswerVisibility(`security-${index}`)}
            >
              {item.question}
            </button>
            <div
              className={`answer ml-2 bg-slate-400 ${
                visibleAnswers[`security-${index}`] ? "visible" : "hidden"
              }`}
            >
              {item.answer}
            </div>
          </li>
        ))}
      </ul>
      <h3 className="md:text-3xl mt-4">Features</h3>
      <ul>
        {featureQuestions.map((item, index) => (
          <li key={index} className="relative">
            <button
              className="question"
              onClick={() => toggleAnswerVisibility(`feature-${index}`)}
            >
              {item.question}
            </button>
            <div
              className={`answer ${
                visibleAnswers[`feature-${index}`] ? "visible" : "hidden"
              }`}
            >
              {item.answer}
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center mt-4">
        <p>
          For more help, please contact our support team at{" "}
          <a href="mailto:ashutoshrgnict@gmail.com">ashutoshrgnict@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default Help;
