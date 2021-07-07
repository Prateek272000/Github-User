import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import styled from "styled-components";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  const { isLoading } = React.useContext(GithubContext);
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <Wrapper>
          <img src={loadingImage} className="loading-img" alt="loading" />
        </Wrapper>
      </main>
    );
  } else {
    return (
      <main>
        <Navbar />
        <Search />
        <Info />
        <User />
        <Repos />
      </main>
    );
  }
};

const Wrapper = styled.section`
  min-height: 60vh;
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

export default Dashboard;
