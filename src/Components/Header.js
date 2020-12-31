import React, { useEffect } from "react";
import styled from "@emotion/styled";

const HeaderDiv = styled("div")`
  width: 100%;
  height: 75px;
  background: #22446b;

  color: white;

  & .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 20px;
  }
`;

function Header() {
  return (
    <HeaderDiv>
      <div className="container">
        <h1>YACHT PLANNER</h1>
      </div>
    </HeaderDiv>
  );
}

export default Header;
