import { useState } from 'react';
import { Phone, MessageSquare, X, ChevronUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingContactWidget() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* Expanded Quick Action Card */}
      {expanded && (
        <div className="bg-sage-950 text-white rounded-3xl p-5 shadow-2xl border border-white/20 w-72 animate-fade-slide-up">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-400" /> Fast Doorstep Service
            </span>
            <button
              onClick={() => setExpanded(false)}
              className="text-stone-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-200 mb-4 leading-relaxed">
            Need an instant quote or free laser measurement visit in Noida &amp; NCR? Contact our team directly:
          </p>

          <div className="space-y-2">
            <a
              href="https://wa.me/919910426084?text=Hi%20Chick%20Makers%2C%20I%20am%20looking%20for%20bamboo%20chicks%20/%20safety%20nets%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Us Now
            </a>

            <a
              href="tel:+919910426084"
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white py-2.5 rounded-xl font-bold text-xs transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" /> Call +91-9910426084
            </a>

            <Link
              to="/calculator"
              onClick={() => setExpanded(false)}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-stone-200 py-2 rounded-xl font-semibold text-[11px] transition-colors border border-white/10"
            >
              Open Instant Calculator
            </Link>
          </div>
        </div>
      )}

      {/* Floating Toggle Button - Terracotta Amber Accent */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="group relative flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-white/30"
        aria-label="Quick Contact Options"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-400" />
        </span>
        <span className="text-xs font-bold hidden sm:inline">Instant Quote</span>
        <Phone className="w-4 h-4 transition-transform group-hover:rotate-12" />
        {expanded ? <X className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

    </div>
  );
}
