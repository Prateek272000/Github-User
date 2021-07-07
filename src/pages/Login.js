import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-img.jpg";
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="github User" />
        <h1>Github User</h1>
        <button className="btn" onClick={loginWithRedirect}>
          Login / Sign Up{" "}
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
    border-radius: 20px;
    box-shadow: 13px 16px 10px rgb(0 0 0 / 30%);
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
