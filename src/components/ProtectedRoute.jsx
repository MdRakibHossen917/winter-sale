import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { user, currentUser, loading } = useAuth();
  // Firebase uses 'user', backend uses 'currentUser' - support both
  const authenticatedUser = user || currentUser;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!authenticatedUser) {
    toast.error('Please login to continue');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

