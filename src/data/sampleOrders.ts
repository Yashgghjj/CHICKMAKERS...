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

export function createFreshSampleOrder(): Order {
  const orderNum = generateOrderNumber();
  const id = generateOrderId();
  return {
    id,
    orderNumber: orderNum,
    createdAt: new Date().toISOString(),
    customerName: 'Rohit Sharma',
    customerPhone: '9810123456',
    customerEmail: 'rohit.sharma@gmail.com',
    shippingAddress: {
      street: 'Flat 402, Tower 4, Paramount Golf Foreste',
      city: 'Greater Noida',
      state: 'Uttar Pradesh',
      pincode: '201308',
      landmark: 'Near Zeta 1',
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
          description: 'Finest handwoven Assam bamboo slats with UV protective varnish.',
          features: ['Assam Cane', 'Brass Pulley System', '5-Year Durability'],
          materials: ['Natural Bamboo', 'Cotton Cord', 'Brass'],
          image: '/img/our-services/bamboo-chick.jpg',
        },
        config: {
          widthFeet: 8,
          widthInches: 0,
          heightFeet: 6,
          heightInches: 0,
          mechanism: 'brass-pulley',
          waterproofCoating: true,
          tieDownStraps: true,
          includeInstallation: true,
        },
        quantity: 2,
        unitPrice: 4200,
        totalPrice: 8400,
        dimensionsSummary: '8\'0" × 6\'0" (48 sq.ft)',
      },
    ],
    subtotal: 8400,
    discount: 500,
    tax: 395,
    deliveryAndFittingFee: 350,
    totalAmount: 8645,
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    transactionId: generateTransactionId(),
    currentStatus: 'CONFIRMED',
    estimatedCompletion: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
    technician: getRandomTechnician(),
    timeline: buildTimeline('CONFIRMED'),
  };
}

export const SAMPLE_ORDERS: Order[] = [];

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
