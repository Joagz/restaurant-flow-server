import axios from "axios";

export const checkoutApi = axios.create({
  baseURL: "http://localhost:8080/api/checkout",
});
