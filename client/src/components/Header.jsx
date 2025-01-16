import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStrore";

const Header = () => {
  const { setLoginState, setAuthUser, isLoggedIn } = useAuthStore();
  return (
    <header className="bg-white shadow p-5 flex items-center justify-around">
      <div className="flex items-center gap-3 text-base cursiveFont">
        <Link
          to="/"
          className="-ml-2 text-blue-600 text-2xl font-bold cursiveFont"
        >
          <span className="text-3xl cursiveFont">V</span>Chat
        </Link>
      </div>

      {!isLoggedIn ? (
        <div className="flex items-center gap-3 font-semibold">
          <NavLink to="/login" className="hoverEffect">
            Login
          </NavLink>
          <NavLink to="/signup" className="hoverEffect">
            Signup
          </NavLink>
        </div>
      ) : (
        <div className="flex items-center gap-3 font-semibold">
          <NavLink to="/profile" className="hoverEffect">
            Profile
          </NavLink>
          <NavLink to="/logout" className="hoverEffect">
            Logout
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
