import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronRight, ShoppingCart } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import type { Product } from '../types';
import PageTransition from '../components/PageTransition';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  onAddStandardProduct: (product: Product) => void;
}

export default function ProductsPage({ onSelectProduct, onAddStandardProduct }: ProductsPageProps) {
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();
  const filtered =
    category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-sage-900 via-sage-800 to-brand-900 text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Product Catalog</h1>
          <p className="text-stone-300 max-w-xl">
            8 curated blind & screen solutions for every space — from bamboo chick blinds to motorized rollers.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  category === c.id
                    ? 'bg-brand-600 text-white shadow-md scale-105'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:scale-105'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="stagger-card card-interactive group bg-white rounded-2xl border border-stone-200 overflow-hidden cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sage-900 mb-1.5 line-clamp-2 group-hover:text-brand-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                    <span className="text-stone-400 text-xs ml-1">4.9</span>
                  </div>
                  <p className="text-brand-600 font-bold text-xl">₹{product.pricePerSqFt}<span className="text-sm font-normal text-stone-400">/sq.ft</span></p>
                  <p className="text-xs text-stone-400 mt-1">{product.warrantyYears}-Year Warranty · {product.estimatedCraftDays}-Day Craft</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/calculator?product=${product.id}`);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 text-sm text-brand-600 font-medium border border-brand-200 rounded-xl py-2 hover:bg-brand-50 transition-colors"
                    >
                      Quick Quote <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddStandardProduct(product);
                      }}
                      className="p-2 rounded-xl border border-stone-200 hover:bg-brand-50 hover:border-brand-200 transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-4 h-4 text-stone-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
