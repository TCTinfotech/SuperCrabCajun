import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute component that verifies administrator authentication.
 * If not authenticated, immediately redirects to /admin/login while preserving return location.
 */
export default function ProtectedRoute({ children }) {
  const { isAdminAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
