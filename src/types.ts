export type OrderStatus =
  | 'CONFIRMED'
  | 'MEASUREMENT_VERIFIED'
  | 'WEAVING_IN_PROGRESS'
  | 'STITCHING_COATING'
  | 'QUALITY_INSPECTED'
  | 'OUT_FOR_INSTALLATION'
  | 'COMPLETED';

export type PaymentMethod = 'UPI' | 'CARD' | 'NETBANKING' | 'COD';
export type PaymentStatus = 'PAID' | 'PENDING' | 'ADVANCE_PAID';
export type Mechanism = 'standard' | 'brass-pulley' | 'nylon-pulley' | 'somfy-motor';

export type ProductCategory =
  | 'bamboo-chick'
  | 'bamboo-huts'
  | 'safety-nets'
  | 'welding-structure'
  | 'artificial-grass'
  | string;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  pricePerSqFt: number;
  minSqFt: number;
  warrantyYears: number;
  estimatedCraftDays: number;
  description: string;
  features: string[];
  materials: string[];
  image: string;
  badge?: string;
}

export interface CustomBlindConfig {
  widthFeet: number;
  widthInches: number;
  heightFeet: number;
  heightInches: number;
  bambooFinish?: string;
  borderTapeColor?: string;
  mechanism: Mechanism;
  waterproofCoating: boolean;
  tieDownStraps: boolean;
  includeInstallation: boolean;
  couponCode?: string;
}

export interface QuoteResult {
  productId: string;
  productName: string;
  exactSqFt: number;
  billingSqFt: number;
  baseRatePerSqFt: number;
  addOnsPerBlind: number;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  currency: string;
  appliedCoupon?: string;
  warrantyYears: number;
  estimatedCraftDays: number;
}

export interface CartItem {
  id: string;
  type: 'custom-blind' | 'standard-product';
  product: Product;
  config?: CustomBlindConfig;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  dimensionsSummary: string;
  productName?: string;
  dimensions?: {
    widthFeet?: number;
    widthInches?: number;
    heightFeet?: number;
    heightInches?: number;
  };
  billingSqFt?: number;
  addons?: string[];
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Technician {
  name: string;
  role: string;
  phone: string;
  rating: number;
  experienceYears: number;
  avatar: string;
}

export interface TimelineEntry {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
  location?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryAndFittingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId: string;
  currentStatus: OrderStatus;
  estimatedCompletion: string;
  technician: Technician;
  installationSlot?: { date: string; timeSlot: string };
  timeline: TimelineEntry[];
  syncedAt?: string;
}

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  preferredDate: string;
  preferredTimeSlot: string;
  serviceRequired: string;
  approxSqFt?: string;
  notes?: string;
  status: 'CONFIRMED' | 'SCHEDULED' | 'COMPLETED';
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  city: string;
  message: string;
  createdAt: string;
  status: 'NEW' | 'CONTACTED';
}

export const ORDER_STATUSES: OrderStatus[] = [
  'CONFIRMED',
  'MEASUREMENT_VERIFIED',
  'WEAVING_IN_PROGRESS',
  'STITCHING_COATING',
  'QUALITY_INSPECTED',
  'OUT_FOR_INSTALLATION',
  'COMPLETED',
];

export const STATUS_LABELS: Record<OrderStatus, { title: string; description: string }> = {
  CONFIRMED: {
    title: 'Order Placed & Measurements Validated',
    description: 'Your custom blind order has been confirmed and queued for production.',
  },
  MEASUREMENT_VERIFIED: {
    title: 'Laser Measurement & Beam Anchor Audit',
    description: 'Certified engineer verified dimensions and mounting points.',
  },
  WEAVING_IN_PROGRESS: {
    title: 'Seasoned Bamboo Slats Hand-Woven on Loom',
    description: 'Master craftsman weaving your blinds with Assam bamboo.',
  },
  STITCHING_COATING: {
    title: 'Border Tape Stitching & Weatherproof Coating',
    description: 'Canvas borders stitched and waterproof coating applied.',
  },
  QUALITY_INSPECTED: {
    title: 'Hardware, Tension & Pulley QC Check',
    description: 'Full quality inspection passed — ready for dispatch.',
  },
  OUT_FOR_INSTALLATION: {
    title: 'Dispatched with Assigned Technician',
    description: 'Technician en route with your handcrafted blinds.',
  },
  COMPLETED: {
    title: 'Mounted, Demo Verified & 5-Year Warranty Activated',
    description: 'Installation complete. Enjoy your new blinds!',
  },
};

export const COUPONS: Record<string, { percent: number; minOrder: number }> = {
  WELCOME10: { percent: 10, minOrder: 0 },
  CHICK15: { percent: 15, minOrder: 5000 },
  MONSOON20: { percent: 20, minOrder: 8000 },
};

export const GST_RATE = 0.05;
export const CART_STORAGE_KEY = 'chickmakers_cart';
export const ORDERS_STORAGE_KEY = 'chickmakers_orders_v2';
export const AUTH_TOKEN_KEY = 'chickmakers_auth_token';
export const AUTH_USER_KEY = 'chickmakers_auth_user';
export const ADMIN_TOKEN_KEY = 'chickmakers_admin_token';
export const ADMIN_USER_KEY = 'chickmakers_admin_user';
export const ADMIN_SETTINGS_KEY = 'chickmakers_admin_settings';
export const ADMIN_PRODUCTS_STORAGE_KEY = 'chickmakers_admin_products_v1';
export const CUSTOMER_TOKEN_KEY = 'chickmakers_customer_token';
export const CUSTOMER_USER_KEY = 'chickmakers_customer_user';

export type UserRole = 'customer' | 'admin' | 'superadmin' | 'artisan' | 'manager';
export type AuthRole = 'customer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AuthRole;
  city?: string;
  address?: string;
  pincode?: string;
  avatar?: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin' | 'manager' | 'artisan';
  avatar?: string;
  phone?: string;
}

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer';
  city?: string;
  address?: string;
  pincode?: string;
  createdAt: string;
}

export interface SmartAuthResult {
  success: boolean;
  role: 'admin' | 'customer' | 'superadmin';
  token: string;
  user: AuthUser | AdminUser | CustomerAccount;
  redirectTo: string;
  message: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastActive: string;
  source: 'order' | 'appointment' | 'inquiry' | 'manual';
  notes?: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalProducts: number;
  totalCustomers: number;
  totalAppointments: number;
  revenueByMonth: { month: string; revenue: number; orders: number }[];
  ordersByStatus: { status: OrderStatus; count: number }[];
  topCategories: { category: string; sales: number; count: number }[];
}

export interface AdminSettings {
  businessName: string;
  founderName: string;
  contactPhone: string;
  whatsappPhone: string;
  supportEmail: string;
  workshopAddress: string;
  operatingHours: string;
  minOrderValue: number;
  deliveryAndFittingFee: number;
  enableNotifications: boolean;
  orderAlertSound: boolean;
  adminPassword?: string;
}
