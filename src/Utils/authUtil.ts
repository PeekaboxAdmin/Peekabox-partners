import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8100/api/v1', // Replace with your API base URL
  withCredentials: true, // Make sure credentials are included in the request
});

// Response interceptor to handle token refresh when access token expires
api.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    if (error.response && error.response.status === 401) {
      // If the error is due to unauthorized access (401), refresh the token
      try {
        await axios.post('http://localhost:8100/api/v1/stores/auth/refresh', {
            email: "khanahmed925@gmail.com",
            password: "test123456"
          
        });
        console.log('Token refreshed successfully');
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Optionally, redirect to login page
        window.location.href = '/login';
      }
    } else {
      // No refresh token available, logout the user
      window.location.href = '/login';
    }
  }
);

export default api;
