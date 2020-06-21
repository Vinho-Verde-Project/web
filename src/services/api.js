import https from 'https';
import axios from 'axios';

const agent = new https.Agent({
    rejectUnauthorized: false,
  });

const api = axios.create({
    baseURL: 'http://localhost:80/graphql',
    responseType: 'json',
    httpsAgent: agent
})

export default api;