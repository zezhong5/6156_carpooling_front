import BoardItem from "../../components/boards/BoardItem";
import ParticipantList from "../../components/boards/ParticipantList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function BoardDetailPage(props) {
  const [loadedBoard, setLoadedBoard] = useState([]);
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();
  const { board_id } = useParams();
  const user_id = localStorage.getItem("user_id");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetch(`/requests/${board_id}`)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        setLoadedBoard(data.data[0]);
      })
      .catch((error) => {
        navigate("/boards");
      });
  }, [board_id]);

  function updateHandler() {
    navigate("/updateBoard", { state: { id: board_id, data: loadedBoard } });
  }

  useEffect(() => {
    fetch(`/requests/${board_id}/participants`)
      .then((response) => response.json())
      .then((data) => {
        const participantList = data.data;
        setParticipants(participantList);
        const ifJoined = participantList.find(
          (element) => element.user_id == localStorage.getItem("user_id")
        );
        setJoined(ifJoined);
      });
  }, []);

  function joinHandler() {
    if (loadedBoard.capacity <= participants.length) {
      console.log("unable to join, full");
      return;
    }
    fetch(`/requests/${board_id}/participants`, {
      method: "POST",
      headers: { user_id: user_id },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        response.json();
      })
      .then((rsp) => {
        console.log(participants);
        setParticipants((old) => [
          ...old,
          { request_id: board_id, user_id: user_id },
        ]);
        setJoined(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function leaveHandler() {
    fetch(`/requests/${board_id}/participants`, {
      method: "DELETE",
      headers: { user_id: user_id },
    })
      .then((response) => response.json())
      .then((rsp) => {
        console.log(rsp);
        setJoined(false);
        setParticipants(participants.filter((user) => user.user_id != user_id));
      });
  }

  function fetchInformationForUser(url) {
    console.log(url);
  }

  return (
    <div>
      <h1>Detail Information Page {board_id}</h1>
      <BoardItem showDetails={true} data={loadedBoard} />
      <button className="btn" onClick={updateHandler}>
        Edit
      </button>
      <button className="btn" onClick={() => navigate("/boards")}>
        Back
      </button>
      {joined ? (
        <button className="btn" onClick={leaveHandler}>
          Leave List
        </button>
      ) : (
        <button className="btn" onClick={joinHandler}>
          Join
        </button>
      )}

      <ParticipantList
        participants={participants}
        fetchInformationForUser={fetchInformationForUser}
      />
    </div>
  );
}
