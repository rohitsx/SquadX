import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const validateToken = async () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    axios
      .post(import.meta.env.VITE_API_URL + "/validateToken", {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      });
  }, []);
};
