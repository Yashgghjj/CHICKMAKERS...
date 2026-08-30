import { useState } from 'react';
import { Calendar, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import PageTransition from '../components/PageTransition';

export default function BookMeasurementPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    preferredDate: '',
    preferredTimeSlot: 'Morning',
    serviceRequired: 'Laser Measurement & Consultation',
    approxSqFt: '',
    notes: '',
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit() {
    setLoading(true);
    try {
      await api.bookMeasurement(form);
      setSubmitted(true);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-sage-900 via-sage-800 to-brand-900 text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
            <Calendar className="w-9 h-9 text-brand-300" /> Book Free Home Measurement
          </h1>
          <p className="text-stone-300 max-w-xl">
            Our certified engineer will visit your home with laser measuring tools — completely free.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          {submitted ? (
            <div className="text-center py-16 animate-scale-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-sage-900 mb-3">Visit Booked!</h2>
              <p className="text-stone-500 mb-8">Our certified engineer will call you within 2 hours to confirm your appointment.</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xl p-6 md:p-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name *</label>
                  <input
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Mobile (10 digits) *</label>
                  <input
                    placeholder="98XXXXXXXX"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    maxLength={10}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Address *</label>
                  <input
                    placeholder="House/Flat No, Street, Locality"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">City *</label>
                    <input
                      placeholder="Delhi, Mumbai..."
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Pincode</label>
                    <input
                      placeholder="110001"
                      value={form.pincode}
                      onChange={(e) => update('pincode', e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Preferred Date *</label>
                  <input
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => update('preferredDate', e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Preferred Time</label>
                  <select
                    value={form.preferredTimeSlot}
                    onChange={(e) => update('preferredTimeSlot', e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 outline-none"
                  >
                    <option>Morning (9 AM - 12 PM)</option>
                    <option>Afternoon (12 PM - 4 PM)</option>
                    <option>Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Service Required</label>
                  <select
                    value={form.serviceRequired}
                    onChange={(e) => update('serviceRequired', e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 outline-none"
                  >
                    <option>Laser Measurement & Consultation</option>
                    <option>Balcony Blind Quote</option>
                    <option>Monsoon PVC Screen</option>
                    <option>Pigeon Net Installation</option>
                    <option>Repair & Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Approx. Area (optional)</label>
                  <input
                    placeholder="e.g., 60 sq.ft"
                    value={form.approxSqFt}
                    onChange={(e) => update('approxSqFt', e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Notes (optional)</label>
                  <textarea
                    placeholder="Any special instructions..."
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    rows={2}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                  />
                </div>
                <button
                  onClick={submit}
                  disabled={loading || !form.name || !form.phone || !form.address || !form.city || !form.preferredDate}
                  className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-semibold disabled:opacity-50 hover:bg-brand-700 transition-all hover:scale-[1.01]"
                >
                  {loading ? 'Booking...' : '📅 Book Free Visit'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
