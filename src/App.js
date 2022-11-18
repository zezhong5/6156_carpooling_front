import React, { useState, useEffect, Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authenticate } from "./store/session";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./components/home/homepage";
import HomePage2 from "./components/home/homepage2";
import Home from "./components/home/home";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import BoardDetailPage from "./components/boards_page/BoardDetailPage";
import { render } from "react-dom";
import AllBoardsPage from "./components/boards_page/AllBoardPage";
import NewBoardPage from "./components/boards_page/NewBoardPage";

function App() {
  const [loaded, setLoaded] = useState(true);
  const [disnav, setDisnav] = useState(true);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  /*
    useEffect(() => {
        (async () => {
            console.log('effect')
            await dispatch(authenticate());
            // setLoaded(true);
        })();
    }, [dispatch]);

    console.log(loaded)

    if (!loaded) {
        return null
    }

 */
  useEffect(() => {
    function UserData() {
      const item = localStorage.getItem("user");
      if (item) {
        setDisnav(true);
      } else {
        setDisnav(false);
      }
    }
    window.addEventListener("storage", UserData);
    return () => {
      window.removeEventListener("storage", UserData);
    };
  }, []);
  if (session.user) {
    <Navigate to="/home" />;
  } else {
    <Navigate to="/" />;
  }
  /*
    render()
    {
        let navbar = null
        if (localStorage.getItem('user')) {
            navbar = <NavBar/>
        }
        else {
            navbar = null

        }
    }

     */

  return (
    <BrowserRouter>
      {localStorage.getItem("user") ? <NavBar /> : null}

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<HomePage />} path="/home" exact />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<HomePage2 />} path="/home2" exact />
        </Route>
        <Route element={<Home />} path="/" exact />
        <Route element={<ProtectedRoute />}>
          <Route path="/boards" element={<AllBoardsPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/boards/:board_id" element={<BoardDetailPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/boards/create" element={<NewBoardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
