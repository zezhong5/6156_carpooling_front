import { useState, useEffect } from "react";
import BoardList from "../../components/boards/BoardList";
function AllBoardsPage() {
  const [loadedBoards, setLoadedBoards] = useState([]);
  const [endPointUrl, setEndPointUrl] = useState("/requests");

  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  useEffect(() => {
    fetch(endPointUrl)
      .then((response) => {
        console.log(response.status);
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        setLoadedBoards(data.data);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [endPointUrl]);

  return (
    <div>
      <BoardList data={loadedBoards} />
      <PageinateButton
        setUrl={setEndPointUrl}
        value="Prev"
        endPointUrl={prevUrl}
      />
      <PageinateButton
        setUrl={setEndPointUrl}
        value="Next"
        endPointUrl={nextUrl}
      />
    </div>
  );
}

function PageinateButton(props) {
  function clickHandler() {
    console.log(props.endPointUrl);
    props.setUrl(props.endPointUrl);
  }
  return (
    <button
      onClick={clickHandler}
      className="btn btn-gray"
      disabled={props.endPointUrl === ""}
    >
      {props.value}
    </button>
  );
}

export default AllBoardsPage;
