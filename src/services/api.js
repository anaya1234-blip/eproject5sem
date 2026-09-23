/**
 * api.js — base Axios-like fetch wrapper for all API calls.
 * Uses the VITE_API_BASE_URL env variable as the base URL.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.fittrackpro.com/v1';

const getAuthHeader = () => {
  const user = localStorage.getItem('fittrack_user');
  if (!user) return {};
  try {
    const parsed = JSON.parse(user);
    return parsed.token ? { Authorization: `Bearer ${parsed.token}` } : {};
  } catch {
    return {};
  }
};

const request = async (endpoint, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...(options.headers || {}),
    },
    ...options,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorBody.message || `Request failed with status ${res.status}`);
  }

  // 204 No Content
  if (res.status === 204) return null;
  return res.json();
};

const api = {
  get: (endpoint, options = {}) =>
    request(endpoint, { method: 'GET', ...options }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),

  patch: (endpoint, body, options = {}) =>
    request(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...options }),

  delete: (endpoint, options = {}) =>
    request(endpoint, { method: 'DELETE', ...options }),
};

export default api;
