import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../lib/auth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}