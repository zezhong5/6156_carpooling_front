import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";

const clientId =
  "270727404982-ca3a9to05pabl4fi6s16focjt98g5civ.apps.googleusercontent.com";

function GoogleLoginButton() {
  const onSuccess = (res) => {
    console.log("success", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED res: ", res);
  };
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleLoginButton;
