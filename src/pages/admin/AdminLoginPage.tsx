import { Navigate, useLocation } from 'react-router-dom';

// Dedicated admin login page is deprecated in favor of the unified common /login system.
export default function AdminLoginPage() {
  const location = useLocation();
  return <Navigate to="/login" state={{ from: location }} replace />;
}
