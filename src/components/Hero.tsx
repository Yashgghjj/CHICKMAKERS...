import { ArrowRight, Ruler, Package } from 'lucide-react';

interface HeroProps {
  onCalculate: () => void;
  onBookMeasurement: () => void;
  onTrackOrder: () => void;
}

export default function Hero({ onCalculate, onBookMeasurement, onTrackOrder }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sage-900 via-sage-700 to-brand-800 text-white">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-brand-300 text-sm font-medium tracking-wide uppercase mb-4">
            Handcrafted in Assam · 5-Year Warranty
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Custom Bamboo Chick Blinds for Your Balcony
          </h1>
          <p className="text-lg text-stone-200 mb-8 leading-relaxed">
            Instant custom-size pricing, free laser measurement, artisan hand-weaving, and professional
            anti-rust installation across major metros.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onCalculate}
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Calculate Price <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onBookMeasurement}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <Ruler className="w-4 h-4" /> Free Home Visit
            </button>
            <button
              onClick={onTrackOrder}
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <Package className="w-4 h-4" /> Track Order
            </button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-stone-300">
            <span>✓ From ₹58/sq.ft</span>
            <span>✓ 7-Day Craft Timeline</span>
            <span>✓ UPI · Card · COD</span>
            <span>✓ Free NCR Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
