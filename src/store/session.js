import { useNavigate } from "react-router-dom";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_TOKEN = "session/SET_TOKEN";
const REMOVE_TOKEN = "session/REMOVE_TOKEN";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setAccessToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

const removeAccessToken = () => ({
  type: REMOVE_TOKEN,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch(
    "https://pjcazp54o3.execute-api.us-east-1.amazonaws.com/dev/oauth/github",
    {
      headers: {
        ContentType: "application/json",
      },
    }
  );
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
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  const data = new URLSearchParams(formData);
  const response = await fetch(
    "https://pjcazp54o3.execute-api.us-east-1.amazonaws.com/dev/login",
    {
      method: "POST",
      body: data,
      headers: {
        contentType: "application/x-www-form-urlencoded",
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    const user = data.user;
    console.log(user);
    dispatch(setUser(user));
    console.log(data.access_token);
    dispatch(setAccessToken(data.access_token));
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

export const githubLogin = () => async (dispatch) => {
  const response = await fetch("http://127.0.0.1:5011/oauth2/login/google/");
  console.log("here");
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
  dispatch(removeUser());
  dispatch(removeAccessToken());
  // const response = await fetch("http://127.0.0.1:5011/auth/logout", {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // if (response.ok) {
  //   console.log("logging out");
  //   dispatch(removeUser());
  //   dispatch(removeAccessToken());
  // } else {
  //   const data = await response.json();
  //   console.log(data);
  //   console.log("cannot log out");
  // }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  const data = new URLSearchParams(formData);

  const response = await fetch(
    "https://pjcazp54o3.execute-api.us-east-1.amazonaws.com/dev/signup",
    {
      method: "POST",
      body: data,
      headers: {
        contentType: "application/x-www-form-urlencoded",
      },
    }
  );
  console.log(response.status);
  if (response.ok) {
    const data = response.json();
    // dispatch(setUser(data))

    console.log("signup success in seesion");
    return [true, data];
  } else if (response.status < 500) {
    const data = await response.json();
    console.log(data);
    return [false, [data["message"]]];
  } else {
    console.log("signup was not success in seesion");
    return [false, ["An error occurred. Please try again."]];
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("user", action.payload.username);
      localStorage.setItem("user_id", action.payload.id);
      return { user: action.payload };
    case SET_TOKEN:
      localStorage.setItem("access_token", action.payload);
      return { token: action.payload };
    case REMOVE_USER:
      localStorage.removeItem("user");
      localStorage.removeItem("user_id");
      return { user: null };
    case REMOVE_TOKEN:
      localStorage.removeItem("access_token");
      return { access_token: null };
    default:
      return state;
  }
}
