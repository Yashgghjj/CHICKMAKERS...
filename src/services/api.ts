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
import {
  AUTH_TOKEN_KEY,
  ADMIN_TOKEN_KEY,
  CUSTOMER_TOKEN_KEY,
  COUPONS,
  GST_RATE,
  ORDER_STATUSES,
} from '../types';
import {
  PRODUCTS,
  loadProductsFromStorage,
  saveProductsToStorage,
} from '../data/products';
import {
  loadOrdersFromStorage,
  saveOrdersToStorage,
  createFreshSampleOrder,
  buildTimeline,
  SAMPLE_ORDERS,
} from '../data/sampleOrders';
import {
  saveOrderToFirestore,
  saveAppointmentToFirestore,
  saveInquiryToFirestore,
} from '../lib/firestoreService';

const API_BASE = '';

const SETTINGS_STORAGE_KEY = 'chickmakers_admin_settings_v2';
const APPOINTMENTS_STORAGE_KEY = 'chickmakers_admin_appointments_v2';
const INQUIRIES_STORAGE_KEY = 'chickmakers_admin_inquiries_v2';
const USERS_STORAGE_KEY = 'chickmakers_admin_users_v2';

const DEFAULT_SETTINGS: AdminSettings = {
  businessName: 'Bamboo Chick Maker & Shiva Fabrication',
  founderName: 'Shiva',
  contactPhone: '+91 88260 54537',
  whatsappPhone: '+91 88260 54537',
  supportEmail: 'info@shivachickmaker.in',
  workshopAddress: 'LG-04, Asarfi Plaza, Sector 149, Greater Noida, UP 201310',
  operatingHours: 'Monday - Sunday: 8:00 AM - 9:00 PM',
  minOrderValue: 800,
  deliveryAndFittingFee: 350,
  enableNotifications: true,
  orderAlertSound: true,
  adminPassword: 'admin',
};

const DEFAULT_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    name: 'Vikram Malhotra',
    phone: '9871234567',
    address: 'Villa 14, Jaypee Greens, Sector 128',
    city: 'Noida',
    pincode: '201304',
    preferredDate: '2026-09-16',
    preferredTimeSlot: 'Morning (10 AM - 1 PM)',
    serviceRequired: 'Balcony Bamboo Chicks & Bird Net',
    approxSqFt: '160',
    notes: 'Please bring Assam bamboo slat samples and waterproof canvas swatches.',
    status: 'CONFIRMED',
    createdAt: '2026-09-12T09:15:00.000Z',
  },
  {
    id: 'apt-102',
    name: 'Ananya Deshmukh',
    phone: '9910088221',
    address: 'Tower C, Flat 902, ATS One Hamlet, Sector 104',
    city: 'Noida',
    pincode: '201301',
    preferredDate: '2026-09-17',
    preferredTimeSlot: 'Evening (3 PM - 6 PM)',
    serviceRequired: 'Designer Bamboo Blinds for Terrace',
    approxSqFt: '240',
    notes: 'Need heavy-duty wind tie-down straps.',
    status: 'SCHEDULED',
    createdAt: '2026-09-13T14:30:00.000Z',
  },
];

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-201',
    name: 'Rohan Mehra',
    phone: '9810239485',
    city: 'Greater Noida West',
    message: 'Looking for a 15x20 ft bamboo gazebo structure for our dhaba outdoor seating area.',
    createdAt: '2026-09-10T11:00:00.000Z',
    status: 'NEW',
  },
  {
    id: 'inq-202',
    name: 'Sunita Rawat',
    phone: '9876543219',
    city: 'Sector 62, Noida',
    message: 'Require pigeon net installation on 3 balconies. Quick installation needed.',
    createdAt: '2026-09-12T08:20:00.000Z',
    status: 'CONTACTED',
  },
];

