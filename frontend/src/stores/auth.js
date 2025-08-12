import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    authError: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async register(userData) {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/register', userData);
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token);
        this.authError = null;
        return true;
      } catch (error) {
        this.authError = error.response?.data?.message || 'Registration failed.';
        return false;
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token);
        this.authError = null;
        return true;
      } catch (error) {
        this.authError = error.response?.data?.message || 'Login failed.';
        return false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
    initializeAuth() {
      if (this.token) {
        // Optionally, validate token with backend or decode to get user info
        // For now, we just assume token is valid if present
        // In a real app, you'd likely have an endpoint to verify token and fetch user details
        console.log('Token found, user is potentially authenticated.');
      }
    }
  },
});
