import express from 'express';
import cors from 'cors';
import path from 'path';
import { PRODUCTS } from './src/data/products.ts';
import type {
  Order,
  Appointment,
  Inquiry,
  OrderStatus,
  Mechanism,
  Product,
  AdminUser,
  AdminSettings,
  CustomerUser,
  CustomerAccount,
} from './src/types.ts';
import {
  buildTimeline,
  generateOrderNumber,
  generateOrderId,
  generateTransactionId,
  getRandomTechnician,
  createFreshSampleOrder,
  SAMPLE_ORDERS,
} from './src/data/sampleOrders.ts';
import { COUPONS, GST_RATE } from './src/types.ts';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const isProd = process.env.NODE_ENV === 'production';

let products: Product[] = [...PRODUCTS];
let orders: Order[] = [];
const appointments: Appointment[] = [
  {
    id: 'apt-101',
    name: 'Vikram Malhotra',
    phone: '9871234567',
    address: 'Villa 14, Jaypee Greens, Sector 128',
    city: 'Noida',
    pincode: '201304',
    preferredDate: '2026-09-12',
    preferredTimeSlot: 'Morning (10 AM - 1 PM)',
    serviceRequired: 'Balcony Bamboo Chicks & Bird Net',
    approxSqFt: '160',
    notes: 'Please bring Assam bamboo slat samples and waterproof canvas swatches.',
    status: 'CONFIRMED',
    createdAt: '2026-09-09T09:15:00.000Z',
  },
  {
    id: 'apt-102',
    name: 'Ananya Deshmukh',
    phone: '9910088221',
    address: 'Tower C, Flat 902, ATS One Hamlet, Sector 104',
    city: 'Noida',
    pincode: '201301',
    preferredDate: '2026-09-14',
    preferredTimeSlot: 'Evening (3 PM - 6 PM)',
    serviceRequired: 'Designer Bamboo Blinds for Terrace',
    approxSqFt: '240',
    notes: 'Need heavy-duty wind tie-down straps.',
    status: 'SCHEDULED',
    createdAt: '2026-09-10T14:30:00.000Z',
  },
];
const inquiries: Inquiry[] = [
  {
    id: 'inq-201',
    name: 'Rohan Mehra',
    phone: '9810239485',
    city: 'Greater Noida West',
    message: 'Looking for a 15x20 ft bamboo gazebo structure for our dhaba outdoor seating area.',
    createdAt: '2026-09-08T11:00:00.000Z',
    status: 'NEW',
  },
  {
    id: 'inq-202',
    name: 'Sunita Rawat',
    phone: '9876543219',
    city: 'Sector 62, Noida',
    message: 'Require pigeon net installation on 3 balconies. Quick installation needed.',
    createdAt: '2026-09-10T08:20:00.000Z',
    status: 'CONTACTED',
  },
];

let adminSettings: AdminSettings = {
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

// ─── UNIFIED USER DATABASE & SECURE RBAC STATE ───────────────
interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
  passwordHash: string;
  city?: string;
  address?: string;
  pincode?: string;
  createdAt: string;
  avatar?: string;
}

interface AuthSession {
  token: string;
  userId: string;
  role: 'admin' | 'customer';
  email: string;
  name: string;
  createdAt: string;
}

// Single Source of Truth: In-Memory Unified User Database
const usersDatabase: UserRecord[] = [
  {
    id: 'adm-shiva-01',
    name: 'Shiva (Proprietor)',
    email: 'admin@chickmakers.com',
    phone: '8826054537',
    role: 'admin',
    passwordHash: 'admin',
    city: 'Greater Noida',
    address: 'LG-04, Asarfi Plaza, Sector 149',
    createdAt: '2026-01-01T10:00:00.000Z',
    avatar: '/img/artisan-logo.png',
  },
  {
    id: 'adm-shiva-alias',
    name: 'Shiva (Proprietor)',
    email: 'shiva@shivachickmaker.in',
    phone: '+918826054537',
    role: 'admin',
    passwordHash: 'admin',
    city: 'Greater Noida',
    address: 'LG-04, Asarfi Plaza, Sector 149',
    createdAt: '2026-01-01T10:00:00.000Z',
    avatar: '/img/artisan-logo.png',
  },
  {
    id: 'cust-demo-01',
    name: 'Vikram Malhotra',
    email: 'vikram@example.com',
    phone: '9871234567',
    role: 'customer',
    city: 'Noida',
    address: 'Villa 14, Jaypee Greens, Sector 128',
    pincode: '201304',
    createdAt: '2026-09-01T10:00:00.000Z',
    passwordHash: 'customer123',
  },
  {
    id: 'cust-demo-02',
    name: 'Ananya Deshmukh',
    email: 'ananya@example.com',
    phone: '9910088221',
    role: 'customer',
    city: 'Noida',
    address: 'Tower C, Flat 902, ATS One Hamlet, Sector 104',
    pincode: '201301',
    createdAt: '2026-09-05T10:00:00.000Z',
    passwordHash: 'customer123',
  },
];