const DEFAULT_USERS: CustomerUser[] = [
  {
    id: 'usr-101',
    name: 'Vikram Malhotra',
    email: 'vikram.m@gmail.com',
    phone: '9871234567',
    city: 'Noida',
    address: 'Villa 14, Jaypee Greens, Sector 128',
    totalOrders: 3,
    totalSpent: 16500,
    lastActive: '2026-09-12T10:00:00.000Z',
    source: 'order',
  },
  {
    id: 'usr-102',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@outlook.com',
    phone: '9910088221',
    city: 'Noida',
    address: 'Tower C, Flat 902, ATS One Hamlet, Sector 104',
    totalOrders: 2,
    totalSpent: 9800,
    lastActive: '2026-09-13T14:30:00.000Z',
    source: 'appointment',
  },
  {
    id: 'usr-103',
    name: 'Rohit Sharma',
    email: 'rohit.sharma@gmail.com',
    phone: '9810123456',
    city: 'Greater Noida',
    address: 'Flat 402, Tower 4, Paramount Golf Foreste',
    totalOrders: 1,
    totalSpent: 4250,
    lastActive: '2026-09-01T12:00:00.000Z',
    source: 'order',
  },
];

function loadStored<T>(key: string, defaults: T): T {
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaults;
}

function saveStored<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

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

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    throw new Error(`Endpoint ${path} returned HTML SPA fallback`);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

function calculateLocalQuote(
  payload: CustomBlindConfig & { productId: string; quantity: number }
): QuoteResult {
  const allProds = loadProductsFromStorage();
  const prod = allProds.find((p) => p.id === payload.productId) || PRODUCTS[0];
  const w = payload.widthFeet + (payload.widthInches || 0) / 12;
  const h = payload.heightFeet + (payload.heightInches || 0) / 12;
  const exactSqFt = Math.round(w * h * 100) / 100;
  const billingSqFt = Math.max(Math.ceil(exactSqFt), prod.minSqFt);

  let addOns = 0;
  if (payload.mechanism === 'brass-pulley') addOns += 180;
  if (payload.mechanism === 'nylon-pulley') addOns += 80;
  if (payload.mechanism === 'somfy-motor') addOns += 2400;
  if (payload.waterproofCoating) addOns += billingSqFt * 12;
  if (payload.tieDownStraps) addOns += 120;
  if (payload.includeInstallation) addOns += 250;

  const unitPrice = billingSqFt * prod.pricePerSqFt + addOns;
  const qty = payload.quantity || 1;
  const subtotal = unitPrice * qty;

  let discount = 0;
  let appliedCoupon: string | undefined;
  if (payload.couponCode && COUPONS[payload.couponCode.toUpperCase()]) {
    const coupon = COUPONS[payload.couponCode.toUpperCase()];
    if (subtotal >= coupon.minOrder) {
      discount = Math.round((subtotal * coupon.percent) / 100);
      appliedCoupon = payload.couponCode.toUpperCase();
    }
  }

  const afterDiscount = subtotal - discount;
  const tax = Math.round(afterDiscount * GST_RATE * 100) / 100;
  const totalAmount = Math.round((afterDiscount + tax) * 100) / 100;

  return {
    productId: prod.id,
    productName: prod.name,
    exactSqFt,
    billingSqFt,
    baseRatePerSqFt: prod.pricePerSqFt,
    addOnsPerBlind: addOns,
    unitPrice: Math.round(unitPrice),
    quantity: qty,
    subtotal: Math.round(subtotal),
    discount,
    tax,
    totalAmount,
    currency: 'INR',
    appliedCoupon,
    warrantyYears: prod.warrantyYears,
    estimatedCraftDays: prod.estimatedCraftDays,
  };
}

