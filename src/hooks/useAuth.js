import { useAuth as useAuthContext } from '../context/AuthContext';

// Custom hook that wraps AuthContext
const useAuth = () => {
  const authContext = useAuthContext();
  
  return {
    ...authContext,
    // Alias for compatibility
    signInWithGoogle: authContext.signInWithGoogle || authContext.loginWithGoogle,
    currentUser: authContext.user || authContext.currentUser,
    loading: authContext.loading
  };
};

export default useAuth;

