import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/history", label: "History" },
    { path: "/profile", label: "Profile" },
  ];

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow-soft sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Row - Logo, Date/Time, User, Logout */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-primary-700">SpendWise</h1>
          </div>

          <div className="flex items-center space-x-6">
            {/* Date and Time Display */}
            <div className="text-gray-700">
              <div className="text-sm font-medium">
                {currentDateTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="text-xs text-gray-500">
                {currentDateTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>

            <div className="border-l border-gray-300 h-10"></div>

            <span className="text-gray-600">
              Welcome, {user ? user.username : "User"}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Bottom Row - Navigation Links */}
        <div className="flex justify-center border-t pt-3">
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-8 py-2 rounded-xl font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-primary-600 text-white shadow-soft"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
