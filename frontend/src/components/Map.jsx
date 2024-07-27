import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuthContext } from "../context/AuthContext";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const PassengerIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const DriverIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function SetViewOnClick({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

function Map() {
  const { authUser } = useAuthContext();
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [active, setActive] = useState(false);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      console.log("Geolocation is not supported");
      return;
    }

    const watcher = geo.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setAccuracy(pos.coords.accuracy);
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
        timeout: 1000,
        maximumAge: 0,
      }
    );

    return () => geo.clearWatch(watcher);
  }, []);

  const fetchOtherUsers = async () => {
    try {
      const driversResponse = await fetch("/api/driver/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!driversResponse.ok) {
        throw new Error(`HTTP error! status: ${driversResponse.status}`);
      }

      const driversData = await driversResponse.json();
      const drivers = driversData.map((driver) => ({
        id: driver._id,
        role: "driver",
        position: [driver.latitude, driver.longitude] || [0, 0],
        active: driver.active || false,
      }));

      const passengersResponse = await fetch("/api/passenger/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!passengersResponse.ok) {
        throw new Error(`HTTP error! status: ${passengersResponse.status}`);
      }

      const passengersData = await passengersResponse.json();
      const passengers = passengersData.map((passenger) => ({
        id: passenger._id,
        role: "passenger",
        position: [passenger.latitude, passenger.longitude] || [0, 0],
        active: passenger.active || false,
      }));

      return [...drivers, ...passengers];
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchOtherUsers().then((users) => {
      setOtherUsers(
        users.filter((user) => user.role !== authUser.role && user.active)
      );
    });
  }, [authUser.role, active]);

  if (!position) return <div>Loading...</div>;

  const handleToggleActive = () => {
    setActive(!active);
    // Optionally, update localStorage or API to reflect the user's active status
  };

  return (
    <div className="w-full">
      <MapContainer
        center={position}
        zoom={16}
        className="h-[50vh] w-4/5 md:w-1/2 p-4 border-2 border-gray-300 rounded-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <>
            <Marker
              position={position}
              icon={authUser.role === "passenger" ? PassengerIcon : DriverIcon}
            />
            <Circle center={position} radius={accuracy} />
            <SetViewOnClick coords={position} />
          </>
        )}
        {otherUsers.map((user) => (
          <Marker
            key={user.id}
            position={user.position}
            icon={user.role === "passenger" ? PassengerIcon : DriverIcon}
          />
        ))}
      </MapContainer>
      <button
        onClick={handleToggleActive}
        className={`mt-4 px-4 py-2 ${
          active ? "bg-red-500" : "bg-green-500"
        } text-white rounded`}
      >
        {active ? "Go Inactive" : "Go Active"}
      </button>
    </div>
  );
}

export default Map;
