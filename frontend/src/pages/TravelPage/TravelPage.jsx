import React from "react";
import Map from "../../components/Map";

const TravelPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1>This is where you are</h1>
        <div className="flex w-full justify-center rounded-sm">
          <Map />
        </div>
      </div>
    </>
  );
};

export default TravelPage;
