import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
import { useParams } from "react-router-dom";

function Map({ posts }) {
  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <GoogleMapReact
        apiKey={window.env.MAPS_API_KEY}
        defaultCenter={{
          lat: 18.452490353504203,
          lng: -64.54559990541118,
        }}
        defaultZoom={13}
      >
        {posts.map((post) => {
          return (
            <MapMarker
              lat={parseFloat(post.acf.latitude)}
              lng={parseFloat(post.acf.longitude)}
              post={post}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
