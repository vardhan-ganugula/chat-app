import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.MODE === 'development' ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});


export default instance;