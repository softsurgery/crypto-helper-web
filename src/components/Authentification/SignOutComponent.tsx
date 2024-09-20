import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignOutComponent() {
  const navigate = useNavigate();
  React.useEffect(() => {
    localStorage.removeItem("authToken");
    navigate('/authentication');
  }, [navigate]);
  return <></>;
}
