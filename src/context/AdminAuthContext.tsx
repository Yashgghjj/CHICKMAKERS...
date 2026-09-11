import { ReactNode } from 'react';
import type { AdminUser } from '../types';
import { useAuth } from './AuthContext';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useAdminAuth() {
  const { adminUser, token, isLoading, login, logout, updateProfile } = useAuth();

  return {
    adminUser,
    token,
    isLoading,
    login: (email: string, pass: string) => login(email, pass),
    logout,
    updateCurrentUser: (updates: Partial<AdminUser>) => updateProfile(updates as any),
  };
}
