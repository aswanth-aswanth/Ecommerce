// axiosConfig.js
import axios from "axios";
import { BASE_URL } from "../../config";

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
