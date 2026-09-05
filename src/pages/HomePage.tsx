import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Shield, Truck, Award, Headphones, Calculator, Camera, Star, HelpCircle, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GallerySection from '../components/GallerySection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import BambooSectionDivider from '../components/BambooSectionDivider';

const CRAFT_STEPS = [
  {
    step: '01',
    title: 'Assam Bamboo Selection',
    desc: '100% natural, mature Assam bamboo stalks sun-cured and oil-treated against termites.',
    image: '/img/gallery/1.jpg',
  },
  {
    step: '02',
    title: 'Hand-Splitting & Sanding',
    desc: 'Hand-split into uniform 0.5-inch slats and finely sanded to eliminate splinters.',
    image: '/img/gallery/2.jpg',
  },
  {
    step: '03',
    title: 'Braided Cord Lacing',
    desc: 'Laced by master weavers using weather-resistant braided cords for smooth roll-up.',
    image: '/img/gallery/3.jpg',
  },
  {
    step: '04',
    title: 'Custom Laser Fitting',
    desc: 'Millimeter-accurate laser measurement & same-day installation across Noida & NCR.',
    image: '/img/our-services/bamboo-chick.jpg',
  },
];

const USPS = [
  { 
    icon: Shield, 
    title: '5-Year Guarantee', 
    desc: 'Full replacement warranty on weave, cords, pulleys, and installation.' 
  },
  { 
    icon: Truck, 
    title: 'Free Doorstep Laser Visit', 
    desc: 'Free laser measurement with physical swatches in Noida & NCR.' 
  },
  { 
    icon: Award, 
    title: 'Master Craftsmen', 
    desc: 'Authentic Assam handloom weaving with weather-proof treatment.' 
  },
  { 
    icon: Headphones, 
    title: 'Direct Artisan Support', 
    desc: 'Direct phone & WhatsApp (+91-9910426084) for custom measurements.' 
  },
];

const QUICK_LINKS = [
  { 
    icon: Calculator, 
    label: 'Price Calculator', 
    desc: 'Instant custom quote', 
    to: '/calculator', 
    bgGradient: 'from-[#E85D26] to-[#D94E18]' 
  },
  { 
    icon: Camera, 
    label: 'Photo Gallery', 
    desc: '50+ real projects', 
    to: '/gallery', 
    bgGradient: 'from-emerald-600 to-teal-700' 
  },
  { 
    icon: Star, 
    label: 'Reviews', 
    desc: '4.9★ customer ratings', 
    to: '/reviews', 
    bgGradient: 'from-amber-500 to-amber-600' 
  },
  { 
    icon: HelpCircle, 
    label: 'FAQ', 
    desc: 'Questions answered', 
    to: '/faq', 
    bgGradient: 'from-slate-700 to-slate-800' 
  },
];

interface HomePageProps {
  onBookMeasurement: () => void;
}

