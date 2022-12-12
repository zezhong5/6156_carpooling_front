import { useLocation } from "react-router-dom";
import ProfileForm from "./ProfileForm";

export default function ProfileUpdatePage(props) {
  const location = useLocation();

  function updateProfileHandler(data) {
    data = new URLSearchParams(data);
    fetch(
      `https://pjcazp54o3.execute-api.us-east-1.amazonaws.com/dev/contacts/user`,
      {
        method: "PUT",
        body: data,
        headers: {
          contentType: "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((rsp) => {
        console.log(rsp);
        props.refresh(true);
      });
  }
  return (
    <div>
      <h1> Update your Profile</h1>
      <ProfileForm
        callBackend={updateProfileHandler}
        data={props.data}
        back={props.back}
      />
    </div>
  );
}
