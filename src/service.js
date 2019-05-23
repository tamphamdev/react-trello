import Axios from "axios";

export function getBoard() {
  return Axios.get("/api/board", { withCredentials: true }).then(
    response => response.data
  );
}

export function login(data) {
  return Axios.post("/api/login", data)
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
  return await Axios.post("/api/signup", data)
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
