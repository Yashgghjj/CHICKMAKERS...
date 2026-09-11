import { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Sparkles,
  Calendar,
  MessageSquare,
  Building,
} from 'lucide-react';
import { api } from '../../services/api';
import type { Appointment } from '../../types';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }

  async function loadAppointments() {
    try {
      setLoading(true);
      const res = await api.adminGetAppointments();
      if (res.success && res.appointments) {
        setAppointments(res.appointments);
      }
    } catch (err) {
      console.error('Failed to load appointments', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  async function handleStatusChange(id: string, newStatus: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED') {
    try {
      const res = await api.adminUpdateAppointment(id, { status: newStatus });
      if (res.success) {
        setAppointments((prev) => prev.map((a) => (a.id === id ? res.appointment : a)));
        triggerToast(`Appointment marked as ${newStatus}`);
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to update status');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this appointment record?')) return;
    try {
      const res = await api.adminDeleteAppointment(id);
      if (res.success) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        triggerToast('Appointment removed');
      }
    } catch (err) {
      alert((err as Error).message || 'Failed to delete');
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl border border-amber-500/40 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">Site Visits &amp; Laser Measurements</h2>
          <p className="text-xs text-stone-500">
            Field visits booked by clients across Greater Noida, Noida, Ghaziabad &amp; Delhi NCR
          </p>
        </div>

        <button
          onClick={loadAppointments}
          className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition shadow-xs self-start sm:self-auto"
          title="Refresh visits"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-500' : ''}`} />
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-stone-200">
            <CalendarCheck className="w-8 h-8 mx-auto text-stone-300 mb-2" />
            <p className="text-xs font-semibold text-stone-600">No site visits scheduled right now.</p>
          </div>
        ) : (
          appointments.map((apt) => {
            const cleanPhone = apt.phone.replace(/\D/g, '');
            return (
              <div
                key={apt.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-amber-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                        {apt.id}
                      </span>
                      <h3 className="text-base font-bold text-stone-900">{apt.name}</h3>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        apt.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : apt.status === 'CONFIRMED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  {/* Visit Details */}
                  <div className="mt-3 space-y-2 text-xs text-stone-600">
                    <div className="flex items-center gap-2 text-stone-800 font-semibold">
                      <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{apt.preferredDate}</span>
                      <span className="text-stone-400">·</span>
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="text-stone-600">{apt.preferredTimeSlot}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <span>
                        {apt.address}, {apt.city} {apt.pincode ? `- ${apt.pincode}` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-stone-400 shrink-0" />
                      <span>
                        Req: <span className="font-semibold text-stone-800">{apt.serviceRequired}</span> (~{apt.approxSqFt || '150'} sq.ft)
                      </span>
                    </div>

                    {apt.notes && (
                      <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 italic">
                        "{apt.notes}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs transition"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                    <a
                      href={`https://wa.me/91${cleanPhone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {apt.status !== 'COMPLETED' ? (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'COMPLETED')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Done</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'CONFIRMED')}
                        className="px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50 transition"
                      >
                        Re-open
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
