import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import loadingGif from "../images/preloader.gif";
import styled from "styled-components";
function AuthWrapper({ children }) {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt="spinner" />
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>OOPS....{error.message}</h1>
        <Router>
          <Link to="/" className="btn">
            Back Home
          </Link>
        </Router>
        <h2>Please Refresh</h2>
      </Wrapper>
    );
  }
  return <>{children}</>;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 60%;
    display: block;
    box-shadow: rgb(0 0 0 / 9%) 0px 2px 1px, rgb(0 0 0 / 9%) 0px 4px 2px,
      rgb(0 0 0 / 9%) 0px 8px 4px, rgb(0 0 0 / 9%) 0px 16px 8px,
      rgb(0 0 0 / 9%) 0px 32px 16px;
    border-radius: 30px;
  }
`;

export default AuthWrapper;
