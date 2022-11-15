import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewBoardForm(props) {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    if (props.data) {
      setStart(props.data.start_location);
      setDestination(props.data.destination);
      setCapacity(props.data.capacity);
      setTime(props.data.start_time);
      setDate(props.data.launch_date);
      setDescription(props.data.description);

      console.log(date);
      console.log(time);
      console.log(start);
      console.log(props.data);
    }
  }, []);

  function submitHandler(event) {
    event.preventDefault();

    const data = new FormData();
    data.append("start_location", start);
    data.append("destination", destination);
    data.append("time", time);
    data.append("date", date);
    data.append("description", description);
    data.append("capacity", capacity);

    props.callBackend(data);
    navigate(-1);
  }

  function cancelHandler(e) {
    e.preventDefault();

    navigate("/boards");
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="start_location">Start Location</label>
        <input
          type="text"
          required
          id="start_location"
          className="form-control"
          onChange={(e) => setStart(e.target.value)}
          value={start}
        />
      </div>
      <div className="form-group">
        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          required
          id="destination"
          className="form-control"
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Start Time</label>
        <input
          type="time"
          required
          id="time"
          className="form-control"
          onChange={(e) => setTime(e.target.value)}
          value={time}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          required
          id="date"
          className="form-control"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          required
          id="description"
          row="5"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="capacity">Capacity</label>
        <input
          type="number"
          required
          id="capacity"
          className="form-control"
          onChange={(e) => setCapacity(e.target.value)}
          value={capacity}
        />
      </div>
      <button className="btn btn-primary">{props.buttonName}</button>
      <button className="btn btn-gray" onClick={cancelHandler}>
        Cancel
      </button>
    </form>
  );
}
