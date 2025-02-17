import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Token ${import.meta.env.VITE_APP_DADATA_TOKEN}`
  },
});

export default HTTP;