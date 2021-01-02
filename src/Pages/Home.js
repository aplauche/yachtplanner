import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "../Components/DestinationCard";
import Map from "../Components/Map";
import Header from "../Components/Header";
import styled from "@emotion/styled";
import Filters from "../Components/Filters";
import { Switch, Route, BrowserRouter, useParams } from "react-router-dom";
import Single from "./Single";

const GridLayout = styled("div")`
  display: grid;
  grid-template-columns: 1fr 2fr;

  // background: #6889b4;
  background: white;
  background: #e0effa;
  padding: 0px;

  & .destination-grid {
    padding: 50px 32px;
    align-items: start;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    height: 70vh;
    overflow: auto;
  }
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { id } = useParams();

  // const [weather, setWeather] = useState([
  //   { name: "sunny", value: "sunny", isChecked: false },
  //   { name: "windy", value: "windy", isChecked: false },
  //   { name: "rain", value: "rain", isChecked: false },
  //   { name: "overcast", value: "overcast", isChecked: false },
  // ]);

  const [activity, setActivity] = useState([
    { name: "Water Sports", value: "water_sports", isChecked: false },
    { name: "Scuba", value: "scuba", isChecked: false },
    { name: "Hiking", value: "hiking", isChecked: false },
    { name: "Historic Sites", value: "historic", isChecked: false },
    { name: "Dining", value: "dining", isChecked: false },
    { name: "Relaxation", value: "relax", isChecked: false },
  ]);

  const [tides, setTides] = useState("any");
  const [weather, setWeather] = useState("any");

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
        weather != "any" &&
        !post.acf.weather.some((item) => {
          return item == weather;
        })
      ) {
        return false;
      }

      // Activity Filter
      if (
        activity.filter((checkbox) => (checkbox.isChecked ? true : false))
          .length > 0 &&
        !post.acf.activity.some((item) => {
          var temp = activity.map((checkbox) => {
            return checkbox.isChecked ? checkbox.value : false;
          });
          return temp.includes(item) ? true : false;
        })
      ) {
        return false;
      }

      return true;
    });
    setFilteredPosts([...filtered]);
  }, [tides, weather, posts, activity]);

  const handleTideChange = (value) => {
    setTides(value);
  };

  const handleWeatherChange = (value) => {
    setWeather(value);
  };

  const handleActivityChange = (value, isChecked) => {
    let newActivity = activity;
    newActivity.forEach((item) => {
      if (item.value == value) {
        item.isChecked = isChecked;
      }
    });

    setActivity([...newActivity]);
  };

  return (
    <div className="Home">
      <Header />

      <Filters
        setTides={handleTideChange}
        weather={weather}
        activity={activity}
        setWeather={handleWeatherChange}
        setActivity={handleActivityChange}
      />

      <Switch>
        <Route path="/" exact={true}>
          <GridLayout>
            <Map posts={filteredPosts} />
            <div className="destination-grid">
              {filteredPosts.map((post) => {
                return <DestinationCard post={post} />;
              })}
            </div>
          </GridLayout>
        </Route>
        <Route path="/:id" exact={true}>
          <GridLayout>
            <Map posts={filteredPosts} />
            <Single />
          </GridLayout>
        </Route>
      </Switch>
    </div>
  );
}

export default Home;
