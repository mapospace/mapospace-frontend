import axios from 'axios';


const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,  
});

api.interceptors.request.use(
  (config) => {
  
    const token = sessionStorage.getItem('token');  
    if (token) {
     
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
 
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
   
    if (error.response.status === 401) {
    
      console.error("Unauthorized, logging out...");
      sessionStorage.removeItem('authToken');  
    }
    return Promise.reject(error);
  }
);

export default api;
