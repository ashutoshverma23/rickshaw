import React from "react";
import { Marker, Circle } from "react-leaflet";
import { PassengerIcon, DriverIcon } from "./MapIcons";

function UserMarker({ position, accuracy, role }) {
  return (
    <>
      <Marker
        position={position}
        icon={role === "passenger" ? PassengerIcon : DriverIcon}
      />
      <Circle center={position} radius={accuracy} />
    </>
  );
}

export default UserMarker;
