import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedAdminRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();

  const loggedInUserLocalStorage = localStorage.getItem("loggedInUser");

  const parsedUser = JSON.parse(loggedInUserLocalStorage || '""');

  useEffect(() => {
    if (parsedUser.user.role !== "ADMIN") {
      navigate("/login");
    }
  }, []);

  return <Component />;
}
