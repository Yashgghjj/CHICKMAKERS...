import { X, Printer } from 'lucide-react';
import type { Order } from '../types';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  if (!order) return null;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 no-print">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b no-print">
          <h2 className="font-display text-xl font-bold">Tax Invoice</h2>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="flex items-center gap-1 px-3 py-1.5 bg-brand-600 text-white rounded-lg text-sm">
              <Printer className="w-4 h-4" /> Print / PDF
            </button>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="invoice-print-area p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="font-display text-2xl font-bold text-sage-900">ChickMakers™</h1>
              <p className="text-sm text-stone-500 mt-1">Handcrafted Blinds & Balcony Systems</p>
              <p className="text-xs text-stone-400 mt-2">
                GSTIN: 07AABCC1234D1Z5<br />
                Workshop: Plot 42, Okhla Industrial Area, New Delhi - 110020
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">TAX INVOICE</p>
              <p className="text-sm">{order.orderNumber}</p>
              <p className="text-xs text-stone-400">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
            <div>
              <p className="font-semibold mb-1">Bill To:</p>
              <p>{order.customerName}</p>
              <p>{order.customerPhone}</p>
              <p>{order.customerEmail}</p>
              <p className="mt-1 text-stone-500">
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold mb-1">Payment</p>
              <p>{order.paymentMethod} · {order.paymentStatus}</p>
              <p className="text-stone-500">Txn: {order.transactionId}</p>
            </div>
          </div>

          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b-2 border-stone-800">
                <th className="text-left py-2">Item</th>
                <th className="text-left py-2">Dimensions</th>
                <th className="text-right py-2">Qty</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b border-stone-200">
                  <td className="py-2">{item.product.name}</td>
                  <td className="py-2 text-stone-500">{item.dimensionsSummary}</td>
                  <td className="py-2 text-right">{item.quantity}</td>
                  <td className="py-2 text-right">₹{item.totalPrice.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-64 text-sm space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{order.discount.toLocaleString('en-IN')}</span></div>
              )}
              <div className="flex justify-between"><span>GST (5% HSN 4602)</span><span>₹{order.tax.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span><span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 flex justify-between items-end">
            <p className="text-xs text-stone-400">HSN Code: 4602 — Handicraft Bamboo & Cane Blinds</p>
            <div className="text-center">
              <div className="w-24 h-12 border-2 border-brand-600 rounded flex items-center justify-center text-brand-600 text-xs font-bold rotate-[-5deg]">
                AUTHORIZED
              </div>
              <p className="text-xs text-stone-400 mt-1">ChickMakers™</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
