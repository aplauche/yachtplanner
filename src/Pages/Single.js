import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const SingleDestinationDiv = styled("div")`
  padding: 50px 32px;
  height: 70vh;
  overflow: scroll;

  & img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  & a {
    color: #22446b !important;
    display: block;
    margin-bottom: 20px;
  }

  & section {
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 32px;
    padding: 0px 20px;
  }
`;

const StatsDiv = styled("div")`
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin-top: -32px;
  z-index: 2;
`;

function Single() {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getWPPost = async () => {
      const res = await fetch(window.env.APIURL + "/destination/" + id);
      const json = await res.json();

      console.log(json);

      setPost(json);
    };
    getWPPost();
  }, []);

  return (
    <SingleDestinationDiv>
      <Link to="/">{"< Back to Browse"}</Link>
      <img src={post?.acf?.featured_image?.url} alt="" />
      <section>
        <div>
          <h1>{post?.title?.rendered}</h1>
          <div> {ReactHtmlParser(post?.acf?.description)}</div>
        </div>
        <StatsDiv>
          <h3>DETAILS</h3>
          <p>
            <strong>Type of Activities:</strong>
          </p>
          <ul>
            {post?.acf?.activity?.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
          <p>
            <strong>Recommended Weather:</strong>
          </p>
          <ul>
            {post?.acf?.weather?.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
        </StatsDiv>
      </section>
    </SingleDestinationDiv>
  );
}

export default Single;
