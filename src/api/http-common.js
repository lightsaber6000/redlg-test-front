import axios from 'axios';

const HTTP = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

export default HTTP;