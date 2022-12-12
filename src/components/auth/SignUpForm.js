import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signUp } from "../../store/session";
import "./signup.css";

const SignUpForm = ({ setShowSignup }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [signsuc, setSignsuc] = useState(false);
  const navigate = useNavigate();

  const onSignUp = async (e) => {
    e.preventDefault();
    console.log("here");
    if (password === repeatPassword) {
      const [success, msg] = await dispatch(signUp(username, email, password));
      console.log("success signup");
      if (success) {
        console.log("inside if");
        setSignsuc(true);

        setShowSignup(false);
      } else {
        setErrors(msg);
      }
    } else {
      setErrors(["Passwords do not match."]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const cancelForm = (e) => {
    e.preventDefault();
    setShowSignup(false);
  };

  return (
    <div id="signup-container">
      <p id="signup-header">Create Account</p>
      <form id="form-container" onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        <button type="submit">Sign Up</button>
        <button onClick={(e) => cancelForm(e)}>Cancel</button>
      </form>
    </div>
  );
};

export default SignUpForm;
