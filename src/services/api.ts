import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service methods
export const authService = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) => 
    api.post('/auth/register', userData),
  
  logout: () => 
    api.post('/auth/logout'),
  
  getCurrentUser: () => 
    api.get('/auth/me'),
};

export const bookingService = {
  getAll: () => 
    api.get('/bookings'),
  
  getById: (id: string) => 
    api.get(`/bookings/${id}`),
  
  create: (bookingData: any) => 
    api.post('/bookings', bookingData),
  
  update: (id: string, bookingData: any) => 
    api.put(`/bookings/${id}`, bookingData),
  
  delete: (id: string) => 
    api.delete(`/bookings/${id}`),
  
  getAvailableSlots: (serviceId: string, date: string) => 
    api.get(`/bookings/slots/${serviceId}`, { params: { date } }),
};

export const serviceService = {
  getAll: () => 
    api.get('/services'),
  
  getById: (id: string) => 
    api.get(`/services/${id}`),
  
  create: (serviceData: any) => 
    api.post('/services', serviceData),
  
  update: (id: string, serviceData: any) => 
    api.put(`/services/${id}`, serviceData),
  
  delete: (id: string) => 
    api.delete(`/services/${id}`),
};

export const clientService = {
  getAll: () => 
    api.get('/clients'),
  
  getById: (id: string) => 
    api.get(`/clients/${id}`),
  
  create: (clientData: any) => 
    api.post('/clients', clientData),
  
  update: (id: string, clientData: any) => 
    api.put(`/clients/${id}`, clientData),
  
  delete: (id: string) => 
    api.delete(`/clients/${id}`),
  
  getHistory: (id: string) => 
    api.get(`/clients/${id}/history`),
};

export const treatmentService = {
  getAll: () => 
    api.get('/treatments'),
  
  getById: (id: string) => 
    api.get(`/treatments/${id}`),
  
  create: (treatmentData: any) => 
    api.post('/treatments', treatmentData),
  
  update: (id: string, treatmentData: any) => 
    api.put(`/treatments/${id}`, treatmentData),
  
  delete: (id: string) => 
    api.delete(`/treatments/${id}`),
};

export const analyticsService = {
  getDashboardStats: () => 
    api.get('/analytics/dashboard'),
  
  getRevenueData: (period: string) => 
    api.get('/analytics/revenue', { params: { period } }),
  
  getClientStats: () => 
    api.get('/analytics/clients'),
  
  getServiceStats: () => 
    api.get('/analytics/services'),
};

export default api;