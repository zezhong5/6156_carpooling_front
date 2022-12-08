import NewBoardForm from "../../components/boards/BoardForm";

export default function NewBoardPage() {
  function submitFormHandler(data) {
    console.log(localStorage.getItem("user_id"));
    data = new URLSearchParams(data);
    fetch(
      "https://pjcazp54o3.execute-api.us-east-1.amazonaws.com/dev/requests/create",
      {
        method: "POST",
        body: data,
        headers: {
          contentType: "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
  }
  return (
    <div>
      <NewBoardForm callBackend={submitFormHandler} buttonName="Post Board" />
    </div>
  );
}
