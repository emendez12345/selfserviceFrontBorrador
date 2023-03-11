import Axios from "axios";

const instance = Axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_BACKEND,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("Authorization");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  } else {
    // Do something... Usually logout user.
  }
  return config;
});
export default instance;
