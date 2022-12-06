import GithubIcon from "mdi-react/GithubIcon";
import { githubLogin } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

const GithubOauth = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const onLogin = async () => {
    console.log("successful login");
    const data = await dispatch(githubLogin());
    if (data) {
      setErrors(data);
    }
  };
  return (
    <a className="login-link" onClick={() => onLogin()}>
      <GithubIcon />
      <span>Login with Github</span>
    </a>
  );
};

export default GithubOauth;
