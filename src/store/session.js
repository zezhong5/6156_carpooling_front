import { useNavigate } from "react-router-dom";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/auth", {
    headers: {
      ContentType: "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  console.log(email);
  console.log(password);
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  const response = await fetch("http://127.0.0.1:5011/auth/login", {
    method: "POST",
    body: data,
    headers: {
      ContentType: "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    const user = data.user;
    console.log(user);
    dispatch(setUser(user));
    console.log("dispatch success");
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    } else {
      return ["An error occurred."];
    }
  }
};

export const logout = () => async (dispatch) => {
  console.log("i wang to log out");
  const response = await fetch("http://127.0.0.1:5011/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log("can i reach here????");
    dispatch(removeUser());
  }
};

export const signUp =
  (username, email, password, first_name, last_name) => async (dispatch) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    console.log("begin signup");
    const response = await fetch("http://127.0.0.1:5011/auth/signup", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = response.json();
      // dispatch(setUser(data))

      console.log("signup success in seesion");
      return data;
    } else if (response.status < 500) {
      const data = response.json();
      console.log("signup not success in seesion");
      if (data.errors) {
        return data.errors;
      }
    } else {
      console.log("signup was not success in seesion");
      return ["An error occurred. Please try again."];
    }
  };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("user", action.payload.username);
      localStorage.setItem("user_id", action.payload.id);
      return { user: action.payload };
    case REMOVE_USER:
      localStorage.removeItem("user");
      localStorage.removeItem("user_id");
      return { user: null };
    default:
      return state;
  }
}
