import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  getTransactions,
  getCategories,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/api";

const History = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    period: "yearly",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    category_id: "",
    type: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    category_id: "",
    description: "",
    amount: "",
    type: "expense",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
    loadCategories();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const transactionsData = await getTransactions(filters);
      setTransactions(transactionsData.transactions);
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

  const handleCreateTransaction = () => {
    setModalMode("create");
    setFormData({
      date: new Date().toISOString().split("T")[0],
      category_id: "",
      description: "",
      amount: "",
      type: "expense",
    });
    setShowModal(true);
  };

  const handleEditTransaction = (transaction) => {
    setModalMode("edit");
    setSelectedTransaction(transaction);
    setFormData({
      date: transaction.date,
      category_id: transaction.category_id,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
    });
    setShowModal(true);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        loadData();
      } catch (err) {
        console.error("Error deleting transaction:", err);
        alert("Failed to delete transaction");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (modalMode === "create") {
        await createTransaction(formData);
      } else {
        await updateTransaction(selectedTransaction.id, formData);
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save transaction");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filteredCategories = categories.filter(
    (cat) => cat.type === formData.type,
  );

  const exportToCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    const headers = ["Date", "Category", "Description", "Amount", "Type"];
    const csvData = transactions.map((t) => [
      t.date,
      t.category_name,
      t.description,
      t.amount,
      t.type,
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
      `spendwise_history_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        {/* Page Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Transaction History
          </h2>
          <div className="flex space-x-3">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-2xl font-medium hover:bg-green-700 transition-all duration-200 flex items-center space-x-2"
            >
              <span>⬇</span>
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleCreateTransaction}
              className="px-4 py-2 bg-primary-600 text-white rounded-2xl font-medium hover:bg-primary-700 transition-all duration-200 flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Period Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Period
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilters({ ...filters, period: "monthly" })}
                  className={`flex-1 px-3 py-2 rounded-xl font-medium transition-all duration-200 ${
                    filters.period === "monthly"
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setFilters({ ...filters, period: "yearly" })}
                  className={`flex-1 px-3 py-2 rounded-xl font-medium transition-all duration-200 ${
                    filters.period === "yearly"
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category_id}
                onChange={(e) =>
                  setFilters({ ...filters, category_id: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">All Types</option>
                <option value="expense">Expense</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() =>
                  setFilters({
                    period: "yearly",
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear(),
                    category_id: "",
                    type: "",
                  })
                }
                className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="card">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">
              All Transactions ({transactions.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
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
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
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
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleEditTransaction(transaction)}
                            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteTransaction(transaction.id)
                            }
                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            Delete
                          </button>
                        </div>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop animate-fade-in">
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 max-w-md w-full mx-4 animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {modalMode === "create" ? "Add Transaction" : "Edit Transaction"}
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: "expense",
                        category_id: "",
                      })
                    }
                    className={`flex-1 py-2 rounded-2xl font-medium transition-all ${
                      formData.type === "expense"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: "revenue",
                        category_id: "",
                      })
                    }
                    className={`flex-1 py-2 rounded-2xl font-medium transition-all ${
                      formData.type === "revenue"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    Revenue
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  className="input-field"
                  required
                >
                  <option value="">Select a category</option>
                  {filteredCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="input-field"
                  placeholder="Enter description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="input-field"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  {modalMode === "create" ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
