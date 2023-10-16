import axios from "axios";

export const menuApi = axios.create({
  baseURL: `http://${process.env.REACT_APP_SERVER_ADDRESS}:8080/api/menu`,
});
