import { useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import type { Product } from '../types';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onQuickCalculate: (product: Product) => void;
}

export default function ProductCatalog({ onSelectProduct, onQuickCalculate }: ProductCatalogProps) {
  const [category, setCategory] = useState('all');
  const filtered =
    category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <section id="products" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-sage-900 mb-3">Product Catalog</h2>
          <p className="text-stone-500">8 curated blind & screen solutions for every space</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === c.id
                  ? 'bg-brand-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectProduct(product)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sage-900 mb-1 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                  <span className="text-stone-400 text-xs ml-1">4.9</span>
                </div>
                <p className="text-brand-600 font-bold text-lg">₹{product.pricePerSqFt}/sq.ft</p>
                <p className="text-xs text-stone-400 mt-1">{product.warrantyYears}-Year Warranty</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickCalculate(product);
                  }}
                  className="mt-3 w-full flex items-center justify-center gap-1 text-sm text-brand-600 font-medium hover:underline"
                >
                  Quick Quote <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
