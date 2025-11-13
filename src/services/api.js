// Use VITE_API_URL if set, otherwise use proxy in dev or full URL in production
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    console.log(`Returning from VITE_API_URL: ${import.meta.env.VITE_API_URL}`);
    return import.meta.env.VITE_API_URL;
  }
  
  // In development, use proxy (relative path)
  if (import.meta.env.DEV) {
    console.log(`Returning proxy URL: /api`);
    return '/api'; // Proxy should be set up in Vite config (vite.config.js)
  }
  
  // In production, use the Render backend URL
  console.log(`Returning production URL: https://portfolio-k8jz.onrender.com/api`);
  return 'https://portfolio-k8jz.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();

// Get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Make authenticated request
const authFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Ensure credentials (cookies or tokens) are sent with requests
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      // Check if it's a CORS error or network error
      if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to backend server. The server may be starting up (Render free tier takes ~30 seconds to wake up). Please try again in a moment.');
      }
      throw new Error('Network error: Cannot connect to server. Please check your internet connection and try again.');
    }
    throw error;
  }
};

// Authentication API
export const authAPI = {
  // Register
  register: async (name, email, password) => {
    return authFetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  // Login
  login: async (email, password) => {
    console.log(`Sending request at: ${API_BASE_URL}/auth/login`);
    return authFetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Get current user
  getMe: async () => {
    return authFetch(`${API_BASE_URL}/auth/me`);
  },

  // Get user by ID
  getUserById: async (userId) => {
    return authFetch(`${API_BASE_URL}/auth/user/${userId}`);
  },
};

// User API functions
export const userAPI = {
  // Get current user profile
  getMe: async () => {
    return authFetch(`${API_BASE_URL}/users/me`);
  },

  // Get user by ID
  getUserById: async (id) => {
    return authFetch(`${API_BASE_URL}/users/${id}`);
  },

  // Update current user profile
  updateMe: async (userData) => {
    return authFetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Update user skills
  updateSkills: async (skills) => {
    return authFetch(`${API_BASE_URL}/users/me/skills`, {
      method: 'PUT',
      body: JSON.stringify({ skills }),
    });
  },

  // Update user certifications
  updateCertifications: async (certifications) => {
    return authFetch(`${API_BASE_URL}/users/me/certifications`, {
      method: 'PUT',
      body: JSON.stringify({ certifications }),
    });
  },

  // Update user education
  updateEducation: async (education) => {
    return authFetch(`${API_BASE_URL}/users/me/education`, {
      method: 'PUT',
      body: JSON.stringify({ education }),
    });
  },

  // Update user experience
  updateExperience: async (experience) => {
    return authFetch(`${API_BASE_URL}/users/me/experience`, {
      method: 'PUT',
      body: JSON.stringify({ experience }),
    });
  },
};

// Project API functions
export const projectAPI = {
  // Get all projects
  getAllProjects: async () => {
    return authFetch(`${API_BASE_URL}/projects`);
  },

  // Get current user's projects
  getMyProjects: async () => {
    return authFetch(`${API_BASE_URL}/projects/me`);
  },

  // Get projects by user ID
  getProjectsByUserId: async (userId) => {
    return authFetch(`${API_BASE_URL}/projects/user/${userId}`);
  },

  // Get featured projects
  getFeaturedProjects: async () => {
    return authFetch(`${API_BASE_URL}/projects/featured`);
  },

  // Get project by ID
  getProjectById: async (id) => {
    return authFetch(`${API_BASE_URL}/projects/${id}`);
  },

  // Create project
  createProject: async (projectData) => {
    return authFetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  // Update project
  updateProject: async (id, projectData) => {
    return authFetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  // Delete project
  deleteProject: async (id) => {
    return authFetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
  if (!response.ok) {
    throw new Error('Server is not responding');
  }
  return response.json();
};
