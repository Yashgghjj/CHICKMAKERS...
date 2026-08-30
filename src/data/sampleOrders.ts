import type { Order, OrderStatus, TimelineEntry } from '../types';
import { STATUS_LABELS, ORDER_STATUSES } from '../types';

const TECHNICIANS = [
  {
    name: 'Rajesh Kumar',
    role: 'Master Craftsman',
    phone: '+91 98112 44321',
    rating: 4.9,
    experienceYears: 12,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    name: 'Suresh Patel',
    role: 'Senior Installer',
    phone: '+91 98765 43210',
    rating: 4.8,
    experienceYears: 8,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
];

export function buildTimeline(currentStatus: OrderStatus): TimelineEntry[] {
  const currentIndex = ORDER_STATUSES.indexOf(currentStatus);
  return ORDER_STATUSES.map((status, index) => ({
    status,
    title: STATUS_LABELS[status].title,
    description: STATUS_LABELS[status].description,
    completed: index < currentIndex,
    current: index === currentIndex,
    timestamp: index <= currentIndex ? new Date(Date.now() - (currentIndex - index) * 86400000).toISOString() : undefined,
  }));
}

export function generateOrderNumber(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `CHK-2026-${num}`;
}

export function generateOrderId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `ord-${num}`;
}

export function generateTransactionId(): string {
  return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function getRandomTechnician() {
  return TECHNICIANS[Math.floor(Math.random() * TECHNICIANS.length)];
}

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: 'CHK-2026-1042',
    createdAt: '2026-08-20T10:30:00.000Z',
    customerName: 'Amit Verma',
    customerPhone: '9811244321',
    customerEmail: 'amit.verma99@gmail.com',
    shippingAddress: {
      street: 'Tower B, Flat 1204, Supertech Ecociti',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      landmark: 'Near Sector 93A Metro',
    },
    items: [
      {
        id: 'item-1',
        type: 'custom-blind',
        product: {
          id: 'bamboo-chick-natural',
          name: 'Natural Assam Bamboo Chick Blinds',
          category: 'bamboo-chick',
          pricePerSqFt: 58,
          minSqFt: 12,
          warrantyYears: 5,
          estimatedCraftDays: 2,
          description: '',
          features: [],
          materials: [],
          image: '',
        },
        config: {
          widthFeet: 10,
          widthInches: 0,
          heightFeet: 6,
          heightInches: 0,
          mechanism: 'brass-pulley',
          waterproofCoating: true,
          tieDownStraps: true,
          includeInstallation: true,
        },
        quantity: 2,
        unitPrice: 5120,
        totalPrice: 10240,
        dimensionsSummary: '10\'0" × 6\'0" (60 sq.ft)',
      },
    ],
    subtotal: 10240,
    discount: 1024,
    tax: 460.8,
    deliveryAndFittingFee: 0,
    totalAmount: 9676.8,
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    transactionId: 'TXN202608201030001',
    currentStatus: 'WEAVING_IN_PROGRESS',
    estimatedCompletion: '2026-08-28',
    technician: TECHNICIANS[0],
    timeline: buildTimeline('WEAVING_IN_PROGRESS'),
  },
];

export function loadOrdersFromStorage(): Order[] {
  try {
    const stored = localStorage.getItem('chickmakers_orders_v2');
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore */
  }
  return SAMPLE_ORDERS;
}

export function saveOrdersToStorage(orders: Order[]): void {
  try {
    localStorage.setItem('chickmakers_orders_v2', JSON.stringify(orders));
  } catch {
    /* ignore */
  }
}
