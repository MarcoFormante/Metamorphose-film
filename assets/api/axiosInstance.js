import axios from 'axios';


const errors = [401, 403, 404, 429, 500, 503];

export const axiosInstance = axios.create({
    baseURL: '/api/',
    timeout: 10000,
  });

  axiosInstance.interceptors.response.use(response => {
    return response;
 }, error => {
  
   if (errors.includes(error.response.status) && !window.location.pathname.includes("admin")) {
      window.location.href = '/error/' + error.response.status;
   }
   return error;
 });
