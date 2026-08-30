import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Shield, Truck, Award, Headphones, Calculator, Camera, Star, HelpCircle, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GallerySection from '../components/GallerySection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import BambooSectionDivider from '../components/BambooSectionDivider';

const CRAFT_STEPS = [
  {
    step: '01',
    title: 'Seasoned Assam Bamboo Selection',
    desc: 'We source 100% natural, mature Assam bamboo. Each stalk is sun-cured and oil-treated for termite and weather protection.',
    image: '/img/gallery/1.jpg',
  },
  {
    step: '02',
    title: 'Hand-Splitting & Smooth Sanding',
    desc: 'Our master weavers hand-split bamboo into uniform 0.5-inch slats, finely sanding edges to eliminate splinters.',
    image: '/img/gallery/2.jpg',
  },
  {
    step: '03',
    title: 'Heavy-Duty Cotton Cord Lacing',
    desc: 'Each chick blind is woven by hand using weather-resistant braided cotton & nylon cords for smooth roll-up operation.',
    image: '/img/gallery/3.jpg',
  },
  {
    step: '04',
    title: 'Custom Laser Measurement & Fitting',
    desc: 'Our technicians visit your doorstep in Noida/NCR with physical swatches, taking millimeter-accurate laser dimensions.',
    image: '/img/our-services/bamboo-chick.jpg',
  },
];

const USPS = [
  { 
    icon: Shield, 
    title: '5-Year Replacement Guarantee', 
    desc: 'Full replacement coverage on bamboo weave, pull-cord pulleys, hardware & installation.' 
  },
  { 
    icon: Truck, 
    title: 'Free Doorstep Laser Visit', 
    desc: 'Laser measurement & physical swatch display in Noida, Greater Noida, Ghaziabad & NCR.' 
  },
  { 
    icon: Award, 
    title: 'Master Weavers & Craftsmen', 
    desc: '12+ years of authentic handloom Assam bamboo weaving & heavy-duty weatherproofing.' 
  },
  { 
    icon: Headphones, 
    title: 'Direct Artisan Support', 
    desc: 'Direct phone & WhatsApp support (+91-9910426084) for custom measurements & quotes.' 
  },
];

const QUICK_LINKS = [
  { icon: Calculator, label: 'Price Calculator', desc: 'Get an instant custom quote', to: '/calculator', color: 'bg-brand-500' },
  { icon: Camera, label: 'Photo Gallery', desc: 'Authentic project gallery & photos', to: '/gallery', color: 'bg-sage-700' },
  { icon: Star, label: 'Reviews', desc: 'What our customers say', to: '/reviews', color: 'bg-brand-600' },
  { icon: HelpCircle, label: 'FAQ', desc: 'Common questions answered', to: '/faq', color: 'bg-slate-700' },
];

interface HomePageProps {
  onBookMeasurement: () => void;
}

