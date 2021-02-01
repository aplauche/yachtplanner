import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import {
  addActivity,
  removeActivity,
  addWeather,
  removeWeather,
  addTides,
  removeTides,
  activityStore,
  weatherStore,
  tidesStore,
} from "../store.js";

const FilterDiv = styled("div")`
  padding: 32px 20px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 20px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 8px;
  z-index: 2;
  position: relative;
  background-image: url("/images/beach.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-attachment: fixed;

  & .group {
    width: 100%;
    background: white;
    border-radius: 12px;
    padding: 20px;
  }

  & h2 {
    color: white;
    align-self: center;
    text-align: center;
  }

  & h5 {
    margin-bottom: 4px;
    display: block;
  }

  & label {
    margin-bottom: 4px;
    display: block;
  }

  & select {
    width: 100%;
  }
`;

function Filters() {
  const [activity, setActivity] = useState(activityStore.getState());
  const [weather, setWeather] = useState(weatherStore.getState());
  const [tides, setTides] = useState(tidesStore.getState());

  const [activityTypes, setActivityTypes] = useState([]);
  const [tideOptions, setTideOptions] = useState([]);
  const [weatherOptions, setWeatherOptions] = useState([]);

  const handleTideChange = (e) => {
    if (e.target.checked) {
      tidesStore.dispatch(addTides(e.target.name));
    } else {
      tidesStore.dispatch(removeTides(e.target.name));
    }
    console.log(e.target);
  };
  const handleWeatherChange = (e) => {
    if (e.target.checked) {
      weatherStore.dispatch(addWeather(e.target.name));
    } else {
      weatherStore.dispatch(removeWeather(e.target.name));
    }
    console.log(e.target);
  };

  const handleActivityChange = (e) => {
    if (e.target.checked) {
      activityStore.dispatch(addActivity(e.target.name));
    } else {
      activityStore.dispatch(removeActivity(e.target.name));
    }
    console.log(e.target);
  };

  useEffect(() => {
    const getWPActivityTypes = async () => {
      const res = await fetch(window.env.APIURL + "/activity");
      const json = await res.json();

      console.log(json);

      setActivityTypes(json);
    };
    getWPActivityTypes();

    const getWPWeatherOptions = async () => {
      const res = await fetch(window.env.APIURL + "/weather");
      const json = await res.json();

      console.log(json);

      setWeatherOptions(json);
    };
    getWPWeatherOptions();

    const getWPTideOptions = async () => {
      const res = await fetch(window.env.APIURL + "/tide");
      const json = await res.json();

      console.log(json);

      setTideOptions(json);
    };
    getWPTideOptions();

    activityStore.subscribe(() => setActivity(activityStore.getState()));
    tidesStore.subscribe(() => setTides(tidesStore.getState()));
    weatherStore.subscribe(() => setWeather(weatherStore.getState()));
  }, []);

  return (
    <FilterDiv>
      <h2>Filter Destinations</h2>
      <div className="group">
        <h5>
          <label htmlFor="tides">Tides:</label>
        </h5>
        {tideOptions.map((item) => {
          return (
            <label>
              <input
                id={item.slug}
                name={item.id}
                type="checkbox"
                checked={tides.includes(item.id.toString())}
                onChange={handleTideChange}
              />
              {item.name}
            </label>
          );
        })}
        {/* <select name="tides" id="tides" onChange={handleTideChange}>
          <option value="any">Any Tides</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select> */}
      </div>
      <div className="group">
        <h5>
          <label htmlFor="tides">Weather Conditions:</label>
        </h5>
        {weatherOptions.map((item) => {
          return (
            <label>
              <input
                id={item.slug}
                name={item.id}
                type="checkbox"
                checked={weather.includes(item.id.toString())}
                onChange={handleWeatherChange}
              />
              {item.name}
            </label>
          );
        })}
      </div>

      <div className="group">
        <h5>Activities:</h5>
        {activityTypes.map((item) => {
          return (
            <label>
              <input
                id={item.slug}
                name={item.id}
                type="checkbox"
                checked={activity.includes(item.id.toString())}
                onChange={handleActivityChange}
              />
              {item.name}
            </label>
          );
        })}
      </div>
    </FilterDiv>
  );
}

export default Filters;
