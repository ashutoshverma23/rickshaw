import React from "react";
import boyWalking from "../../assets/boyWalking.png";

const Section1 = () => {
  return (
    <>
      <section className="bg-green-100 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex md:flex-row flex-col items-center justify-center">
            <img
              src={boyWalking}
              alt="walkingBoy"
              className="md:w-1/3 w-2/3 "
            />
            <div className="ml-4 md:text-left text-center">
              <h2 className="text-2xl font-bold">
                Travelling hastle free in Public Transport
              </h2>
              <p className="text-left">
                We are here to make your daily commute easy and comfortable.
                <br />
                Our goal is to make a common platform for Rickshaw drivers and
                passengers to easily connect with each other.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 mt-4 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section1;
