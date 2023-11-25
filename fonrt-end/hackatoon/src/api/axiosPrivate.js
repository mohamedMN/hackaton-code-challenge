import axios from "axios";

const BaseURL = "http://localhost:3121";

// Default Axios instance
const axiosInstance = axios.create({
  baseURL: BaseURL,
});

// Axios instance with custom configurations (e.g., headers, withCredentials)
const axiosPrivate = axios.create({
  baseURL: BaseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { axiosInstance, axiosPrivate };
