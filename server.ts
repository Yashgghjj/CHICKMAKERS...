import express from 'express';
import cors from 'cors';
import path from 'path';
import { PRODUCTS, getProductById } from './src/data/products.ts';
import type { Order, Appointment, Inquiry, OrderStatus, Mechanism } from './src/types.ts';
import {
  buildTimeline,
  generateOrderNumber,
  generateOrderId,
  generateTransactionId,
  getRandomTechnician,
  SAMPLE_ORDERS,
} from './src/data/sampleOrders.ts';
import { COUPONS, GST_RATE } from './src/types.ts';

const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

const orders: Order[] = [...SAMPLE_ORDERS];
const appointments: Appointment[] = [];
const inquiries: Inquiry[] = [];

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
      service: 'ChickMakers Backend API',
      activeOrdersCount: orders.length,
      activeAppointmentsCount: appointments.length,
    });
  });

  app.get('/api/products', (req, res) => {
    const category = req.query.category as string | undefined;
    const filtered =
      category && category !== 'all' ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
    res.json(filtered);
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
