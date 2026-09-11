import { useState, ReactNode } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  CalendarCheck,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Store,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AnimatedLogo from '../AnimatedLogo';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { adminUser, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      exact: true,
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: Package,
      badge: null,
    },
    {
      name: 'Orders',
      path: '/admin/orders',
      icon: ShoppingBag,
      badge: 'Live',
    },
    {
      name: 'Users & Leads',
      path: '/admin/users',
      icon: Users,
      badge: null,
    },
    {
      name: 'Site Visits',
      path: '/admin/appointments',
      icon: CalendarCheck,
      badge: null,
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: Settings,
      badge: null,
    },
  ];

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/dashboard') return 'Master Dashboard';
    if (path.startsWith('/admin/products')) return 'Product Catalog Management';
    if (path.startsWith('/admin/orders')) return 'Order Operations & Tracking';
    if (path.startsWith('/admin/users')) return 'Customer & Lead Directory';
    if (path.startsWith('/admin/appointments')) return 'Site Visits & Measurements';
    if (path.startsWith('/admin/settings')) return 'Portal & Workshop Settings';
    return 'Admin Portal';
  };

  return (
    <div className="min-h-screen bg-stone-100 flex text-stone-800 antialiased font-sans">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-sage-950 text-stone-200 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-sage-800 shadow-2xl lg:shadow-none`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-sage-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatedLogo size="sm" variant="dark" showSubtitle={false} showIcon={true} />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
              </div>
              <p className="text-[11px] text-stone-400">Shiva Fabrication Control</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-sage-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Badge in Sidebar */}
        <div className="mx-4 my-4 p-3 rounded-xl bg-sage-900 border border-sage-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-base shrink-0 overflow-hidden">
            {adminUser?.avatar ? (
              <img src={adminUser.avatar} alt="Admin" className="w-full h-full object-cover" />
            ) : (
              adminUser?.name?.charAt(0) || 'A'
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-white truncate">{adminUser?.name || 'Artisan Shiva'}</div>
            <div className="text-[11px] text-amber-300 font-medium capitalize truncate">
              {adminUser?.role || 'Super Admin'} · Greater Noida
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">Navigation</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === '/admin' || location.pathname === '/admin/dashboard'
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20'
                    : 'text-stone-300 hover:bg-sage-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-stone-950 text-amber-400' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-sage-800 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-medium text-stone-300 hover:bg-sage-900 hover:text-amber-300 transition"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-brand-400" />
              <span>Back to Customer Store</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>{getPageTitle()}</span>
              </h1>
              <p className="hidden sm:block text-xs text-stone-500">
                Crafted Assam Bamboo, Jafri, Gazebos &amp; Safety Netting Operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition"
            >
              <Store className="w-3.5 h-3.5 text-stone-500" />
              <span>Preview Store</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </Link>

            <div className="h-6 w-px bg-stone-200 hidden sm:block" />

            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center">
                S
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-stone-900 leading-tight">Shiva</div>
                <div className="text-[10px] text-stone-500">Proprietor</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
