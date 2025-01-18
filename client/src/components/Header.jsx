import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStrore";
import { MessageSquare, User, LogOut, LogIn, UserPlus } from "lucide-react";

const Header = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-blue-100 transition duration-150"
            >
              <MessageSquare className="h-8 w-8" />
              <span className="text-2xl font-bold">VChat</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4 text-sm">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-150 ${
                      isActive
                        ? "bg-white text-blue-600"
                        : "text-white hover:bg-blue-700"
                    }`
                  }
                >
                  <LogIn className="h-5 w-5" />
                  <span className="hidden md:block">Login</span>
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-150 ${
                      isActive
                        ? "bg-white text-blue-600"
                        : "text-white hover:bg-blue-700"
                    }`
                  }
                >
                  <UserPlus className="h-5 w-5" />
                  <span className="hidden md:block">Signup</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 md:px-4 py-2 rounded-lg transition duration-150 ${
                      isActive
                        ? "bg-white text-blue-600"
                        : "text-white hover:bg-blue-700"
                    }`
                  }
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:block">Profile</span>
                </NavLink>
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-150 ${
                      isActive
                        ? "bg-white text-blue-600"
                        : "text-white hover:bg-blue-700"
                    }`
                  }
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:block">Logout</span>
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;