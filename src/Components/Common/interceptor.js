import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request until the token refresh is complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.error("No refresh token available, logging out...");
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/user/refresh-token-login`, {
          refreshToken,
        });

        const newToken = response.data.token;
        sessionStorage.setItem('token', newToken);

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        processQueue(null, newToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
