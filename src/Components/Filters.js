import React, { useEffect } from "react";
import styled from "@emotion/styled";

const FilterDiv = styled("div")`
  padding: 32px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
  }

  & p {
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

function Filters({ setTides, setWeather, weather }) {
  const handleTideChange = (e) => {
    setTides(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.name, e.target.checked);
  };

  return (
    <FilterDiv>
      <h2>Filter Destinations</h2>
      <div className="group">
        <p>
          <label htmlFor="tides">Tides:</label>
        </p>
        <select name="tides" id="tides" onChange={handleTideChange}>
          <option value="any">Any</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="group">
        <p>Weather Conditions:</p>
        {weather.map((item) => {
          return (
            <label key={item.name}>
              <input
                id={item.name}
                name={item.value}
                type="checkbox"
                checked={item.isChecked}
                onChange={handleWeatherChange}
              />
              {item.value}
            </label>
          );
        })}
      </div>
    </FilterDiv>
  );
}

export default Filters;
