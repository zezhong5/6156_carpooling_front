import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import  Login  from "./Login";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {

    const [showChildComp, setShowChildComp] = useState(false)
    const navigate = useNavigate();
    const onLogin = e => {
        e.preventDefault()
        setShowChildComp(true)
    }


    if (localStorage.user) {
            navigate('/home')
    }




    return(
        <div>
        <button id="login_button" onClick={onLogin}>Login</button>;
        {showChildComp && <Login setShowChildComp = {setShowChildComp} /> }
        </div>);
}

export default LoginButton;