import React from "react";
import { Marker } from "react-leaflet";
import { PassengerIcon, DriverIcon } from "./MapIcons";

function OtherUserMarkers({ otherUsers }) {
  console.log("otherUsers", otherUsers);

  return (
    <>
      {otherUsers.map((user) => {
        const coordinates = user.location?.coordinates;
        if (coordinates && coordinates.length === 2) {
          return (
            <Marker
              key={user._id}
              position={[coordinates[1], coordinates[0]]} // Latitude, Longitude
              icon={user.userType === "passenger" ? PassengerIcon : DriverIcon}
              className="mt-20"
            />
          );
        } else {
          console.warn(`User ${user._id} has invalid coordinates: `, user);
          return null;
        }
      })}
    </>
  );
}

export default OtherUserMarkers;
