import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

// Authentication
export const login = async (username, password) => {
  const response = await api.post("/login", { username, password });
  return response.data;
};

export const register = async (
  username,
  email,
  password,
  age,
  occupation,
  family_situation,
  monthly_spending_threshold,
  financial_goal,
) => {
  const response = await api.post("/register", {
    username,
    email,
    password,
    age,
    occupation,
    family_situation,
    monthly_spending_threshold,
    financial_goal,
  });
  return response.data;
};

// Transactions
export const getTransactions = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category_id) params.append("category_id", filters.category_id);
  if (filters.type) params.append("type", filters.type);
  if (filters.period) params.append("period", filters.period);
  if (filters.month) params.append("month", filters.month);
  if (filters.year) params.append("year", filters.year);

  const response = await api.get(`/transactions?${params.toString()}`);
  return response.data;
};

export const createTransaction = async (transactionData) => {
  const response = await api.post("/transactions", transactionData);
  return response.data;
};

export const updateTransaction = async (id, transactionData) => {
  const response = await api.put(`/transactions/${id}`, transactionData);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(`/transactions/${id}`);
  return response.data;
};

// Analytics
export const getSummary = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.period) params.append("period", filters.period);
  if (filters.month) params.append("month", filters.month);
  if (filters.year) params.append("year", filters.year);

  const response = await api.get(`/analytics/summary?${params.toString()}`);
  return response.data;
};

export const getChartData = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.period) params.append("period", filters.period);
  if (filters.month) params.append("month", filters.month);
  if (filters.year) params.append("year", filters.year);

  const response = await api.get(`/analytics/charts?${params.toString()}`);
  return response.data;
};

// Categories
export const getCategories = async (type = null) => {
  const params = type ? `?type=${type}` : "";
  const response = await api.get(`/categories${params}`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData);
  return response.data;
};

export default api;
