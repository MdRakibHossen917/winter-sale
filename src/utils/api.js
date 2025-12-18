// API Utility Functions
// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('auth_token');
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Check if response is JSON
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      // If response is not JSON, server might be down
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API call error:', error);
    
    // Handle network errors
    if (error.message && (
        error.message.includes('Failed to fetch') || 
        error.message.includes('NetworkError') ||
        error.message.includes('ERR_CONNECTION_REFUSED') ||
        error.message.includes('ERR_INTERNET_DISCONNECTED') ||
        error.message.includes('fetch') ||
        error.name === 'TypeError'
    )) {
      throw new Error('Server is not running. Please start the backend server on port 5000.');
    }
    
    // Re-throw other errors
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  },

  login: async (email, password) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  },

  getCurrentUser: async () => {
    try {
      return await apiCall('/auth/me');
    } catch (error) {
      // If token is invalid, remove it
      if (error.message && (error.message.includes('token') || error.message.includes('authenticated'))) {
        localStorage.removeItem('auth_token');
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
  },

  getToken: () => {
    return localStorage.getItem('auth_token');
  }
};

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await apiCall('/products');
    return response.products || [];
  },

  getById: async (id) => {
    const response = await apiCall(`/products/${id}`);
    return response.product;
  }
};

// Orders API
export const ordersAPI = {
  create: async (orderData) => {
    // For Firebase users, we don't have backend JWT token
    // So we'll make the call without authentication
    // The backend will accept orders with email
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || 'Failed to create order');
      }

      return await response.json();
    } catch (error) {
      console.error('Create order error:', error);
      
      // Handle network errors
      if (error.message && (
          error.message.includes('Failed to fetch') || 
          error.message.includes('NetworkError') ||
          error.message.includes('ERR_CONNECTION_REFUSED')
      )) {
        throw new Error('Server is not running. Please start the backend server on port 5000.');
      }
      
      throw error;
    }
  },

  getMyOrders: async () => {
    const response = await apiCall('/orders/my-orders');
    return response.orders || [];
  },

  getById: async (id) => {
    const response = await apiCall(`/orders/${id}`);
    return response.order;
  },

  updateStatus: async (id, status, transactionId) => {
    return await apiCall(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, transactionId }),
    });
  }
};

export default { authAPI, productsAPI, ordersAPI };

