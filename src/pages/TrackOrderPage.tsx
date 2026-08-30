import { useState } from 'react';
import { Search, MapPin, Phone, Star, ChevronDown, Package } from 'lucide-react';
import { api } from '../services/api';
import type { Order, OrderStatus } from '../types';
import { ORDER_STATUSES } from '../types';
import PageTransition from '../components/PageTransition';

interface TrackOrderPageProps {
  initialOrder?: Order | null;
  onViewInvoice: (order: Order) => void;
}

export default function TrackOrderPage({ initialOrder, onViewInvoice }: TrackOrderPageProps) {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<Order | null>(initialOrder || null);
  const [loading, setLoading] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [notFound, setNotFound] = useState(false);

  async function search() {
    if (!query.trim()) return;
    setLoading(true);
    setNotFound(false);
    try {
      const res = await api.getOrder(query.trim());
      setOrder(res.order);
    } catch {
      setOrder(null);
      setNotFound(true);
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

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-sage-900 via-sage-800 to-brand-900 text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
            <Package className="w-9 h-9 text-brand-300" /> Live Order Tracking
          </h1>
          <p className="text-stone-300 max-w-xl">
            Track your handcrafted blind from weaving to installation in real-time.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Search */}
          <div className="flex gap-2 mb-8">
            <input
              placeholder="Order ID (CHK-2026-1042) or Phone"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && search()}
              className="flex-1 border border-stone-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
            />
            <button
              onClick={search}
              disabled={loading}
              className="bg-brand-600 text-white px-6 rounded-xl flex items-center gap-2 font-semibold hover:bg-brand-700 transition-all hover:scale-[1.02]"
            >
              <Search className="w-4 h-4" /> {loading ? '...' : 'Track'}
            </button>
          </div>

          {notFound && (
            <div className="text-center py-8 bg-red-50 rounded-xl mb-6 animate-scale-in">
              <p className="text-red-600 font-medium">Order not found</p>
              <p className="text-sm text-stone-500 mt-1">Try <code className="bg-red-100 px-1 rounded">CHK-2026-1042</code> or <code className="bg-red-100 px-1 rounded">9811244321</code></p>
            </div>
          )}

          {order && (
            <div className="animate-fade-slide-up">
              {/* Order info */}
              <div className="bg-sage-50 rounded-xl p-5 mb-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-lg text-sage-900">{order.orderNumber}</p>
                    <p className="text-sm text-stone-500">{order.customerName} · {order.customerPhone}</p>
                  </div>
                  <button onClick={() => onViewInvoice(order)} className="text-sm text-brand-600 hover:underline font-medium">
                    View Invoice
                  </button>
                </div>
                <p className="text-sm">Total: <strong>₹{order.totalAmount.toLocaleString('en-IN')}</strong></p>
              </div>

              {/* Technician card */}
              <div className="flex items-center gap-4 p-4 bg-white border border-stone-200 rounded-xl mb-6 card-interactive">
                <img src={order.technician.avatar} alt="" className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-100" />
                <div className="flex-1">
                  <p className="font-semibold text-sage-900">{order.technician.name}</p>
                  <p className="text-sm text-stone-500">{order.technician.role} · {order.technician.experienceYears} yrs</p>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <Star className="w-3 h-3 fill-current" /> {order.technician.rating}
                  </div>
                </div>
                <a href={`tel:${order.technician.phone}`} className="p-3 bg-brand-50 rounded-xl text-brand-600 hover:bg-brand-100 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              {/* Timeline */}
              <div className="relative pl-6 space-y-6 mb-6">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-stone-200" />
                {order.timeline.map((entry) => (
                  <div key={entry.status} className="relative">
                    <div
                      className={`absolute -left-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
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

              {/* Simulate */}
              <details className="border border-stone-200 rounded-xl bg-white">
                <summary className="p-3 cursor-pointer text-sm font-medium flex items-center gap-2 hover:bg-stone-50 transition-colors">
                  <ChevronDown className="w-4 h-4" /> Simulate Progress (Demo)
                </summary>
                <div className="p-3 border-t flex flex-wrap gap-2">
                  {ORDER_STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => simulateStatus(s)}
                      disabled={simulating}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        order.currentStatus === s ? 'bg-brand-600 text-white border-brand-600' : 'hover:bg-stone-50 hover:scale-105'
                      }`}
                    >
                      {s.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          )}

          {!order && !notFound && (
            <div className="text-center py-16 text-stone-400">
              <Package className="w-16 h-16 mx-auto mb-4 text-stone-300" />
              <p className="text-lg font-medium text-stone-500">Enter your order ID or phone number to track</p>
              <p className="text-sm mt-1">Try <code className="bg-stone-100 px-2 py-0.5 rounded">CHK-2026-1042</code></p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
