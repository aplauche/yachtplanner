import React, { useEffect } from "react";
import styled from "@emotion/styled";

const MapMarkerDiv = styled("div")``;

function MapMarker({ text }) {
  return (
    <MapMarkerDiv>
      <p>{text}</p>
    </MapMarkerDiv>
  );
}

export default MapMarker;
