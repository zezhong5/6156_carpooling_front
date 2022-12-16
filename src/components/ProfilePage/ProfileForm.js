import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Address from "./Address";

export default function ProfileForm(props) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (props.data) {
      setFirst(props.data.first_name);
      setLast(props.data.last_name);
      setAddress(props.data.address);
      setPhone(props.data.phone);
      setEmail(props.data.email);
    }
  }, []);

  function submitHandler(event) {
    event.preventDefault();

    const data = new FormData();
    data.append("first_name", first);
    data.append("last_name", last);
    data.append("address", address);
    data.append("phone", phone);

    props.callBackend(data);
    window.location.reload(false);
  }

  function cancelHandler(e) {
    e.preventDefault();
    props.back(false);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          className="form-control"
          onChange={(e) => setFirst(e.target.value)}
          value={first}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          className="form-control"
          onChange={(e) => setLast(e.target.value)}
          value={last}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          className="form-control"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      </div>
      <Address setAddress={setAddress} address_value={address} />

      <button className="btn btn-primary">Submit</button>
      <button className="btn btn-gray" onClick={cancelHandler}>
        Cancel
      </button>
    </form>
  );
}
