import type { Order, Appointment, QuoteResult, CustomBlindConfig } from '../types';

const API_BASE = '';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
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
    return request<unknown[]>(`/api/products${q}`);
  },

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
};
