import { useState, useEffect } from "react";

export default function ParticipantList(props) {
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5012/requests/${props.request_id}/participants`)
      .then((response) => response.json())
      .then((data) => setParticipants(data.data));
  }, [props.joined]);

  function fetchInformationForUser(url) {
    console.log(url);
  }

  function createParticipantElements() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>user</th>
            <th>bio</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((data) => {
            return (
              <tr key={data.user_id}>
                <td>{data.user_id}</td>
                <td
                  onClick={() => fetchInformationForUser(data.links.user)}
                  className="link"
                >
                  Link
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      Participants
      {createParticipantElements()}
    </div>
  );
}
