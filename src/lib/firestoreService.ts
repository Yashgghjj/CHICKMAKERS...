import { collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Order, Appointment, Inquiry } from '../types';

export async function saveOrderToFirestore(order: Order): Promise<void> {
  try {
    await setDoc(doc(db, 'orders', order.id), { ...order, syncedAt: new Date().toISOString() });
  } catch (err) {
    console.warn('Firestore save failed, using local storage:', err);
  }
}

export async function getOrderFromFirestore(id: string): Promise<Order | null> {
  try {
    const snap = await getDoc(doc(db, 'orders', id));
    if (snap.exists()) return snap.data() as Order;
    const ordersRef = collection(db, 'orders');
    const byNumber = await getDocs(query(ordersRef, where('orderNumber', '==', id)));
    if (!byNumber.empty) return byNumber.docs[0].data() as Order;
    const byPhone = await getDocs(query(ordersRef, where('customerPhone', '==', id)));
    if (!byPhone.empty) return byPhone.docs[0].data() as Order;
  } catch (err) {
    console.warn('Firestore read failed:', err);
  }
  return null;
}

export async function updateOrderStatusInFirestore(
  id: string,
  status: Order['currentStatus'],
  location?: string,
  note?: string,
): Promise<void> {
  try {
    const orderRef = doc(db, 'orders', id);
    const snap = await getDoc(orderRef);
    if (snap.exists()) {
      const order = snap.data() as Order;
      const timeline = order.timeline.map((t) => ({
        ...t,
        completed: t.status !== status && order.timeline.findIndex((e) => e.status === status) > order.timeline.findIndex((e) => e.status === t.status),
        current: t.status === status,
        location: t.status === status ? location : t.location,
      }));
      await updateDoc(orderRef, { currentStatus: status, timeline, syncedAt: new Date().toISOString() });
    }
  } catch (err) {
    console.warn('Firestore update failed:', err);
  }
}

export async function saveAppointmentToFirestore(apt: Appointment): Promise<void> {
  try {
    await setDoc(doc(db, 'appointments', apt.id), apt);
  } catch (err) {
    console.warn('Firestore appointment save failed:', err);
  }
}

export async function saveInquiryToFirestore(inq: Inquiry): Promise<void> {
  try {
    await setDoc(doc(db, 'inquiries', inq.id), inq);
  } catch (err) {
    console.warn('Firestore inquiry save failed:', err);
  }
}
