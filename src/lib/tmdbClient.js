
import axios from 'axios';


const API_KEY = 'd270f84c81acbd07c12d6d444ee9ec1d';


const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

export default tmdbClient;
