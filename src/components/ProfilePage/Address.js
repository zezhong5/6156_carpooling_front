import { useRef, useEffect, useState } from "react";
import "./address.css";

export default function Address(props) {
  const smartyKey = "146285196731897141";
  //   const addressElement = document.getElementById("address");
  //   const suggestionElement = document.getElementById("suggestionBox");
  const addressElement = useRef(null);
  const suggestionElement = useRef(null);
  const [classActive, setClassActive] = useState("inactive");

  useEffect(() => {
    // addressElement.current.addEventListener("keyup", (e) => {
    //   const searchValue = e.target.value;
    //   suggestionElement.innerHTML = "";
    //   if (!searchValue) {
    //     //suggestionElement.classList.remove("active");
    //     //suggestionElement.classList.add("inactive");
    //     setClassActive("inactive");
    //     return;
    //   }
    //   //suggestionElement.classList.remove("inactive");
    //   //suggestionElement.classList.add("active");
    //   setClassActive("active");
    //   sendLookupRequest(searchValue);
    // });
  }, []);

  const sendLookupRequest = async (searchValue) => {
    suggestionElement.current.innerHTML = "";
    setClassActive("active");
    props.setAddress(searchValue);
    const params = new URLSearchParams({
      key: smartyKey,
      search: searchValue,
      source: "all",
    });
    // const params = new URLSearchParams({
    //   input: searchValue,
    //   types: "geocode",
    //   key: api_key,
    //   // source: "all"
    // });
    const request = await fetch(
      `https://us-autocomplete-pro.api.smarty.com/lookup?${params}`
    );
    // const request = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`, {
    //     mode: "no-cors"
    //   }
    // );
    const data = await request.json();
    // console.log(data);
    if (data?.suggestions?.length > 0) formatSuggestions(data.suggestions);
  };

  const formatSuggestions = (suggestions) => {
    console.log("here");
    const formattedSuggestions = suggestions.map((suggestion) => {
      const divElement = document.createElement("div");
      divElement.innerText = `${suggestion.street_line} ${suggestion.city} ${suggestion.state} ${suggestion.zipcode}`;

      divElement.addEventListener("click", () => {
        // suggestionElement.classList.remove("active");
        // suggestionElement.classList.add("inactive");
        setClassActive("inactive");
        populateForm(suggestion);
      });
      return divElement;
    });
    console.log(suggestionElement.current);
    suggestionElement.current.append(...formattedSuggestions);
  };

  const populateForm = (suggestion) => {
    console.log(suggestion);
    //addressElement.current.value = `${suggestion.street_line} ${suggestion.city} ${suggestion.state} ${suggestion.zipcode}`;
    props.setAddress(
      `${suggestion.street_line} ${suggestion.city} ${suggestion.state} ${suggestion.zipcode}`
    );
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          ref={addressElement}
          id="address"
          className="form-control"
          //onChange={(e) => props.setAddress(e.target.value)}
          onChange={(e) => sendLookupRequest(e.target.value)}
          value={props.address_value}
        />
      </div>
      <div
        id="suggestionBox"
        className={classActive}
        ref={suggestionElement}
      ></div>
    </div>
  );
}
