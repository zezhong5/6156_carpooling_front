import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";

function GoogleLoggedIn(props) {
  const [refresh, setRefresh] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (refresh) {
      props.showNav(true);
      nav("/home");
    }
  }, [refresh]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    console.log(token);
    if (token) {
      localStorage.setItem("access_token", token);
    }
    fetch(
      "https://pjcazp54o3.execute-api.us-east-1.amazonaws.com/dev/oauth/authorize",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user", data.user.username);
        localStorage.setItem("user_id", data.user.id);
        setRefresh(true);
      });
  }, []);
}

export default GoogleLoggedIn;
