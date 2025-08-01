import useAuthStore from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useEffect } from "react";
import GoogleIcon from "../icons/GoogleIcon";

function LoginWithGoogleBtn() {
  const redirectToGoogle = () => {
    const redirectUri = encodeURIComponent("http://localhost:5173/callback");
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const scope = encodeURIComponent("openid email profile");

    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;

    window.location.href = url;
  };

  return (
    <Button onClick={redirectToGoogle} className="google-login-btn">
      <GoogleIcon />
      Login with Google
    </Button>
  );
}

export default LoginWithGoogleBtn;
