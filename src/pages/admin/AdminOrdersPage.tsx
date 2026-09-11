import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  ShoppingBag,
  Eye,
  Trash2,
  Phone,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  X,
  Sparkles,
  RefreshCw,
  MapPin,
  Calendar,
  UserCheck,
  Plus,
  ChevronRight,
} from 'lucide-react';
import { api } from '../../services/api';
import type { Order, OrderStatus } from '../../types';
import { ORDER_STATUSES, STATUS_LABELS } from '../../types';
import InvoiceModal from '../../components/InvoiceModal';
import CreateOrderModal from '../../components/admin/CreateOrderModal';

export default function AdminOrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [paymentFilter, setPaymentFilter] = useState<string>('ALL');

  // Drawer / Modals
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [clearing, setClearing] = useState(false);

  // Status updating state
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>('CONFIRMED');
  const [statusLocation, setStatusLocation] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }

  // Handle URL query parameters
  useEffect(() => {
    const s = searchParams.get('status');
    if (s) setStatusFilter(s);
    if (searchParams.get('action') === 'new') {
      setIsCreateModalOpen(true);
    }
  }, [searchParams]);

  async function handleClearAllOrders() {
    try {
      setClearing(true);
      await api.adminClearOrders();
      try {
        localStorage.removeItem('chickmakers_orders_v2');
      } catch {}
      setOrders([]);
      setSelectedOrder(null);
      setIsClearModalOpen(false);
      triggerToast('All orders cleared! Started with a clean slate.');
    } catch (err) {
      alert((err as Error).message || 'Failed to clear orders');
    } finally {
      setClearing(false);
    }
  }

  async function handleSeedSampleOrder() {
    try {
      setLoading(true);
      const res = await api.adminSeedSampleOrder();
      if (res.success && res.order) {
        setOrders((prev) => [res.order, ...prev]);
        setSelectedOrder(res.order);
        triggerToast('Fresh sample order generated for workshop!');
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to generate test order');
    } finally {
      setLoading(false);
    }
  }

  async function loadOrders() {
    try {
      setLoading(true);
      const res = await api.adminGetOrders();
      if (res.success && res.orders) {
        setOrders(res.orders);
        // If there was an initial search, auto-select if single match
        if (initialSearch) {
          const match = res.orders.find(
            (o) => o.orderNumber.toLowerCase() === initialSearch.toLowerCase() || o.id === initialSearch
          );
          if (match) setSelectedOrder(match);
        }
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(q)) ||
        (o.shippingAddress?.city && o.shippingAddress.city.toLowerCase().includes(q));

      const matchStatus = statusFilter === 'ALL' || o.currentStatus === statusFilter;
      const matchPayment = paymentFilter === 'ALL' || o.paymentStatus === paymentFilter;

      return matchQuery && matchStatus && matchPayment;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  async function handleUpdateStatus() {
    if (!selectedOrder) return;
    setUpdatingStatus(true);
    try {
      const res = await api.updateOrderStatus(selectedOrder.id, {
        status: newStatus,
        location: statusLocation || 'Greater Noida Workshop',
        note: statusNote || STATUS_LABELS[newStatus]?.description,
      });

      if (res.success && res.order) {
        setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? res.order : o)));
        setSelectedOrder(res.order);
        triggerToast(`Status changed to ${STATUS_LABELS[newStatus]?.title}`);
        setStatusLocation('');
        setStatusNote('');
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleDeleteOrder() {
    if (!deletingOrder) return;
    try {
      const res = await api.adminDeleteOrder(deletingOrder.id);
      if (res.success) {
        setOrders((prev) => prev.filter((o) => o.id !== deletingOrder.id));
        if (selectedOrder?.id === deletingOrder.id) setSelectedOrder(null);
        setDeletingOrder(null);
        triggerToast('Order removed from records');
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to delete order');
    }
  }

  function openOrderDrawer(order: Order) {
    setSelectedOrder(order);
    setNewStatus(order.currentStatus);
    setStatusLocation('');
    setStatusNote('');
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl border border-amber-500/40 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">Order Management</h2>
          <p className="text-xs text-stone-500">
            Track crafting phases, dispatch statuses, invoices &amp; technician assignments
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadOrders}
            className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition shadow-xs"
            title="Refresh orders"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-500' : ''}`} />
          </button>

          <button
            onClick={handleSeedSampleOrder}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold border border-stone-200 transition"
            title="Generate sample order"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Seed Test Order</span>
          </button>

          {orders.length > 0 && (
            <button
              onClick={() => setIsClearModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition"
              title="Remove all orders"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Orders</span>
            </button>
          )}

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-md shadow-amber-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Order</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order #, Customer name, Phone, or City..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchParams({ search: e.target.value });
              }}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchParams({});
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              <option value="ALL">All Payments</option>
              <option value="PAID">Paid</option>
              <option value="ADVANCE">Advance Paid</option>
              <option value="PENDING">Pending Payment</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 overflow-x-auto pb-1">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              statusFilter === 'ALL'
                ? 'bg-stone-900 text-amber-300 font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All ({orders.length})
          </button>
          {ORDER_STATUSES.map((st) => {
            const count = orders.filter((o) => o.currentStatus === st).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  statusFilter === st
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>{STATUS_LABELS[st].title.split('&')[0]}</span>
                {count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      statusFilter === st ? 'bg-stone-950 text-amber-400' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Order Details</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items / Dimensions</th>
                <th className="py-3 px-4">Payment &amp; Amount</th>
                <th className="py-3 px-4">Crafting Phase</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                        <ShoppingBag className="w-6 h-6 text-amber-700" />
                      </div>
                      <h3 className="text-base font-bold text-stone-900">Workshop is Clean &amp; Ready</h3>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        All previous orders have been cleared. You are currently on a clean slate! Create your first handcrafted order or seed a sample order to test the production pipeline.
                      </p>
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={() => setIsCreateModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-md shadow-amber-500/20 transition"
                        >
                          <Plus className="w-4 h-4" />
                          <span>+ Create First Order</span>
                        </button>
                        <button
                          onClick={handleSeedSampleOrder}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Seed Sample Order</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    <ShoppingBag className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                    <p className="font-medium">No orders match the selected filters.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const statusInfo = STATUS_LABELS[order.currentStatus] || { title: order.currentStatus };
                  return (
                    <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                      {/* Order Number & Date */}
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-stone-900 text-sm">{order.orderNumber}</div>
                        <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">{order.customerName}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="text-[11px] text-amber-700 font-medium hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" /> {order.customerPhone}
                          </a>
                        </div>
                        <div className="text-[11px] text-stone-500 truncate max-w-xs mt-0.5">
                          {order.shippingAddress?.city}, {order.shippingAddress?.pincode}
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">
                          {order.items.length} custom product(s)
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {order.items[0]?.productName || order.items[0]?.product?.name || 'Bamboo Blind'}
                          {order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}
                        </div>
                      </td>

                      {/* Payment */}
                      <td className="py-3 px-4">
                        <div className="font-black text-stone-900 text-sm">
                          ₹{order.totalAmount?.toLocaleString('en-IN')}
                        </div>
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold mt-0.5 ${
                            order.paymentStatus === 'PAID'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.paymentStatus} ({order.paymentMethod})
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            order.currentStatus === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : order.currentStatus === 'OUT_FOR_INSTALLATION'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {statusInfo.title}
                        </span>
                        {order.technician && (
                          <div className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                            <UserCheck className="w-3 h-3 text-stone-400" />
                            <span>Tech: {order.technician.name.split(' ')[0]}</span>
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openOrderDrawer(order)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
                            title="Inspect order & update phase"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setInvoiceOrder(order)}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold transition"
                            title="Generate / Print Invoice"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingOrder(order)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600 transition"
                            title="Delete order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-stone-900 text-base">
                    {selectedOrder.orderNumber}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      selectedOrder.currentStatus === 'COMPLETED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {STATUS_LABELS[selectedOrder.currentStatus]?.title}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInvoiceOrder(selectedOrder)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Invoice</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-stone-700">
              {/* Customer Contact Card */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 text-sm">Customer &amp; Site Address</h4>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedOrder.customerPhone}`}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 transition"
                    >
                      <Phone className="w-3 h-3" /> Call
                    </a>
                    <a
                      href={`https://wa.me/91${selectedOrder.customerPhone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center gap-1 transition"
                    >
                      <MessageSquare className="w-3 h-3" /> WhatsApp
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-400">Name:</span>{' '}
                    <span className="font-bold text-stone-900">{selectedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">Phone:</span>{' '}
                    <span className="font-semibold text-stone-800">{selectedOrder.customerPhone}</span>
                  </div>
                  {selectedOrder.customerEmail && (
                    <div className="sm:col-span-2">
                      <span className="text-stone-400">Email:</span> {selectedOrder.customerEmail}
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <span className="text-stone-400">Address:</span>{' '}
                    <span className="text-stone-800 font-medium">
                      {selectedOrder.shippingAddress?.street}, {selectedOrder.shippingAddress?.landmark},{' '}
                      {selectedOrder.shippingAddress?.city} - {selectedOrder.shippingAddress?.pincode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Updater Control */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Update Production &amp; Dispatch Phase</span>
                  </h4>

                  {(() => {
                    const currIdx = ORDER_STATUSES.indexOf(selectedOrder.currentStatus);
                    const nextStage = currIdx >= 0 && currIdx < ORDER_STATUSES.length - 1 ? ORDER_STATUSES[currIdx + 1] : null;
                    if (!nextStage) return null;
                    return (
                      <button
                        type="button"
                        onClick={async () => {
                          setUpdatingStatus(true);
                          try {
                            const res = await api.updateOrderStatus(selectedOrder.id, {
                              status: nextStage,
                              location: 'Greater Noida Workshop',
                              note: `Advanced to ${STATUS_LABELS[nextStage].title}`,
                            });
                            if (res.success && res.order) {
                              setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? res.order : o)));
                              setSelectedOrder(res.order);
                              setNewStatus(res.order.currentStatus);
                              triggerToast(`Advanced to ${STATUS_LABELS[nextStage].title}`);
                            }
                          } catch (err) {
                            alert((err as Error).message || 'Failed to advance status');
                          } finally {
                            setUpdatingStatus(false);
                          }
                        }}
                        disabled={updatingStatus}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs transition"
                      >
                        <span>Advance to {STATUS_LABELS[nextStage].title.split('&')[0]}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    );
                  })()}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Select Next Phase</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    >
                      {ORDER_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {STATUS_LABELS[st].title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">Location Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Sector 149 Workshop"
                      value={statusLocation}
                      onChange={(e) => setStatusLocation(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div className="sm:col-span-1 flex items-end">
                    <button
                      onClick={handleUpdateStatus}
                      disabled={updatingStatus}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20 transition disabled:opacity-50"
                    >
                      {updatingStatus ? 'Updating...' : 'Save Status'}
                    </button>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Optional milestone note visible on customer tracking page..."
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs"
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-900 text-sm">Ordered Handcrafted Items</h4>
                <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100">
                  {selectedOrder.items.map((item, idx) => {
                    const title = item.productName || item.product?.name || 'Assam Bamboo Blind';
                    const dimText =
                      item.dimensions
                        ? `${item.dimensions.widthFeet}′ ${item.dimensions.widthInches}″ W × ${item.dimensions.heightFeet}′ ${item.dimensions.heightInches}″ H`
                        : item.dimensionsSummary ||
                          (item.config ? `${item.config.widthFeet}′ ${item.config.widthInches}″ W × ${item.config.heightFeet}′ ${item.config.heightInches}″ H` : '');
                    return (
                      <div key={idx} className="p-3 bg-white flex items-start justify-between gap-4">
                        <div>
                          <div className="font-bold text-stone-900 text-xs">{title}</div>
                          {dimText && (
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              Size: <span className="font-semibold text-stone-700">{dimText}</span>
                              {item.billingSqFt ? ` · ${item.billingSqFt} sq.ft` : ''}
                            </div>
                          )}
                          {item.addons && item.addons.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.addons.map((a: string, i: number) => (
                                <span key={i} className="px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 text-[10px]">
                                  {a}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-stone-900 text-sm">₹{item.totalPrice?.toLocaleString('en-IN')}</div>
                          <div className="text-[10px] text-stone-400">Qty: {item.quantity || 1}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.subtotal?.toLocaleString('en-IN')}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{selectedOrder.discount?.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>GST (5%)</span>
                  <span>₹{selectedOrder.tax?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Fitting &amp; Delivery Fee</span>
                  <span>₹{selectedOrder.deliveryAndFittingFee?.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-black text-stone-900 text-sm">
                  <span>Total Amount</span>
                  <span>₹{selectedOrder.totalAmount?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">Delete Order Record?</h3>
            <p className="text-xs text-stone-500 mb-6">
              Are you sure you want to remove <span className="font-bold text-stone-800">{deletingOrder.orderNumber}</span>?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingOrder(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal Integration */}
      {invoiceOrder && (
        <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />
      )}

      {/* Clear All Orders Confirmation Modal */}
      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">Clear All Orders?</h3>
            <p className="text-xs text-stone-500 mb-6">
              This will remove all orders from the workshop records and reset all production counters back to zero. You will start with a completely clean slate.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsClearModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAllOrders}
                disabled={clearing}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition"
              >
                {clearing ? 'Clearing...' : 'Yes, Clear All Orders'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Handcrafted Order Modal */}
      {isCreateModalOpen && (
        <CreateOrderModal
          onClose={() => setIsCreateModalOpen(false)}
          onOrderCreated={(newOrder) => {
            setOrders((prev) => [newOrder, ...prev]);
            setSelectedOrder(newOrder);
            triggerToast(`Order ${newOrder.orderNumber} created successfully!`);
          }}
        />
      )}
    </div>
  );
}
