import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Lock } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import BambooWorkerAnimation from './BambooWorkerAnimation';

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-stone-300 py-12 border-t border-sage-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8 mb-8">
          
          {/* Animated Working Guy Building Bamboo Hut (ON THE LEFT) + Bamboo Chick Maker */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            {/* Working Guy Animation directly to the left */}
            <div className="shrink-0">
              <BambooWorkerAnimation size="md" />
            </div>

            {/* Bamboo Chick Maker branding to the right */}
            <div className="space-y-3 flex-1 min-w-0">
              <AnimatedLogo size="md" showSubtitle={true} variant="dark" showIcon={false} />
              <p className="text-xs leading-relaxed text-stone-300 pt-1">
                Deals in all kinds of Bamboo Hut, Bamboo House, Restaurant Gazibo, Cottage, Farm House, Chatri Stall, Bamboo Jafri, Welding Roof Structure, Pigeon Net, Artificial Grass &amp; Channel Blinds.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-medium border border-brand-500/30">
                  Assam Bamboo Craft
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
                  By Shiva · Gr. Noida
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Services &amp; Specialization</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Bamboo Huts &amp; Gazebos</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Bamboo Houses &amp; Cottages</Link></li>
              <li><Link to="/products" className="hover:text-brand-400 transition-colors">Bamboo Chick &amp; Jafri</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Welding Roof Structure</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Pigeon Safety Netting</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Artificial Grass &amp; Channel Blinds</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><Link to="/faq" className="hover:text-brand-400 transition-colors">FAQ</Link></li>
              <li><Link to="/calculator" className="hover:text-brand-400 transition-colors">Price Calculator</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-400 transition-colors">Project Gallery</Link></li>
              <li><Link to="/reviews" className="hover:text-brand-400 transition-colors">Customer Reviews</Link></li>
              <li><Link to="/track" className="hover:text-brand-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Contact &amp; Workshop</h4>
            <ul className="text-sm space-y-2">
              <li className="text-amber-400 font-bold text-xs uppercase tracking-wider">Proprietor: Shiva</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand-400" /> <a href="tel:+918826054537" className="hover:text-white font-bold text-amber-300">+91 88260 54537</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-400" /> info@shivachickmaker.in</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-400" /> <span>LG-04, Asarfi Plaza, Sector 149, Greater Noida, UP 201310</span></li>
              <li className="text-xs text-stone-400 pt-1">Serving Greater Noida, Noida, Ghaziabad, Delhi NCR &amp; Outstation Pan-India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sage-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-stone-400">
          <div>
            © 2026 Bamboo Chick Maker &amp; Shiva Fabrication. Handcrafted Bamboo Architecture &amp; Metal Structures. All Rights Reserved.
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-400 font-medium transition"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Artisan Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
