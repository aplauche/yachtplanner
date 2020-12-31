import React, { useEffect } from "react";
import styled from "@emotion/styled";

const FilterDiv = styled("div")`
  background: white;
  border-radius: 12px;
  min-height: 600px;
  padding: 20px;

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
      <p>
        <label htmlFor="tides">Tides:</label>
      </p>
      <select name="tides" id="tides" onChange={handleTideChange}>
        <option value="any">Any</option>
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>

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
    </FilterDiv>
  );
}

export default Filters;
