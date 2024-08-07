import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: '/api/',
    timeout: 100000,
  });

  axiosInstance.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
      window.location.href = '/login';
   }
   return error;
 });
