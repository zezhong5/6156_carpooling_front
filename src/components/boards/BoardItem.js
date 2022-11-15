export default function BoardItem(props) {
  return (
    <div className="card">
      <div className="card-header">Board</div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>

        <p className="card-text">start location: {props.data.start_location}</p>
        <p className="card-text">destination: {props.data.destination}</p>
        <p className="card-text">launch date: {props.data.launch_date}</p>
        <p className="card-text">time: {props.data.start_time}</p>
        {props.showDetails && (
          <p className="card-text">description: {props.data.description}</p>
        )}
        <footer className="blockquote-footer">
          capacity: {props.data.capacity}
        </footer>
      </div>
    </div>
  );
}