export default function HomePage({ onBookMeasurement }: HomePageProps) {
  return (
    <PageTransition>
      {/* Hero Section with Seasoned Assam Bamboo Stalks Background */}
      <section className="relative overflow-hidden bg-stone-950 text-white py-12 md:py-16 flex items-center">
        
        {/* User Uploaded Bamboo Stalks Background Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img/bamboo-stalks-bg.png"
            alt="Authentic Seasoned Assam Bamboo Stalks"
            className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.1]"
          />
          {/* Subtle Ambient Dark Vignette Overlay for High Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-stone-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          
          {/* Handcrafted Craft Stamp */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-brand-500/25 text-brand-300 text-xs font-semibold tracking-wider uppercase mb-3 border border-brand-400/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            <span>Handloom Assam Bamboo · Sector 149 Greater Noida Workshop</span>
          </div>

          {/* Subtitle */}
          <p className="font-hero text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-stone-200 mb-2 max-w-xl">
            AUTHENTIC HANDMADE BALCONY BLINDS &amp; ARCHITECTURAL SCREENS
          </p>

          {/* Compact Modern Hero Title */}
          <h1 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 leading-tight max-w-2xl drop-shadow-md">
            Premium Bamboo Chicks, Blinds &amp; Safety Nets in Noida
          </h1>

          {/* Description Paragraph */}
          <p className="font-hero text-stone-200 text-sm sm:text-base max-w-xl leading-relaxed mb-6 font-normal drop-shadow">
            Every chick blind is individually hand-laced by master weavers in our Greater Noida workshop using seasoned Assam bamboo. Custom-measured to your balcony's exact millimetre.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/calculator"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-5 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-xl text-xs sm:text-sm border border-brand-400/40"
            >
              Calculate Price <ArrowRight className="w-4 h-4" />
            </Link>
            
            <button
              onClick={onBookMeasurement}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white px-5 py-3 rounded-full font-bold transition-all hover:scale-105 border border-white/25 text-xs sm:text-sm"
            >
              <Ruler className="w-4 h-4 text-brand-300" /> Book Free Measurement
            </button>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-5 py-3 rounded-full font-semibold transition-all hover:scale-105 border border-white/20 text-xs sm:text-sm"
            >
              <Camera className="w-4 h-4 text-stone-300" /> View Work Photos
            </Link>
          </div>

          {/* Stats Footer Line */}
          <div className="mt-8 pt-4 border-t border-white/15 flex flex-wrap gap-5 text-xs font-medium text-stone-200">
            <span>✓ Direct Factory Price from ₹58/sq.ft</span>
            <span>✓ 24-48 Hr Custom Fitting</span>
            <span>✓ Free Doorstep NCR Laser Visit</span>
            <span>✓ 100% Seasoned Assam Bamboo</span>
          </div>

        </div>
      </section>

      {/* Animated Bamboo Section Divider Line */}
      <BambooSectionDivider />

      {/* Photo Gallery Section Showcase */}
      <GallerySection />

      {/* Human Craft Process Section */}
      <section className="py-16 bg-[#FAF7F2] text-stone-900 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-600 font-bold text-xs tracking-wider uppercase">Human Craftsmanship</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mt-1 mb-2">
              How Each Chick Blind Is Handcrafted
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              No mass manufacturing. Every order is measured, hand-split, laced, and installed by experienced bamboo artisans.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CRAFT_STEPS.map((step) => (
              <div 
                key={step.step}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3.5 bg-stone-100 border border-stone-200">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[11px] font-bold text-brand-600 tracking-widest uppercase mb-1">
                    Step {step.step}
                  </div>
                  <h3 className="font-display text-sm font-bold text-stone-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Before & After Balcony Comparison Slider */}
      <BeforeAfterSlider />

      {/* Why Choose Chick Maker (Artisan Workshop Background) */}
      <section className="relative overflow-hidden bg-stone-950 text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/img/why-choose-bg.png"
            alt="Shiva Chick Maker Artisan Bamboo Craftsmanship"
            className="w-full h-full object-cover object-center brightness-105 contrast-110 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/65" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/70 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-brand-400/40 backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" /> Artisan Craftsmanship &amp; Direct Factory Value
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight drop-shadow-md">
              Why Choose Chick Maker?
            </h2>
            <p className="text-stone-100 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium drop-shadow">
              Your trusted destination for premium handcrafted Assam bamboo chicks, fencing, blinds, and Garware safety netting in Noida.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USPS.map(({ icon: Icon, title, desc }) => (
              <div 
                key={title} 
                className="stagger-card group bg-black/80 hover:bg-black/90 backdrop-blur-xl p-6 rounded-2xl border border-white/25 hover:border-brand-400 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/30 border border-brand-400/50 flex items-center justify-center mb-4 text-brand-300 group-hover:scale-110 transition-all shadow-md">
                  <Icon className="w-6 h-6 text-amber-200" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-stone-200 leading-relaxed font-normal">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-5 bg-black/75 backdrop-blur-xl px-6 py-3.5 rounded-xl border border-white/20 text-xs text-stone-100 shadow-xl font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Workshop: Sector 149, Greater Noida
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span>100% Assam Seasoned Bamboo</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span>Zero Middlemen · Direct Artisan Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-2">Explore Our Services &amp; Tools</h2>
            <p className="text-stone-600 text-sm">Everything you need, just a click away</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {QUICK_LINKS.map(({ icon: Icon, label, desc, to, color }) => (
              <Link
                key={to}
                to={to}
                className="stagger-card card-interactive group bg-white rounded-2xl p-5 border border-stone-200 hover:border-brand-500 shadow-sm"
              >
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-stone-900 text-sm mb-1 group-hover:text-brand-600 transition-colors">{label}</h3>
                <p className="text-xs text-stone-500">{desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 mt-2.5 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>

          {/* Products CTA Banner */}
          <Link
            to="/products"
            className="mt-8 block card-interactive bg-gradient-to-r from-stone-950 via-slate-900 to-amber-950 text-white rounded-2xl p-6 md:p-8 border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-1">Browse All Products &amp; Prices</h3>
                <p className="text-stone-300 text-xs sm:text-sm">Complete catalog of bamboo chicks, blinds, safety nets &amp; fencing</p>
              </div>
              <span className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-5 py-3 rounded-xl font-bold transition-all shrink-0 text-xs sm:text-sm">
                View Catalog <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
