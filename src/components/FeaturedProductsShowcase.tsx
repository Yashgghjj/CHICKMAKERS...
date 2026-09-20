import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, ShieldCheck, Sparkles, Ruler, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Featured' },
  { id: 'bamboo-chick', label: 'Balcony Chicks' },
  { id: 'bamboo-huts', label: 'Huts & Gazebos' },
  { id: 'bamboo-fencing', label: 'Jafri & Fencing' },
];

export default function FeaturedProductsShowcase() {
  const [activeTab, setActiveTab] = useState('all');

  // Filter top featured products
  const featuredList = PRODUCTS.filter((product) => {
    if (activeTab === 'all') {
      return ['bamboo-chick-natural', 'bamboo-chick-blinds', 'bamboo-hut-gazebo', 'bamboo-jafri', 'bamboo-house-cottage', 'bamboo-fencing'].includes(product.id);
    }
    return product.category === activeTab;
  });

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] border-t border-stone-200/80 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#E85D26] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin [animation-duration:8s]" />
            <span>Direct Workshop Collection</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-3">
            Handcrafted Bamboo Blinds & Structures
          </h2>
          
          <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Seasoned Assam bamboo, weather-treated finishes, and custom precision sizing directly from master craftsman Shiva.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#E85D26] text-white shadow-md shadow-orange-500/25 scale-105'
                      : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid with Rich Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredList.map((product, idx) => (
            <div
              key={product.id}
              style={{ animationDelay: `${idx * 80}ms` }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-400 ease-out hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Badge (Bestseller / Signature / Popular) */}
                {product.badge && (
                  <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-amber-500 to-[#E85D26] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 tracking-wide uppercase">
                    <Sparkles className="w-3 h-3" />
                    <span>{product.badge}</span>
                  </div>
                )}

                {/* Warranty Pill */}
                <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{product.warrantyYears} Yrs Warranty</span>
                </div>

                {/* Price Overlay Bar at bottom of photo */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-300 font-medium block">Starting at</span>
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-amber-300 drop-shadow-sm">
                      ₹{product.pricePerSqFt}
                      <span className="text-xs font-normal text-white/90"> / sq.ft</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-bold text-amber-300">
                    <Star className="w-3 h-3 fill-current text-amber-400" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>

              {/* Card Body & Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-stone-900 mb-2 group-hover:text-[#E85D26] transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="space-y-1.5 mb-5 text-[11px] sm:text-xs text-stone-600">
                    {product.features.slice(0, 2).map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-stone-100 flex items-center gap-2.5">
                  <Link
                    to={`/calculator?product=${product.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#E85D26] hover:bg-[#D94E18] text-white text-xs sm:text-sm font-bold py-2.5 px-3.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <Ruler className="w-3.5 h-3.5 text-amber-200" />
                    <span>Calculate Price</span>
                  </Link>

                  <Link
                    to={`/products?selected=${product.id}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-400 bg-stone-50/50 hover:bg-stone-100 transition-colors"
                    title="View details"
                    aria-label={`View details for ${product.name}`}
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to view full catalog */}
        <div className="mt-12 sm:mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white p-2 sm:p-2.5 pl-5 pr-2.5 rounded-2xl border border-stone-200 shadow-sm">
            <span className="text-xs sm:text-sm font-medium text-stone-700">
              Need custom measurements, wholesale pricing or bespoke architecture?
            </span>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all hover:scale-105 shadow-xs"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
