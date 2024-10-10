import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useValidateToken = () => {
  const navigate = useNavigate();

  function logout() {
	console.log('logging out')
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      navigate("/login");
      return;
    }

    axios
      .post(import.meta.env.VITE_API_URL + "/validateToken", {
        username,
        token,
      })
      .then((response) => {
        const valid = response.data.valid;
        if (!valid) logout
		return
      })
      .catch((err) => {
        console.log("Error during token validation:", err);
		logout();
      });
  }, []);
};
