import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "../Components/DestinationCard";
import Map from "../Components/Map";
import Header from "../Components/Header";
import styled from "@emotion/styled";
import Filters from "../Components/Filters";
import { Switch, Route, BrowserRouter, useParams } from "react-router-dom";
import Single from "./Single";
import { activityStore, tidesStore, weatherStore } from "../store";

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

  const { id } = useParams();

  const [activity, setActivity] = useState(activityStore.getState());

  const [tides, setTides] = useState(tidesStore.getState());
  const [weather, setWeather] = useState(weatherStore.getState());

  useEffect(() => {
    const getWPPosts = async () => {
      const res = await fetch(
        window.env.APIURL +
          "/destination?activity=" +
          activity +
          "&weather=" +
          weather +
          "&tide=" +
          tides
      );
      const json = await res.json();

      console.log(weather);

      setPosts(json);
    };
    getWPPosts();

    activityStore.subscribe(() => setActivity(activityStore.getState()));
    tidesStore.subscribe(() => setTides(tidesStore.getState()));
    weatherStore.subscribe(() => setWeather(weatherStore.getState()));
  }, [activity, weather, tides]);

  // const handleTideChange = (value) => {
  //   setTides(value);
  // };

  // const handleWeatherChange = (value) => {
  //   setWeather(value);
  // };

  return (
    <div className="Home">
      <Header />

      <Filters weather={weather} />

      <Switch>
        <Route path="/" exact={true}>
          <GridLayout>
            <Map posts={posts} />
            <div className="destination-grid">
              {posts.map((post) => {
                return <DestinationCard post={post} />;
              })}
            </div>
          </GridLayout>
        </Route>
        <Route path="/:id" exact={true}>
          <GridLayout>
            <Map posts={posts} />
            <Single />
          </GridLayout>
        </Route>
      </Switch>
    </div>
  );
}

export default Home;
