import https from 'https';
import axios from 'axios';

const agent = new https.Agent({
    rejectUnauthorized: false,
  });

const api = axios.create({
    baseURL: 'https://192.168.1.18:50458/graphql',
    responseType: 'json',
    httpsAgent: agent
})

export default api;