import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CartItem, Order, PaymentMethod } from '../types';
import { api } from '../services/api';
import { generateTransactionId } from '../data/sampleOrders';

interface CheckoutModalProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onComplete: (order: Order) => void;
}

const BANKS = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra'];

export default function CheckoutModal({ open, items, onClose, onComplete }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [loading, setLoading] = useState(false);
  const [upiTimer, setUpiTimer] = useState(300);
  const [txnId] = useState(generateTransactionId());

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    landmark: '',
    installDate: '',
    installTime: 'Morning',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    bank: BANKS[0],
  });

  const subtotal = items.reduce((s, i) => s + i.totalPrice, 0);
  const discount = Math.round(subtotal * 0.1);
  const afterDiscount = subtotal - discount;
  const tax = Math.round(afterDiscount * 0.05 * 100) / 100;
  const total = afterDiscount + tax;

  useEffect(() => {
    if (!open) {
      setStep(1);
      setUpiTimer(300);
    }
  }, [open]);

  useEffect(() => {
    if (step === 2 && paymentMethod === 'UPI' && upiTimer > 0) {
      const t = setInterval(() => setUpiTimer((v) => v - 1), 1000);
      return () => clearInterval(t);
    }
  }, [step, paymentMethod, upiTimer]);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function placeOrder() {
    setLoading(true);
    try {
      const res = await api.createOrder({
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email,
        shippingAddress: {
          street: form.street,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          landmark: form.landmark,
        },
        items,
        subtotal,
        discount,
        tax,
        deliveryAndFittingFee: 0,
        totalAmount: total,
        paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'ADVANCE_PAID' : 'PAID',
        transactionId: txnId,
        installationSlot: form.installDate
          ? { date: form.installDate, timeSlot: form.installTime }
          : undefined,
      });
      setStep(3);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      onComplete(res.order);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  const upiString = `upi://pay?pa=chickmakers@upi&pn=ChickMakers&am=${total}&cu=INR&tn=${txnId}`;
  const mins = Math.floor(upiTimer / 60);
  const secs = upiTimer % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="font-display text-xl font-bold">
            Checkout {step < 3 && <span className="text-stone-400 text-sm font-normal">Step {step}/3</span>}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <input placeholder="Full Name *" value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" />
              <input placeholder="Phone (10 digits) *" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" maxLength={10} />
              <input placeholder="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" />
              <input placeholder="Full Address *" value={form.street} onChange={(e) => update('street', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="City *" value={form.city} onChange={(e) => update('city', e.target.value)} className="border rounded-xl px-4 py-2.5" />
                <input placeholder="Pincode *" value={form.pincode} onChange={(e) => update('pincode', e.target.value)} className="border rounded-xl px-4 py-2.5" />
              </div>
              <input placeholder="Landmark (optional)" value={form.landmark} onChange={(e) => update('landmark', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.installDate} onChange={(e) => update('installDate', e.target.value)} className="border rounded-xl px-4 py-2.5" />
                <select value={form.installTime} onChange={(e) => update('installTime', e.target.value)} className="border rounded-xl px-4 py-2.5">
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!form.name || !form.phone || !form.street || !form.city || !form.pincode}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                Continue to Payment <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {(['UPI', 'CARD', 'NETBANKING', 'COD'] as PaymentMethod[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`py-2 rounded-xl text-sm font-medium border ${
                      paymentMethod === m ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-stone-200'
                    }`}
                  >
                    {m === 'COD' ? 'Pay on Install' : m}
                  </button>
                ))}
              </div>

              {paymentMethod === 'UPI' && (
                <div className="text-center p-4 bg-stone-50 rounded-xl">
                  <div className="w-40 h-40 mx-auto bg-white border-2 border-stone-200 rounded-xl flex items-center justify-center mb-3">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiString)}`}
                      alt="UPI QR"
                      className="w-36 h-36"
                    />
                  </div>
                  <p className="text-sm text-stone-500 mb-1">Scan & Pay ₹{total.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-red-500 font-mono mb-2">
                    Expires in {mins}:{secs.toString().padStart(2, '0')}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
                    <span>Txn: {txnId}</span>
                    <button onClick={() => navigator.clipboard.writeText(txnId)}><Copy className="w-3 h-3" /></button>
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                      <span key={app} className="text-xs bg-white px-2 py-1 rounded border">{app}</span>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'CARD' && (
                <div className="space-y-3">
                  <input placeholder="Cardholder Name" value={form.cardName} onChange={(e) => update('cardName', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" />
                  <input placeholder="Card Number" value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))} className="w-full border rounded-xl px-4 py-2.5" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM/YY" value={form.cardExpiry} onChange={(e) => update('cardExpiry', e.target.value)} className="border rounded-xl px-4 py-2.5" />
                    <input placeholder="CVV" value={form.cardCvv} onChange={(e) => update('cardCvv', e.target.value.slice(0, 3))} className="border rounded-xl px-4 py-2.5" type="password" />
                  </div>
                </div>
              )}

              {paymentMethod === 'NETBANKING' && (
                <select value={form.bank} onChange={(e) => update('bank', e.target.value)} className="w-full border rounded-xl px-4 py-2.5">
                  {BANKS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              )}

              {paymentMethod === 'COD' && (
                <p className="text-sm text-stone-500 p-3 bg-amber-50 rounded-xl">
                  20% advance (₹{Math.round(total * 0.2).toLocaleString('en-IN')}) required at booking. Balance on installation.
                </p>
              )}

              <div className="bg-sage-50 rounded-xl p-4 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>GST 5%</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex items-center gap-1 px-4 py-3 border rounded-xl">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={placeOrder} disabled={loading} className="flex-1 bg-brand-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50">
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-sage-900 mb-2">Order Confirmed!</h3>
              <p className="text-stone-500 mb-6">Your handcrafted blinds are being queued for production.</p>
              <button onClick={onClose} className="bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold">
                View Order Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
