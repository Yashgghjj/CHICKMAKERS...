import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Ruler, Menu, X, Phone, ShieldCheck, User } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onOpenCustomerAuth?: () => void;
}

const NAV_LINKS = [
  { label: 'Products', to: '/products' },
  { label: 'Calculator', to: '/calculator' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'FAQ', to: '/faq' },
];

export default function Header({ cartCount, onCartOpen, onOpenCustomerAuth }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, role } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-stone-200/60 shadow-sm">
      {/* Top bar */}
      <div className="bg-sage-900 text-white text-xs py-1.5 text-center hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 font-medium text-stone-200">
            Bamboo Chick Maker &amp; Shiva Fabrication · Huts, Blinds, Pigeon Nets &amp; Roofing
          </span>
          <span className="inline-flex items-center gap-1 font-medium">
            <Phone className="w-3 h-3 text-brand-400" /> Shiva: <a href="tel:+918826054537" className="hover:text-brand-300 underline font-bold text-amber-300">+91 88260 54537</a>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-stone-300">Greater Noida · Noida · Delhi NCR</span>
            <span className="text-stone-500">|</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-100 font-semibold transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] sm:h-20 gap-2 sm:gap-4">
          
          {/* Animated Logo with safe shrink-0 */}
          <div className="shrink-0 flex items-center">
            <AnimatedLogo size="md" showSubtitle={true} variant="light" />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-stone-100/70 p-1 rounded-full border border-stone-200/70 backdrop-blur-xs shadow-2xs">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[11px] lg:text-xs xl:text-sm font-medium px-2.5 lg:px-3 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-[#E85D26] font-semibold shadow-xs'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-white/90'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Account / Sign In Pill */}
            {user ? (
              role === 'admin' ? (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200/90 px-3 py-2 rounded-full border border-amber-300 transition-all duration-200 whitespace-nowrap active:scale-95 shadow-2xs group"
                  title="Artisan Admin Portal"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline font-bold">Admin Panel</span>
                </Link>
              ) : (
                <Link
                  to="/account"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200/90 px-3 py-2 rounded-full border border-stone-200/80 transition-all duration-200 whitespace-nowrap active:scale-95 shadow-2xs group"
                  title={`Signed in as ${user.name}`}
                >
                  <div className="w-4.5 h-4.5 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-medium max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                </Link>
              )
            ) : (
              <button
                type="button"
                onClick={onOpenCustomerAuth}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100/80 hover:bg-stone-200/80 px-3 py-2 rounded-full border border-stone-200/70 transition-all duration-200 whitespace-nowrap active:scale-95 shadow-2xs"
                title="Sign In or Register"
              >
                <User className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Book Visit: High-conversion glowing pill button */}
            <Link
              to="/book-measurement"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs lg:text-sm font-bold text-white bg-gradient-to-r from-[#E85D26] to-[#D94E18] hover:from-[#D94E18] hover:to-[#C43E0D] px-3.5 py-2 rounded-full shadow-sm hover:shadow-md hover:shadow-orange-600/20 transition-all duration-200 active:scale-95 whitespace-nowrap border border-orange-400/30 group"
            >
              <Ruler className="w-3.5 h-3.5 text-orange-200 group-hover:rotate-12 transition-transform duration-200" />
              <span>Book Visit</span>
            </Link>

            {/* Track Order: Refined tactile pill */}
            <Link
              to="/track"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs lg:text-sm font-medium text-stone-700 hover:text-stone-900 bg-stone-100/80 hover:bg-stone-200/80 px-3 py-2 rounded-full border border-stone-200/70 transition-all duration-200 whitespace-nowrap active:scale-95"
            >
              <Package className="w-3.5 h-3.5 text-stone-500" />
              <span>Track</span>
            </Link>

            {/* Admin Portal Button */}
            <Link
              to="/admin"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100/80 px-3 py-2 rounded-full border border-amber-200/80 transition-all duration-200 whitespace-nowrap active:scale-95 shadow-2xs"
              title="Artisan Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin</span>
            </Link>

            {/* Subtle Divider */}
            <div className="hidden sm:block h-5 w-px bg-stone-200 mx-0.5" />

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
            {/* Account on Mobile */}
            {user ? (
              role === 'admin' ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold text-amber-900 bg-amber-100/90 px-3 py-2.5 rounded-xl border border-amber-300 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Admin Panel ({user.name.split(' ')[0]})</span>
                  </div>
                  <span className="text-xs font-bold text-amber-800">Dashboard &rarr;</span>
                </Link>
              ) : (
                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold text-stone-800 bg-stone-50 px-3 py-2.5 rounded-xl border border-stone-200 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <span className="text-xs font-bold text-brand-600">My Orders &rarr;</span>
                </Link>
              )
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCustomerAuth?.();
                }}
                className="flex items-center gap-2 text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-2.5 rounded-xl border border-brand-200 mb-1 text-left w-full"
              >
                <User className="w-4 h-4 text-brand-600" /> Sign In / Create Account
              </button>
            )}

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
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between text-sm font-semibold text-amber-900 bg-amber-100/90 px-3 py-2.5 rounded-lg hover:bg-amber-200 border border-amber-300"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Artisan Admin Portal</span>
              </div>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-medium">Dashboard</span>
            </Link>
            <a
              href="tel:+918826054537"
              className="flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-2.5 rounded-lg hover:bg-emerald-100"
            >
              <Phone className="w-4 h-4 text-emerald-600" /> Call Shiva: +91 88260 54537
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
