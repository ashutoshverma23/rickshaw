import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAuthContext } from "../../context/AuthContext";
import SetViewOnClick from "./SetViewOnClick";
import UserMarker from "./UserMarker";
import OtherUserMarkers from "./OtherUserMarker";
import { BACKEND_URL } from "../../../constants.js";

function Map() {
  const { authUser } = useAuthContext();
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [active, setActive] = useState(false);
  const [otherUsers, setOtherUsers] = useState([]);

  console.log(authUser);

  const updateLocation = async (latitude, longitude) => {
    if (!authUser) return; // Exit early if authUser is not available

    try {
      await fetch(`${BACKEND_URL}/api/user-status/update-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser._id,
          userType: authUser.role,
          isActive: active,
          latitude,
          longitude,
        }),
      });
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const fetchOtherUsers = useCallback(async () => {
    if (!authUser) return; // Exit early if authUser is not available

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/user-status/active-users`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOtherUsers(data.filter((user) => user.userType !== authUser.role));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [authUser]);

  useEffect(() => {
    fetchOtherUsers();
  }, [fetchOtherUsers]);

  useEffect(() => {
    if (!authUser) return; // Exit early if authUser is not available

    const geo = navigator.geolocation;

    if (!geo) {
      console.log("Geolocation is not supported");
      return;
    }

    const watcher = geo.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setPosition([latitude, longitude]);
        setAccuracy(accuracy);
        updateLocation(latitude, longitude);
      },
      (err) => {
        console.log(err);
        if (err.code === 1) {
          alert("Please allow geolocation access");
        } else {
          alert("Cannot get current location");
        }
      },
      {
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => geo.clearWatch(watcher);
  }, [active, authUser]);

  const handleToggleActive = async () => {
    if (!authUser || !position) return; // Exit early if authUser or position is not available

    const newActiveState = !active;
    try {
      await fetch(`${BACKEND_URL}/api/user-status/update-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: authUser._id,
          userType: authUser.role,
          isActive: newActiveState,
          latitude: position[0],
          longitude: position[1],
        }),
      });
      setActive(newActiveState);
      fetchOtherUsers(); // Refresh other users after toggling active state
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };

  if (!position) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center">
      <MapContainer
        center={position}
        zoom={16}
        className="h-[50vh] w-full  md:w-1/2 p-4 border-2 border-gray-300 rounded-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <>
            <UserMarker
              position={position}
              accuracy={accuracy}
              role={authUser?.role}
            />
            <SetViewOnClick coords={position} />
          </>
        )}
        <OtherUserMarkers otherUsers={otherUsers} />
      </MapContainer>
      <button
        onClick={handleToggleActive}
        className={`mt-4 px-4 py-2  ${
          active ? "bg-red-500" : "bg-green-500"
        } text-white rounded`}
      >
        {active ? "Go Inactive" : "Go Active"}
      </button>
    </div>
  );
}

export default Map;
