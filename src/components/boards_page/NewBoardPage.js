import NewBoardForm from "../../components/boards/BoardForm";

export default function NewBoardPage() {
  function submitFormHandler(data) {
    fetch("http://localhost:5011/requests/create/", {
      method: "POST",
      body: data,
      headers: {
        ContentType: "application/json",
      },
    });
  }
  return (
    <div>
      <NewBoardForm callBackend={submitFormHandler} buttonName="Post Board" />
    </div>
  );
}
