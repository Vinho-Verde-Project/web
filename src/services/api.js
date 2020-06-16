import https from 'https';
import axios from 'axios';

const agent = new https.Agent({
    rejectUnauthorized: false,
  });

const api = axios.create({
    baseURL: 'https://192.168.1.7:53222/graphql',
    responseType: 'json',
    httpsAgent: agent
})

export default api;