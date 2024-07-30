import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Help = () => {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswerVisibility = (index) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const renderQuestions = (questions, category) => (
    <ul className="space-y-4">
      {questions.map((item, index) => (
        <li
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <button
            className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
            onClick={() => toggleAnswerVisibility(`${category}-${index}`)}
          >
            <span className="font-medium text-gray-800">{item.question}</span>
            <FaChevronDown
              className={`text-gray-500 transform transition-transform duration-200 ${
                visibleAnswers[`${category}-${index}`] ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`px-4 pb-4 text-gray-600 transition-all duration-500 ease-in-out ${
              visibleAnswers[`${category}-${index}`]
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {item.answer}
          </div>
        </li>
      ))}
    </ul>
  );

  const securityQuestions = [
    {
      question: "How do you secure user data?",
      answer:
        "We employ industry-standard encryption, secure password hashing, and strict access controls to protect user data. All information is stored securely, and access is restricted to authorized personnel only.",
    },
    {
      question: "How do you prevent unauthorized access?",
      answer:
        "We implement strong authentication mechanisms, regularly monitor access logs, and use advanced security software to detect and prevent unauthorized access attempts.",
    },
    {
      question: "What authentication methods do you use?",
      answer:
        "We utilize Email Verification of user while registration, enforce strong password policies, and implement OAuth 2.0 for secure third-party authentication where applicable.",
    },
  ];

  const featureQuestions = [
    {
      question: "How can I find available rickshaws?",
      answer:
        "Passengers icon is shown green and Rickshaw icon is shown red on the map. You can view all available rickshaws in your area on the map after setting active to yourself, that means you want to travel.",
    },
    {
      question: "How do I find Passengers?",
      answer:
        "Rickshaw icon is shown red and Passengers icon is shown green on the map. You can view all available passengers in your area on the map after setting active to yourself, that means you are ready to travel.",
    },
    {
      question: "How to check routes and estimated time?",
      answer:
        "You can check routes on the home page to see the estimated time and distance between your current location and your destination. You can directly use you location, If you are logged in.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Help Center
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Security
          </h2>
          {renderQuestions(securityQuestions, "security")}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Features
          </h2>
          {renderQuestions(featureQuestions, "feature")}
        </section>

        <div className="text-center mt-8 p-4 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">
            Need more help? Contact our support team at{" "}
            <a
              href="mailto:ashutoshrgnict@gmail.com"
              className="text-blue-600 hover:underline"
            >
              ashutoshrgnict@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
