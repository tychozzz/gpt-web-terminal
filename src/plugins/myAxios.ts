import axios from "axios";

let serverAddress = import.meta.env.VITE_SERVER_ADDRESS

const myAxios = axios.create({
  baseURL: `http://${serverAddress}/api`,
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
