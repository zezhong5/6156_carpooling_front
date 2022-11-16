import BoardForm from "../../components/boards/BoardForm";
import { useLocation } from "react-router-dom";

export default function UpdateBoardPage(props) {
  const location = useLocation();

  function updateFormHandler(data) {
    fetch(`http://localhost:5011/requests/${location.state.id}`, {
      method: "PUT",
      body: data,
      headers: {
        ContentType: "application/json",
        user_id: localStorage.getItem("user_id"),
      },
    })
      .then((response) => response.json())
      .then((rsp) => console.log(rsp));
  }
  return (
    <div>
      <h1> Update your request</h1>
      <BoardForm
        callBackend={updateFormHandler}
        data={location.state.data}
        buttonName="Update"
      />
    </div>
  );
}
