import GoogleIcon from "mdi-react/GoogleIcon";
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
      <GoogleIcon />
      <span>Login with Google</span>
    </a>
  );
};

export default GithubOauth;
