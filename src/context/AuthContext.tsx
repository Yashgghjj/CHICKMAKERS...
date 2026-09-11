import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AuthUser, AuthRole, AdminUser, CustomerAccount } from '../types';
import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  ADMIN_TOKEN_KEY,
  ADMIN_USER_KEY,
  CUSTOMER_TOKEN_KEY,
  CUSTOMER_USER_KEY,
} from '../types';
import { api } from '../services/api';

export interface AuthContextType {
  user: AuthUser | null;
  role: AuthRole | null;
  token: string | null;
  isLoading: boolean;
  login: (
    identifier: string,
    password: string
  ) => Promise<{
    success: boolean;
    role?: AuthRole;
    redirectTo?: string;
    message?: string;
  }>;
  signup: (payload: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    city?: string;
    address?: string;
    pincode?: string;
  }) => Promise<{
    success: boolean;
    role?: 'customer';
    redirectTo?: string;
    message?: string;
  }>;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUser>) => Promise<{ success: boolean; message?: string }>;
  // Compatibility helpers
  adminUser: AdminUser | null;
  customerUser: CustomerAccount | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync token and user across storage keys
  function persistSession(newToken: string | null, newUser: AuthUser | null) {
    setToken(newToken);
    setUser(newUser);

    if (newToken && newUser) {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));

      if (newUser.role === 'admin') {
        localStorage.setItem(ADMIN_TOKEN_KEY, newToken);
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(newUser));
        localStorage.removeItem(CUSTOMER_TOKEN_KEY);
        localStorage.removeItem(CUSTOMER_USER_KEY);
      } else {
        localStorage.setItem(CUSTOMER_TOKEN_KEY, newToken);
        localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(newUser));
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        localStorage.removeItem(ADMIN_USER_KEY);
      }
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_USER_KEY);
      localStorage.removeItem(CUSTOMER_TOKEN_KEY);
      localStorage.removeItem(CUSTOMER_USER_KEY);
    }
  }

  // Initial session recovery and verification against backend
  useEffect(() => {
    try {
      const storedToken =
        localStorage.getItem(AUTH_TOKEN_KEY) ||
        localStorage.getItem(ADMIN_TOKEN_KEY) ||
        localStorage.getItem(CUSTOMER_TOKEN_KEY);

      const storedUser =
        localStorage.getItem(AUTH_USER_KEY) ||
        localStorage.getItem(ADMIN_USER_KEY) ||
        localStorage.getItem(CUSTOMER_USER_KEY);

      if (storedToken && storedUser) {
        const parsed = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsed);

        // Verify with backend database to confirm active role
        api
          .authGetMe()
          .then((res) => {
            if (res.success && res.user) {
              persistSession(storedToken, res.user);
            } else {
              persistSession(null, null);
            }
          })
          .catch(() => {
            // In case of network glitch, keep cached user session
          })
          .finally(() => {
            setIsLoading(false);
          });
        return;
      }
    } catch {
      persistSession(null, null);
    }
    setIsLoading(false);
  }, []);

  async function login(
    identifier: string,
    pass: string
  ): Promise<{
    success: boolean;
    role?: AuthRole;
    redirectTo?: string;
    message?: string;
  }> {
    try {
      const res = await api.authLogin({ identifier, password: pass });
      if (res.success && res.token && res.user) {
        const normalizedRole: AuthRole =
          res.role === 'superadmin' || res.role === 'admin' ? 'admin' : 'customer';

        const authUser: AuthUser = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          phone: res.user.phone || '',
          role: normalizedRole,
          city: (res.user as any).city,
          address: (res.user as any).address,
          pincode: (res.user as any).pincode,
          avatar: (res.user as any).avatar,
          createdAt: (res.user as any).createdAt || new Date().toISOString(),
        };

        persistSession(res.token, authUser);

        return {
          success: true,
          role: normalizedRole,
          redirectTo: res.redirectTo || (normalizedRole === 'admin' ? '/admin' : '/account'),
          message: res.message,
        };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (err) {
      // Demo fallback check if backend server is unavailable
      const clean = identifier.trim().toLowerCase();
      if (
        (clean === 'admin@chickmakers.com' || clean === 'admin' || clean === 'shiva' || clean === 'shiva@shivachickmaker.in') &&
        (pass === 'admin' || pass === 'admin123' || pass === 'shiva8826')
      ) {
        const dummyToken = `adm_fallback_${Date.now()}`;
        const fallbackAdmin: AuthUser = {
          id: 'adm-shiva-01',
          name: 'Shiva (Proprietor)',
          email: 'admin@chickmakers.com',
          phone: '8826054537',
          role: 'admin',
          createdAt: new Date().toISOString(),
          avatar: '/img/artisan-logo.png',
        };
        persistSession(dummyToken, fallbackAdmin);
        return { success: true, role: 'admin', redirectTo: '/admin', message: 'Logged in as Admin' };
      }

      return { success: false, message: (err as Error).message || 'Invalid credentials' };
    }
  }

  async function signup(payload: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    city?: string;
    address?: string;
    pincode?: string;
  }): Promise<{
    success: boolean;
    role?: 'customer';
    redirectTo?: string;
    message?: string;
  }> {
    try {
      const res = await api.authSignup(payload);
      if (res.success && res.token && res.user) {
        persistSession(res.token, res.user);
        return {
          success: true,
          role: 'customer',
          redirectTo: res.redirectTo || '/account',
          message: res.message,
        };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err) {
      return { success: false, message: (err as Error).message || 'Registration error' };
    }
  }

  function logout() {
    api.authLogout().catch(() => {});
    persistSession(null, null);
  }

  async function updateProfile(updates: Partial<AuthUser>): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await api.customerUpdateProfile(updates as Partial<CustomerAccount>);
      if (res.success && res.user) {
        const updated = { ...user, ...res.user, role: user?.role || 'customer' } as AuthUser;
        persistSession(token, updated);
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || 'Profile update failed' };
    } catch (err) {
      return { success: false, message: (err as Error).message || 'Update failed' };
    }
  }

  const role = user?.role || null;
  const adminUser: AdminUser | null =
    user && user.role === 'admin'
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'admin',
          avatar: user.avatar,
          phone: user.phone,
        }
      : null;

  const customerUser: CustomerAccount | null =
    user && user.role === 'customer'
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: 'customer',
          city: user.city,
          address: user.address,
          pincode: user.pincode,
          createdAt: user.createdAt,
        }
      : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        adminUser,
        customerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
