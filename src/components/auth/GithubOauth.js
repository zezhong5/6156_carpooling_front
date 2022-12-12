import GithubIcon from "mdi-react/GithubIcon";
import { githubLogin } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

const GithubOauth = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const onLogin = () => {
    fetch("http://127.0.0.1:5011/oauth/login/google").then((rsp) => {
      console.log("reach");
    });
  };
  return (
    <a className="login-link" href="http://127.0.0.1:5011/oauth/login/google">
      <GithubIcon />
      <span>Login with Github</span>
    </a>
  );
};

export default GithubOauth;
