import BoardItem from "../../components/boards/BoardItem";
import ParticipantList from "../../components/boards/ParticipantList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import ProfileInfo from "./ProfileInfo";
import ProfileUpdatePage from "./ProfileUpdatePage";

export default function ProfilePage(props) {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log("reach");
    fetch(
      `https://pjcazp54o3.execute-api.us-east-1.amazonaws.com/dev/contacts/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        console.log("success");
        console.log(data);
        setUserInfo(data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(logout());
      });
  }, [false]);

  function fetchInformationForUser(url) {
    console.log(url);
  }

  function updateHandler(e) {
    e.preventDefault();

    setIsEditing(true);
  }

  return (
    <div>
      <h1>Profile</h1>
      {isEditing ? (
        <ProfileUpdatePage
          data={userInfo}
          back={setIsEditing}
          refresh={setRefresh}
        />
      ) : (
        <>
          <ProfileInfo data={userInfo} />
          <button className="btn" onClick={(e) => updateHandler(e)}>
            Update
          </button>
        </>
      )}
    </div>
  );
}
