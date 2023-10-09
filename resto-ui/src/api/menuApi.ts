import axios from "axios";

export const menuApi = axios.create({
  baseURL: "http://localhost:8080/api/menu",
});
