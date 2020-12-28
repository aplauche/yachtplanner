import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    weather: ["windy: Windy"],
    tides: "any",
  });

  useEffect(() => {
    const getWPPosts = async () => {
      const res = await fetch(window.env.APIURL + "/destination");
      const json = await res.json();

      console.log(json);

      setPosts(json);
    };
    getWPPosts();
  }, []);
  return (
    <div className="Home">
      <h1>Destinations</h1>
      {posts?.map((post) => {
        if (filter.tides != "any" && post.acf.tides != filter.tides) {
          return null;
        }

        if (!post.acf.weather_.some((item) => filter.weather.includes(item))) {
          return null;
        }

        return (
          <Link key={post.id} to={`/${post.id}`}>
            <h3>{post.title.rendered}</h3>
            <img src={post.acf.featured_image.url} alt="" />
            <strong>TIDES:</strong>
            {post.acf.tides}
          </Link>
        );
      })}
    </div>
  );
}

export default Home;
