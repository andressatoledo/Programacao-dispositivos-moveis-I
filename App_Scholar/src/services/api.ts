import axios from 'axios';
// import { API_URL } from '../config/env.d';

const API_URL = 'http://localhost:3000';
console.log('api_url',API_URL)
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

