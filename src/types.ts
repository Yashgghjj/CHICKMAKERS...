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

export interface Product {
  id: string;
  name: string;
  category: string;
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
