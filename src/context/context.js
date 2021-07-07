import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setgithubUser] = useState(mockUser);
  const [repos, setrepos] = useState(mockRepos);
  const [followers, setfollowers] = useState(mockFollowers);

  // req loading
  const [requests, setrequests] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    // toggle error message
    toggleError();
    setisLoading(true);

    const response = await axios(`${rootUrl}/users/${user}`).catch((error) => {
      console.log(error);
    });

    if (response) {
      setgithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}`),
      ]).then((result) => {
        const [repos, followers] = result;
        const status = "fulfilled";
        if (repos.status === status) {
          setrepos(repos.value.data);
        }
        if (followers.status === status) {
          setfollowers(followers.value.data);
        }
      });

      //   axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => {
      //     setrepos(response.data);
      //   });

      //   axios(`${followers_url}`).then((response) => {
      //     setfollowers(response.data);
      //   });
    } else {
      toggleError(true, "it seems you have typed the username incorrectly.");
    }
    checkRequest();
    setisLoading(false);
  };

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setrequests(remaining);
        if (remaining === 0) {
          toggleError(
            true,
            "Sorry, You have exceeded your hourly limit !!!  Try again in after an hour"
          );
        }
      })
      .catch((error) => console.log(error));
  };

  function toggleError(show = false, msg = "") {
    seterror({ show, msg });
  }

  //error
  //   if(   )

  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
