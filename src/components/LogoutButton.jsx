import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { HiOutlineLogout } from "react-icons/hi";

function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button className="my-button logout-button" onClick={logout} title="Logout">
      <HiOutlineLogout />
    </button>
  );
}

export default LogoutButton;
