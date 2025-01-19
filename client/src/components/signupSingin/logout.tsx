import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useValidateToken } from "../../hooks/useValidateToken";

export default function Logout() {
  useValidateToken();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/auth");
  }), [];

  return <div></div>;
}
