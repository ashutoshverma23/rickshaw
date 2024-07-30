import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAuthContext } from "../../context/AuthContext";

import {
  geocodeAddress,
  reverseGeocode,
  getRouteDetails,
} from "../../utils/AddressDecode";

const MapController = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route) {
      const bounds = route.geometry.coordinates.map((coord) => [
        coord[1],
        coord[0],
      ]);
      map.fitBounds(bounds);
    }
  }, [map, route]);

  return null;
};

const RouteMap = () => {
  const { authUser } = useAuthContext();
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [route, setRoute] = useState(null);
  const [center, setCenter] = useState([0, 0]);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef();

  const fetchUserLocation = useCallback(async () => {
    if (!authUser || !authUser._id) return;

    const userId = authUser._id;

    try {
      const response = await fetch(`/api/user-status/${userId}`);
      const data = await response.json();
      if (data && data.location) {
        const { coordinates } = data.location;
        setUserLocation([coordinates[1], coordinates[0]]);
        setCenter([coordinates[1], coordinates[0]]);
      }
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  }, [authUser]);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  const handleShowRoute = async () => {
    let startCoords = startAddress
      ? await geocodeAddress(startAddress)
      : userLocation;
    const endCoords = await geocodeAddress(endAddress);

    if (startCoords && endCoords) {
      const routeDetails = await getRouteDetails(startCoords, endCoords);
      if (routeDetails) {
        setRoute(routeDetails);
        setCenter([
          (startCoords[0] + endCoords[0]) / 2,
          (startCoords[1] + endCoords[1]) / 2,
        ]);
      } else {
        alert("Route details not found");
      }
    } else {
      alert("Invalid addresses");
    }
  };

  const handleUseCurrentLocationAsStart = async () => {
    if (userLocation) {
      const address = await reverseGeocode(userLocation[0], userLocation[1]);
      if (address) {
        setStartAddress(address);
      } else {
        alert("Unable to reverse geocode the current location.");
      }
    } else {
      alert("User location is not available.");
    }
  };

  return (
    <div className="bg-zinc-100 py-12 px-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto ">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Route Finder
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:gap-4 gap-4">
            <input
              type="text"
              placeholder="Start Address"
              className="p-2 border border-gray-300 rounded flex-grow"
              value={startAddress}
              onChange={(e) => setStartAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="End Address"
              className="p-2 border border-gray-300 rounded flex-grow"
              value={endAddress}
              onChange={(e) => setEndAddress(e.target.value)}
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              onClick={handleShowRoute}
            >
              Show Route
            </button>
          </div>
          {authUser && userLocation && (
            <button
              className="w-full md:w-[286px] mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={handleUseCurrentLocationAsStart}
            >
              Use Current Location as Start
            </button>
          )}
        </div>

        <MapContainer
          center={center}
          zoom={2}
          className="h-[50vh] w-full rounded-lg shadow-md"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {route && (
            <>
              <Marker
                position={[
                  route.geometry.coordinates[0][1],
                  route.geometry.coordinates[0][0],
                ]}
              >
                <Popup>Start</Popup>
              </Marker>
              <Marker
                position={[
                  route.geometry.coordinates[
                    route.geometry.coordinates.length - 1
                  ][1],
                  route.geometry.coordinates[
                    route.geometry.coordinates.length - 1
                  ][0],
                ]}
              >
                <Popup>End</Popup>
              </Marker>
              <Polyline
                positions={route.geometry.coordinates.map((coord) => [
                  coord[1],
                  coord[0],
                ])}
                color="blue"
              />
              <MapController route={route} />
            </>
          )}
        </MapContainer>

        {route && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Journey Details</h2>
            <p>Distance: {(route.distance / 1000).toFixed(2)} km</p>
            <p>Estimated Duration: {Math.round(route.duration / 60)} minutes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteMap;
