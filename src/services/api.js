// Use VITE_API_URL if set, otherwise use proxy in dev or full URL in production
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, use proxy (relative path)
  if (import.meta.env.DEV) {
    return '/api';
  }
  // In production, try to use environment variable or fallback
  // This will be set by the hosting platform
  return import.meta.env.VITE_API_URL || 'https://portfolio-k8jz.onrender.com/api';
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
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 5001.');
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
