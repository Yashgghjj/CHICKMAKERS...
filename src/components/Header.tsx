import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Ruler, Menu, X, Phone } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
}

const NAV_LINKS = [
  { label: 'Products', to: '/products' },
  { label: 'Calculator', to: '/calculator' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'FAQ', to: '/faq' },
];

export default function Header({ cartCount, onCartOpen }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-stone-200/60 shadow-sm">
      {/* Top bar */}
      <div className="bg-sage-900 text-white text-xs py-1.5 text-center hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 font-medium text-stone-200">
            Handcrafted Assam Bamboo &amp; Architectural Blinds
          </span>
          <span className="inline-flex items-center gap-1 font-medium">
            <Phone className="w-3 h-3 text-brand-400" /> Direct: <a href="tel:+919910426084" className="hover:text-brand-300 underline">+91 99104 26084</a>
          </span>
          <span className="text-stone-300">Free Laser Measurement in Noida &amp; Delhi NCR</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Animated Logo */}
          <AnimatedLogo size="md" showSubtitle={true} variant="light" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'text-brand-600 bg-brand-50 font-semibold'
                      : 'text-stone-600 hover:text-brand-600 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/book-measurement"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 px-3 py-2 rounded-lg hover:bg-brand-50 transition-all"
            >
              <Ruler className="w-4 h-4" /> Book Visit
            </Link>

            <Link
              to="/track"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-sage-800 px-3 py-2 rounded-lg hover:bg-stone-50 transition-all"
            >
              <Package className="w-4 h-4" /> Track
            </Link>

            <button
              onClick={onCartOpen}
              className="relative p-2 rounded-lg hover:bg-stone-100 transition-all hover:scale-110"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-stone-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-stone-700 hover:text-brand-600 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <hr className="border-stone-200 my-2" />
            <Link
              to="/book-measurement"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-brand-600 px-3 py-2.5 rounded-lg hover:bg-brand-50"
            >
              <Ruler className="w-4 h-4" /> Book Free Measurement
            </Link>
            <Link
              to="/track"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-stone-600 px-3 py-2.5 rounded-lg hover:bg-stone-50"
            >
              <Package className="w-4 h-4" /> Track Your Order
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
