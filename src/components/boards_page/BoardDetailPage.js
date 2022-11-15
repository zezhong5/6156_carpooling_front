import BoardItem from "../../components/boards/BoardItem";
import ParticipantList from "../../components/boards/ParticipantList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function BoardDetailPage(props) {
  const [loadedBoard, setLoadedBoard] = useState([]);
  const [joined, setJoined] = useState(false);
  const [participantElement, setParticipantElement] = useState();
  const navigate = useNavigate();
  const { board_id } = useParams();
  const [capNow, setcapNow] = useState();

  useEffect(() => {
    fetch(`http://localhost:5011/requests/${board_id}`)
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
  }, [board_id, joined]);

  function updateHandler() {
    navigate("/updateBoard", { state: { id: board_id, data: loadedBoard } });
  }

  useEffect(() => {
    console.log("toggle");
    setParticipantElement(
      <ParticipantList request_id={board_id} joined={joined} />
    );
  }, [joined]);

  const check_capacity = () => {
      console.log('here we need to check capacity')
      fetch(`http://localhost:5011/requests/${board_id}/participants`)
          .then((response) => response.json())
          .then((data) => setcapNow(data.length));
      console.log(capNow)

  }

  function joinHandler() {
    console.log(localStorage.getItem('user'));
    check_capacity();
    console.log('1323413324');
    console.log(loadedBoard.capacity);
    if(loadedBoard.capacity < capNow){
        navigate(`/boards/${board_id}`);
    }
    fetch(`http://localhost:5011/requests/${board_id}/participants`, {
      method: "POST",
      headers: { user_id: localStorage.getItem('user') },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
              setJoined(true);
            throw new Error(text);
          });
        }
        response.json();
      })
      .then((rsp) => {
        console.log(rsp);
        setJoined(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function check_joined()  {
      let user_id = localStorage.getItem('user')
      console.log('inside check_joined')
      console.log(user_id)
      let res = fetch(`http://localhost:5011/requests/par/${user_id}/`, {
          method: "GET"
      }).then((response) => response.json()).then((data) => {
          for (const key in data) {
              if (board_id == data[key]['request_id']) {
                  console.log('can i reach equal here');
                  setJoined(true)
              }
          }
      })
      console.log('should print');



      for (let i = 0; i < res.length; i++) {
          console.log(i)
      }



  }

  function leaveHandler() {
    fetch(`http://localhost:5011/requests/${board_id}/participants`, {
      method: "DELETE",
      headers: { user_id: localStorage.getItem('user') },
    })
      .then((response) => response.json())
      .then((rsp) => {
        console.log(rsp);
        setJoined(false);
        console.log(joined);
      });
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
        {check_joined()}
      {joined ? (
        <button className="btn" onClick={leaveHandler}>
          Leave List
        </button>
      ) : (
        <button className="btn" onClick={joinHandler}>
          Join
        </button>
      )}

      {participantElement}
    </div>
  );
}
