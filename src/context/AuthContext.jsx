import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Get current user
  const getCurrentUser = async () => {
    try {
      const data = await authAPI.getMe();
      setUser(data.user);
    } catch (error) {
      console.error('Error getting current user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Register
  const register = async (name, email, password) => {
    try {
      const data = await authAPI.register(name, email, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    getCurrentUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

