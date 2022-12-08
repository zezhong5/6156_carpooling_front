import { useLocation } from "react-router-dom";
import ProfileForm from "./ProfileForm";

export default function ProfileUpdatePage(props) {
  const location = useLocation();

  function updateProfileHandler(data) {
    data = new URLSearchParams(data);
    fetch(`http://localhost:5011/contacts/users`, {
      method: "PUT",
      body: data,
      headers: {
        contentType: "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((rsp) => console.log(rsp));
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
