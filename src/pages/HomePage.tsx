import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Ruler,
  Shield,
  Truck,
  Award,
  Headphones,
  Sparkles,
  Phone,
  Image as ImageIcon,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GallerySection from '../components/GallerySection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import HeroBackgroundModal, { BAMBOO_DESIGN_PRESETS } from '../components/HeroBackgroundModal';

export interface BambooHeroImage {
  id: string;
  name: string;
  category: 'Bamboo Hut' | 'Bamboo Blind' | 'Bamboo Curtain' | 'Bamboo Chick';
  url: string;
  tag: string;
}

export const CONTINUOUS_BAMBOO_IMAGES: BambooHeroImage[] = [
  {
    id: 'bamboo-slat-window',
    name: 'Balcony Bamboo Chick Blinds',
    category: 'Bamboo Blind',
    url: '/img/our-services/bamboo-chick-blinds.jpg',
    tag: 'Assam Bamboo Slats · Smooth Roll-Up',
  },
  {
    id: 'bamboo-hut-gazebo',
    name: 'Authentic Bamboo Hut & Gazebo',
    category: 'Bamboo Hut',
    url: '/img/our-services/bamboo-hut.jpg',
    tag: 'Heavy Treated Poles · Eco-Cottage',
  },
  {
    id: 'chick-curtain-french',
    name: 'French Door Bamboo Chick Curtain',
    category: 'Bamboo Curtain',
    url: '/img/gallery/1.jpg',
    tag: 'Sun & Heat Reflection · Handwoven',
  },
  {
    id: 'conical-bamboo-hut',
    name: 'Conical Bamboo Hut Roof Pavilion',
    category: 'Bamboo Hut',
    url: '/img/gallery/6.jpg',
    tag: 'Thatched Roof · Terrace Gazebo',
  },
  {
    id: 'warm-honey-window-blind',
    name: 'Warm Honey Bamboo Window Blinds',
    category: 'Bamboo Blind',
    url: '/img/gallery/2.jpg',
    tag: 'Filtered Daylight · Natural Polish',
  },
  {
    id: 'garden-bamboo-cottage',
    name: 'Garden Bamboo Hut Cottage',
    category: 'Bamboo Hut',
    url: '/img/gallery/7.jpg',
    tag: 'Lattice Walls · Farmhouse Pavilion',
  },
  {
    id: 'fine-weave-chick',
    name: 'Traditional Assam Bamboo Chick',
    category: 'Bamboo Chick',
    url: '/img/our-services/bamboo-chick.jpg',
    tag: 'Braided Cord · Weather-Proof Finish',
  },
  {
    id: 'pergola-bamboo-curtain',
    name: 'Balcony Pergola Bamboo Curtain',
    category: 'Bamboo Curtain',
    url: '/img/gallery/3.jpg',
    tag: 'High-Rise Sunshade · Water Repellent',
  },
  {
    id: 'sunlit-chick-hd',
    name: 'Sunlit Window Bamboo Chick Blind',
    category: 'Bamboo Blind',
    url: '/img/hero-window-chick-hd.jpg',
    tag: 'Golden Ambient Light Filtering',
  },
  {
    id: 'high-floor-balcony-screen',
    name: 'High-Floor Balcony Bamboo Chick',
    category: 'Bamboo Chick',
    url: '/img/gallery/9.jpg',
    tag: 'Wind-Tolerant Anchorage · Heavy Slats',
  },
];

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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [customBgImage, setCustomBgImage] = useState<string | null>(null);
  const [isAutoChanging, setIsAutoChanging] = useState<boolean>(true);
  const [changeInterval, setChangeInterval] = useState<number>(4000); // 4 seconds continuous crossfade
  const [overlayStyle, setOverlayStyle] = useState<'balanced' | 'dark' | 'subtle'>(() => {
    const saved = localStorage.getItem('hero_bg_overlay');
    return saved === 'dark' || saved === 'subtle' ? saved : 'balanced';
  });
  const [showBgModal, setShowBgModal] = useState(false);

  const [purePhotoView, setPurePhotoView] = useState<boolean>(false);
  const [progressKey, setProgressKey] = useState<number>(0);

  // Continuous auto-slideshow effect across all curated bamboo photos
  useEffect(() => {
    if (!isAutoChanging || customBgImage) return;

    setProgressKey((prev) => prev + 1);
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CONTINUOUS_BAMBOO_IMAGES.length);
    }, changeInterval);

    return () => clearInterval(timer);
  }, [isAutoChanging, customBgImage, changeInterval]);

  const currentBambooPhoto = CONTINUOUS_BAMBOO_IMAGES[currentIndex % CONTINUOUS_BAMBOO_IMAGES.length];

  const handleSelectBg = (url: string) => {
    const foundIdx = CONTINUOUS_BAMBOO_IMAGES.findIndex((item) => item.url === url);
    if (foundIdx !== -1) {
      setCustomBgImage(null);
      setCurrentIndex(foundIdx);
    } else {
      setCustomBgImage(url);
    }
    try {
      localStorage.setItem('hero_bg_image', url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeOverlay = (style: 'balanced' | 'dark' | 'subtle') => {
    setOverlayStyle(style);
    try {
      localStorage.setItem('hero_bg_overlay', style);
    } catch (e) {
      console.error(e);
    }
  };

  // Ultra-light gradient scrim at the bottom so the photos stay 100% natural and bright
  const scrimGradientClass =
    overlayStyle === 'subtle'
      ? 'bg-gradient-to-t from-stone-950/80 via-stone-950/25 to-transparent'
      : overlayStyle === 'dark'
      ? 'bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-stone-950/15'
      : 'bg-gradient-to-t from-stone-950/90 via-stone-950/35 to-transparent';

  const activeDisplayUrl = customBgImage || currentBambooPhoto.url;

  return (
    <PageTransition>
      {/* Hero Section: Fully open, edge-to-edge cinematic showcase */}
      <section className="relative overflow-hidden bg-stone-950 text-white min-h-[620px] sm:min-h-[680px] md:min-h-[82vh] flex flex-col justify-end pt-16 pb-8 group">
        
        {/* Continuous Crossfading Bamboo Photos Stack */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {CONTINUOUS_BAMBOO_IMAGES.map((imgItem) => {
            const isActive = !customBgImage && imgItem.id === currentBambooPhoto.id;
            return (
              <div
                key={imgItem.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-1' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={imgItem.url}
                  alt={`${imgItem.name} - Handcrafted Bamboo Chick Maker & Shiva Fabrication`}
                  className={`w-full h-full object-cover object-center brightness-105 contrast-[1.08] transition-transform duration-[7000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('bamboo-stalks-bg.png')) {
                      target.src = '/img/bamboo-stalks-bg.png';
                    }
                  }}
                />
              </div>
            );
          })}

          {/* Custom user pasted / uploaded image */}
          {customBgImage && (
            <div className="absolute inset-0 z-1 opacity-100">
              <img
                src={customBgImage}
                alt="Custom Bamboo Design"
                className="w-full h-full object-cover object-center brightness-105 contrast-[1.08]"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Natural Bottom-Weighted Scrim (No box container, pure natural gradient) */}
          <div className={`absolute inset-0 z-2 ${scrimGradientClass} transition-colors duration-500 pointer-events-none`} />
        </div>

        {/* Bottom Area: Refined, Compact Typography & Action Buttons (Unobstructed Background) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          {/* Main Hero Content: Fades smoothly when in Pure Photo view */}
          <div className={`transition-all duration-500 max-w-lg sm:max-w-xl ${purePhotoView ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}>
            
            {/* Elegant, Frosted Glass Card with Enhanced Finish & Small Footprint */}
            <div className="bg-black/45 hover:bg-black/55 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shadow-2xl transition-all duration-300">
              {/* Artisan Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold tracking-wider uppercase mb-2 border border-amber-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Direct Artisan · Greater Noida &amp; NCR</span>
              </div>

              {/* Smaller, Refined & Crisp Headline */}
              <h1 className="font-hero text-lg sm:text-2xl md:text-[25px] font-bold text-white tracking-tight leading-snug mb-1.5 drop-shadow-sm">
                Bamboo Chick Maker <span className="text-amber-400 font-semibold">&amp;</span> Shiva Fabrication
              </h1>

              {/* Refined Subtitle */}
              <p className="font-hero text-stone-200 text-xs sm:text-[13px] leading-relaxed mb-3.5 max-w-md font-normal drop-shadow-sm">
                Handcrafted bamboo chicks, blinds, huts &amp; fabrication by craftsman Shiva. Direct workshop pricing across Greater Noida &amp; NCR.
              </p>

              {/* Action Buttons: Compact & Sleek */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2.5">
                <Link
                  to="/calculator"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#E85D26] hover:bg-[#D94E18] text-white px-4 py-2 rounded-full font-bold transition-all hover:scale-105 shadow-md text-xs border border-amber-400/30"
                >
                  Calculate Price <ArrowRight className="w-3 h-3" />
                </Link>
                
                <button
                  onClick={onBookMeasurement}
                  className="inline-flex items-center justify-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3.5 py-2 rounded-full font-bold transition-all hover:scale-105 border border-white/25 text-xs cursor-pointer"
                >
                  <Ruler className="w-3 h-3 text-amber-300" /> Book Free Visit
                </button>

                <a
                  href="tel:+918826054537"
                  className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-full font-bold transition-all hover:scale-105 text-xs shadow-md"
                >
                  <Phone className="w-3 h-3" /> Call: 8826054537
                </a>
              </div>

              {/* Minimal Badges */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-stone-300">
                <span className="text-amber-300 font-bold">✓ From ₹58/sq.ft</span>
                <span>✓ Direct Artisan Workshop</span>
                <span>✓ 5-Year Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Slideshow Progress Indicator Bar at Bottom Edge */}
        {isAutoChanging && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
            <div
              key={progressKey}
              style={{ animationDuration: `${changeInterval}ms` }}
              className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 animate-[progress_linear_forwards]"
            />
          </div>
        )}
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
              Why Choose Bamboo Chick Maker?
            </h2>
            <p className="text-stone-200 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
              Direct artisan workshop pricing, Assam bamboo materials, and 5-year replacement warranty.
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
            <div className="inline-flex items-center justify-center gap-3 bg-black/75 backdrop-blur-xl px-5 py-2.5 rounded-xl border border-white/20 text-xs text-stone-200 shadow-xl font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Workshop: Sector 149, Greater Noida · Call +91 88260 54537</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Selecting Bamboo Photos, Continuous Speed & Custom URL */}
      <HeroBackgroundModal
        open={showBgModal}
        onClose={() => setShowBgModal(false)}
        currentBg={activeDisplayUrl}
        onSelectBg={handleSelectBg}
        overlayStyle={overlayStyle}
        onChangeOverlay={handleChangeOverlay}
        isAutoChanging={isAutoChanging}
        onToggleAutoChange={() => setIsAutoChanging(!isAutoChanging)}
        changeInterval={changeInterval}
        onChangeInterval={(ms) => setChangeInterval(ms)}
      />
    </PageTransition>
  );
}
