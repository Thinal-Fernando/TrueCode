import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, //this will make sure browser will send the cookies to the server on every request
});

export default axiosInstance;
