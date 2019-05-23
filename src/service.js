import Axios from "axios";
require("dotenv").config();

const base_URL = process.env.base_URL || "localhost:5000";

// for development only
export function getBoard() {
  return Axios.get(`${base_URL}/api/board`, { withCredentials: true }).then(
    response => response.data
  );
}

export function login(data) {
  return Axios.post(`${base_URL}/api/login`, data)
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("x-access-token", response.data.token);
        localStorage.setItem(
          "x-access-token-expiration",
          Date.now() + 2 * 60 * 60 * 1000
        );
        localStorage.setItem("user", response.data.username);
      }
      return response.data;
    })
    .catch(err => Promise.reject("Authentication failed"));
}

export async function signup(data) {
  return await Axios.post(`${base_URL}/api/signup`, data)
    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));
}

export function isAuthenticated() {
  return localStorage.getItem("x-access-token") &&
    localStorage.getItem("x-access-token-expiration") > Date.now()
    ? true
    : false;
}
