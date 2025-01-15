import axios from "axios";

const BASE_URL = process.env.REACT_APP_HOST_API;

const api = axios.create({
  baseURL: BASE_URL, // Altere para o endpoint correto da sua API.
});

export default api;
