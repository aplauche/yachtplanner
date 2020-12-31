import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "../Components/DestinationCard";
import Header from "../Components/Header";
import styled from "@emotion/styled";
import Filters from "../Components/Filters";

const GridLayout = styled("div")`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 50px;
  background: #6889b4;
  padding: 50px 6%;

  & .sidebar {
    background: white;
    border-radius: 12px;
    min-height: 600px;
  }

  & .destination-grid {
    align-items: start;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    weather: ["rain"],
    tides: "any",
  });

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

      <GridLayout>
        <Filters
          setTides={handleTideChange}
          weather={weather}
          setWeather={handleWeatherChange}
        />
        <div className="destination-grid">
          {posts?.map((post) => {
            if (tides != "any" && post.acf.tides != tides) {
              return null;
            }

            if (
              !post.acf.weather.some((item) => {
                var temp = weather.map((checkbox) => {
                  return checkbox.isChecked ? checkbox.value : false;
                });
                return temp.includes(item) ? true : false;
              })
            ) {
              return null;
            }

            return <DestinationCard post={post} />;
          })}
        </div>
      </GridLayout>
    </div>
  );
}

export default Home;
