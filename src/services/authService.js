import api from './api';

/**
 * authService — handles login, register, logout, and profile updates.
 * All methods return a promise. In production wire these to your real backend.
 */
const authService = {
  /**
   * Login with email & password.
   * @returns {Promise<{user, token}>}
   */
  login: async (email, password) => {
    // Replace with: return api.post('/auth/login', { email, password });
    await new Promise((res) => setTimeout(res, 800));
    if (!email || !password) throw new Error('Email and password are required.');
    return {
      user: {
        id: '1',
        name: 'Alex Johnson',
        email,
        avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
        role: 'athlete',
        joinedAt: '2026-01-15',
      },
      token: 'mock_jwt_token_12345',
    };
  },

  /**
   * Register a new user.
   * @returns {Promise<{user, token}>}
   */
  register: async (name, email, password) => {
    // Replace with: return api.post('/auth/register', { name, email, password });
    await new Promise((res) => setTimeout(res, 1000));
    if (!name || !email || !password) throw new Error('All fields are required.');
    return {
      user: {
        id: Date.now().toString(),
        name,
        email,
        avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
        role: 'athlete',
        joinedAt: new Date().toISOString().split('T')[0],
      },
      token: 'mock_jwt_token_new_user',
    };
  },

  /**
   * Logout — clears local storage.
   */
  logout: () => {
    localStorage.removeItem('fittrack_user');
    // Replace with: return api.post('/auth/logout');
  },

  /**
   * Update user profile.
   */
  updateProfile: async (updates) => {
    // Replace with: return api.put('/auth/profile', updates);
    await new Promise((res) => setTimeout(res, 600));
    return { success: true, ...updates };
  },

  /**
   * Change password.
   */
  changePassword: async (currentPassword, newPassword) => {
    // Replace with: return api.post('/auth/change-password', { currentPassword, newPassword });
    await new Promise((res) => setTimeout(res, 700));
    return { success: true };
  },
};

export default authService;
