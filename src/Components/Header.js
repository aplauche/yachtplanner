import React, { useEffect } from "react";
import styled from "@emotion/styled";

const HeaderDiv = styled("div")`
  width: 100%;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 8px;

  color: #22446b;

  & img {
    height: 50px;
    margin: 16px;
  }

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
        <img src="/images/yacht-logo.svg" alt="" />
      </div>
    </HeaderDiv>
  );
}

export default Header;
