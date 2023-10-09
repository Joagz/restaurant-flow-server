import axios from "axios";

export const orderApi = axios.create({
  baseURL: "http://localhost:8080/api/order",
});
