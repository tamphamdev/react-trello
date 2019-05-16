import Axios from 'axios';

const BASE_URL = "http://localhost:5000";

export function getBoard() {
  return Axios.get(`${BASE_URL}/api/board`, {withCredentials:true})
    .then(response => response.data);
}

export async function login(data) {
  return  await Axios.post(`${BASE_URL}/api/login`,  data )
    .then(response => {
      // localStorage.setItem('x-access-token', response.data.token);
      // localStorage.setItem('x-access-token-expiration', Date.now() +2 *60*60 * 1000);
      return response.data;
    })
    .catch(err => Promise.reject('Authentication failed'));
}