import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

function SetViewOnClick({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, map.getZoom());
    }
  }, [coords, map]);
  return null;
}

export default SetViewOnClick;
