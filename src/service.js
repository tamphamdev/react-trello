import Axios from "axios";
require("dotenv").config();
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

export function getBoard() {
  return Axios.get(`${BASE_URL}/api/board`, { withCredentials: true }).then(
    response => response.data
  );
}

export function login(data) {
  return Axios.post(`${BASE_URL}/api/login`, data)
    .then(response => {
      localStorage.setItem("x-access-token", response.data.token);
      localStorage.setItem(
        "x-access-token-expiration",
        Date.now() + 2 * 60 * 60 * 1000
      );
      localStorage.setItem("user", response.data.username);
      console.log(response.data);
      return response.data;
    })
    .catch(err => Promise.reject("Authentication failed"));
}

export async function signup(data) {
  return await Axios.post(`${BASE_URL}/api/signup`, data)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => Promise.reject("Sign Up failed"));
}

export function isAuthenticated() {
  return (
    localStorage.getItem("x-access-token") &&
    localStorage.getItem("x-access-token-expiration") > Date.now()
  );
}
