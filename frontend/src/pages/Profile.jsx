import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { getTransactions, getSummary } from "../services/api";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({
    total_expenses: 0,
    total_revenues: 0,
    balance: 0,
  });
  const [exportFormat, setExportFormat] = useState("all");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const summaryData = await getSummary({
        period: "yearly",
        year: new Date().getFullYear(),
      });
      setSummary(summaryData);
    } catch (err) {
      console.error("Error loading summary:", err);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const exportTransactions = async () => {
    try {
      let filters = {};

      if (exportFormat === "monthly") {
        filters = {
          period: "monthly",
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        };
      } else if (exportFormat === "yearly") {
        filters = {
          period: "yearly",
          year: new Date().getFullYear(),
        };
      }

      const transactionsData = await getTransactions(filters);
      const transactions = transactionsData.transactions;

      if (transactions.length === 0) {
        alert("No transactions to export");
        return;
      }

      // Create CSV content
      const headers = ["Date", "Category", "Description", "Amount", "Type"];
      const csvData = transactions.map((t) => [
        t.date,
        t.category_name,
        `"${t.description}"`, // Wrap in quotes to handle commas
        t.amount,
        t.type,
      ]);

      const csvContent = [
        headers.join(","),
        ...csvData.map((row) => row.join(",")),
      ].join("\n");

      // Download CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `spendwise_${exportFormat}_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`Successfully exported ${transactions.length} transactions!`);
    } catch (err) {
      console.error("Error exporting transactions:", err);
      alert("Failed to export transactions");
    }
  };

  const exportExpensesOnly = async () => {
    try {
      let filters = { type: "expense" };

      if (exportFormat === "monthly") {
        filters.period = "monthly";
        filters.month = new Date().getMonth() + 1;
        filters.year = new Date().getFullYear();
      } else if (exportFormat === "yearly") {
        filters.period = "yearly";
        filters.year = new Date().getFullYear();
      }

      const transactionsData = await getTransactions(filters);
      const transactions = transactionsData.transactions;

      if (transactions.length === 0) {
        alert("No expense transactions to export");
        return;
      }

      const headers = ["Date", "Category", "Description", "Amount"];
      const csvData = transactions.map((t) => [
        t.date,
        t.category_name,
        `"${t.description}"`,
        t.amount,
      ]);

      const csvContent = [
        headers.join(","),
        ...csvData.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `spendwise_expenses_${exportFormat}_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(
        `Successfully exported ${transactions.length} expense transactions!`,
      );
    } catch (err) {
      console.error("Error exporting expenses:", err);
      alert("Failed to export expenses");
    }
  };

  const exportRevenuesOnly = async () => {
    try {
      let filters = { type: "revenue" };

      if (exportFormat === "monthly") {
        filters.period = "monthly";
        filters.month = new Date().getMonth() + 1;
        filters.year = new Date().getFullYear();
      } else if (exportFormat === "yearly") {
        filters.period = "yearly";
        filters.year = new Date().getFullYear();
      }

      const transactionsData = await getTransactions(filters);
      const transactions = transactionsData.transactions;

      if (transactions.length === 0) {
        alert("No revenue transactions to export");
        return;
      }

      const headers = ["Date", "Category", "Description", "Amount"];
      const csvData = transactions.map((t) => [
        t.date,
        t.category_name,
        `"${t.description}"`,
        t.amount,
      ]);

      const csvContent = [
        headers.join(","),
        ...csvData.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `spendwise_revenues_${exportFormat}_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(
        `Successfully exported ${transactions.length} revenue transactions!`,
      );
    } catch (err) {
      console.error("Error exporting revenues:", err);
      alert("Failed to export revenues");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Navigation with Header */}
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information Card */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="border-b pb-3">
                <label className="text-sm font-medium text-gray-500">
                  Username
                </label>
                <p className="text-lg text-gray-800 font-medium">
                  {user.username}
                </p>
              </div>
              <div className="border-b pb-3">
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-lg text-gray-800">{user.email}</p>
              </div>
              {user.age && (
                <div className="border-b pb-3">
                  <label className="text-sm font-medium text-gray-500">
                    Age
                  </label>
                  <p className="text-lg text-gray-800">{user.age} years old</p>
                </div>
              )}
              {user.occupation && (
                <div className="border-b pb-3">
                  <label className="text-sm font-medium text-gray-500">
                    Occupation
                  </label>
                  <p className="text-lg text-gray-800">{user.occupation}</p>
                </div>
              )}
              {user.family_situation && (
                <div className="border-b pb-3">
                  <label className="text-sm font-medium text-gray-500">
                    Family Situation
                  </label>
                  <p className="text-lg text-gray-800 capitalize">
                    {user.family_situation.replace(/_/g, " ")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Financial Goals Card */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Financial Information
            </h3>
            <div className="space-y-4">
              {user.monthly_spending_threshold && (
                <div className="border-b pb-3">
                  <label className="text-sm font-medium text-gray-500">
                    Monthly Spending Threshold
                  </label>
                  <p className="text-2xl text-primary-600 font-bold">
                    {formatCurrency(user.monthly_spending_threshold)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Your set budget limit
                  </p>
                </div>
              )}
              {user.financial_goal && (
                <div className="border-b pb-3">
                  <label className="text-sm font-medium text-gray-500">
                    Financial Goal
                  </label>
                  <p className="text-lg text-gray-800">{user.financial_goal}</p>
                </div>
              )}
              <div className="bg-blue-50 p-4 rounded-2xl">
                <label className="text-sm font-medium text-blue-800">
                  Current Year Balance
                </label>
                <p
                  className={`text-2xl font-bold ${summary.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {formatCurrency(summary.balance)}
                </p>
                <div className="mt-2 text-xs text-blue-700">
                  <p>Total Income: {formatCurrency(summary.total_revenues)}</p>
                  <p>
                    Total Expenses: {formatCurrency(summary.total_expenses)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Export Data Card */}
          <div className="card lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Export Data
            </h3>
            <p className="text-gray-600 mb-6">
              Download your financial data in CSV format for external analysis
              or record keeping.
            </p>

            {/* Export Period Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Export Period
              </label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setExportFormat("all")}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    exportFormat === "all"
                      ? "bg-primary-600 text-white shadow-soft"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All Time
                </button>
                <button
                  onClick={() => setExportFormat("yearly")}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    exportFormat === "yearly"
                      ? "bg-primary-600 text-white shadow-soft"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  This Year
                </button>
                <button
                  onClick={() => setExportFormat("monthly")}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    exportFormat === "monthly"
                      ? "bg-primary-600 text-white shadow-soft"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  This Month
                </button>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={exportTransactions}
                className="px-6 py-4 bg-primary-600 text-white rounded-2xl font-medium hover:bg-primary-700 transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <span className="text-2xl">📊</span>
                <span>Export All Transactions</span>
                <span className="text-xs opacity-80">Expenses + Revenues</span>
              </button>

              <button
                onClick={exportExpensesOnly}
                className="px-6 py-4 bg-red-600 text-white rounded-2xl font-medium hover:bg-red-700 transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <span className="text-2xl">💸</span>
                <span>Export Expenses Only</span>
                <span className="text-xs opacity-80">All expense records</span>
              </button>

              <button
                onClick={exportRevenuesOnly}
                className="px-6 py-4 bg-green-600 text-white rounded-2xl font-medium hover:bg-green-700 transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <span className="text-2xl">💰</span>
                <span>Export Revenues Only</span>
                <span className="text-xs opacity-80">All income records</span>
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Exported files will be in CSV format and
                can be opened with Excel, Google Sheets, or any spreadsheet
                application.
              </p>
            </div>
          </div>

          {/* Account Statistics Card */}
          <div className="card lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Account Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-2xl text-center">
                <p className="text-sm text-blue-600 font-medium mb-1">
                  Total Income
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  {formatCurrency(summary.total_revenues)}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-2xl text-center">
                <p className="text-sm text-red-600 font-medium mb-1">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-red-700">
                  {formatCurrency(summary.total_expenses)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-2xl text-center">
                <p className="text-sm text-green-600 font-medium mb-1">
                  Net Balance
                </p>
                <p
                  className={`text-2xl font-bold ${summary.balance >= 0 ? "text-green-700" : "text-red-700"}`}
                >
                  {formatCurrency(summary.balance)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-2xl text-center">
                <p className="text-sm text-purple-600 font-medium mb-1">
                  Savings Rate
                </p>
                <p className="text-2xl font-bold text-purple-700">
                  {summary.total_revenues > 0
                    ? `${((summary.balance / summary.total_revenues) * 100).toFixed(1)}%`
                    : "0%"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
