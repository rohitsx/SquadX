import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import env from "@/utils/enviroment";
import SquadXLogo from "@/assets/logo";

interface Notification {
  type: "success" | "error";
  message: string;
}
export default function Auth() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = useCallback(
    (type: "success" | "error", message: string) => {
      setNotification({ type, message });
    },
    [],
  );

  const handleOnSuccess = useCallback(async (credentialResponse: any) => {
    try {
      const credential = credentialResponse.credential;
      const access_token = credentialResponse.access_token;
      const response = await axios.post(
        env.apiUrl + "/auth",
        { credential, access_token },
      );
      response && navigate("/");
    } catch (err) {
      showNotification("error", "An error occurred during registration.");
    }
  }, []);

  const handleOnError = useCallback(() => {
    showNotification("error", "An error occurred during login.");
  }, []);

  const login = useGoogleLogin({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  useGoogleOneTapLogin({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  return (
    <>
      <SquadXLogo size="md" />
      <h1>
        SquadX a social media platform that lets you connect with strangers.
        some of the feature of squad x are: 1 handle mutiple peer connection at
        once 2 random user pairing 3 video call
      </h1>

      <button onClick={() => login()}>Login with Google</button>
      <div>
        <h3>demo video of tool</h3>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/DlcM5WlSlDs`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
          allowFullScreen
        />
      </div>
      <div>
        tech stacked used to build this tool are react typeScript NodeJS Docker
        Prisma DB PostgreSQL MongoDB WebRTC Socket.IO
      </div>

      <Link to={"/privacypolicy"}>privacy policy</Link>
    </>
  );
}
