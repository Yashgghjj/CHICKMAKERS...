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
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-stone-100/60 p-1 rounded-full border border-stone-200/60 backdrop-blur-xs">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs lg:text-sm font-medium px-2.5 lg:px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-[#E85D26] font-semibold shadow-xs'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-white/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Book Visit: High-conversion glowing pill button (No text wrap) */}
            <Link
              to="/book-measurement"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs lg:text-sm font-bold text-white bg-gradient-to-r from-[#E85D26] to-[#D94E18] hover:from-[#D94E18] hover:to-[#C43E0D] px-3.5 py-2 rounded-full shadow-sm hover:shadow-md hover:shadow-orange-600/25 transition-all duration-200 active:scale-95 whitespace-nowrap border border-orange-400/30 group"
            >
              <Ruler className="w-3.5 h-3.5 text-orange-200 group-hover:rotate-12 transition-transform duration-200" />
              <span>Book Visit</span>
            </Link>

            {/* Track Order: Refined tactile pill */}
            <Link
              to="/track"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs lg:text-sm font-medium text-stone-700 hover:text-stone-900 bg-stone-100/80 hover:bg-stone-200/80 px-3 py-2 rounded-full border border-stone-200/70 transition-all duration-200 whitespace-nowrap active:scale-95"
            >
              <Package className="w-3.5 h-3.5 text-stone-500" />
              <span>Track</span>
            </Link>

            {/* Subtle Divider */}
            <div className="hidden sm:block h-6 w-px bg-stone-200 mx-0.5" />

            {/* Cart Button: Refined circular icon button with badge */}
            <button
              onClick={onCartOpen}
              className="relative p-2 sm:p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 transition-all duration-200 hover:scale-105 active:scale-95 border border-stone-200/60"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E85D26] text-white text-[10px] font-black min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-xs animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
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
