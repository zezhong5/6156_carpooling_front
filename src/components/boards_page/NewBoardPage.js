import NewBoardForm from "../../components/boards/BoardForm";

export default function NewBoardPage() {
  function submitFormHandler(data) {
    console.log(localStorage.getItem("user_id"));
    data = new URLSearchParams(data);
    fetch("/requests/create", {
      method: "POST",
      body: data,
      headers: {
        contentType: "application/x-www-form-urlencoded",
        user_id: localStorage.getItem("user_id"),
      },
    });
  }
  return (
    <div>
      <NewBoardForm callBackend={submitFormHandler} buttonName="Post Board" />
    </div>
  );
}
