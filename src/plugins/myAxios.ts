import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:7345/api",
});

myAxios.defaults.withCredentials = true;

myAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

myAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default myAxios;
