import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

function Single() {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getWPPost = async () => {
      const res = await fetch(
        "http://headless.local/wp-json/wp/v2/posts/" + id
      );
      const json = await res.json();

      console.log(json);

      setPost(json);
    };
    getWPPost();
  }, []);

  return (
    <>
      <Link to="/">Back to home</Link>
      <section>
        <h1>{post?.title?.rendered}</h1>
        <div> {ReactHtmlParser(post?.content?.rendered)}</div>
      </section>
    </>
  );
}

export default Single;