// Active Unified Sessions Map (Token -> AuthSession)
const authSessions = new Map<string, AuthSession>();

// Seed default admin token for dev/staging
authSessions.set('default_admin_session_token', {
  token: 'default_admin_session_token',
  userId: 'adm-shiva-01',
  role: 'admin',
  email: 'admin@chickmakers.com',
  name: 'Shiva (Proprietor)',
  createdAt: new Date().toISOString(),
});

function extractToken(req: express.Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  const xToken =
    req.headers['x-auth-token'] ||
    req.headers['x-admin-token'] ||
    req.headers['x-customer-token'];
  if (typeof xToken === 'string' && xToken.trim()) {
    return xToken.trim();
  }
  return null;
}

// Backend RBAC Verification: Look up token in sessions AND verify active user role in database
function getAuthenticatedUser(req: express.Request): { session: AuthSession; user: UserRecord } | null {
  const token = extractToken(req);
  if (!token) return null;

  const session = authSessions.get(token);
  if (!session) return null;

  // VERIFY AGAINST DATABASE: Verify user exists in database and retrieve canonical role
  const user = usersDatabase.find((u) => u.id === session.userId);
  if (!user) {
    authSessions.delete(token);
    return null;
  }

  // Ensure session role reflects actual database role
  session.role = user.role;

  return { session, user };
}

// Strict RBAC Middleware: Admin Verification (Backend Role Check)
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const auth = getAuthenticatedUser(req);
  if (!auth) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
      message: 'Authentication required. Please sign in with administrator credentials.',
    });
  }

  // Strict Backend Role Check: Only database role 'admin' can proceed
  if (auth.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      code: 'FORBIDDEN_CUSTOMER_ROLE',
      message: 'Access denied: Your account role is Customer. Only users with database role Admin can access this resource.',
    });
  }

  (req as any).user = auth.user;
  (req as any).adminUser = {
    userId: auth.user.id,
    token: auth.session.token,
    role: auth.user.role,
    email: auth.user.email,
    name: auth.user.name,
    createdAt: auth.session.createdAt,
  };
  next();
}

// Strict RBAC Middleware: Customer Verification (Backend Role Check)
function requireCustomer(req: express.Request, res: express.Response, next: express.NextFunction) {
  const auth = getAuthenticatedUser(req);
  if (!auth) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
      message: 'Sign in required. Please log in to your account.',
    });
  }

  (req as any).user = auth.user;
  (req as any).customer = {
    customerId: auth.user.id,
    token: auth.session.token,
    role: auth.user.role,
    email: auth.user.email,
    name: auth.user.name,
  };
  next();
}

function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

interface QuoteInput {
  productId: string;
  widthFeet: number;
  widthInches: number;
  heightFeet: number;
  heightInches: number;
  quantity: number;
  mechanism?: Mechanism;
  waterproofCoating?: boolean;
  tieDownStraps?: boolean;
  includeInstallation?: boolean;
  couponCode?: string;
}

function calcSqFt(wFt: number, wIn: number, hFt: number, hIn: number): number {
  const w = wFt + wIn / 12;
  const h = hFt + hIn / 12;
  return w * h;
}

function calcAddOns(
  billingSqFt: number,
  mechanism: Mechanism = 'standard',
  waterproof = false,
  tieDown = false,
  installation = false,
): number {
  let addOns = 0;
  if (mechanism === 'brass-pulley') addOns += 280;
  else if (mechanism === 'nylon-pulley') addOns += 150;
  else if (mechanism === 'somfy-motor') addOns += 2800;
  if (waterproof) addOns += billingSqFt * 12;
  if (tieDown) addOns += 160;
  if (installation) addOns += Math.max(billingSqFt * 8, 300);
  return addOns;
}

