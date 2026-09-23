import { useAuthContext } from '../context/AuthContext';

/**
 * useAuth — convenience hook that exposes all auth state & actions.
 * Usage:
 *   const { user, isAuthenticated, login, logout, register } = useAuth();
 */
const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
