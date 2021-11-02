import axios from 'axios';

export let source = axios.CancelToken.source();

export default axios.create({
  baseURL: "http://localhost:3001"
})