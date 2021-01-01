import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "../Components/DestinationCard";
import Map from "../Components/Map";
import Header from "../Components/Header";
import styled from "@emotion/styled";
import Filters from "../Components/Filters";

const GridLayout = styled("div")`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 50px;
  // background: #6889b4;
  background: white;
  padding: 0px;

  & .destination-grid {
    padding: 50px 20px;
    align-items: start;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [weather, setWeather] = useState([
    { name: "sunny", value: "sunny", isChecked: false },
    { name: "windy", value: "windy", isChecked: false },
    { name: "rain", value: "rain", isChecked: false },
    { name: "overcast", value: "overcast", isChecked: false },
  ]);
  const [tides, setTides] = useState("any");

  useEffect(() => {
    const getWPPosts = async () => {
      const res = await fetch(window.env.APIURL + "/destination");
      const json = await res.json();

      console.log(json);

      setPosts(json);
    };
    getWPPosts();
  }, []);

  useEffect(() => {
    let filtered = posts?.filter((post) => {
      // Tides filter
      if (
        tides != "any" &&
        post.acf.tides != "any" &&
        post.acf.tides != tides
      ) {
        return false;
      }

      // Weather Filter
      if (
        weather.filter((checkbox) => (checkbox.isChecked ? true : false))
          .length > 0 &&
        !post.acf.weather.some((item) => {
          var temp = weather.map((checkbox) => {
            return checkbox.isChecked ? checkbox.value : false;
          });
          return temp.includes(item) ? true : false;
        })
      ) {
        return false;
      }

      // Activity Filter

      return true;
    });
    setFilteredPosts([...filtered]);
  }, [tides, weather, posts]);

  const handleTideChange = (value) => {
    setTides(value);
  };

  const handleWeatherChange = (value, isChecked) => {
    let newWeather = weather;
    newWeather.forEach((item) => {
      if (item.value == value) {
        item.isChecked = isChecked;
      }
    });

    setWeather([...newWeather]);
  };

  return (
    <div className="Home">
      <Header />

      <Filters
        setTides={handleTideChange}
        weather={weather}
        setWeather={handleWeatherChange}
      />

      <GridLayout>
        <Map posts={filteredPosts} />
        <div className="destination-grid">
          {/* LEGACY INLINE FILTERING */}
          {/* {posts?.map((post) => {
            // Tides filter
            if (tides != "any" && post.acf.tides != tides) {
              return null;
            }

            // Weather Filter
            if (
              weather.filter((checkbox) => (checkbox.isChecked ? true : false))
                .length > 0 &&
              !post.acf.weather.some((item) => {
                var temp = weather.map((checkbox) => {
                  return checkbox.isChecked ? checkbox.value : false;
                });
                return temp.includes(item) ? true : false;
              })
            ) {
              return null;
            }

            // Activity Filter

            return <DestinationCard post={post} />;
          })} */}

          {filteredPosts.map((post) => {
            return <DestinationCard post={post} />;
          })}
        </div>
      </GridLayout>
    </div>
  );
}

export default Home;
