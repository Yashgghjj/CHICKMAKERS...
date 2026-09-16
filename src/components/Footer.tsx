import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Lock } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import BambooWorkerAnimation from './BambooWorkerAnimation';

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-stone-300 py-10 border-t border-sage-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-8">
          
          {/* Brand & Craft - Spans 5 columns on desktop and full width on tablet to prevent any overlap */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col sm:flex-row items-start gap-4">
            <div className="shrink-0 bg-sage-950/40 p-2 rounded-2xl border border-sage-800/80 shadow-inner">
              <BambooWorkerAnimation size="sm" />
            </div>
            <div className="space-y-2 flex-1 min-w-0">
              <AnimatedLogo size="md" showSubtitle={true} subtitle="By Shiva · Huts & Chicks" variant="dark" showIcon={false} />
              <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
                Handcrafted bamboo chicks, blinds, huts and steel fabrication across Greater Noida &amp; Delhi NCR.
              </p>
            </div>
          </div>

          {/* Core Services */}
          <div className="md:col-span-1 lg:col-span-2">
            <h4 className="font-semibold text-white mb-3 text-sm">Services</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Bamboo Huts &amp; Gazebos</Link></li>
              <li><Link to="/products" className="hover:text-brand-400 transition-colors">Bamboo Chicks &amp; Blinds</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Cottages &amp; Farmhouses</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Roof Structure Fabrication</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1 lg:col-span-2">
            <h4 className="font-semibold text-white mb-3 text-sm">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/calculator" className="hover:text-brand-400 transition-colors">Price Calculator</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-400 transition-colors">Project Gallery</Link></li>
              <li><Link to="/reviews" className="hover:text-brand-400 transition-colors">Customer Reviews</Link></li>
              <li><Link to="/track" className="hover:text-brand-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact & Workshop */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="font-semibold text-white mb-3 text-sm">Contact &amp; Workshop</h4>
            <ul className="text-sm space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+918826054537" className="hover:text-white font-bold text-amber-300">+91 88260 54537</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span className="text-xs">info@shivachickmaker.in</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-400" />
                <span className="text-xs">Sector 149, Greater Noida, UP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-stone-400">
          <div>
            © 2026 Bamboo Chick Maker. Handcrafted Bamboo Architecture.
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-400 font-medium transition"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
