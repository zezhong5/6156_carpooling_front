import "./home.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from '../auth/LoginForm'
import SignUpForm from "../auth/SignUpForm";
import { Modal } from '../../context/Modal';
import LoginOptions from "../LoginOption/LoginOption";

const Home = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const navigate = useNavigate();
    const session = useSelector((state) => state.session);


    useEffect(() => {
        if (localStorage.user) {
           navigate('/home')
        }

    }, [navigate, localStorage.user])



    return (

        <div id='splash-outer-wrapper'>


            <div className="home_component">
                {showLogin &&
                    <Modal>
                        <LoginForm setShowLogin={setShowLogin} />
                    </Modal>
                }
                {showSignup &&
                    <Modal>
                        <SignUpForm setShowSignup={setShowSignup} />
                    </Modal>
                }

                <div className="middle-image-streach" >
                    <LoginOptions setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
                </div>
            </div>
        </div>
    );
};

export default Home;

