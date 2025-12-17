import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData.username, formData.password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="max-w-md text-center space-y-6 animate-fade-in">
            {/* Financial Management Illustration */}
            <div className="mb-8">
              <svg
                className="w-64 h-64 mx-auto"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Piggy Bank */}
                <ellipse
                  cx="200"
                  cy="250"
                  rx="120"
                  ry="100"
                  fill="#ffffff"
                  opacity="0.9"
                />
                <ellipse cx="200" cy="240" rx="100" ry="85" fill="#e0f2fe" />
                <circle cx="180" cy="220" r="8" fill="#0369a1" />
                <ellipse cx="120" cy="260" rx="20" ry="15" fill="#e0f2fe" />
                <ellipse cx="280" cy="260" rx="20" ry="15" fill="#e0f2fe" />

                {/* Coin slot */}
                <rect
                  x="190"
                  y="180"
                  width="20"
                  height="6"
                  rx="3"
                  fill="#0369a1"
                />

                {/* Coins falling */}
                <circle cx="150" cy="120" r="15" fill="#fbbf24" opacity="0.8" />
                <text
                  x="150"
                  y="128"
                  textAnchor="middle"
                  fill="#92400e"
                  fontSize="18"
                  fontWeight="bold"
                >
                  $
                </text>

                <circle cx="250" cy="100" r="18" fill="#fbbf24" opacity="0.9" />
                <text
                  x="250"
                  y="110"
                  textAnchor="middle"
                  fill="#92400e"
                  fontSize="20"
                  fontWeight="bold"
                >
                  $
                </text>

                <circle cx="200" cy="80" r="12" fill="#fbbf24" opacity="0.7" />
                <text
                  x="200"
                  y="87"
                  textAnchor="middle"
                  fill="#92400e"
                  fontSize="16"
                  fontWeight="bold"
                >
                  $
                </text>

                {/* Graph lines in background */}
                <path
                  d="M 50 320 L 90 300 L 130 310 L 170 280 L 210 290 L 250 260"
                  stroke="#ffffff"
                  strokeWidth="3"
                  opacity="0.3"
                  fill="none"
                />
                <path
                  d="M 50 340 L 90 330 L 130 345 L 170 320 L 210 330 L 250 310"
                  stroke="#ffffff"
                  strokeWidth="3"
                  opacity="0.3"
                  fill="none"
                />
              </svg>
            </div>

            <h1 className="text-5xl font-bold mb-4">SpendWise</h1>
            <p className="text-2xl font-light mb-8">
              Your Smart Financial Companion
            </p>
            <div className="space-y-4 text-lg font-light">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl">✓</span>
                <span>Track expenses and revenues</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl">✓</span>
                <span>Visualize your financial growth</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl">✓</span>
                <span>Achieve your budget goals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background-light">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-700">SpendWise</h1>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500">
                Sign in to continue to your dashboard
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl animate-scale-in">
                <div className="flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your username"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <p className="text-sm text-blue-800 font-medium mb-2">
                🎯 Demo Credentials:
              </p>
              <p className="text-sm text-blue-700">
                <strong>Username:</strong> demo
                <br />
                <strong>Password:</strong> demo123
              </p>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Made with ❤️ for better financial management
          </p>
        </div>
      </div>

      {/* Loading Spinner Styles */}
      <style jsx>{`
        .spinner-small {
          border: 2px solid #f3f4f6;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
