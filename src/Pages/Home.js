import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getWPPosts = async () => {
      const res = await fetch("http://headless.local/wp-json/wp/v2/posts");
      const json = await res.json();

      console.log(json);

      setPosts(json);
    };
    getWPPosts();
  }, []);
  return (
    <div className="Home">
      <h1>My Wordpress Posts</h1>
      {posts?.map((post) => {
        return (
          <Link key={post.id} to={`/${post.id}`}>
            <h3>{post.title.rendered}</h3>
          </Link>
        );
      })}
    </div>
  );
}

export default Home;
