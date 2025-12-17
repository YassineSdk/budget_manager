import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getTransactions,
  getSummary,
  getChartData,
  getCategories,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [summary, setSummary] = useState({
    total_expenses: 0,
    total_revenues: 0,
    balance: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({
    expenses_by_category: [],
    timeline: [],
  });
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    period: "yearly",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    category_id: "",
  });
  const [quickAddData, setQuickAddData] = useState({
    date: new Date().toISOString().split("T")[0],
    category_id: "",
    description: "",
    amount: "",
    type: "expense",
  });
  const [error, setError] = useState("");
  const [quickAddError, setQuickAddError] = useState("");

  // Update date/time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadData();
    loadCategories();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [summaryData, transactionsData, chartsData] = await Promise.all([
        getSummary(filters),
        getTransactions(filters),
        getChartData(filters),
      ]);

      setSummary(summaryData);
      setTransactions(transactionsData.transactions);
      setChartData(chartsData);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handlePeriodChange = (period) => {
    setFilters({ ...filters, period });
  };

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    setQuickAddError("");

    if (
      !quickAddData.category_id ||
      !quickAddData.description ||
      !quickAddData.amount
    ) {
      setQuickAddError("Please fill all fields");
      return;
    }

    try {
      await createTransaction(quickAddData);
      setQuickAddData({
        date: new Date().toISOString().split("T")[0],
        category_id: "",
        description: "",
        amount: "",
        type: "expense",
      });
      loadData();
      alert("Transaction added successfully!");
    } catch (err) {
      setQuickAddError(
        err.response?.data?.message || "Failed to add transaction",
      );
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filteredQuickAddCategories = categories.filter(
    (cat) => cat.type === quickAddData.type,
  );

  // Get only the 5 most recent transactions
  const recentTransactions = transactions.slice(0, 5);

  if (loading) {
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
        {/* Filters Section */}
        <div className="mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
          <div className="flex flex-wrap gap-3 items-center">
            {/* Period Filter */}
            <div className="flex space-x-2">
              <button
                onClick={() => handlePeriodChange("monthly")}
                className={`px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
                  filters.period === "monthly"
                    ? "bg-primary-600 text-white shadow-soft"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handlePeriodChange("yearly")}
                className={`px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
                  filters.period === "yearly"
                    ? "bg-primary-600 text-white shadow-soft"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                Yearly
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">
                Category:
              </span>
              <select
                value={filters.category_id}
                onChange={(e) =>
                  setFilters({ ...filters, category_id: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white text-gray-700 font-medium transition-all duration-200"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filter Button */}
            {filters.category_id && (
              <button
                onClick={() => setFilters({ ...filters, category_id: "" })}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-200"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          {/* Total Expenses */}
          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Total Expenses
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {formatCurrency(summary.total_expenses)}
                </p>
              </div>
              <div className="text-4xl">💸</div>
            </div>
            <div className="text-sm text-gray-500">
              {filters.period === "monthly" ? "This month" : "This year"}
            </div>
          </div>

          {/* Total Revenues */}
          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Total Revenues
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(summary.total_revenues)}
                </p>
              </div>
              <div className="text-4xl">💵</div>
            </div>
            <div className="text-sm text-gray-500">
              {filters.period === "monthly" ? "This month" : "This year"}
            </div>
          </div>

          {/* Current Balance */}
          <div className="kpi-card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  Current Balance
                </p>
                <p
                  className={`text-3xl font-bold ${
                    summary.balance >= 0 ? "text-blue-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(summary.balance)}
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            <div className="text-sm text-gray-500">Net income</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Expenses by Category */}
          <div className="card animate-slide-up">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Expenses by Category
            </h3>
            {chartData.expenses_by_category.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.expenses_by_category}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="category" tick={{ fill: "#6b7280" }} />
                  <YAxis tick={{ fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="amount" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No expense data available
              </div>
            )}
          </div>

          {/* Timeline Chart */}
          <div className="card animate-slide-up">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Expenses vs Revenues Over Time (Dual Axis)
            </h3>
            {chartData.timeline.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData.timeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fill: "#6b7280" }} />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: "#f97316" }}
                    label={{
                      value: "Expenses ($)",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#f97316",
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: "#10b981" }}
                    label={{
                      value: "Revenues ($)",
                      angle: 90,
                      position: "insideRight",
                      fill: "#10b981",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="expenses"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ fill: "#f97316", r: 4 }}
                    name="Expenses"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenues"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 4 }}
                    name="Revenues"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                No timeline data available
              </div>
            )}
          </div>
        </div>

        {/* Transactions Table */}
        {/* Quick Add Transaction Form */}
        <div className="card animate-slide-up mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Quick Add Transaction
          </h3>

          {quickAddError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm">
              {quickAddError}
            </div>
          )}

          <form
            onSubmit={handleQuickAdd}
            className="grid grid-cols-1 md:grid-cols-6 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={quickAddData.type}
                onChange={(e) =>
                  setQuickAddData({
                    ...quickAddData,
                    type: e.target.value,
                    category_id: "",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="expense">Expense</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={quickAddData.category_id}
                onChange={(e) =>
                  setQuickAddData({
                    ...quickAddData,
                    category_id: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
              >
                <option value="">Select...</option>
                {filteredQuickAddCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                value={quickAddData.description}
                onChange={(e) =>
                  setQuickAddData({
                    ...quickAddData,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="Description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={quickAddData.amount}
                onChange={(e) =>
                  setQuickAddData({ ...quickAddData, amount: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={quickAddData.date}
                onChange={(e) =>
                  setQuickAddData({ ...quickAddData, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all duration-200"
              >
                Add
              </button>
            </div>
          </form>
        </div>

        {/* Recent Transactions Section */}
        <div className="card animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Recent Transactions (Last 5)
            </h3>
            <Link
              to="/history"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-medium text-gray-700">
                          {transaction.category_name}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {transaction.description}
                      </td>
                      <td
                        className={`px-4 py-4 text-sm text-right font-semibold ${
                          transaction.type === "expense"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {transaction.type === "expense" ? "-" : "+"}
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.type === "expense"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Link
                          to="/history"
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
