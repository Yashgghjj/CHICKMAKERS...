import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calculator, ShoppingCart, Zap, Ruler } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { api } from '../services/api';
import type { QuoteResult, CartItem, Mechanism } from '../types';
import PageTransition from '../components/PageTransition';

interface CalculatorPageProps {
  onAddToCart: (item: CartItem) => void;
  onBuyNow: (item: CartItem) => void;
}

export default function CalculatorPage({ onAddToCart, onBuyNow }: CalculatorPageProps) {
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('product');

  const [productId, setProductId] = useState(preselectedId || 'bamboo-chick-natural');
  const [widthFeet, setWidthFeet] = useState(10);
  const [widthInches, setWidthInches] = useState(0);
  const [heightFeet, setHeightFeet] = useState(6);
  const [heightInches, setHeightInches] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mechanism, setMechanism] = useState<Mechanism>('brass-pulley');
  const [waterproofCoating, setWaterproofCoating] = useState(true);
  const [tieDownStraps, setTieDownStraps] = useState(true);
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedId) setProductId(preselectedId);
  }, [preselectedId]);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.calculateQuote({
        productId,
        widthFeet,
        widthInches,
        heightFeet,
        heightInches,
        quantity,
        mechanism,
        waterproofCoating,
        tieDownStraps,
        includeInstallation,
        couponCode: couponCode || undefined,
      });
      setQuote(res.quote);
    } catch {
      setQuote(null);
    } finally {
      setLoading(false);
    }
  }, [productId, widthFeet, widthInches, heightFeet, heightInches, quantity, mechanism, waterproofCoating, tieDownStraps, includeInstallation, couponCode]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const product = PRODUCTS.find((p) => p.id === productId)!;

  function buildCartItem(): CartItem {
    const dims = `${widthFeet}'${widthInches}" × ${heightFeet}'${heightInches}" (${quote?.billingSqFt || 0} sq.ft)`;
    return {
      id: `item-${Date.now()}`,
      type: 'custom-blind',
      product,
      config: {
        widthFeet,
        widthInches,
        heightFeet,
        heightInches,
        mechanism,
        waterproofCoating,
        tieDownStraps,
        includeInstallation,
        couponCode: couponCode || undefined,
      },
      quantity,
      unitPrice: quote?.unitPrice || 0,
      totalPrice: quote?.subtotal || 0,
      dimensionsSummary: dims,
    };
  }

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-sage-900 via-sage-800 to-brand-900 text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
            <Calculator className="w-9 h-9 text-brand-300" /> Instant Price Calculator
          </h1>
          <p className="text-stone-300 max-w-xl">
            Enter your exact dimensions for a precision quote. Real-time pricing with GST included.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xl p-6 md:p-8">
            {/* Product & Quantity */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Product</label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{p.pricePerSqFt}/sq.ft
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                />
              </div>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Width (ft)', value: widthFeet, set: setWidthFeet },
                { label: 'Width (in)', value: widthInches, set: setWidthInches, max: 11 },
                { label: 'Height (ft)', value: heightFeet, set: setHeightFeet },
                { label: 'Height (in)', value: heightInches, set: setHeightInches, max: 11 },
              ].map(({ label, value, set, max }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
                  <input
                    type="number"
                    min={0}
                    max={max ?? 50}
                    value={value}
                    onChange={(e) => set(Number(e.target.value))}
                    className="w-full border border-stone-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-brand-500 outline-none transition-shadow"
                  />
                </div>
              ))}
            </div>

            {/* Mechanism & Coupon */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Pull Mechanism</label>
                <select
                  value={mechanism}
                  onChange={(e) => setMechanism(e.target.value as Mechanism)}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 outline-none"
                >
                  <option value="standard">Standard Rope (+₹0)</option>
                  <option value="brass-pulley">Brass Pulley (+₹280)</option>
                  <option value="nylon-pulley">Heavy Duty Nylon Pulley (+₹150)</option>
                  <option value="somfy-motor">Somfy Motor (+₹2800)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Promo Code</label>
                <input
                  type="text"
                  placeholder="WELCOME10, CHICK15, MONSOON20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 outline-none uppercase"
                />
              </div>
            </div>

            {/* Add-ons */}
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { label: 'Waterproof Coating (+₹12/sq.ft)', checked: waterproofCoating, set: setWaterproofCoating },
                { label: 'Wind Tie-Down Straps (+₹160)', checked: tieDownStraps, set: setTieDownStraps },
                { label: 'Professional Fitting (+₹8/sq.ft)', checked: includeInstallation, set: setIncludeInstallation },
              ].map(({ label, checked, set }) => (
                <label key={label} className="flex items-center gap-2 text-sm cursor-pointer hover:text-brand-600 transition-colors">
                  <input type="checkbox" checked={checked} onChange={(e) => set(e.target.checked)} className="rounded accent-brand-600" />
                  {label}
                </label>
              ))}
            </div>

            {/* Quote result */}
            {quote && (
              <div className="bg-sage-50 rounded-xl p-5 mb-6 animate-scale-in">
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <span className="text-stone-500">Exact Area</span>
                  <span className="text-right font-medium">{quote.exactSqFt} sq.ft</span>
                  <span className="text-stone-500">Billing Area</span>
                  <span className="text-right font-medium">{quote.billingSqFt} sq.ft</span>
                  <span className="text-stone-500">Unit Price</span>
                  <span className="text-right font-medium">₹{quote.unitPrice.toLocaleString('en-IN')}</span>
                  {quote.discount > 0 && (
                    <>
                      <span className="text-green-600">Discount ({quote.appliedCoupon})</span>
                      <span className="text-right text-green-600">-₹{quote.discount.toLocaleString('en-IN')}</span>
                    </>
                  )}
                  <span className="text-stone-500">GST (5%)</span>
                  <span className="text-right font-medium">₹{quote.tax.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-sage-200 pt-3 flex justify-between items-center">
                  <span className="font-semibold text-sage-900">Total</span>
                  <span className="text-2xl font-bold text-brand-600">
                    ₹{quote.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                {loading && <p className="text-xs text-stone-400 mt-2">Updating...</p>}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onAddToCart(buildCartItem())}
                disabled={!quote}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700 disabled:opacity-50 transition-all hover:scale-[1.02]"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => onBuyNow(buildCartItem())}
                disabled={!quote}
                className="flex-1 flex items-center justify-center gap-2 bg-sage-700 text-white py-3 rounded-xl font-semibold hover:bg-sage-900 disabled:opacity-50 transition-all hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4" /> Buy Now
              </button>
              <Link
                to="/book-measurement"
                className="flex items-center justify-center gap-2 border border-stone-300 px-6 py-3 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <Ruler className="w-4 h-4" /> Book Measurement
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
