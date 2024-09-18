import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:8080/api';  // Change this to your actual backend URL

const api = axios.create({
  baseURL: API_URL
});
api.defaults.headers.common['Content-Type'] = 'application/json';

// Set Authorization header with JWT token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const makeRequest = async (method, endpoint, body) => {
  if (!api.defaults.headers.common['Authorization']) {
    if (localStorage.token) setAuthToken(localStorage.token);
  }
  let config = {
    method: method,
    // maxBodyLength: Infinity,
    url: endpoint,
    // url: 'localhost:8080/api/users/details',
  };
  if (body) {
    if (method === 'GET') config.params = body
    else config.data = body;
  }
  
  return await api.request(config)
  // .then((response) => {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
}

export default api;
