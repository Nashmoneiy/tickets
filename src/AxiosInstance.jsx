import axios from "axios";

const token = localStorage.getItem("auth_token");

const AxiosInstance = axios.create({
  baseURL: "https://ticket-api-production-3c8e.up.railway.app/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default AxiosInstance;
