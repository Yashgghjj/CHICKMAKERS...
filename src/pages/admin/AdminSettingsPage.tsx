import { useState, useEffect, FormEvent } from 'react';
import {
  Save,
  Shield,
  Store,
  Phone,
  Mail,
  MapPin,
  Clock,
  IndianRupee,
  Bell,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../../services/api';
import type { AdminSettings } from '../../types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
    businessName: 'Bamboo Chick Maker & Shiva Fabrication',
    founderName: 'Shiva',
    contactPhone: '+91 88260 54537',
    whatsappPhone: '+91 88260 54537',
    supportEmail: 'info@shivachickmaker.in',
    workshopAddress: 'LG-04, Asarfi Plaza, Sector 149, Greater Noida, UP 201310',
    operatingHours: 'Monday - Sunday: 8:00 AM - 9:00 PM',
    minOrderValue: 800,
    deliveryAndFittingFee: 350,
    enableNotifications: true,
    orderAlertSound: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security password fields
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }

  async function loadSettings() {
    try {
      setLoading(true);
      const res = await api.adminGetSettings();
      if (res.success && res.settings) {
        setSettings(res.settings);
      }
    } catch (err) {
      console.error('Failed to load settings', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function handleSaveSettings(e: FormEvent) {
    e.preventDefault();
    setPasswordError(null);

    // If changing password, validate
    if (newPassword) {
      if (newPassword.length < 4) {
        setPasswordError('Password must be at least 4 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError('New password and confirmation do not match.');
        return;
      }
    }

    setSaving(true);
    try {
      const payload: Partial<AdminSettings> = {
        ...settings,
        ...(newPassword ? { adminPassword: newPassword } : {}),
      };

      const res = await api.adminUpdateSettings(payload);
      if (res.success) {
        setSettings(res.settings);
        triggerToast('Settings & security credentials updated!');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl border border-amber-500/40 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-stone-900 font-serif">Portal &amp; Workshop Settings</h2>
        <p className="text-xs text-stone-500">
          Configure business details, delivery charges, admin authentication &amp; alerts
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Business Information Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <Store className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-stone-900">Workshop &amp; Business Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Business Name</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Proprietor / Founder</label>
              <input
                type="text"
                value={settings.founderName}
                onChange={(e) => setSettings({ ...settings, founderName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">WhatsApp Orders Number</label>
              <input
                type="text"
                value={settings.whatsappPhone}
                onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">Official Workshop Address</label>
              <input
                type="text"
                value={settings.workshopAddress}
                onChange={(e) => setSettings({ ...settings, workshopAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">Operating Hours</label>
              <input
                type="text"
                value={settings.operatingHours}
                onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Commercial Rules */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <IndianRupee className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-stone-900">Commercial &amp; Fitting Parameters</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Standard Delivery &amp; Fitting Fee (₹)
              </label>
              <input
                type="number"
                value={settings.deliveryAndFittingFee}
                onChange={(e) => setSettings({ ...settings, deliveryAndFittingFee: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Applied to all handcrafted custom orders during checkout
              </span>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Minimum Order Value Threshold (₹)
              </label>
              <input
                type="number"
                value={settings.minOrderValue}
                onChange={(e) => setSettings({ ...settings, minOrderValue: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Ensures workshop craft minimum viability
              </span>
            </div>
          </div>
        </div>

        {/* Admin Password & Security */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <Shield className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-sm font-bold text-stone-900">Admin Security &amp; Credentials</h3>
              <p className="text-[11px] text-stone-400">Update your artisan portal login password</p>
            </div>
          </div>

          {passwordError && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
              {passwordError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full pl-3 pr-10 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Confirm New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Sound */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-stone-100 pb-3">
            <Bell className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-bold text-stone-900">Alerts &amp; Sound Preferences</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-stone-300"
              />
              <span className="text-stone-800 font-medium">
                Show live order alerts and dispatch notifications in browser
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.orderAlertSound}
                onChange={(e) => setSettings({ ...settings, orderAlertSound: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-stone-300"
              />
              <span className="text-stone-800 font-medium">
                Play subtle chime sound when a new online order or measurement appointment is submitted
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
