import { useState } from 'react';
import { X, Sparkles, Check, Calculator, ShieldCheck, Ruler } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import {
  ORDER_STATUSES,
  STATUS_LABELS,
  type Order,
  type OrderStatus,
  type Mechanism,
  type CartItem,
  type PaymentMethod,
  type PaymentStatus,
} from '../../types';
import { api } from '../../services/api';

interface CreateOrderModalProps {
  onClose: () => void;
  onOrderCreated: (order: Order) => void;
}

export default function CreateOrderModal({ onClose, onOrderCreated }: CreateOrderModalProps) {
  // Customer
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('Greater Noida');
  const [pincode, setPincode] = useState('201310');

  // Product & Specs
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [widthFeet, setWidthFeet] = useState(8);
  const [widthInches, setWidthInches] = useState(0);
  const [heightFeet, setHeightFeet] = useState(6);
  const [heightInches, setHeightInches] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mechanism, setMechanism] = useState<Mechanism>('brass-pulley');
  const [waterproofCoating, setWaterproofCoating] = useState(true);
  const [tieDownStraps, setTieDownStraps] = useState(true);
  const [includeInstallation, setIncludeInstallation] = useState(true);

  // Status & Payment
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('CONFIRMED');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('PAID');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');

  // Custom discount / total
  const [customDiscount, setCustomDiscount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Mathematical square footage
  const exactSqFt = (widthFeet + widthInches / 12) * (heightFeet + heightInches / 12);
  const billingSqFt = Math.max(product.minSqFt, Math.ceil(exactSqFt));

  let addOnsPerUnit = 0;
  if (mechanism === 'brass-pulley') addOnsPerUnit += 280;
  else if (mechanism === 'nylon-pulley') addOnsPerUnit += 150;
  else if (mechanism === 'somfy-motor') addOnsPerUnit += 2800;

  if (waterproofCoating) addOnsPerUnit += billingSqFt * 12;
  if (tieDownStraps) addOnsPerUnit += 160;

  const unitBasePrice = billingSqFt * product.pricePerSqFt + addOnsPerUnit;
  const subtotal = Math.round(unitBasePrice * quantity);
  const installationFee = includeInstallation ? Math.max(350, Math.round(billingSqFt * quantity * 6)) : 0;
  const taxableAmount = Math.max(0, subtotal - customDiscount);
  const tax = Math.round(taxableAmount * 0.05);
  const calculatedTotal = taxableAmount + tax + installationFee;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter customer name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const item: CartItem = {
        id: `item-${Date.now()}`,
        type: 'custom-blind',
        product,
        config: {
          widthFeet,
          widthInches,
          heightFeet,
          heightInches,
          mechanism,
          waterproofCoating,
          tieDownStraps,
          includeInstallation,
        },
        quantity,
        unitPrice: Math.round(unitBasePrice),
        totalPrice: subtotal,
        dimensionsSummary: `${widthFeet}'${widthInches}" × ${heightFeet}'${heightInches}" (${billingSqFt} sq.ft)`,
      };

      const res = await api.adminCreateOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        shippingAddress: {
          street: streetAddress.trim() || 'Workshop Walk-in / Site',
          city,
          state: 'Uttar Pradesh',
          pincode: pincode.trim() || '201310',
        },
        items: [item],
        subtotal,
        discount: customDiscount,
        tax,
        deliveryAndFittingFee: installationFee,
        totalAmount: calculatedTotal,
        paymentMethod,
        paymentStatus,
        currentStatus,
      });

      if (res.success && res.order) {
        onOrderCreated(res.order);
        onClose();
      } else {
        setErrorMsg(res.message || 'Failed to create order');
      }
    } catch (err) {
      setErrorMsg((err as Error).message || 'Server error creating order');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">Create Handcrafted Order</h3>
              <p className="text-xs text-stone-500">Record direct workshop commission or customer site booking</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-stone-700">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-semibold text-xs flex items-center gap-2">
              <span>⚠️ {errorMsg}</span>
            </div>
          )}

          {/* Customer Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">1. Customer &amp; Site Details</h4>
              <span className="text-[10px] text-amber-700 font-semibold">Delhi NCR Service</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhania"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Phone Number (10 Digits) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98112 44321"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="vikram@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-800 mb-1">City / NCR Area</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                >
                  <option value="Greater Noida">Greater Noida</option>
                  <option value="Noida">Noida</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Faridabad">Faridabad</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold text-stone-800 mb-1">Installation Site Address / Society</label>
                <input
                  type="text"
                  placeholder="e.g. Flat 1204, Tower B, ATS One Hamlet, Sector 104"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            </div>
          </div>

          {/* Product & Dimensions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">2. Product &amp; Measurements</h4>
              <span className="text-[10px] text-stone-500">Calculated: {billingSqFt} sq.ft</span>
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">Select Craft Product Line</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · ₹{p.pricePerSqFt}/sq.ft (Min {p.minSqFt} sq.ft)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Width (ft)</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={widthFeet}
                  onChange={(e) => setWidthFeet(Number(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Width (in)</label>
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={widthInches}
                  onChange={(e) => setWidthInches(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Height (ft)</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(Number(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Height (in)</label>
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 text-center font-bold"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 text-center font-bold text-amber-700"
                />
              </div>
            </div>

            {/* Mechanism & Hardware */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Pulley / Cord Mechanism</label>
                <select
                  value={mechanism}
                  onChange={(e) => setMechanism(e.target.value as Mechanism)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300"
                >
                  <option value="brass-pulley">Heavy Brass Pulley (+₹280)</option>
                  <option value="standard">Standard Rollup Mechanism</option>
                  <option value="nylon-pulley">Reinforced Nylon Pulley (+₹150)</option>
                  <option value="somfy-motor">Somfy Motorized Remote (+₹2,800)</option>
                </select>
              </div>

              {/* Add-ons Checkboxes */}
              <div className="space-y-1.5 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                  <input
                    type="checkbox"
                    checked={waterproofCoating}
                    onChange={(e) => setWaterproofCoating(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Dual Waterproof Varnish Coating (+₹12/sq.ft)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                  <input
                    type="checkbox"
                    checked={tieDownStraps}
                    onChange={(e) => setTieDownStraps(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>High-Wind Tie Down Straps (+₹160)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                  <input
                    type="checkbox"
                    checked={includeInstallation}
                    onChange={(e) => setIncludeInstallation(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Professional Installation &amp; Fitting</span>
                </label>
              </div>
            </div>
          </div>

          {/* Phase & Payment Status */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">3. Initial Phase &amp; Billing</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Production Phase</label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-medium"
                >
                  {ORDER_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {STATUS_LABELS[st].title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-medium"
                >
                  <option value="PAID">Full Paid</option>
                  <option value="ADVANCE_PAID">Advance Paid (50%)</option>
                  <option value="PENDING">Pending Payment</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Payment Mode</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-medium"
                >
                  <option value="UPI">UPI (GooglePay / PhonePe / Paytm)</option>
                  <option value="COD">Cash on Installation (COD)</option>
                  <option value="NETBANKING">NEFT / Bank Transfer</option>
                  <option value="CARD">Credit / Debit Card</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing Preview Box */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-stone-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-600">Base Craft ({quantity} blind(s) @ {billingSqFt} sq.ft)</span>
              <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {installationFee > 0 && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">Fitting &amp; Delivery Fee</span>
                <span className="font-semibold">₹{installationFee.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-600">GST (5%)</span>
              <span className="font-semibold">₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-amber-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-stone-900 text-sm">Total Order Value</span>
                <div className="text-[10px] text-amber-800">Assam Seasoned Bamboo · 5-Yr Guarantee</div>
              </div>
              <div className="text-lg font-black text-amber-900 font-mono">
                ₹{calculatedTotal.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20 transition flex items-center gap-1.5"
            >
              {submitting ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Create Order</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
