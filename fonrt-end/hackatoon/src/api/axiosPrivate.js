import axios from "axios";
const BaseURL = "http://localhost:3121";

export default axios.create({
  baseURL: BaseURL,
});
// my own axios request
export const axiosPrivate = axios.create({
  baseURL: BaseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
