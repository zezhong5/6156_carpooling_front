import {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./Logged.css";

const Logged = () => {
    //Checking login status
    const [logged, setLogged] = useState("");

    //grabbing the logged individual
    const session = useSelector((state) => state.session);
    const user = localStorage.getItem('user')
    //Session checking
    useEffect(() => {
        console.log('this is username')
        console.log(user)
        setLogged( user ? user: "none");
    }, [user]);

    return (
        <div id="nav-bar-drop-down">
            <div id="nav-bar-drop-down-header" className="dont-close">Welcome, {logged}.</div>


            <LogoutButton />

        </div>

    );
};

export default Logged;