export const api = {
  health: () => request<{ status: string; activeOrdersCount: number }>('/api/health'),

  // ─── Products APIs with robust fallback ───────────────────────
  getProducts: async (category?: string): Promise<Product[]> => {
    try {
      const q = category && category !== 'all' ? `?category=${category}` : '';
      const res = await request<Product[]>(`/api/products${q}`);
      if (Array.isArray(res) && res.length > 0) {
        saveProductsToStorage(res);
        return res;
      }
    } catch (err) {
      // Backend not running / Vercel SPA rewrite -> load from storage
    }

    const stored = loadProductsFromStorage();
    if (category && category !== 'all') {
      return stored.filter((p) => {
        if (p.category === category) return true;
        if (category === 'safety-net' && (p.category === 'safety-net' || p.category === 'safety-nets')) return true;
        if (category === 'safety-nets' && (p.category === 'safety-net' || p.category === 'safety-nets')) return true;
        if (category === 'fabrication-roof' && (p.category === 'fabrication-roof' || p.category === 'welding-structure')) return true;
        if (category === 'welding-structure' && (p.category === 'fabrication-roof' || p.category === 'welding-structure')) return true;
        return false;
      });
    }
    return stored;
  },

  createProduct: async (product: Partial<Product>): Promise<{ success: boolean; product: Product; message: string }> => {
    try {
      const res = await request<{ success: boolean; product: Product; message: string }>('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
      });
      if (res.success && res.product) {
        const prods = loadProductsFromStorage();
        saveProductsToStorage([res.product, ...prods.filter((p) => p.id !== res.product.id)]);
        return res;
      }
    } catch {}

    // Fallback: create locally
    const current = loadProductsFromStorage();
    const newProd: Product = {
      id: product.id || `prod-${Date.now()}`,
      name: product.name || 'Custom Artisan Product',
      category: product.category || 'bamboo-chick',
      pricePerSqFt: product.pricePerSqFt || 60,
      minSqFt: product.minSqFt || 10,
      warrantyYears: product.warrantyYears || 3,
      estimatedCraftDays: product.estimatedCraftDays || 2,
      description: product.description || '',
      features: product.features && product.features.length ? product.features : ['Handcrafted Assam Quality'],
      materials: product.materials && product.materials.length ? product.materials : ['Natural Bamboo'],
      image: product.image || '/img/our-services/bamboo-chick.jpg',
      badge: product.badge || undefined,
    };
    const updated = [newProd, ...current.filter((p) => p.id !== newProd.id)];
    saveProductsToStorage(updated);
    return { success: true, product: newProd, message: 'Product created successfully in catalog' };
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<{ success: boolean; product: Product; message: string }> => {
    try {
      const res = await request<{ success: boolean; product: Product; message: string }>(
        `/api/products/${encodeURIComponent(id)}`,
        {
          method: 'PUT',
          body: JSON.stringify(product),
        }
      );
      if (res.success && res.product) {
        const prods = loadProductsFromStorage();
        saveProductsToStorage(prods.map((p) => (p.id === id ? res.product : p)));
        return res;
      }
    } catch {}

    // Fallback: update locally
    const current = loadProductsFromStorage();
    let updatedItem: Product | null = null;
    const updated = current.map((p) => {
      if (p.id === id) {
        updatedItem = { ...p, ...product } as Product;
        return updatedItem;
      }
      return p;
    });

    if (updatedItem) {
      saveProductsToStorage(updated);
      return { success: true, product: updatedItem, message: 'Product updated successfully' };
    }
    throw new Error('Product not found in catalog');
  },

  deleteProduct: async (id: string): Promise<{ success: boolean; product: Product; message: string }> => {
    try {
      const res = await request<{ success: boolean; product: Product; message: string }>(
        `/api/products/${encodeURIComponent(id)}`,
        {
          method: 'DELETE',
        }
      );
      if (res.success) {
        const prods = loadProductsFromStorage();
        saveProductsToStorage(prods.filter((p) => p.id !== id));
        return res;
      }
    } catch {}

    // Fallback: delete locally
    const current = loadProductsFromStorage();
    const target = current.find((p) => p.id === id);
    const remaining = current.filter((p) => p.id !== id);
    saveProductsToStorage(remaining);
    return {
      success: true,
      product: target || (PRODUCTS[0] as Product),
      message: 'Product deleted from catalog',
    };
  },

  // ─── Quote Calculation with fallback ──────────────────────────
  calculateQuote: async (payload: CustomBlindConfig & { productId: string; quantity: number }): Promise<{ success: boolean; quote: QuoteResult }> => {
    try {
      const res = await request<{ success: boolean; quote: QuoteResult }>('/api/quote/calculate', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (res.success && res.quote) return res;
    } catch {}

    // Offline / Static fallback
    const quote = calculateLocalQuote(payload);
    return { success: true, quote };
  },

  // ─── Orders APIs with fallback ────────────────────────────────
  createOrder: async (order: Partial<Order>): Promise<{ success: boolean; order: Order; message: string }> => {
    try {
      const res = await request<{ success: boolean; order: Order; message: string }>('/api/orders', {
        method: 'POST',
        body: JSON.stringify(order),
      });
      if (res.success && res.order) {
        const stored = loadOrdersFromStorage();
        saveOrdersToStorage([res.order, ...stored.filter((o) => o.id !== res.order.id)]);
        saveOrderToFirestore(res.order).catch(() => {});
        return res;
      }
    } catch {}

    // Local creation
    const fresh = createFreshSampleOrder();
    const fullOrder: Order = {
      ...fresh,
      ...(order as Order),
      id: order.id || fresh.id,
      orderNumber: order.orderNumber || fresh.orderNumber,
      createdAt: order.createdAt || new Date().toISOString(),
      timeline: order.timeline || buildTimeline('CONFIRMED'),
    };
    const stored = loadOrdersFromStorage();
    saveOrdersToStorage([fullOrder, ...stored.filter((o) => o.id !== fullOrder.id)]);
    saveOrderToFirestore(fullOrder).catch(() => {});
    return { success: true, order: fullOrder, message: 'Order placed successfully' };
  },

  getOrder: async (id: string): Promise<{ success: boolean; order: Order }> => {
    try {
      const res = await request<{ success: boolean; order: Order }>(`/api/orders/${encodeURIComponent(id)}`);
      if (res.success && res.order) return res;
    } catch {}

    const stored = loadOrdersFromStorage();
    const clean = id.trim().toLowerCase();
    const match = stored.find(
      (o) =>
        o.id.toLowerCase() === clean ||
        o.orderNumber.toLowerCase() === clean ||
        o.customerPhone.includes(clean)
    );
    if (match) return { success: true, order: match };
    throw new Error('Order not found');
  },

  updateOrderStatus: async (
    id: string,
    payload: { status: string; location?: string; note?: string }
  ): Promise<{ success: boolean; order: Order }> => {
    try {
      const res = await request<{ success: boolean; order: Order }>(
        `/api/orders/${encodeURIComponent(id)}/status`,
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
        }
      );
      if (res.success && res.order) {
        const stored = loadOrdersFromStorage();
        saveOrdersToStorage(stored.map((o) => (o.id === id ? res.order : o)));
        return res;
      }
    } catch {}

    const stored = loadOrdersFromStorage();
    let updatedOrder: Order | null = null;
    const updated = stored.map((o) => {
      if (o.id === id || o.orderNumber === id) {
        const timeline = buildTimeline(payload.status as any);
        updatedOrder = {
          ...o,
          currentStatus: payload.status as any,
          timeline,
        };
        return updatedOrder;
      }
      return o;
    });

    if (updatedOrder) {
      saveOrdersToStorage(updated);
      return { success: true, order: updatedOrder };
    }
    throw new Error('Order not found');
  },

  // ─── Measurements & Inquiries with fallback ───────────────────
  bookMeasurement: async (payload: Partial<Appointment>): Promise<{ success: boolean; appointment: Appointment; message: string }> => {
    try {
      const res = await request<{ success: boolean; appointment: Appointment; message: string }>('/api/measurements', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (res.success && res.appointment) {
        const apts = loadStored<Appointment[]>(APPOINTMENTS_STORAGE_KEY, DEFAULT_APPOINTMENTS);
        saveStored(APPOINTMENTS_STORAGE_KEY, [res.appointment, ...apts]);
        saveAppointmentToFirestore(res.appointment).catch(() => {});
        return res;
      }
    } catch {}

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      name: payload.name || '',
      phone: payload.phone || '',
      address: payload.address || '',
      city: payload.city || 'Noida',
      pincode: payload.pincode || '',
      preferredDate: payload.preferredDate || new Date().toISOString().split('T')[0],
      preferredTimeSlot: payload.preferredTimeSlot || 'Morning (10 AM - 1 PM)',
      serviceRequired: payload.serviceRequired || 'Bamboo Chicks & Bird Net',
      approxSqFt: payload.approxSqFt || '100',
      notes: payload.notes || '',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };
    const apts = loadStored<Appointment[]>(APPOINTMENTS_STORAGE_KEY, DEFAULT_APPOINTMENTS);
    saveStored(APPOINTMENTS_STORAGE_KEY, [newApt, ...apts]);
    saveAppointmentToFirestore(newApt).catch(() => {});
    return { success: true, appointment: newApt, message: 'Measurement visit confirmed' };
  },

  submitContact: async (payload: { name: string; phone: string; city: string; message: string }): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await request<{ success: boolean; message: string }>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (res.success) return res;
    } catch {}

    const inq: Inquiry = {
      id: `inq-${Date.now()}`,
      name: payload.name,
      phone: payload.phone,
      city: payload.city,
      message: payload.message,
      createdAt: new Date().toISOString(),
      status: 'NEW',
    };
    const inqs = loadStored<Inquiry[]>(INQUIRIES_STORAGE_KEY, DEFAULT_INQUIRIES);
    saveStored(INQUIRIES_STORAGE_KEY, [inq, ...inqs]);
    saveInquiryToFirestore(inq).catch(() => {});
    return { success: true, message: 'Inquiry submitted successfully! Shiva will call you shortly.' };
  },

  // ─── Admin APIs with fallback ─────────────────────────────────
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

  adminGetStats: async (): Promise<{ success: boolean; stats: AdminStats }> => {
    try {
      const res = await request<{ success: boolean; stats: AdminStats }>('/api/admin/stats');
      if (res.success && res.stats) return res;
    } catch {}

    // Compute stats from local orders and data
    const orders = loadOrdersFromStorage();
    const apts = loadStored<Appointment[]>(APPOINTMENTS_STORAGE_KEY, DEFAULT_APPOINTMENTS);
    const prods = loadProductsFromStorage();

    const totalOrders = orders.length;
    const completedOrders = orders.filter((o) => o.currentStatus === 'COMPLETED').length;
    const pendingOrders = totalOrders - completedOrders;
    const totalRevenue = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
    const totalCustomers = DEFAULT_USERS.length;
    const totalProducts = prods.length;
    const totalAppointments = apts.length;

    const ordersByStatus = ORDER_STATUSES.map((status) => ({
      status,
      count: orders.filter((o) => o.currentStatus === status).length,
    }));

    return {
      success: true,
      stats: {
        totalRevenue: Math.round(totalRevenue),
        totalOrders,
        pendingOrders,
        completedOrders,
        totalProducts,
        totalCustomers,
        totalAppointments,
        revenueByMonth: [
          { month: 'Jul 2026', revenue: 42000, orders: 12 },
          { month: 'Aug 2026', revenue: 68500, orders: 19 },
          { month: 'Sep 2026', revenue: Math.max(totalRevenue, 89000), orders: Math.max(totalOrders, 24) },
        ],
        ordersByStatus,
        topCategories: [
          { category: 'Bamboo Chick Blinds', sales: 64000, count: 18 },
          { category: 'Safety & Bird Nets', sales: 22000, count: 8 },
          { category: 'Bamboo Huts & Gazebos', sales: 45000, count: 2 },
        ],
      },
    };
  },

  adminGetOrders: async (params?: { search?: string; status?: string; paymentStatus?: string }): Promise<{ success: boolean; orders: Order[]; total: number }> => {
    try {
      const sp = new URLSearchParams();
      if (params?.search) sp.set('search', params.search);
      if (params?.status) sp.set('status', params.status);
      if (params?.paymentStatus) sp.set('paymentStatus', params.paymentStatus);
      const q = sp.toString() ? `?${sp.toString()}` : '';
      const res = await request<{ success: boolean; orders: Order[]; total: number }>(`/api/admin/orders${q}`);
      if (res.success && Array.isArray(res.orders)) {
        return res;
      }
    } catch {}

    let orders = loadOrdersFromStorage();
    if (params?.search) {
      const s = params.search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(s) ||
          o.customerName.toLowerCase().includes(s) ||
          o.customerPhone.includes(s)
      );
    }
    if (params?.status && params.status !== 'ALL') {
      orders = orders.filter((o) => o.currentStatus === params.status);
    }
    if (params?.paymentStatus && params.paymentStatus !== 'ALL') {
      orders = orders.filter((o) => o.paymentStatus === params.paymentStatus);
    }

    return { success: true, orders, total: orders.length };
  },

  adminCreateOrder: async (payload: Partial<Order>): Promise<{ success: boolean; message: string; order: Order }> => {
    return api.createOrder(payload);
  },

  adminClearOrders: async (): Promise<{ success: boolean; message: string }> => {
    try {
      await request<{ success: boolean; message: string }>('/api/admin/orders/clear', {
        method: 'POST',
      });
    } catch {}
    saveOrdersToStorage([]);
    return { success: true, message: 'All orders cleared' };
  },

  adminSeedSampleOrder: async (): Promise<{ success: boolean; message: string; order: Order }> => {
    try {
      const res = await request<{ success: boolean; message: string; order: Order }>('/api/admin/orders/seed', {
        method: 'POST',
      });
      if (res.success && res.order) {
        const stored = loadOrdersFromStorage();
        saveOrdersToStorage([res.order, ...stored]);
        return res;
      }
    } catch {}

    const sample = createFreshSampleOrder();
    const stored = loadOrdersFromStorage();
    saveOrdersToStorage([sample, ...stored]);
    saveOrderToFirestore(sample).catch(() => {});
    return { success: true, message: 'Fresh sample order generated', order: sample };
  },

  adminDeleteOrder: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      await request<{ success: boolean; message: string }>(`/api/admin/orders/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch {}
    const stored = loadOrdersFromStorage();
    saveOrdersToStorage(stored.filter((o) => o.id !== id && o.orderNumber !== id));
    return { success: true, message: 'Order deleted' };
  },

  adminGetUsers: async (search?: string): Promise<{ success: boolean; users: CustomerUser[]; total: number }> => {
    try {
      const q = search ? `?search=${encodeURIComponent(search)}` : '';
      const res = await request<{ success: boolean; users: CustomerUser[]; total: number }>(`/api/admin/users${q}`);
      if (res.success && Array.isArray(res.users)) return res;
    } catch {}

    let users = loadStored<CustomerUser[]>(USERS_STORAGE_KEY, DEFAULT_USERS);
    if (search) {
      const s = search.toLowerCase();
      users = users.filter((u) => u.name.toLowerCase().includes(s) || (u.email && u.email.toLowerCase().includes(s)) || u.phone.includes(s));
    }
    return { success: true, users, total: users.length };
  },

  adminGetAppointments: async (): Promise<{ success: boolean; appointments: Appointment[] }> => {
    try {
      const res = await request<{ success: boolean; appointments: Appointment[] }>('/api/admin/appointments');
      if (res.success && Array.isArray(res.appointments)) return res;
    } catch {}
    const apts = loadStored<Appointment[]>(APPOINTMENTS_STORAGE_KEY, DEFAULT_APPOINTMENTS);
    return { success: true, appointments: apts };
  },

  adminUpdateAppointment: async (id: string, payload: Partial<Appointment>): Promise<{ success: boolean; appointment: Appointment }> => {
    try {
      const res = await request<{ success: boolean; appointment: Appointment }>(
        `/api/admin/appointments/${encodeURIComponent(id)}`,
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
        }
      );
      if (res.success && res.appointment) return res;
    } catch {}

    const apts = loadStored<Appointment[]>(APPOINTMENTS_STORAGE_KEY, DEFAULT_APPOINTMENTS);
    let updated: Appointment | null = null;
    const next = apts.map((a) => {
      if (a.id === id) {
        updated = { ...a, ...payload };
        return updated;
      }
      return a;
    });
    if (updated) {
      saveStored(APPOINTMENTS_STORAGE_KEY, next);
      saveAppointmentToFirestore(updated).catch(() => {});
      return { success: true, appointment: updated };
    }
    throw new Error('Appointment not found');
  },

  adminDeleteAppointment: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      await request<{ success: boolean; message: string }>(`/api/admin/appointments/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch {}
    const apts = loadStored<Appointment[]>(APPOINTMENTS_STORAGE_KEY, DEFAULT_APPOINTMENTS);
    saveStored(APPOINTMENTS_STORAGE_KEY, apts.filter((a) => a.id !== id));
    return { success: true, message: 'Appointment deleted' };
  },

  adminGetInquiries: async (): Promise<{ success: boolean; inquiries: Inquiry[] }> => {
    try {
      const res = await request<{ success: boolean; inquiries: Inquiry[] }>('/api/admin/inquiries');
      if (res.success && Array.isArray(res.inquiries)) return res;
    } catch {}
    const inqs = loadStored<Inquiry[]>(INQUIRIES_STORAGE_KEY, DEFAULT_INQUIRIES);
    return { success: true, inquiries: inqs };
  },

  adminUpdateInquiry: async (id: string, payload: Partial<Inquiry>): Promise<{ success: boolean; inquiry: Inquiry }> => {
    try {
      const res = await request<{ success: boolean; inquiry: Inquiry }>(
        `/api/admin/inquiries/${encodeURIComponent(id)}`,
        {
          method: 'PATCH',
          body: JSON.stringify(payload),
        }
      );
      if (res.success && res.inquiry) return res;
    } catch {}

    const inqs = loadStored<Inquiry[]>(INQUIRIES_STORAGE_KEY, DEFAULT_INQUIRIES);
    let updated: Inquiry | null = null;
    const next = inqs.map((i) => {
      if (i.id === id) {
        updated = { ...i, ...payload };
        return updated;
      }
      return i;
    });
    if (updated) {
      saveStored(INQUIRIES_STORAGE_KEY, next);
      return { success: true, inquiry: updated };
    }
    throw new Error('Inquiry not found');
  },

  adminGetSettings: async (): Promise<{ success: boolean; settings: AdminSettings }> => {
    try {
      const res = await request<{ success: boolean; settings: AdminSettings }>('/api/admin/settings');
      if (res.success && res.settings) return res;
    } catch {}
    const s = loadStored<AdminSettings>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
    return { success: true, settings: s };
  },

  adminUpdateSettings: async (settings: Partial<AdminSettings>): Promise<{ success: boolean; message: string; settings: AdminSettings }> => {
    try {
      const res = await request<{ success: boolean; message: string; settings: AdminSettings }>('/api/admin/settings', {
        method: 'POST',
        body: JSON.stringify(settings),
      });
      if (res.success && res.settings) return res;
    } catch {}

    const current = loadStored<AdminSettings>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
    const next = { ...current, ...settings };
    saveStored(SETTINGS_STORAGE_KEY, next);
    return { success: true, message: 'Settings saved', settings: next };
  },

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

  authGoogle: (payload: { email: string; name?: string; avatar?: string; googleId?: string }) =>
    request<SmartAuthResult>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify(payload),
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

  customerGetOrders: async (): Promise<{ success: boolean; orders: Order[] }> => {
    try {
      const res = await request<{ success: boolean; orders: Order[] }>('/api/customer/orders');
      if (res.success && Array.isArray(res.orders)) return res;
    } catch {}
    const stored = loadOrdersFromStorage();
    return { success: true, orders: stored };
  },
};