export default function HomePage({ onBookMeasurement }: HomePageProps) {
  return (
    <PageTransition>
      {/* Hero Section with Seasoned Assam Bamboo Stalks Background */}
      <section className="relative overflow-hidden bg-stone-950 text-white py-10 sm:py-14 md:py-20 flex items-center">
        
        {/* User Uploaded Bamboo Stalks Background Photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/img/bamboo-stalks-bg.png"
            alt="Authentic Seasoned Assam Bamboo Stalks"
            className="w-full h-full object-cover object-center brightness-[0.8] contrast-[1.1]"
          />
          {/* Ambient Dark Vignette Overlay for High Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          
          {/* Artisan Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/25 text-brand-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-2 sm:mb-3 border border-brand-400/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            <span>Assam Bamboo · Noida &amp; NCR</span>
          </div>

          {/* Short, Punchy Headline */}
          <h1 className="font-hero text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2 sm:mb-3 leading-tight max-w-2xl drop-shadow-md">
            Bamboo Chicks &amp; Balcony Blinds
          </h1>

          {/* Single Short Punchy Line */}
          <p className="font-hero text-stone-200 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed mb-5 font-normal drop-shadow">
            Custom-made to your balcony's exact size. Direct artisan pricing.
          </p>

          {/* Action Buttons: 2 Direct High-Value CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              to="/calculator"
              className="inline-flex items-center justify-center gap-2 bg-[#E85D26] hover:bg-[#D94E18] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg text-xs sm:text-sm border border-brand-400/30"
            >
              Calculate Price <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            
            <button
              onClick={onBookMeasurement}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold transition-all hover:scale-105 border border-white/25 text-xs sm:text-sm"
            >
              <Ruler className="w-3.5 h-3.5 text-brand-300" /> Book Free Visit
            </button>
          </div>

          {/* Crisp, Concise Features Row */}
          <div className="mt-5 pt-3 border-t border-white/15 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs font-medium text-stone-200">
            <span>✓ From ₹58/sq.ft</span>
            <span>✓ Free Laser Visit</span>
            <span>✓ 24-48h Fitting</span>
            <span>✓ 5-Yr Guarantee</span>
          </div>

        </div>
      </section>

      {/* Animated Bamboo Section Divider Line */}
      <BambooSectionDivider />

      {/* OUR SERVICES Photo Gallery Carousel (Matching User's Uploaded Screenshot Exactly) */}
      <GallerySection />

      {/* Human Craft Process Section (Cleaned for Mobile) */}
      <section className="py-10 sm:py-16 bg-[#FAF7F2] text-stone-900 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[#E85D26] font-bold text-xs tracking-wider uppercase">Traditional Craftsmanship</span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 mt-1 mb-2">
              How Each Chick Blind Is Handcrafted
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Hand-split, laced, and installed by master bamboo artisans.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {CRAFT_STEPS.map((step) => (
              <div 
                key={step.step}
                className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-2.5 sm:mb-3.5 bg-stone-100 border border-stone-200">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-[#E85D26] tracking-widest uppercase mb-0.5 sm:mb-1">
                    Step {step.step}
                  </div>
                  <h3 className="font-display text-xs sm:text-sm font-bold text-stone-900 mb-1 line-clamp-1">
                    {step.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
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
      <section className="relative overflow-hidden bg-stone-950 text-white py-12 sm:py-20 md:py-24">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/img/why-choose-bg.png"
            alt="Shiva Chick Maker Artisan Bamboo Craftsmanship"
            className="w-full h-full object-cover object-center brightness-105 contrast-110 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-brand-400/40 backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" /> Direct Workshop Value
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-md">
              Why Choose Chick Maker?
            </h2>
            <p className="text-stone-200 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
              Premium handcrafted Assam bamboo chicks, fencing, blinds, and safety nets across Noida &amp; NCR.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {USPS.map(({ icon: Icon, title, desc }) => (
              <div 
                key={title} 
                className="bg-black/80 hover:bg-black/90 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/20 hover:border-brand-400 shadow-lg transition-all duration-300"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-brand-500/30 border border-brand-400/50 flex items-center justify-center mb-2.5 sm:mb-3.5 text-brand-300 shadow-md">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
                </div>
                <h3 className="font-display text-xs sm:text-base font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                  {title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed line-clamp-3">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-black/75 backdrop-blur-xl px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-white/20 text-xs text-stone-200 shadow-xl font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Workshop: Sector 149, Greater Noida
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span>100% Assam Bamboo</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span>Direct Artisan Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Animated Quick Tools & Explore Hub */}
      <section className="relative overflow-hidden py-6 sm:py-8 bg-gradient-to-b from-[#FAF5EE] via-[#FDF9F3] to-[#F5ECE1] border-t border-stone-200/80 select-none">
        
        {/* Animated Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Ambient Glowing Mesh Orbs */}
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl animate-ambient-1" />
          <div className="absolute -bottom-12 -right-10 w-72 h-72 rounded-full bg-[#E85D26]/15 blur-3xl animate-ambient-2" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-44 rounded-full bg-emerald-500/10 blur-3xl animate-ambient-3" />

          {/* Delicate Animated Floating Bamboo Leaves */}
          <svg
            className="absolute top-3 left-8 w-10 h-10 text-emerald-800/15 animate-leaf-1"
            viewBox="0 0 40 40"
            fill="currentColor"
          >
            <path d="M5 25C15 24 25 15 35 5C25 15 24 25 5 25Z" />
            <path d="M2 30C12 28 20 18 28 10C20 18 18 28 2 30Z" opacity="0.6" />
          </svg>
          <svg
            className="absolute bottom-3 right-12 w-12 h-12 text-amber-900/15 animate-leaf-2"
            viewBox="0 0 40 40"
            fill="currentColor"
          >
            <path d="M35 15C25 16 15 25 5 35C15 25 16 15 35 15Z" />
            <path d="M38 10C28 12 20 22 12 30C20 22 22 12 38 10Z" opacity="0.6" />
          </svg>
          <svg
            className="absolute top-1/2 right-1/4 w-8 h-8 text-stone-700/10 animate-leaf-1"
            viewBox="0 0 40 40"
            fill="currentColor"
          >
            <path d="M5 25C15 24 25 15 35 5C25 15 24 25 5 25Z" />
          </svg>

          {/* Micro Geometric Dot Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
              backgroundSize: '16px 16px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Ultra-Compact Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-[#E85D26] uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3 h-3 text-[#E85D26] animate-pulse" />
                <span>Quick Tools &amp; Direct Access</span>
              </div>
              <h2 className="font-display text-lg sm:text-2xl font-bold text-stone-900 tracking-tight">
                Explore Services &amp; Tools
              </h2>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm font-medium">
              Instant custom quotes, real project photos &amp; reviews
            </p>
          </div>
          
          {/* 4 Ultra-Compact Horizontal Cards in Single Row (Desktop) or 2x2 (Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {QUICK_LINKS.map(({ icon: Icon, label, desc, to, bgGradient }) => (
              <Link
                key={to}
                to={to}
                className="group relative flex items-center gap-3 bg-white/90 hover:bg-white backdrop-blur-md p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-stone-200/80 hover:border-[#E85D26]/50 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Ambient Shimmer Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                {/* Compact Rounded Icon with Gradient and Hover Glow */}
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${bgGradient} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:shadow-md transition-all duration-300`}>
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white stroke-[2.2]" />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="font-bold text-stone-900 text-xs sm:text-sm truncate group-hover:text-[#E85D26] transition-colors leading-tight">
                    {label}
                  </h3>
                  <p className="text-[11px] text-stone-500 truncate leading-tight mt-0.5">
                    {desc}
                  </p>
                </div>

                {/* Sleek Circular Arrow Indicator */}
                <div className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-[#E85D26] text-stone-400 group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>
            ))}
          </div>

          {/* Slim, Compact Full Catalog Banner */}
          <Link
            to="/products"
            className="mt-3 sm:mt-3.5 block bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 text-white rounded-xl sm:rounded-2xl p-3 sm:p-3.5 border border-white/10 hover:border-brand-400/40 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-300 shrink-0 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                    Browse Complete Products &amp; Prices Catalog
                  </h3>
                  <p className="text-stone-300 text-[10px] sm:text-xs truncate hidden sm:block">
                    Bamboo chicks, roller blinds, bird safety nets, fencing &amp; artisan huts
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 bg-[#E85D26] group-hover:bg-[#D94E18] text-white px-3 py-1.5 rounded-lg font-bold transition-all text-xs shrink-0 shadow-xs">
                <span>View All</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>

        </div>
      </section>
    </PageTransition>
  );
}