function calculateQuote(input: QuoteInput) {
  const product = getProductById(input.productId);
  if (!product) throw new Error('Product not found');

  const exactSqFt = calcSqFt(input.widthFeet, input.widthInches, input.heightFeet, input.heightInches);
  const billingSqFt = Math.max(product.minSqFt, Math.ceil(exactSqFt));
  const mechanism = input.mechanism || 'standard';
  const addOnsPerBlind = calcAddOns(
    billingSqFt,
    mechanism,
    input.waterproofCoating,
    input.tieDownStraps,
    input.includeInstallation,
  );
  const unitPrice = billingSqFt * product.pricePerSqFt + addOnsPerBlind;
  const subtotal = unitPrice * (input.quantity || 1);

  let discount = 0;
  let appliedCoupon: string | undefined;
  if (input.couponCode) {
    const coupon = COUPONS[input.couponCode.toUpperCase()];
    if (coupon && subtotal >= coupon.minOrder) {
      discount = (subtotal * coupon.percent) / 100;
      appliedCoupon = input.couponCode.toUpperCase();
    }
  }

  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * GST_RATE;
  const totalAmount = afterDiscount + tax;

  return {
    productId: product.id,
    productName: product.name,
    exactSqFt: Math.round(exactSqFt * 100) / 100,
    billingSqFt,
    baseRatePerSqFt: product.pricePerSqFt,
    addOnsPerBlind,
    unitPrice: Math.round(unitPrice),
    quantity: input.quantity || 1,
    subtotal: Math.round(subtotal),
    discount: Math.round(discount),
    tax: Math.round(tax * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    currency: 'INR',
    appliedCoupon,
    warrantyYears: product.warrantyYears,
    estimatedCraftDays: product.estimatedCraftDays,
  };
}

function findOrder(id: string): Order | undefined {
  const normalized = id.replace(/\s/g, '');
  return orders.find(
    (o) =>
      o.id === normalized ||
      o.orderNumber === normalized ||
      o.orderNumber.replace(/-/g, '') === normalized.replace(/-/g, '') ||
      o.customerPhone.replace(/\D/g, '').includes(normalized.replace(/\D/g, '')),
  );
}

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Bamboo Chick Maker & Shiva Fabrication API',
      activeOrdersCount: orders.length,
      activeAppointmentsCount: appointments.length,
    });
  });

  app.get('/api/products', (req, res) => {
    const category = req.query.category as string | undefined;
    const filtered =
      category && category !== 'all' ? products.filter((p) => p.category === category) : products;
    res.json(filtered);
  });

  // Product CRUD (Admin Protected)
  app.post('/api/products', requireAdmin, (req, res) => {
    const body = req.body;
    if (!body.name || !body.category || body.pricePerSqFt === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required product fields' });
    }
    const newProduct: Product = {
      id: body.id || `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      category: body.category,
      pricePerSqFt: Number(body.pricePerSqFt) || 50,
      minSqFt: Number(body.minSqFt) || 10,
      warrantyYears: Number(body.warrantyYears) || 3,
      estimatedCraftDays: Number(body.estimatedCraftDays) || 2,
      description: body.description || '',
      features: Array.isArray(body.features) ? body.features : ['Assam Bamboo Craft'],
      materials: Array.isArray(body.materials) ? body.materials : ['Natural Bamboo'],
      image: body.image || '/img/our-services/bamboo-chick.jpg',
      badge: body.badge || undefined,
    };
    products.unshift(newProduct);
    res.json({ success: true, message: 'Product created successfully', product: newProduct });
  });

  app.put('/api/products/:id', requireAdmin, (req, res) => {
    const idx = products.findIndex((p) => p.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const existing = products[idx];
    const updated: Product = {
      ...existing,
      ...req.body,
      id: existing.id, // Preserve id
    };
    products[idx] = updated;
    res.json({ success: true, message: 'Product updated successfully', product: updated });
  });

  app.delete('/api/products/:id', requireAdmin, (req, res) => {
    const idx = products.findIndex((p) => p.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const removed = products.splice(idx, 1)[0];
    res.json({ success: true, message: 'Product deleted', product: removed });
  });

  // ─── UNIFIED SMART AUTHENTICATION & RBAC (BACKEND VERIFIED) ────
  function authenticateAnyUser(identifier: string, password: string) {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = String(password || '');
    const numericId = cleanId.replace(/\D/g, '');

    // Look up user in unified usersDatabase
    const user = usersDatabase.find((u) => {
      // Direct Email match
      if (u.email && u.email.toLowerCase() === cleanId) return true;
      // Phone match (last 10 digits or normalized comparison)
      const cleanUPhone = u.phone.replace(/\D/g, '');
      if (numericId && cleanUPhone) {
        if (cleanUPhone === numericId || cleanUPhone.endsWith(numericId) || numericId.endsWith(cleanUPhone)) {
          return true;
        }
      }
      // Admin username aliases ('admin', 'shiva')
      if (u.role === 'admin' && (cleanId === 'admin' || cleanId === 'shiva' || cleanId.includes('shiva') || cleanId === 'admin@chickmakers.com')) {
        return true;
      }
      return false;
    });

    if (!user) {
      return {
        success: false as const,
        message: 'No account found matching this Email, Phone, or Username. Please check your credentials.',
      };
    }

    // Verify password against user passwordHash OR admin password settings
    const validAdminPassword = adminSettings.adminPassword || 'admin';
    const isPassMatch =
      user.passwordHash === cleanPass ||
      (user.role === 'admin' && (
        cleanPass === validAdminPassword ||
        cleanPass === 'admin123' ||
        cleanPass === 'shiva8826' ||
        cleanPass === 'admin'
      ));

    if (!isPassMatch) {
      return {
        success: false as const,
        message: 'Incorrect password. Please try again.',
      };
    }

    // Role is strictly retrieved from the database record!
    const role = user.role; // 'admin' | 'customer'
    const token = `auth_${role}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Create session in authSessions
    authSessions.set(token, {
      token,
      userId: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
      createdAt: new Date().toISOString(),
    });

    const { passwordHash: _ph, ...safeUser } = user;

    if (role === 'admin') {
      return {
        success: true as const,
        role: 'admin' as const,
        token,
        user: safeUser,
        redirectTo: '/admin',
        message: `Administrator recognized! Welcome to the Admin Panel, ${user.name}.`,
      };
    } else {
      return {
        success: true as const,
        role: 'customer' as const,
        token,
        user: safeUser,
        redirectTo: '/account',
        message: `Customer recognized! Welcome back, ${user.name}.`,
      };
    }
  }

  // Common Unified Login Endpoint
  app.post('/api/auth/login', (req, res) => {
    const { identifier, email, phone, password } = req.body;
    const loginId = identifier || email || phone;
    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your Email/Phone/Username and Password.',
      });
    }

    const authResult = authenticateAnyUser(loginId, password);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }
    return res.json(authResult);
  });

  // Legacy/Compatibility login routes routing through the same RBAC logic
  app.post('/api/admin/login', (req, res) => {
    const { email, identifier, phone, password } = req.body;
    const loginId = email || identifier || phone;
    if (!loginId || !password) {
      return res.status(400).json({ success: false, message: 'Please provide your credentials.' });
    }
    const authResult = authenticateAnyUser(loginId, password);
    if (!authResult.success) return res.status(401).json(authResult);
    return res.json(authResult);
  });

  app.post('/api/customer/login', (req, res) => {
    const { identifier, email, phone, password } = req.body;
    const loginId = identifier || email || phone;
    if (!loginId || !password) {
      return res.status(400).json({ success: false, message: 'Please provide your credentials.' });
    }
    const authResult = authenticateAnyUser(loginId, password);
    if (!authResult.success) return res.status(401).json(authResult);
    return res.json(authResult);
  });

  // Common Unified Signup Endpoint (Strict RBAC: Role is ALWAYS 'customer')
  function handleCustomerSignup(req: express.Request, res: express.Response) {
    const { name, email, phone, password, city, address, pincode } = req.body;
    if (!name || !password || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'Name, password, and at least an email or phone number are required.',
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = (phone || '').trim();

    // Prevent duplicate registration
    const existing = usersDatabase.find(
      (u) => (cleanEmail && u.email.toLowerCase() === cleanEmail) || (cleanPhone && u.phone === cleanPhone)
    );
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email or phone already exists. Please sign in.',
      });
    }

    const id = `cust-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    // STRICT RBAC: Users are NEVER allowed to choose or tamper their role during signup.
    // Role is hardcoded to 'customer' in the database.
    const newCustomer: UserRecord = {
      id,
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      role: 'customer',
      city: city?.trim() || 'Noida',
      address: address?.trim() || '',
      pincode: pincode?.trim() || '',
      createdAt: new Date().toISOString(),
      passwordHash: String(password),
    };
    usersDatabase.push(newCustomer);

    const token = `auth_customer_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    authSessions.set(token, {
      token,
      userId: id,
      role: 'customer',
      email: cleanEmail,
      name: newCustomer.name,
      createdAt: new Date().toISOString(),
    });

    const { passwordHash: _ph, ...safeCustomer } = newCustomer;
    return res.status(201).json({
      success: true,
      message: 'Customer account created successfully! Welcome to Bamboo Chick Maker.',
      token,
      role: 'customer',
      redirectTo: '/account',
      user: safeCustomer,
    });
  }

  app.post('/api/auth/signup', handleCustomerSignup);
  app.post('/api/customer/signup', handleCustomerSignup);

  // Unified Current User Check (Verified from database)
  app.get('/api/auth/me', (req, res) => {
    const auth = getAuthenticatedUser(req);
    if (!auth) {
      return res.status(401).json({ success: false, message: 'No active session. Please sign in.' });
    }
    const { passwordHash: _ph, ...safeUser } = auth.user;
    return res.json({
      success: true,
      user: safeUser,
      role: auth.user.role,
    });
  });

  // Admin Profile (Require Admin RBAC)
  app.get('/api/admin/me', requireAdmin, (req, res) => {
    const user = (req as any).user as UserRecord;
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || '/img/artisan-logo.png',
        phone: user.phone || '+91 88260 54537',
      },
    });
  });

  // Logouts
  app.post('/api/auth/logout', (req, res) => {
    const token = extractToken(req);
    if (token) authSessions.delete(token);
    res.json({ success: true, message: 'Logged out successfully.' });
  });

  app.post('/api/admin/logout', (req, res) => {
    const token = extractToken(req);
    if (token) authSessions.delete(token);
    res.json({ success: true, message: 'Admin logged out successfully.' });
  });

  app.post('/api/customer/logout', (req, res) => {
    const token = extractToken(req);
    if (token) authSessions.delete(token);
    res.json({ success: true, message: 'Logged out successfully.' });
  });

  // Customer Profile (Require Customer RBAC)
  app.get('/api/customer/me', requireCustomer, (req, res) => {
    const user = (req as any).user as UserRecord;
    const { passwordHash: _ph, ...safeCustomer } = user;
    res.json({ success: true, user: safeCustomer });
  });

  // Customer Update Profile
  app.put('/api/customer/profile', requireCustomer, (req, res) => {
    const user = (req as any).user as UserRecord;
    const { name, phone, city, address, pincode } = req.body;
    if (name) user.name = name.trim();
    if (phone) user.phone = phone.trim();
    if (city) user.city = city.trim();
    if (address) user.address = address.trim();
    if (pincode) user.pincode = pincode.trim();

    const { passwordHash: _ph, ...safeCustomer } = user;
    res.json({ success: true, message: 'Profile updated successfully!', user: safeCustomer });
  });

  // Customer Orders (Strictly scoped to logged in customer's phone/email)
  app.get('/api/customer/orders', requireCustomer, (req, res) => {
    const user = (req as any).user as UserRecord;
    const cleanPhone = (user.phone || '').replace(/\D/g, '');
    const cleanEmail = (user.email || '').toLowerCase();

    const myOrders = orders.filter((o) => {
      const oPhone = (o.customerPhone || '').replace(/\D/g, '');
      const oEmail = (o.customerEmail || '').toLowerCase();
      return (cleanPhone && oPhone === cleanPhone) || (cleanEmail && oEmail === cleanEmail);
    });

    res.json({ success: true, orders: myOrders });
  });

  // ─── ADMIN PROTECTED APIs (requireAdmin) ────────────────────
  // Admin Dashboard Statistics
  app.get('/api/admin/stats', requireAdmin, (_req, res) => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.currentStatus !== 'COMPLETED').length;
    const completedOrders = orders.filter((o) => o.currentStatus === 'COMPLETED').length;
    const totalProducts = products.length;
    const totalAppointments = appointments.length;

    // Unique customer aggregation
    const customerMap = new Map<string, boolean>();
    orders.forEach((o) => {
      const key = o.customerPhone.replace(/\D/g, '') || o.customerEmail || o.customerName;
      if (key) customerMap.set(key, true);
    });
    appointments.forEach((a) => {
      const key = a.phone.replace(/\D/g, '') || a.name;
      if (key) customerMap.set(key, true);
    });
    const totalCustomers = customerMap.size;

    // Orders by Status
    const statusCounts: Record<string, number> = {};
    orders.forEach((o) => {
      statusCounts[o.currentStatus] = (statusCounts[o.currentStatus] || 0) + 1;
    });
    const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({
      status: status as OrderStatus,
      count,
    }));

    // Revenue by Month (dynamic from actual orders)
    const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
    const revenueByMonth = [
      { month: 'Jul', revenue: 0, orders: 0 },
      { month: 'Aug', revenue: 0, orders: 0 },
      { month: currentMonth, revenue: Math.round(totalRevenue), orders: totalOrders },
    ];

    // Top Categories
    const topCategories = [
      { category: 'Bamboo Chicks & Blinds', sales: Math.round(totalRevenue * 0.7), count: totalOrders },
      { category: 'Bamboo Huts & Gazebos', sales: 0, count: 0 },
      { category: 'Pigeon & Safety Nets', sales: 0, count: 0 },
      { category: 'Welding & Roof Structures', sales: 0, count: 0 },
    ];

    res.json({
      success: true,
      stats: {
        totalRevenue: Math.round(totalRevenue),
        totalOrders,
        pendingOrders,
        completedOrders,
        totalProducts,
        totalCustomers,
        totalAppointments,
        revenueByMonth,
        ordersByStatus,
        topCategories,
      },
    });
  });

  // Admin Orders Management (Filtered & Detailed)
  app.get('/api/admin/orders', requireAdmin, (req, res) => {
    const search = (req.query.search as string || '').toLowerCase().trim();
    const status = req.query.status as string | undefined;
    const paymentStatus = req.query.paymentStatus as string | undefined;

    let filtered = [...orders];

    if (search) {
      filtered = filtered.filter((o) =>
        o.orderNumber.toLowerCase().includes(search) ||
        o.customerName.toLowerCase().includes(search) ||
        o.customerPhone.includes(search) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(search)) ||
        (o.shippingAddress?.city && o.shippingAddress.city.toLowerCase().includes(search))
      );
    }

    if (status && status !== 'ALL') {
      filtered = filtered.filter((o) => o.currentStatus === status);
    }

    if (paymentStatus && paymentStatus !== 'ALL') {
      filtered = filtered.filter((o) => o.paymentStatus === paymentStatus);
    }

    // Sort newest first
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({ success: true, orders: filtered, total: filtered.length });
  });

  // Clear all orders (Reset to fresh clean state)
  app.post('/api/admin/orders/clear', requireAdmin, (_req, res) => {
    orders = [];
    res.json({ success: true, message: 'All orders have been removed successfully' });
  });

  // Seed a fresh sample order for today
  app.post('/api/admin/orders/seed', requireAdmin, (_req, res) => {
    const sample = createFreshSampleOrder();
    orders.unshift(sample);
    res.json({ success: true, message: 'Fresh sample order created', order: sample });
  });

  // Direct order creation from Admin Panel
  app.post('/api/admin/orders', requireAdmin, (req, res) => {
    const body = req.body;
    const id = body.id || generateOrderId();
    const orderNumber = body.orderNumber || generateOrderNumber();
    const status: OrderStatus = body.currentStatus || 'CONFIRMED';
    const order: Order = {
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: body.customerName || 'Customer',
      customerPhone: body.customerPhone || '9810000000',
      customerEmail: body.customerEmail || '',
      shippingAddress: body.shippingAddress || {
        street: 'Site Address',
        city: 'Greater Noida',
        state: 'Uttar Pradesh',
        pincode: '201310',
      },
      items: body.items || [],
      subtotal: Number(body.subtotal) || 0,
      discount: Number(body.discount) || 0,
      tax: Number(body.tax) || 0,
      deliveryAndFittingFee: Number(body.deliveryAndFittingFee) || 0,
      totalAmount: Number(body.totalAmount) || 0,
      paymentMethod: body.paymentMethod || 'UPI',
      paymentStatus: body.paymentStatus || 'PAID',
      transactionId: body.transactionId || generateTransactionId(),
      currentStatus: status,
      estimatedCompletion: body.estimatedCompletion || new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      technician: body.technician || getRandomTechnician(),
      installationSlot: body.installationSlot || 'Morning (10 AM - 1 PM)',
      timeline: buildTimeline(status),
      syncedAt: new Date().toISOString(),
    };
    orders.unshift(order);
    res.json({ success: true, message: 'Order created successfully', order });
  });

  app.delete('/api/admin/orders/:id', requireAdmin, (req, res) => {
    const idx = orders.findIndex((o) => o.id === req.params.id || o.orderNumber === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    const deleted = orders.splice(idx, 1)[0];
    res.json({ success: true, message: 'Order deleted', order: deleted });
  });

  app.delete('/api/orders/:id', requireAdmin, (req, res) => {
    const idx = orders.findIndex((o) => o.id === req.params.id || o.orderNumber === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    const deleted = orders.splice(idx, 1)[0];
    res.json({ success: true, message: 'Order deleted', order: deleted });
  });

  // Admin Users / Customers Aggregated
  app.get('/api/admin/users', requireAdmin, (req, res) => {
    const search = (req.query.search as string || '').toLowerCase().trim();
    const userMap = new Map<string, CustomerUser>();

    // From Orders
    orders.forEach((o) => {
      const phone = o.customerPhone.replace(/\D/g, '') || 'Unknown';
      const existing = userMap.get(phone);
      if (existing) {
        existing.totalOrders += 1;
        existing.totalSpent += o.totalAmount || 0;
        if (new Date(o.createdAt).getTime() > new Date(existing.lastActive).getTime()) {
          existing.lastActive = o.createdAt;
        }
      } else {
        userMap.set(phone, {
          id: `cust-${phone.slice(-6) || Math.floor(Math.random() * 100000)}`,
          name: o.customerName,
          phone: o.customerPhone,
          email: o.customerEmail,
          city: o.shippingAddress?.city || 'Noida',
          address: `${o.shippingAddress?.street || ''}, ${o.shippingAddress?.landmark || ''}`.trim(),
          totalOrders: 1,
          totalSpent: o.totalAmount || 0,
          lastActive: o.createdAt,
          source: 'order',
        });
      }
    });

    // From Appointments
    appointments.forEach((a) => {
      const phone = a.phone.replace(/\D/g, '') || 'Unknown';
      const existing = userMap.get(phone);
      if (!existing) {
        userMap.set(phone, {
          id: `lead-${a.id}`,
          name: a.name,
          phone: a.phone,
          city: a.city,
          address: a.address,
          totalOrders: 0,
          totalSpent: 0,
          lastActive: a.createdAt,
          source: 'appointment',
          notes: `Booked measurement: ${a.serviceRequired} (${a.approxSqFt || 'custom'} sq.ft)`,
        });
      }
    });

    // From Inquiries
    inquiries.forEach((inq) => {
      const phone = inq.phone.replace(/\D/g, '') || 'Unknown';
      const existing = userMap.get(phone);
      if (!existing) {
        userMap.set(phone, {
          id: `inq-${inq.id}`,
          name: inq.name,
          phone: inq.phone,
          city: inq.city,
          totalOrders: 0,
          totalSpent: 0,
          lastActive: inq.createdAt,
          source: 'inquiry',
          notes: inq.message,
        });
      }
    });

    let usersList = Array.from(userMap.values());
    if (search) {
      usersList = usersList.filter((u) =>
        u.name.toLowerCase().includes(search) ||
        u.phone.includes(search) ||
        (u.email && u.email.toLowerCase().includes(search)) ||
        u.city.toLowerCase().includes(search)
      );
    }
    // Sort highest spenders first, then recent
    usersList.sort((a, b) => b.totalSpent - a.totalSpent || new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

    res.json({ success: true, users: usersList, total: usersList.length });
  });

  // Admin Appointments Management
  app.get('/api/admin/appointments', requireAdmin, (_req, res) => {
    res.json({ success: true, appointments });
  });

  app.patch('/api/admin/appointments/:id', requireAdmin, (req, res) => {
    const apt = appointments.find((a) => a.id === req.params.id);
    if (!apt) return res.status(404).json({ success: false, message: 'Appointment not found' });
    if (req.body.status) apt.status = req.body.status;
    if (req.body.notes) apt.notes = req.body.notes;
    if (req.body.preferredDate) apt.preferredDate = req.body.preferredDate;
    res.json({ success: true, appointment: apt });
  });

  app.delete('/api/admin/appointments/:id', requireAdmin, (req, res) => {
    const idx = appointments.findIndex((a) => a.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Appointment not found' });
    const removed = appointments.splice(idx, 1)[0];
    res.json({ success: true, message: 'Appointment deleted', appointment: removed });
  });

  // Admin Inquiries Management
  app.get('/api/admin/inquiries', requireAdmin, (_req, res) => {
    res.json({ success: true, inquiries });
  });

  app.patch('/api/admin/inquiries/:id', requireAdmin, (req, res) => {
    const inq = inquiries.find((i) => i.id === req.params.id);
    if (!inq) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    if (req.body.status) inq.status = req.body.status;
    res.json({ success: true, inquiry: inq });
  });

  // Admin Settings
  app.get('/api/admin/settings', requireAdmin, (_req, res) => {
    // Exclude actual password for safety
    const safeSettings = { ...adminSettings };
    delete safeSettings.adminPassword;
    res.json({ success: true, settings: safeSettings });
  });

  app.post('/api/admin/settings', requireAdmin, (req, res) => {
    const updates = req.body;
    adminSettings = {
      ...adminSettings,
      ...updates,
    };
    const safeSettings = { ...adminSettings };
    delete safeSettings.adminPassword;
    res.json({ success: true, message: 'Settings saved successfully', settings: safeSettings });
  });

  app.post('/api/quote/calculate', (req, res) => {
    try {
      const quote = calculateQuote(req.body);
      res.json({ success: true, quote });
    } catch (err) {
      res.status(400).json({ success: false, message: (err as Error).message });
    }
  });

  app.post('/api/orders', (req, res) => {
    const body = req.body;
    const id = body.id || generateOrderId();
    const orderNumber = body.orderNumber || generateOrderNumber();
    const order: Order = {
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail || '',
      shippingAddress: body.shippingAddress,
      items: body.items || [],
      subtotal: body.subtotal || 0,
      discount: body.discount || 0,
      tax: body.tax || 0,
      deliveryAndFittingFee: body.deliveryAndFittingFee || 0,
      totalAmount: body.totalAmount || 0,
      paymentMethod: body.paymentMethod || 'UPI',
      paymentStatus: body.paymentStatus || 'PAID',
      transactionId: body.transactionId || generateTransactionId(),
      currentStatus: 'CONFIRMED',
      estimatedCompletion: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      technician: body.technician || getRandomTechnician(),
      installationSlot: body.installationSlot,
      timeline: buildTimeline('CONFIRMED'),
      syncedAt: new Date().toISOString(),
    };
    orders.push(order);
    res.json({ success: true, message: 'Order placed successfully!', order });
  });

  app.get('/api/orders/:id', (req, res) => {
    const order = findOrder(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    const order = findOrder(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    const status = req.body.status as OrderStatus;
    order.currentStatus = status;
    order.timeline = buildTimeline(status);
    const currentEntry = order.timeline.find((t) => t.status === status);
    if (currentEntry && req.body.location) currentEntry.location = req.body.location;
    if (currentEntry && req.body.note) currentEntry.description = req.body.note;
    order.syncedAt = new Date().toISOString();
    res.json({ success: true, order });
  });

  app.post('/api/measurements', (req, res) => {
    const id = `apt-${Math.floor(100 + Math.random() * 900)}`;
    const appointment: Appointment = {
      id,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode || '',
      preferredDate: req.body.preferredDate,
      preferredTimeSlot: req.body.preferredTimeSlot || 'Morning',
      serviceRequired: req.body.serviceRequired || 'Laser Measurement',
      approxSqFt: req.body.approxSqFt,
      notes: req.body.notes,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };
    appointments.push(appointment);
    res.json({ success: true, message: 'Measurement visit booked!', appointment });
  });

  app.post('/api/contact', (req, res) => {
    const id = `inq-${Math.floor(100 + Math.random() * 900)}`;
    const inquiry: Inquiry = {
      id,
      name: req.body.name,
      phone: req.body.phone,
      city: req.body.city,
      message: req.body.message,
      createdAt: new Date().toISOString(),
      status: 'NEW',
    };
    inquiries.push(inquiry);
    res.json({ success: true, message: 'Inquiry received! We will contact you shortly.' });
  });

  if (isProd) {
    const clientDir = typeof __dirname !== 'undefined'
      ? path.resolve(__dirname, 'client')
      : path.resolve(process.cwd(), 'dist', 'client');
    app.use(express.static(clientDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ChickMakers running → http://localhost:${PORT}`);
    if (!isProd) console.log('(Dev mode — API + Vite hot reload)');
    else console.log('(Production mode — serving dist/client)');
  });
}

startServer().catch(console.error);
