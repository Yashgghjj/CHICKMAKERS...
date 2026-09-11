import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from './AdminLayout';

export default function AdminProtectedRoute() {
  const { adminUser, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="text-stone-400 text-sm font-medium">Verifying Artisan Admin Session...</p>
      </div>
    );
  }

  if (!adminUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
