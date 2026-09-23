import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate restoring session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('fittrack_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('fittrack_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Mock login — replace with real API call
      await new Promise((res) => setTimeout(res, 800));
      const mockUser = {
        id: '1',
        name: 'Alex Johnson',
        email,
        avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
        role: 'athlete',
        joinedAt: '2026-01-15',
      };
      setUser(mockUser);
      localStorage.setItem('fittrack_user', JSON.stringify(mockUser));
      return { success: true };
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
        role: 'athlete',
        joinedAt: new Date().toISOString().split('T')[0],
      };
      setUser(newUser);
      localStorage.setItem('fittrack_user', JSON.stringify(newUser));
      return { success: true };
    } catch (err) {
      setError('Registration failed. Please try again.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fittrack_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('fittrack_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
