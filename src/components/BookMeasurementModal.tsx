import { useState } from 'react';
import { X, Calendar, Check } from 'lucide-react';
import { api } from '../services/api';

interface BookMeasurementModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookMeasurementModal({ open, onClose }: BookMeasurementModalProps) {
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

  function handleClose() {
    setSubmitted(false);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-display text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600" /> Free Home Measurement
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-stone-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Visit Booked!</h3>
              <p className="text-stone-500 text-sm">Our certified engineer will call you within 2 hours to confirm.</p>
              <button onClick={handleClose} className="mt-6 bg-brand-600 text-white px-6 py-2 rounded-xl">Done</button>
            </div>
          ) : (
            <div className="space-y-3">
              <input placeholder="Full Name *" value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" />
              <input placeholder="Mobile (10 digits) *" value={form.phone} onChange={(e) => update('phone', e.target.value)} maxLength={10} className="w-full border rounded-xl px-4 py-2.5" />
              <input placeholder="Full Address *" value={form.address} onChange={(e) => update('address', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="City *" value={form.city} onChange={(e) => update('city', e.target.value)} className="border rounded-xl px-4 py-2.5" />
                <input placeholder="Pincode" value={form.pincode} onChange={(e) => update('pincode', e.target.value)} className="border rounded-xl px-4 py-2.5" />
              </div>
              <input type="date" value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" />
              <select value={form.preferredTimeSlot} onChange={(e) => update('preferredTimeSlot', e.target.value)} className="w-full border rounded-xl px-4 py-2.5">
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 4 PM)</option>
                <option>Evening (4 PM - 7 PM)</option>
              </select>
              <select value={form.serviceRequired} onChange={(e) => update('serviceRequired', e.target.value)} className="w-full border rounded-xl px-4 py-2.5">
                <option>Laser Measurement & Consultation</option>
                <option>Balcony Blind Quote</option>
                <option>Monsoon PVC Screen</option>
                <option>Pigeon Net Installation</option>
                <option>Repair & Maintenance</option>
              </select>
              <input placeholder="Approx. area (sq.ft) — optional" value={form.approxSqFt} onChange={(e) => update('approxSqFt', e.target.value)} className="w-full border rounded-xl px-4 py-2.5" />
              <textarea placeholder="Notes (optional)" value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={2} className="w-full border rounded-xl px-4 py-2.5" />
              <button
                onClick={submit}
                disabled={loading || !form.name || !form.phone || !form.address || !form.city || !form.preferredDate}
                className="w-full bg-brand-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {loading ? 'Booking...' : 'Book Free Visit'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
