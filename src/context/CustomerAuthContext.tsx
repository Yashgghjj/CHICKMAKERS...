import { ReactNode } from 'react';
import type { CustomerAccount } from '../types';
import { useAuth } from './AuthContext';

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useCustomerAuth() {
  const { customerUser, token, isLoading, login, signup, logout, updateProfile } = useAuth();

  return {
    customerUser,
    token,
    isLoading,
    login: (credentials: { identifier?: string; email?: string; phone?: string; password: string }) =>
      login(
        credentials.identifier || credentials.email || credentials.phone || '',
        credentials.password
      ),
    signup,
    logout,
    updateProfile: (updates: Partial<CustomerAccount>) => updateProfile(updates),
  };
}
