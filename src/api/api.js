import axios from "axios";

const unicoApi = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_BACKEND,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

export default unicoApi;
