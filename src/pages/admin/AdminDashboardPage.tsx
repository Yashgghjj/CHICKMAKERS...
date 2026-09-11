import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  ShoppingBag,
  Package,
  Users,
  CalendarCheck,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowUpRight,
  PlusCircle,
  RefreshCw,
  Phone,
  Eye,
  Hammer,
  Layers,
  Plus,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { api } from '../../services/api';
import type { AdminStats, Order } from '../../types';
import { STATUS_LABELS } from '../../types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [clearingOrders, setClearingOrders] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  }

  async function loadDashboardData() {
    try {
      setRefreshing(true);
      const [statsRes, ordersRes] = await Promise.all([
        api.adminGetStats().catch(() => null),
        api.adminGetOrders().catch(() => null),
      ]);

      if (statsRes?.success && statsRes.stats) {
        setStats(statsRes.stats);
      }
      if (ordersRes?.success && ordersRes.orders) {
        setRecentOrders(ordersRes.orders.slice(0, 5));
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function handleClearOrders() {
    try {
      setClearingOrders(true);
      await api.adminClearOrders();
      try {
        localStorage.removeItem('chickmakers_orders_v2');
      } catch {}
      await loadDashboardData();
      setIsClearModalOpen(false);
      showToast('All orders cleared! Started with a fresh clean slate.');
    } catch (err) {
      alert((err as Error).message || 'Failed to clear orders');
    } finally {
      setClearingOrders(false);
    }
  }

  async function handleSeedSampleOrder() {
    try {
      setRefreshing(true);
      const res = await api.adminSeedSampleOrder();
      if (res.success) {
        await loadDashboardData();
        showToast('Fresh sample order generated for workshop!');
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to generate sample order');
    } finally {
      setRefreshing(false);
    }
  }

  const totalRev = stats?.totalRevenue ?? 0;
  const totalOrd = stats?.totalOrders ?? 0;
  const pendingOrd = stats?.pendingOrders ?? 0;
  const totalProd = stats?.totalProducts ?? 0;
  const totalCust = stats?.totalCustomers ?? 0;
  const totalAppt = stats?.totalAppointments ?? 0;

  // Aggregate phase counts
  const statusCountsMap = new Map<string, number>();
  if (stats?.ordersByStatus && stats.ordersByStatus.length > 0) {
    stats.ordersByStatus.forEach((s) => statusCountsMap.set(s.status, s.count));
  } else {
    recentOrders.forEach((o) => {
      statusCountsMap.set(o.currentStatus, (statusCountsMap.get(o.currentStatus) || 0) + 1);
    });
  }

  const productionPhases = [
    {
      status: 'CONFIRMED',
      label: 'Order Confirmed',
      desc: 'Deposit verified & specs logged',
      count: statusCountsMap.get('CONFIRMED') || 0,
      color: 'bg-amber-500',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      dotColor: 'bg-amber-500',
    },
    {
      status: 'WEAVING_IN_PROGRESS',
      label: 'Assam Bamboo Weaving',
      desc: 'Artisans handcrafting slats & weave',
      count: statusCountsMap.get('WEAVING_IN_PROGRESS') || 0,
      color: 'bg-orange-500',
      badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
      dotColor: 'bg-orange-500',
    },
    {
      status: 'STITCHING_COATING',
      label: 'Stitching & Waterproofing',
      desc: 'Canvas tape stitched, dual varnish',
      count: statusCountsMap.get('STITCHING_COATING') || 0,
      color: 'bg-indigo-500',
      badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      dotColor: 'bg-indigo-500',
    },
    {
      status: 'QUALITY_INSPECTED',
      label: 'Quality & Pulley Check',
      desc: 'Cord lock & tension verified',
      count: statusCountsMap.get('QUALITY_INSPECTED') || 0,
      color: 'bg-teal-500',
      badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
      dotColor: 'bg-teal-500',
    },
    {
      status: 'OUT_FOR_INSTALLATION',
      label: 'Out for Installation',
      desc: 'Dispatched to Delhi NCR site',
      count: statusCountsMap.get('OUT_FOR_INSTALLATION') || 0,
      color: 'bg-blue-600',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
      dotColor: 'bg-blue-500',
    },
    {
      status: 'COMPLETED',
      label: 'Completed & Active',
      desc: 'Installed & 5-yr warranty on',
      count: statusCountsMap.get('COMPLETED') || 0,
      color: 'bg-emerald-500',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      dotColor: 'bg-emerald-500',
    },
  ];

  const totalPhaseOrders = productionPhases.reduce((acc, p) => acc + p.count, 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl border border-amber-500/40 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">Clear All Orders?</h3>
            <p className="text-xs text-stone-500 mb-6">
              This will remove all orders from the workshop records and reset all production counters back to zero. You will be able to start fresh.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsClearModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleClearOrders}
                disabled={clearingOrders}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition"
              >
                {clearingOrders ? 'Clearing...' : 'Yes, Clear All Orders'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome & Quick Action Bar */}
      <div className="bg-gradient-to-r from-sage-950 via-sage-900 to-stone-900 rounded-2xl p-6 text-white border border-sage-800 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Workshop Control
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif">Welcome, Artisan Shiva</h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            Greater Noida Workshop · Monitoring Assam bamboo craftsmanship, site visits &amp; dispatches.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadDashboardData}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sage-800 hover:bg-sage-700 text-stone-200 text-xs font-medium border border-sage-700 transition"
            title="Refresh dashboard stats"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync'}</span>
          </button>

          <Link
            to="/admin/orders?action=new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-md shadow-amber-500/20 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Order</span>
          </Link>

          <button
            onClick={handleSeedSampleOrder}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-amber-300 text-xs font-semibold border border-stone-700 transition"
            title="Generate a fresh test order"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seed Test Order</span>
          </button>

          {totalOrd > 0 && (
            <button
              onClick={() => setIsClearModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-rose-200 text-xs font-semibold border border-rose-800/60 transition"
              title="Remove all orders"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Orders</span>
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-stone-900 font-serif">
              ₹{totalRev.toLocaleString('en-IN')}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this month</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-stone-900 font-serif">{totalOrd}</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-semibold text-amber-700">{pendingOrd} pending crafting/dispatch</span>
            </div>
          </div>
        </div>

        {/* Catalog Products */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Products Catalog</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-stone-900 font-serif">{totalProd}</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>All active &amp; customizable</span>
            </div>
          </div>
        </div>

        {/* Customers & Leads */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Customers &amp; Leads</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-stone-900 font-serif">{totalCust}</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
              <CalendarCheck className="w-3.5 h-3.5 text-purple-500" />
              <span className="font-medium text-stone-600">{totalAppt} site visits booked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Production Phase Breakdown (Workshop Crafting & Dispatch Lifecycle) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Hammer className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Production Phase Breakdown</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Live Workshop Pipeline
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Real-time progress across bamboo slat weaving, canvas tape stitching, quality inspection, and Delhi NCR site installations.
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition self-start sm:self-auto"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Open Order Manager</span>
          </Link>
        </div>

        {/* Global Pipeline Progress Bar */}
        <div className="mt-4 pt-1">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="font-semibold text-stone-700">Workshop Capacity &amp; Pipeline Load</span>
            <span className="font-mono text-stone-600">{totalOrd} Active &amp; Historical Handcrafted Units</span>
          </div>
          {totalPhaseOrders === 0 ? (
            <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden flex items-center justify-center border border-stone-200 text-[10px] text-stone-400 font-medium">
              Workshop idle · 0 orders in pipeline (Click &quot;+ New Order&quot; or &quot;Seed Test Order&quot; to begin)
            </div>
          ) : (
            <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-stone-200">
              {productionPhases.map((phase) => {
                if (phase.count === 0) return null;
                const widthPct = Math.max(10, Math.round((phase.count / totalPhaseOrders) * 100));
                return (
                  <div
                    key={phase.status}
                    style={{ width: `${widthPct}%` }}
                    className={`h-full rounded-sm ${phase.color} transition-all duration-300`}
                    title={`${phase.label}: ${phase.count} orders`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* 6 Stage Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {productionPhases.map((phase, idx) => (
            <Link
              key={phase.status}
              to={`/admin/orders?status=${phase.status}`}
              className="p-3.5 rounded-xl border border-stone-200/90 bg-stone-50/50 hover:bg-white hover:border-amber-400 hover:shadow-xs transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold font-mono text-stone-400">STAGE 0{idx + 1}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${phase.badgeBg}`}>
                    {phase.count} orders
                  </span>
                </div>
                <div className="text-xs font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                  {phase.label}
                </div>
                <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                  {phase.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] font-medium text-stone-500 group-hover:text-stone-900">
                <span>View filtered</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Visual Analytics & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900">Revenue &amp; Crafting Volume</h3>
              <p className="text-xs text-stone-500">Monthly breakdown for handcrafted bamboo orders</p>
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              FY 2026
            </span>
          </div>

          {/* Clean SVG Bar Chart */}
          <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2">
            {(stats?.revenueByMonth || [
              { month: 'May', revenue: 42000, orders: 12 },
              { month: 'Jun', revenue: 58500, orders: 18 },
              { month: 'Jul', revenue: 74200, orders: 24 },
              { month: 'Aug', revenue: 89000, orders: 31 },
              { month: 'Sep', revenue: 112400, orders: 38 },
            ]).map((item) => {
              const maxRev = 120000;
              const heightPct = Math.min(100, Math.round((item.revenue / maxRev) * 100));
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-bold text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(item.revenue / 1000).toFixed(0)}k
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-amber-500 to-amber-400 group-hover:from-amber-600 group-hover:to-amber-500 transition-all duration-300 relative shadow-xs"
                  >
                    <div className="absolute top-1 inset-x-0 mx-auto w-4 h-0.5 bg-amber-200/60 rounded" />
                  </div>
                  <div className="text-xs font-semibold text-stone-600 mt-1">{item.month}</div>
                  <div className="text-[10px] text-stone-400">{item.orders} ord</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Contribution */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-stone-900 mb-1">Sales by Craft Category</h3>
            <p className="text-xs text-stone-500 mb-4">Assam bamboo blinds &amp; outdoor installations</p>

            <div className="space-y-3.5">
              {[
                { name: 'Assam Bamboo Chicks', pct: 45, color: 'bg-amber-500' },
                { name: 'Bamboo Huts & Gazebos', pct: 32, color: 'bg-emerald-600' },
                { name: 'Pigeon Safety Nets', pct: 15, color: 'bg-blue-500' },
                { name: 'Welding & Roof Structures', pct: 8, color: 'bg-stone-700' },
              ].map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-stone-700">
                    <span>{cat.name}</span>
                    <span className="font-bold text-stone-900">{cat.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100">
            <Link
              to="/admin/products"
              className="flex items-center justify-between text-xs font-bold text-amber-700 hover:text-amber-800 transition"
            >
              <span>Manage all product lines</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-stone-900">Recent Customer Orders</h3>
            <p className="text-xs text-stone-500">Latest handcrafted orders awaiting crafting &amp; dispatch</p>
          </div>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 self-start sm:self-auto"
          >
            <span>View All Orders</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items / Sq.Ft</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-500">
                    <div className="max-w-xs mx-auto space-y-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                        <ShoppingBag className="w-5 h-5 text-amber-700" />
                      </div>
                      <div className="font-bold text-stone-800 text-xs">Clean Slate · No Orders in Workshop</div>
                      <p className="text-[11px] text-stone-400">All previous orders have been cleared. Ready to start with brand new handcrafted orders.</p>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <Link
                          to="/admin/orders?action=new"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-xs transition"
                        >
                          <Plus className="w-3 h-3" />
                          <span>+ New Order</span>
                        </Link>
                        <button
                          onClick={handleSeedSampleOrder}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
                        >
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Seed Sample</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => {
                  const statusInfo = STATUS_LABELS[order.currentStatus] || { title: order.currentStatus };
                  return (
                    <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-stone-900">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">{order.customerName}</div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{order.customerPhone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-stone-900">{order.items.length} product(s)</span>
                        <div className="text-[11px] text-stone-500">
                          {order.shippingAddress?.city || 'Noida NCR'}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-stone-900">
                        ₹{order.totalAmount?.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            order.currentStatus === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.currentStatus === 'OUT_FOR_INSTALLATION'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {statusInfo.title}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/admin/orders?search=${encodeURIComponent(order.orderNumber)}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
