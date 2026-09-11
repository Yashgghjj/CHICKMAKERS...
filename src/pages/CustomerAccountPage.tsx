import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Phone,
  Mail,
  Calendar,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ExternalLink,
  Edit2,
  Save,
  X,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { api } from '../services/api';
import type { Order } from '../types';
import PageTransition from '../components/PageTransition';

export default function CustomerAccountPage() {
  const { customerUser, logout, updateProfile } = useCustomerAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editMsg, setEditMsg] = useState<string | null>(null);

  // Edit form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    if (!customerUser) {
      navigate('/login?returnUrl=/account');
      return;
    }
    setName(customerUser.name || '');
    setPhone(customerUser.phone || '');
    setCity(customerUser.city || 'Noida');
    setAddress(customerUser.address || '');
    setPincode(customerUser.pincode || '');

    // Load customer-scoped orders from API
    api
      .customerGetOrders()
      .then((res) => {
        if (res.success && res.orders) {
          setOrders(res.orders);
        }
      })
      .catch((err) => {
        console.error('Failed to load customer orders', err);
      })
      .finally(() => {
        setLoadingOrders(false);
      });
  }, [customerUser, navigate]);

  if (!customerUser) return null;

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setEditMsg(null);
    const res = await updateProfile({ name, phone, city, address, pincode });
    if (res.success) {
      setEditMsg('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setEditMsg(null), 3000);
    } else {
      setEditMsg(res.message || 'Failed to update profile');
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-stone-50/70 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Banner Profile Summary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                {customerUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                    {customerUser.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Customer Account
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 flex items-center gap-2 mt-1">
                  <span>{customerUser.email || 'No email registered'}</span>
                  <span>·</span>
                  <span>{customerUser.phone}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/book-measurement"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E85D26] to-[#D94E18] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" /> Book Free Visit
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold transition-colors border border-stone-200"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Profile Details */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs h-fit space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-600" /> Account Details
                </h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                )}
              </div>

              {editMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 font-medium">
                  {editMsg}
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Delivery Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      placeholder="Street, society, house number"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-stone-400 block mb-0.5">Contact Name</span>
                    <span className="font-semibold text-stone-800 text-sm">{customerUser.name}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Phone</span>
                    <span className="font-semibold text-stone-800">{customerUser.phone}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Email</span>
                    <span className="font-semibold text-stone-800">{customerUser.email || 'None'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-0.5">Primary Site Address</span>
                    <span className="font-semibold text-stone-800 leading-relaxed block">
                      {customerUser.address ? `${customerUser.address}, ${customerUser.city}` : 'No address saved yet.'}
                    </span>
                  </div>
                </div>
              )}

              {/* Artisan Direct Assistance */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Direct Artisan Support</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed mb-3">
                  Have questions about your custom Assam bamboo weave or installation schedule?
                </p>
                <a
                  href="tel:+918826054537"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Shiva: +91 88260 54537
                </a>
              </div>
            </div>

            {/* Right Column: Orders List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                      <Package className="w-5 h-5 text-brand-600" /> My Orders &amp; Blinds
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Handcrafted orders linked to your phone number ({customerUser.phone})
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                    {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                  </span>
                </div>

                {loadingOrders ? (
                  <div className="py-12 text-center text-stone-400 text-xs">
                    <div className="w-8 h-8 border-3 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mx-auto mb-3" />
                    <span>Loading your orders...</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-12 text-center text-stone-500">
                    <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3 stroke-[1.5]" />
                    <h3 className="font-bold text-stone-800 text-sm mb-1">No Orders Placed Yet</h3>
                    <p className="text-xs text-stone-400 max-w-sm mx-auto mb-5">
                      Ready to upgrade your balcony, windows, or outdoor patio with custom bamboo chicks?
                    </p>
                    <Link
                      to="/calculator"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E85D26] hover:bg-[#D94E18] text-white text-xs font-bold shadow-sm transition-all"
                    >
                      Calculate Custom Price <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200 hover:border-brand-300 transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200/60 mb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-xs font-mono text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                              {order.orderNumber}
                            </span>
                            <span className="text-[11px] text-stone-400">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100/80 text-amber-900 border border-amber-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              {order.currentStatus.replace(/_/g, ' ')}
                            </span>
                            <span className="font-bold text-stone-900 text-sm">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 mb-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-xs">
                              <span className="text-stone-700 font-medium">
                                {item.product.name} × {item.quantity}
                              </span>
                              <span className="text-stone-500">{item.dimensionsSummary}</span>
                            </div>
                          ))}
                        </div>

                        {/* Order Action Links */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[11px] text-stone-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {order.shippingAddress?.city || 'Delhi NCR'}
                          </span>
                          <Link
                            to="/track"
                            className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>Live Progress Tracker</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </PageTransition>
  );
}
