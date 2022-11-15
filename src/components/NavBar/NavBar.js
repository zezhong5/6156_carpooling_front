import React, { useReducer,useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./NavBar.css";
import Logged from "./Logged";
import { Link } from "react-router-dom";
import LoginButton from "../auth/LoginButton";
//import LogoutButton from "../auth/LogoutButton";


const NavBar = () => {

    // add listener to localstorage?
    const [display, setdisplay] = useState(true)

    useEffect(() => {
       /*
        const UserData = (e) => {
            // const item = window.localStorage.getItem('user')
            console.log('can i really get the item in effect????????')
            if (e.key === 'user' && e.oldValue && !e.newValue) {
                setDisplay(false);
            }
            else{
                setDisplay(true);
            }
        }

        */
        console.log('can i really get the item in effect???');




    }, [])





    return (
        <div id="nav-bar-full">
            <div id="nav-bar-left-container">
                <Link id="nav-bar-link" to="/home" ><p>Home</p></Link>
            </div>

            <div id="nav-bar-left-container">
                <Link to="/boards" id="nav-bar-link">Boards</Link>
                <Link to="/boards/create" id="nav-bar-link">New</Link>
                {localStorage.getItem('user') ? <Logged /> : <LoginButton />}

            </div>

        </div>
    );
};
export default NavBar;
