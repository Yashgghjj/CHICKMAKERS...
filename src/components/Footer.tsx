import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-stone-300 py-12 border-t border-sage-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            {/* Animated Logo in Footer */}
            <AnimatedLogo size="md" showSubtitle={true} variant="dark" />
            <p className="text-xs leading-relaxed text-stone-300 pt-2">
              Handcrafted Assam bamboo chick blinds, monsoon screens, and balcony protection since 2018.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Products</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/products" className="hover:text-brand-400 transition-colors">Bamboo Chick Blinds</Link></li>
              <li><Link to="/products" className="hover:text-brand-400 transition-colors">Monsoon PVC Screens</Link></li>
              <li><Link to="/products" className="hover:text-brand-400 transition-colors">Pigeon Safety Nets</Link></li>
              <li><Link to="/products" className="hover:text-brand-400 transition-colors">Wooden Venetian</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/faq" className="hover:text-brand-400 transition-colors">FAQ</Link></li>
              <li><Link to="/calculator" className="hover:text-brand-400 transition-colors">Price Calculator</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-400 transition-colors">Gallery</Link></li>
              <li><Link to="/reviews" className="hover:text-brand-400 transition-colors">Reviews</Link></li>
              <li><Link to="/track" className="hover:text-brand-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Contact</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand-400" /> <a href="tel:+919910426084" className="hover:text-white font-bold">+91 99104 26084</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-400" /> info@shivachickmaker.in</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-400" /> LG-04, Asarfi Plaza, Sector 149, Greater Noida, UP 201310</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sage-800 pt-6 text-center text-xs text-stone-500">
          © 2026 ChickMakers™ Handcrafted Blinds &amp; Balcony Systems. All Rights Reserved. GSTIN: 07AABCC1234D1Z5
        </div>
      </div>
    </footer>
  );
}
