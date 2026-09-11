import { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Search,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  ExternalLink,
  RefreshCw,
  X,
  UserCheck,
  Award,
} from 'lucide-react';
import { api } from '../../services/api';
import type { CustomerUser } from '../../types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<CustomerUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [selectedUser, setSelectedUser] = useState<CustomerUser | null>(null);

  async function loadUsers() {
    try {
      setLoading(true);
      const res = await api.adminGetUsers();
      if (res.success && res.users) {
        setUsers(res.users);
      }
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.city && u.city.toLowerCase().includes(q));

      const matchSource = sourceFilter === 'ALL' || u.source === sourceFilter;
      return matchQuery && matchSource;
    });
  }, [users, searchQuery, sourceFilter]);

  const totalSpentAll = users.reduce((sum, u) => sum + (u.totalSpent || 0), 0);
  const totalOrdersAll = users.reduce((sum, u) => sum + (u.totalOrders || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">Customer &amp; Lead Directory</h2>
          <p className="text-xs text-stone-500">
            Client contacts from online orders, site measurement bookings &amp; bespoke inquiries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadUsers}
            className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition shadow-xs"
            title="Refresh directory"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-stone-900 font-serif">{users.length}</div>
            <div className="text-xs text-stone-500">Total Customer Contacts</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-stone-900 font-serif">{totalOrdersAll}</div>
            <div className="text-xs text-stone-500">Orders Fulfilled</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-stone-900 font-serif">₹{totalSpentAll.toLocaleString('en-IN')}</div>
            <div className="text-xs text-stone-500">Total Customer Lifetime Value</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, phone number, email, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'ALL', label: 'All Contacts' },
              { id: 'order', label: 'Purchasers' },
              { id: 'appointment', label: 'Site Measurement Leads' },
              { id: 'inquiry', label: 'Inquiries' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSourceFilter(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                  sourceFilter === s.id
                    ? 'bg-stone-900 text-amber-300 font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Orders &amp; Spent</th>
                <th className="py-3 px-4">Relationship Type</th>
                <th className="py-3 px-4 text-right">Direct Reach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    <Users className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                    <p className="font-medium">No customer profiles found.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const cleanPhone = user.phone.replace(/\D/g, '');
                  return (
                    <tr key={user.id} className="hover:bg-stone-50/80 transition-colors">
                      {/* Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900">{user.name}</div>
                            <div className="text-[10px] text-stone-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Last active: {new Date(user.lastActive).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-stone-900">{user.phone}</div>
                        {user.email && (
                          <div className="text-[11px] text-stone-500 truncate max-w-xs">{user.email}</div>
                        )}
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-stone-800">{user.city}</div>
                        {user.address && (
                          <div className="text-[11px] text-stone-400 truncate max-w-xs">{user.address}</div>
                        )}
                      </td>

                      {/* Orders & Spent */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">
                          {user.totalOrders > 0 ? `₹${user.totalSpent.toLocaleString('en-IN')}` : 'Lead only'}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          {user.totalOrders} order(s) placed
                        </div>
                      </td>

                      {/* Source badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                            user.source === 'order'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : user.source === 'appointment'
                              ? 'bg-purple-100 text-purple-800 border border-purple-300'
                              : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {user.source === 'order'
                            ? 'Client Purchaser'
                            : user.source === 'appointment'
                            ? 'Site Visit Request'
                            : 'Direct Inquiry'}
                        </span>
                      </td>

                      {/* Direct Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={`tel:${cleanPhone}`}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 transition"
                            title="Call Customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/91${cleanPhone}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                            title="Message on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
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
    </div>
  );
}
