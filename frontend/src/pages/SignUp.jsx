import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    occupation: "",
    family_situation: "",
    monthly_spending_threshold: "",
    financial_goal: "",
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        age: formData.age ? parseInt(formData.age) : null,
        occupation: formData.occupation,
        family_situation: formData.family_situation,
        monthly_spending_threshold: formData.monthly_spending_threshold
          ? parseFloat(formData.monthly_spending_threshold)
          : null,
        financial_goal: formData.financial_goal,
      };

      await register(
        registrationData.username,
        registrationData.email,
        registrationData.password,
        registrationData.age,
        registrationData.occupation,
        registrationData.family_situation,
        registrationData.monthly_spending_threshold,
        registrationData.financial_goal
      );

      // Show success message and redirect to login
      alert("Account created successfully! Please login.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration");
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
                <ellipse cx="200" cy="250" rx="120" ry="100" fill="#ffffff" opacity="0.9" />
                <ellipse cx="200" cy="240" rx="100" ry="85" fill="#e0f2fe" />
                <circle cx="180" cy="220" r="8" fill="#0369a1" />
                <ellipse cx="120" cy="260" rx="20" ry="15" fill="#e0f2fe" />
                <ellipse cx="280" cy="260" rx="20" ry="15" fill="#e0f2fe" />

                {/* Coin slot */}
                <rect x="190" y="180" width="20" height="6" rx="3" fill="#0369a1" />

                {/* Coins falling */}
                <circle cx="150" cy="120" r="15" fill="#fbbf24" opacity="0.8" />
                <text x="150" y="128" textAnchor="middle" fill="#92400e" fontSize="18" fontWeight="bold">$</text>

                <circle cx="250" cy="100" r="18" fill="#fbbf24" opacity="0.9" />
                <text x="250" y="110" textAnchor="middle" fill="#92400e" fontSize="20" fontWeight="bold">$</text>

                <circle cx="200" cy="80" r="12" fill="#fbbf24" opacity="0.7" />
                <text x="200" y="87" textAnchor="middle" fill="#92400e" fontSize="16" fontWeight="bold">$</text>

                {/* Graph lines in background */}
                <path d="M 50 320 L 90 300 L 130 310 L 170 280 L 210 290 L 250 260"
                      stroke="#ffffff" strokeWidth="3" opacity="0.3" fill="none" />
                <path d="M 50 340 L 90 330 L 130 345 L 170 320 L 210 330 L 250 310"
                      stroke="#ffffff" strokeWidth="3" opacity="0.3" fill="none" />
              </svg>
            </div>

            <h1 className="text-5xl font-bold mb-4">Join SpendWise</h1>
            <p className="text-2xl font-light mb-8">
              Start your journey to financial freedom
            </p>
            <div className="space-y-4 text-lg font-light">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl">✓</span>
                <span>Set personalized spending goals</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl">✓</span>
                <span>Track every transaction</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl">✓</span>
                <span>Achieve financial wellness</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background-light overflow-y-auto">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-700">SpendWise</h1>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-500">Fill in your details to get started</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl animate-scale-in">
                <div className="flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Information */}
              <div className="border-b pb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Basic Information</h3>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username *
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Choose a username"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="your.email@example.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Minimum 6 characters"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Re-enter your password"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-b pb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Personal Information</h3>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Your age"
                      min="18"
                      max="120"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                      Occupation
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Your profession"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="family_situation" className="block text-sm font-medium text-gray-700 mb-1">
                      Family Situation
                    </label>
                    <select
                      id="family_situation"
                      name="family_situation"
                      value={formData.family_situation}
                      onChange={handleChange}
                      className="input-field"
                      disabled={loading}
                    >
                      <option value="">Select...</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="married_with_children">Married with Children</option>
                      <option value="single_parent">Single Parent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="pb-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Financial Goals</h3>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="monthly_spending_threshold" className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Spending Threshold ($)
                    </label>
                    <input
                      type="number"
                      id="monthly_spending_threshold"
                      name="monthly_spending_threshold"
                      value={formData.monthly_spending_threshold}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g., 2000"
                      step="0.01"
                      min="0"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Set a monthly spending limit to help track your budget
                    </p>
                  </div>

                  <div>
                    <label htmlFor="financial_goal" className="block text-sm font-medium text-gray-700 mb-1">
                      Financial Goal
                    </label>
                    <textarea
                      id="financial_goal"
                      name="financial_goal"
                      value={formData.financial_goal}
                      onChange={handleChange}
                      className="input-field resize-none"
                      placeholder="e.g., Save $10,000 for vacation, Pay off debt, Build emergency fund..."
                      rows="3"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2 mt-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/" className="text-primary-600 font-medium hover:text-primary-700">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
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

export default SignUp;
