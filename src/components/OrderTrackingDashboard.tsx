import { useState } from 'react';
import { Search, X, MapPin, Phone, Star, ChevronDown } from 'lucide-react';
import { api } from '../services/api';
import type { Order, OrderStatus } from '../types';
import { ORDER_STATUSES } from '../types';

interface OrderTrackingDashboardProps {
  open: boolean;
  onClose: () => void;
  initialOrder?: Order | null;
  onViewInvoice: (order: Order) => void;
}

export default function OrderTrackingDashboard({
  open,
  onClose,
  initialOrder,
  onViewInvoice,
}: OrderTrackingDashboardProps) {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<Order | null>(initialOrder || null);
  const [loading, setLoading] = useState(false);
  const [simulating, setSimulating] = useState(false);

  async function search() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await api.getOrder(query.trim());
      setOrder(res.order);
    } catch {
      setOrder(null);
      alert('Order not found. Try CHK-2026-1042 or 9811244321');
    } finally {
      setLoading(false);
    }
  }

  async function simulateStatus(status: OrderStatus) {
    if (!order) return;
    setSimulating(true);
    try {
      const res = await api.updateOrderStatus(order.id, {
        status,
        location: 'Sector 93A, Noida',
        note: 'Status updated via simulation',
      });
      setOrder(res.order);
    } finally {
      setSimulating(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h2 className="font-display text-xl font-bold">Live Order Tracking</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-6">
            <input
              placeholder="Order ID (CHK-2026-1042) or Phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && search()}
              className="flex-1 border rounded-xl px-4 py-2.5"
            />
            <button onClick={search} disabled={loading} className="bg-brand-600 text-white px-4 rounded-xl flex items-center gap-2">
              <Search className="w-4 h-4" /> {loading ? '...' : 'Track'}
            </button>
          </div>

          {order && (
            <>
              <div className="bg-sage-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-lg">{order.orderNumber}</p>
                    <p className="text-sm text-stone-500">{order.customerName} · {order.customerPhone}</p>
                  </div>
                  <button onClick={() => onViewInvoice(order)} className="text-sm text-brand-600 hover:underline">
                    View Invoice
                  </button>
                </div>
                <p className="text-sm">Total: <strong>₹{order.totalAmount.toLocaleString('en-IN')}</strong></p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white border rounded-xl mb-6">
                <img src={order.technician.avatar} alt="" className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">{order.technician.name}</p>
                  <p className="text-sm text-stone-500">{order.technician.role} · {order.technician.experienceYears} yrs</p>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <Star className="w-3 h-3 fill-current" /> {order.technician.rating}
                  </div>
                </div>
                <a href={`tel:${order.technician.phone}`} className="p-2 bg-brand-50 rounded-lg text-brand-600">
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              <div className="relative pl-6 space-y-6 mb-6">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-stone-200" />
                {order.timeline.map((entry) => (
                  <div key={entry.status} className="relative">
                    <div
                      className={`absolute -left-6 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        entry.completed
                          ? 'bg-green-500 border-green-500'
                          : entry.current
                            ? 'bg-brand-500 border-brand-500 animate-pulse'
                            : 'bg-white border-stone-300'
                      }`}
                    >
                      {entry.completed && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className={entry.current ? '' : entry.completed ? 'opacity-80' : 'opacity-40'}>
                      <p className="font-semibold text-sm">{entry.title}</p>
                      <p className="text-xs text-stone-500">{entry.description}</p>
                      {entry.location && (
                        <p className="text-xs text-brand-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {entry.location}
                        </p>
                      )}
                      {entry.timestamp && (
                        <p className="text-xs text-stone-400 mt-1">
                          {new Date(entry.timestamp).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <details className="border rounded-xl">
                <summary className="p-3 cursor-pointer text-sm font-medium flex items-center gap-2">
                  <ChevronDown className="w-4 h-4" /> Simulate Progress (Demo)
                </summary>
                <div className="p-3 border-t flex flex-wrap gap-2">
                  {ORDER_STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => simulateStatus(s)}
                      disabled={simulating}
                      className={`text-xs px-2 py-1 rounded border ${
                        order.currentStatus === s ? 'bg-brand-600 text-white border-brand-600' : 'hover:bg-stone-50'
                      }`}
                    >
                      {s.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </details>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
