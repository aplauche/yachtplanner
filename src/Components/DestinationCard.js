import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const CardDiv = styled(Link)`
  width: 100%;
  background: #fff;
  color: #22446b;
  display: block;
  height: auto;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 4px 8px;
  border-radius: 20px;
  transition: all 0.3s ease;

  & img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 20px;
  }

  & h3 {
    margin: 8px 0px;
  }

  & .content {
    padding: 10px;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 20px;
    transform: scale(1.01);
  }
`;

function DestinationCard({ post }) {
  return (
    <CardDiv key={post?.id} to={`/${post?.id}`}>
      <img src={post?.acf.featured_image.url} alt="" />
      <div className="content">
        <h3>{post?.title.rendered}</h3>
        <p>{ReactHtmlParser(post.acf.description)}</p>
        {/* <p>
          <strong>TIDES: </strong>
          {post?.acf.tides}
        </p> */}
      </div>
    </CardDiv>
  );
}

export default DestinationCard;
