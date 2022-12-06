import "./Login.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Modal } from "../../context/Modal";
import LoginOptions from "../LoginOption/LoginOption";
import GithubOauth from "./GithubOauth";

//to do:login in two different tabs
const Login = ({ setShowChildComp }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  const session = useSelector((state) => state.session);

  useEffect(() => {
    if (localStorage.user) {
      navigate("/home");
    }
  }, [localStorage.user]);

  const handleCancel = (e) => {
    e.preventDefault();
    setShowChildComp(false);
  };

  return (
    <div id="splash-outer-wrapper">
      <Modal>
        <div className="home_component">
          {showLogin && (
            <Modal>
              <LoginForm setShowLogin={setShowLogin} />
            </Modal>
          )}
          {showSignup && (
            <Modal>
              <SignUpForm setShowSignup={setShowSignup} />
            </Modal>
          )}

          <div className="middle-image-streach">
            <LoginOptions
              setShowLogin={setShowLogin}
              setShowSignup={setShowSignup}
            />
          </div>
          <button onClick={(e) => handleCancel(e)}>Cancel</button>
        </div>
      </Modal>
      <GithubOauth />
    </div>
  );
};

export default Login;
