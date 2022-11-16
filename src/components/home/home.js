import "./home.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { Modal } from "../../context/Modal";
import LoginOptions from "../LoginOption/LoginOption";
import AllBoardPage from "../boards_page/AllBoardPage";

const Home = () => {
  const navigate = useNavigate();
  const session = useSelector((state) => state.session);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (localStorage.user) {
      navigate("/home");
    }
  }, [localStorage.user]);

  return (
    <div id="splash-outer-wrapper">
      <div className="home_component">
        <h1 id="home-right-header">Welcome to Car Pooling Scheduler</h1>
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
      </div>
    </div>
  );
};

export default Home;
