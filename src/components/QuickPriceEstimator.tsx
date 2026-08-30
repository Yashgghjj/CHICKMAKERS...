import { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Phone, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRESET_BALCONIES = [
  { label: 'Standard Balcony', width: 6, height: 5, sqft: 30, desc: '6ft × 5ft balcony opening' },
  { label: 'Medium Balcony', width: 8, height: 6, sqft: 48, desc: '8ft × 6ft balcony opening' },
  { label: 'Large L-Shape Balcony', width: 12, height: 7, sqft: 84, desc: '12ft × 7ft balcony opening' },
  { label: 'Full Terrace Enclosure', width: 16, height: 8, sqft: 128, desc: '16ft × 8ft terrace opening' },
];

const PRODUCT_RATES = [
  { id: 'bamboo', label: 'Assam Bamboo Chick', rate: 58, unit: 'sq.ft' },
  { id: 'pvc', label: 'Monsoon PVC Screen', rate: 85, unit: 'sq.ft' },
  { id: 'bird', label: 'Garware Pigeon Net', rate: 28, unit: 'sq.ft' },
  { id: 'zebra', label: 'Zebra Day/Night Blind', rate: 120, unit: 'sq.ft' },
];

export default function QuickPriceEstimator() {
  const [selectedBalconyIndex, setSelectedBalconyIndex] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState('bamboo');

  const balcony = PRESET_BALCONIES[selectedBalconyIndex];
  const product = PRODUCT_RATES.find((p) => p.id === selectedProduct) || PRODUCT_RATES[0];

  const estimatedCost = balcony.sqft * product.rate;

  return (
    <section className="py-20 bg-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-xl grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Selector Controls */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-200">
              <Calculator className="w-3.5 h-3.5" /> Instant Estimate Tool
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-sage-950 mb-3">
              Calculate Your Balcony Cost in 10 Seconds
            </h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-8">
              Select your balcony size and product type below to calculate an instant estimated cost for your home.
            </p>

            {/* Step 1: Select Product */}
            <div className="mb-6">
              <label className="text-xs font-bold text-sage-950 uppercase tracking-wider block mb-3">
                1. Select Product Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRODUCT_RATES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedProduct === p.id
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md font-bold'
                        : 'bg-stone-50 border-stone-200 text-sage-900 hover:bg-stone-100 font-semibold'
                    }`}
                  >
                    <div className="text-xs">{p.label}</div>
                    <div className="text-[11px] opacity-80 mt-1">₹{p.rate}/{p.unit}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Balcony Size Preset */}
            <div>
              <label className="text-xs font-bold text-sage-950 uppercase tracking-wider block mb-3">
                2. Select Balcony Size
              </label>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {PRESET_BALCONIES.map((b, idx) => (
                  <button
                    key={b.label}
                    onClick={() => setSelectedBalconyIndex(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      selectedBalconyIndex === idx
                        ? 'bg-sage-950 text-white border-sage-950 shadow-md font-bold'
                        : 'bg-stone-50 border-stone-200 text-sage-900 hover:bg-stone-100 font-medium'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{b.label}</div>
                      <div className="text-[11px] opacity-75">{b.desc}</div>
                    </div>
                    <span className="text-xs font-bold shrink-0">{b.sqft} sq.ft</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Instant Price Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-sage-950 via-sage-900 to-brand-950 text-white rounded-3xl p-8 shadow-2xl border border-white/10 flex flex-col justify-between h-full">
            <div>
              <span className="text-brand-300 text-xs font-bold uppercase tracking-wider">Estimated Investment</span>
              
              <div className="mt-4 mb-6">
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">
                  ₹{estimatedCost.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-stone-300 mt-1 font-medium">
                  Includes Assam bamboo + hardware + anti-rust fitting
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/15 space-y-2 text-xs mb-8">
                <div className="flex justify-between">
                  <span className="text-stone-300">Total Area:</span>
                  <span className="font-bold text-white">{balcony.sqft} sq.ft ({balcony.width}ft × {balcony.height}ft)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-300">Rate / Sq.Ft:</span>
                  <span className="font-bold text-white">₹{product.rate} / sq.ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-300">Measurement Visit:</span>
                  <span className="font-bold text-emerald-400">FREE Doorstep Visit</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10 text-brand-300 font-bold">
                  <span>Warranty Included:</span>
                  <span>5-Year Replacement Warranty</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/book-measurement"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:scale-[1.02]"
              >
                <Ruler className="w-4 h-4" /> Book Free Laser Measurement
              </Link>
              
              <a
                href={`https://wa.me/919910426084?text=Hi%20Chick%20Makers%2C%20I%20used%20the%20price%20estimator%20for%20a%20${balcony.sqft}%20sq.ft%20${encodeURIComponent(product.label)}%20(Est.%20%E2%82%B9${estimatedCost}).%20Please%20provide%20a%20confirmed%20quote.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs transition-all"
              >
                <Phone className="w-3.5 h-3.5" /> WhatsApp Direct Estimate
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
