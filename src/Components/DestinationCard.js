import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const CardDiv = styled(Link)`
  width: 100%;
  background: #fff;
  color: #22446b;
  display: block;
  height: auto;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 8px;

  & img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  & .content {
    padding: 10px;
  }
`;

function DestinationCard({ post }) {
  return (
    <CardDiv key={post?.id} to={`/${post?.id}`}>
      <img src={post?.acf.featured_image.url} alt="" />
      <div className="content">
        <h3>{post?.title.rendered}</h3>
        <p>
          <strong>TIDES: </strong>
          {post?.acf.tides}
        </p>
      </div>
    </CardDiv>
  );
}

export default DestinationCard;
