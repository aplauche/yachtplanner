import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

const MapMarkerDiv = styled("div")`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    z-index: 100;
    transform: scale(1.2);
  }

  & .marker {
    max-width: 100%;
  }

  & .info {
    display: none;
    z-index: 100;
    img {
      width: 140px;
      height: 80px;
      object-fit: cover;
    }
  }

  &:hover .info {
    display: block;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -100%);
    left: 50%;
    background: white;

    h3 {
      margin: 0;
      padding: 10px;
    }
  }
`;

function MapMarker({ text, post }) {
  const { id } = useParams();

  return (
    <MapMarkerDiv>
      <img className="marker" src="/images/marker.svg" alt="" />
      <div className="info">
        <img src={post?.acf.featured_image.url} alt="" />
        <div className="content">
          <h3>{post?.title.rendered}</h3>
        </div>
      </div>
    </MapMarkerDiv>
  );
}

export default MapMarker;
