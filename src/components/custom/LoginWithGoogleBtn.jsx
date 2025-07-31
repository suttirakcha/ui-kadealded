import useAuthStore from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useEffect } from "react";

function LoginWithGoogleBtn() {
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  useEffect(() => {
  const interval = setInterval(() => {
    if (window.google) {
      // ✅ It's available — safe to use
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-button'),
        { theme: 'outline', size: 'large' }
      );

      clearInterval(interval); // Stop checking
    }
  }, 100);

  return () => clearInterval(interval);
  }, []);

  const handleCredentialResponse = (response) => {
    const idToken = response.credential;
    loginWithGoogle(idToken);
  };

  return <div id="google-button"></div>;
}

export default LoginWithGoogleBtn;
