import _axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axios = _axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-custom-lang": "en",
  },
});

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      window.location.href = "/authentication";
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
