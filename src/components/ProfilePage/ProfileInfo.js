export default function ProfileInfo(props) {
  return (
    <div className="card">
      <div className="card-header">Profile</div>
      <div className="card-body">
        <p className="card-text">First Name: {props.data.first_name}</p>
        <p className="card-text">Last Name: {props.data.last_name}</p>
        <p className="card-text">Address: {props.data.address}</p>
        <p className="card-text">Phone: {props.data.phone}</p>
        <p className="card-text">email: {props.data.email}</p>
      </div>
    </div>
  );
}
