import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

function Map() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        apiKey={window.env.MAPS_API_KEY}
        defaultCenter={{
          lat: 18.452490353504203,
          lng: -64.54559990541118,
        }}
        defaultZoom={11}
      >
        <MapMarker
          lat={18.452490353504203}
          lng={-64.54559990541118}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
