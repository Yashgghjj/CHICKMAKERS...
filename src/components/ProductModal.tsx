import { X, Star, ShoppingCart, Calculator } from 'lucide-react';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onCustomize: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart, onCustomize }: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white rounded-full shadow">
            <X className="w-5 h-5" />
          </button>
          {product.badge && (
            <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-6">
          <h2 className="font-display text-2xl font-bold text-sage-900 mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-stone-400 text-sm">4.9 (128 reviews)</span>
          </div>
          <p className="text-stone-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-brand-600 mb-4">
            ₹{product.pricePerSqFt}/sq.ft
            <span className="text-sm font-normal text-stone-400 ml-2">Min {product.minSqFt} sq.ft</span>
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold text-sm text-sage-900 mb-2">Features</h4>
              <ul className="text-sm text-stone-500 space-y-1">
                {product.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-sage-900 mb-2">Materials</h4>
              <ul className="text-sm text-stone-500 space-y-1">
                {product.materials.map((m) => (
                  <li key={m}>• {m}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onCustomize(product)}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700"
            >
              <Calculator className="w-4 h-4" /> Customize & Quote
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center justify-center gap-2 border border-stone-300 px-4 py-3 rounded-xl hover:bg-stone-50"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
