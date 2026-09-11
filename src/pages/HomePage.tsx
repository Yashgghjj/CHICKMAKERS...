import { Link } from 'react-router-dom';
import { ArrowRight, Ruler, Shield, Truck, Award, Headphones, Sparkles, Phone } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GallerySection from '../components/GallerySection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

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
    desc: 'Millimeter-accurate laser measurement & same-day installation across Greater Noida, Noida & NCR.',
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
    desc: 'Free laser measurement with physical swatches in Greater Noida & NCR.' 
  },
  { 
    icon: Award, 
    title: 'Master Craftsmen', 
    desc: 'Authentic Assam handloom weaving with weather-proof treatment.' 
  },
  { 
    icon: Headphones, 
    title: 'Direct Artisan Support', 
    desc: 'Direct phone & WhatsApp (+91 88260 54537) with craftsman Shiva.' 
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
            <span>Direct Artisan · Greater Noida &amp; NCR</span>
          </div>

          {/* Headline */}
          <h1 className="font-hero text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2 sm:mb-3 leading-tight max-w-2xl drop-shadow-md">
            Bamboo Chick Maker &amp; Shiva Fabrication
          </h1>

          {/* Clean, Concise Subtitle */}
          <p className="font-hero text-stone-200 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed mb-5 font-normal drop-shadow">
            Handcrafted bamboo chicks, blinds, huts &amp; fabrication by craftsman Shiva.
          </p>

          {/* Action Buttons */}
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

            <a
              href="tel:+918826054537"
              className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-bold transition-all text-xs sm:text-sm shadow-md"
            >
              <Phone className="w-3.5 h-3.5" /> Call: 8826054537
            </a>
          </div>

          {/* Crisp Highlights */}
          <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs font-medium text-stone-300">
            <span>✓ From ₹58/sq.ft</span>
            <span>✓ Direct Artisan</span>
            <span>✓ 5-Yr Guarantee</span>
          </div>

        </div>
      </section>

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
            alt="Bamboo Chick Maker & Shiva Fabrication Artisan Craftsmanship"
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
              Why Choose Bamboo Chick Maker &amp; Shiva Fabrication?
            </h2>
            <p className="text-stone-200 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
              Premium handcrafted Assam bamboo chicks, huts, gazebos, welding roof structures, safety nets, artificial grass &amp; channel blinds across Greater Noida, Noida &amp; NCR.
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
                Workshop: LG-04, Asarfi Plaza, Sector 149, Greater Noida, UP 201310
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span>Proprietor: Shiva (+91 88260 54537)</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span>Direct Workshop Pricing</span>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
