import type {
  Order,
  Appointment,
  QuoteResult,
  CustomBlindConfig,
  Product,
  AdminUser,
  AdminStats,
  AdminSettings,
  CustomerUser,
  CustomerAccount,
  SmartAuthResult,
  AuthUser,
  Inquiry,
} from '../types';
import { AUTH_TOKEN_KEY, ADMIN_TOKEN_KEY, CUSTOMER_TOKEN_KEY } from '../types';

const API_BASE = '';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token =
      localStorage.getItem(AUTH_TOKEN_KEY) ||
      localStorage.getItem(ADMIN_TOKEN_KEY) ||
      localStorage.getItem(CUSTOMER_TOKEN_KEY);
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(token ? { 'x-auth-token': token } : {}),
    ...(token ? { 'x-admin-token': token } : {}),
    ...(token ? { 'x-customer-token': token } : {}),
    ...(options?.headers as Record<string, string> || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export const api = {
  health: () => request<{ status: string; activeOrdersCount: number }>('/api/health'),

  getProducts: (category?: string) => {
    const q = category && category !== 'all' ? `?category=${category}` : '';
    return request<Product[]>(`/api/products${q}`);
  },

  createProduct: (product: Partial<Product>) =>
    request<{ success: boolean; product: Product; message: string }>('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  updateProduct: (id: string, product: Partial<Product>) =>
    request<{ success: boolean; product: Product; message: string }>(`/api/products/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),

  deleteProduct: (id: string) =>
    request<{ success: boolean; product: Product; message: string }>(`/api/products/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  calculateQuote: (payload: CustomBlindConfig & { productId: string; quantity: number }) =>
    request<{ success: boolean; quote: QuoteResult }>('/api/quote/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  createOrder: (order: Partial<Order>) =>
    request<{ success: boolean; order: Order; message: string }>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),

  getOrder: (id: string) => request<{ success: boolean; order: Order }>(`/api/orders/${encodeURIComponent(id)}`),

  updateOrderStatus: (id: string, payload: { status: string; location?: string; note?: string }) =>
    request<{ success: boolean; order: Order }>(`/api/orders/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  bookMeasurement: (payload: Partial<Appointment>) =>
    request<{ success: boolean; appointment: Appointment; message: string }>('/api/measurements', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  submitContact: (payload: { name: string; phone: string; city: string; message: string }) =>
    request<{ success: boolean; message: string }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Admin APIs
  adminLogin: (email: string, password: string) =>
    request<SmartAuthResult>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  adminGetMe: () => request<{ success: boolean; user: AdminUser }>('/api/admin/me'),

  adminLogout: () =>
    request<{ success: boolean; message: string }>('/api/admin/logout', {
      method: 'POST',
    }),

  adminGetStats: () => request<{ success: boolean; stats: AdminStats }>('/api/admin/stats'),

  adminGetOrders: (params?: { search?: string; status?: string; paymentStatus?: string }) => {
    const sp = new URLSearchParams();
    if (params?.search) sp.set('search', params.search);
    if (params?.status) sp.set('status', params.status);
    if (params?.paymentStatus) sp.set('paymentStatus', params.paymentStatus);
    const q = sp.toString() ? `?${sp.toString()}` : '';
    return request<{ success: boolean; orders: Order[]; total: number }>(`/api/admin/orders${q}`);
  },

  adminCreateOrder: (payload: Partial<Order>) =>
    request<{ success: boolean; message: string; order: Order }>('/api/admin/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  adminClearOrders: () =>
    request<{ success: boolean; message: string }>('/api/admin/orders/clear', {
      method: 'POST',
    }),

  adminSeedSampleOrder: () =>
    request<{ success: boolean; message: string; order: Order }>('/api/admin/orders/seed', {
      method: 'POST',
    }),

  adminDeleteOrder: (id: string) =>
    request<{ success: boolean; message: string }>(`/api/admin/orders/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  adminGetUsers: (search?: string) => {
    const q = search ? `?search=${encodeURIComponent(search)}` : '';
    return request<{ success: boolean; users: CustomerUser[]; total: number }>(`/api/admin/users${q}`);
  },

  adminGetAppointments: () =>
    request<{ success: boolean; appointments: Appointment[] }>('/api/admin/appointments'),

  adminUpdateAppointment: (id: string, payload: Partial<Appointment>) =>
    request<{ success: boolean; appointment: Appointment }>(`/api/admin/appointments/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  adminDeleteAppointment: (id: string) =>
    request<{ success: boolean; message: string }>(`/api/admin/appointments/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  adminGetInquiries: () => request<{ success: boolean; inquiries: Inquiry[] }>('/api/admin/inquiries'),

  adminUpdateInquiry: (id: string, payload: Partial<Inquiry>) =>
    request<{ success: boolean; inquiry: Inquiry }>(`/api/admin/inquiries/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  adminGetSettings: () => request<{ success: boolean; settings: AdminSettings }>('/api/admin/settings'),

  adminUpdateSettings: (settings: Partial<AdminSettings>) =>
    request<{ success: boolean; message: string; settings: AdminSettings }>('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify(settings),
    }),

  // ─── Customer Authentication APIs ───────────────────────────
  customerSignup: (payload: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    city?: string;
    address?: string;
    pincode?: string;
  }) =>
    request<{ success: boolean; token: string; user: CustomerAccount; message: string }>('/api/customer/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  customerLogin: (payload: { identifier?: string; email?: string; phone?: string; password: string }) =>
    request<SmartAuthResult>('/api/customer/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // ─── Unified Authentication APIs (Common for Customers & Admins) ───
  authLogin: (payload: { identifier?: string; email?: string; phone?: string; password: string }) =>
    request<SmartAuthResult>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  authSignup: (payload: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    city?: string;
    address?: string;
    pincode?: string;
  }) =>
    request<{ success: boolean; token: string; role: 'customer'; redirectTo: string; user: AuthUser; message: string }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  authGetMe: () => request<{ success: boolean; user: AuthUser; role: 'admin' | 'customer' }>('/api/auth/me'),

  authLogout: () =>
    request<{ success: boolean; message: string }>('/api/auth/logout', {
      method: 'POST',
    }),

  // Unified Smart Login alias (Auto-configures Admin vs Customer)
  smartLogin: (payload: { identifier?: string; email?: string; phone?: string; password: string }) =>
    request<SmartAuthResult>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  customerLogout: () =>
    request<{ success: boolean; message: string }>('/api/customer/logout', {
      method: 'POST',
    }),

  customerGetMe: () => request<{ success: boolean; user: CustomerAccount }>('/api/customer/me'),

  customerUpdateProfile: (payload: Partial<CustomerAccount>) =>
    request<{ success: boolean; user: CustomerAccount; message: string }>('/api/customer/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  customerGetOrders: () => request<{ success: boolean; orders: Order[] }>('/api/customer/orders'),
};
