import { Navigate, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LockKeyhole, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';

export default function AdminProtectedRoute() {
  const { user, role, isLoading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="text-stone-400 text-sm font-medium">Verifying Security Credentials...</p>
      </div>
    );
  }

  // RBAC Guard: If user is logged in as Customer, BLOCK THEM with HTTP 403
  if (user && role !== 'admin') {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-stone-900 border border-red-500/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-5">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-300 text-xs font-semibold mb-3 border border-red-500/20">
            HTTP 403 · Access Denied
          </span>

          <h2 className="text-2xl font-bold text-white mb-2 font-serif">
            Administrator Access Only
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm mb-4 leading-relaxed">
            You are signed in as <span className="font-semibold text-amber-300">{user.name}</span> ({user.email || user.phone}). Your database role is <span className="font-bold text-red-400 uppercase tracking-wide">Customer</span>. Customers are strictly prohibited from accessing the Admin Panel.
          </p>

          <div className="p-3.5 bg-stone-950/80 rounded-2xl border border-stone-800 text-stone-400 text-xs mb-6 text-left space-y-1.5">
            <div className="flex items-center gap-2 text-stone-300 font-medium">
              <LockKeyhole className="w-3.5 h-3.5 text-amber-400" />
              <span>Role-Based Access Control (RBAC) Active</span>
            </div>
            <p className="text-[11px] text-stone-400 pl-5.5">
              Admin privileges must be authorized on the backend. If you possess administrator credentials, please sign in with your admin account.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/login?returnUrl=/admin');
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Switch to Admin</span>
            </button>
            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all border border-stone-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in at all: Redirect to unified /login
  if (!user || role !== 'admin') {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnUrl=${returnUrl}`} state={{ from: location }} replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
