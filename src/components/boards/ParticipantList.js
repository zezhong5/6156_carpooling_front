import { useState, useEffect } from "react";

export default function ParticipantList(props) {
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
          {props.participants.map((data) => {
            return (
              <tr key={data.user_id}>
                <td>{data.user_id}</td>
                <td
                  onClick={() => props.fetchInformationForUser(data.links.user)}
                  className="link"
                >
                  Link Bio
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
