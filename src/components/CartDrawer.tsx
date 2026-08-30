import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, items, onClose, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) {
  const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0);

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-display text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Cart ({items.length})
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-center text-stone-400 py-12">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-stone-50 rounded-xl">
                  <img src={item.product.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                    <p className="text-xs text-stone-400">{item.dimensionsSummary}</p>
                    <p className="text-brand-600 font-semibold mt-1">₹{item.totalPrice.toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded bg-white border"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded bg-white border"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => onRemove(item.id)} className="ml-auto p-1 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-brand-600 text-white py-3 rounded-xl font-semibold hover:bg-brand-700"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
