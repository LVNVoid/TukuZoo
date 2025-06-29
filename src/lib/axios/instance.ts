import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  Expires: 0,
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;
if (!baseURL) throw new Error("Base URL is not defined in .env");

const instance = axios.create({
  baseURL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default instance;
