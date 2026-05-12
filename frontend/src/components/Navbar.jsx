import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/aditya-logo.png";

export default function Navbar({ onMenuClick, isAdmin = false }) {
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentUser = isAdmin ? admin : user;

  const handleLogout = () => {
    if (isAdmin) {
      logoutAdmin();
      navigate("/admin-login");
    } else {
      logoutUser();
      navigate("/login");
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="w-5 h-0.5 bg-gray-600 rounded-full" />
          <span className="w-5 h-0.5 bg-gray-600 rounded-full" />
          <span className="w-3 h-0.5 bg-gray-600 rounded-full" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Aditya University" className="h-9 w-auto" />
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-blue-900 leading-tight">ADITYA UNIVERSITY</p>
            <p className="text-[10px] text-orange-600 font-semibold leading-tight tracking-wide">
              Lost & Found Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {currentUser?.name?.charAt(0)?.toUpperCase() || (isAdmin ? "A" : "U")}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-gray-800 leading-tight">
                {currentUser?.name || (isAdmin ? "Admin" : "User")}
              </p>
              <p className="text-[10px] text-gray-400 leading-tight capitalize">
                {isAdmin ? "Administrator" : currentUser?.role || "Student"}
              </p>
            </div>
            <svg className="w-3.5 h-3.5 text-gray-400 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-gray-200 shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100 mb-1">
                <p className="text-xs font-bold text-gray-800">{currentUser?.name || "User"}</p>
                <p className="text-[11px] text-gray-400">{currentUser?.email || ""}</p>
              </div>
              {!isAdmin && (
                <Link
                  to="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
