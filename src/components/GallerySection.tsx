import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Phone, MessageSquare, Ruler, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export interface ShowcaseService {
  id: string;
  title: string;
  category: string;
  image: string;
  fallbackImage: string;
  price: string;
  shortDesc: string;
  features: string[];
  specs: {
    material: string;
    warranty: string;
    deliveryTime: string;
  };
}

export const SHOWCASE_SERVICES: ShowcaseService[] = [
  {
    id: 'roller-blinds',
    title: 'ROLLER BLINDS',
    category: 'roller-blinds',
    image: '/img/our-services/zebra-blinds.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/zebra-blinds.jpg',
    price: 'From ₹88 / sq.ft.',
    shortDesc: 'Modern dual-layer day & night roller blinds for variable sunlight control, dust resistance, and interior elegance.',
    features: [
      'Dual-Layer Alternating Light Control',
      'Smooth Roller Chain & Cassette System',
      '100% Dust-Repellent Polyester Fabric',
      'Motorized Remote Operation Available',
    ],
    specs: {
      material: 'Virgin Polyester + Aluminum Alloy Cassette',
      warranty: '3-Year Mechanism Warranty',
      deliveryTime: '24-48 Hours Custom Sizing',
    },
  },
  {
    id: 'fancy-chick-maker',
    title: 'FANCY CHICK MAKER',
    category: 'bamboo-chick',
    image: '/img/our-services/bamboo-chick.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-chick.jpg',
    price: 'From ₹58 / sq.ft.',
    shortDesc: 'Authentic Assam seasoned bamboo chicks hand-woven with dual pulleys for maximum cooling, privacy, and heat deflection.',
    features: [
      '100% Natural Mature Assam Bamboo',
      'Dual Brass Pulley Smooth Roll-up',
      'Sun-Cured & Termite-Proof Oil Treatment',
      'Reduces Balcony Temperature by 4-6°C',
    ],
    specs: {
      material: 'Seasoned Assam Bamboo + Cotton Piping',
      warranty: '5-Year Replacement Guarantee',
      deliveryTime: 'Same Day / 24 Hours Delivery',
    },
  },
  {
    id: 'window-curtain',
    title: 'WINDOW CURTAIN',
    category: 'window-curtain',
    image: '/img/our-services/bamboo-chick-blinds.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-chick-blinds.jpg',
    price: 'From ₹68 / sq.ft.',
    shortDesc: 'Decorative cloth-border bamboo blinds & architectural curtains blending traditional charm with modern home decor.',
    features: [
      'Reinforced Heavy-Duty Fabric Border Piping',
      'Soft Filtered Natural Daylight',
      'Smooth Cord Lock & Release Cleat',
      'Multiple Border Colors & Slat Finishes',
    ],
    specs: {
      material: 'Assam Bamboo Slats + Canvas Piping',
      warranty: '5-Year Weave Warranty',
      deliveryTime: '1-2 Days Fast Fitting',
    },
  },
  {
    id: 'bird-net',
    title: 'BIRD NET',
    category: 'safety-nets',
    image: '/img/our-services/anti-birds-safety-net.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/anti-birds-safety-net.jpg',
    price: 'From ₹20 / sq.ft.',
    shortDesc: 'Garware monofilament anti-bird & pigeon safety net. Invisible from ground level, humane bird deflection, zero balcony mess.',
    features: [
      'Garware UV-Stabilized Monofilament Net',
      'Nearly Invisible from 3+ Meters',
      '100% Humane — Prevents Roosting Without Harm',
      'Marine-Grade SS 304 Anchor Hooks',
    ],
    specs: {
      material: 'Garware High-Tensile Copolymer HDPE',
      warranty: '3-Year Installation Warranty',
      deliveryTime: 'Same Day On-Site Fitting (2-3 Hours)',
    },
  },
  {
    id: 'bamboo-fencing',
    title: 'BAMBOO FENCING',
    category: 'bamboo-fencing',
    image: '/img/our-services/bamboo-fencing.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-fencing.jpg',
    price: 'From ₹85 / sq.ft.',
    shortDesc: 'Solid natural bamboo boundary fence panels bound with galvanized rust-proof wire for garden, terrace, and balcony privacy.',
    features: [
      'Solid Kiln-Dried Bamboo Poles',
      'Rust-Proof Galvanized Wire Binding',
      '100% Visual Privacy Boundary',
      'All-Weather Exterior Sealed Finish',
    ],
    specs: {
      material: 'Grade-A Solid Bamboo + Galvanized Wire',
      warranty: '3-Year Structural Warranty',
      deliveryTime: '2-3 Days Assembly',
    },
  },
  {
    id: 'bamboo-hut',
    title: 'BAMBOO HUT',
    category: 'bamboo-hut',
    image: '/img/our-services/bamboo-hut.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-hut.jpg',
    price: 'From ₹190 / sq.ft.',
    shortDesc: 'Eco-luxury artisan gazebos, canopy cottages, and bamboo huts crafted for farmhouses, terrace gardens, and rooftop cafes.',
    features: [
      'Heavy-Duty Structural Bamboo Columns',
      'Waterproof Multi-Layer Thatch Roofing',
      'Fire Retardant & Termite Sealed',
      'Custom Architectural Layouts & Sizes',
    ],
    specs: {
      material: 'Solid Assam Bamboo + Thatch Sublayer',
      warranty: '4-Year Structural Warranty',
      deliveryTime: '4-6 Days On-Site Assembly',
    },
  },
  {
    id: 'agro-shade-net',
    title: 'AGRO SHADE NET',
    category: 'agro-nets',
    image: '/img/our-services/agro-shade-nets.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/agro-shade-nets.jpg',
    price: 'From ₹18 / sq.ft.',
    shortDesc: 'High-density green HDPE agro shade nets (50% to 90% shade) for plant nurseries, terrace gardens, and car parking sun deflection.',
    features: [
      '100% Virgin UV-Stabilized HDPE',
      'Knitted Lock-Stitch Tear Resistance',
      'Reduces Ambient Temperature by 6-8°C',
      'Protects Plants from Scorching Heat & Dust',
    ],
    specs: {
      material: 'Knitted Monofilament HDPE (50-90% Shade)',
      warranty: '3-Year UV Degradation Warranty',
      deliveryTime: 'Same Day Delivery & Fitting',
    },
  },
  {
    id: 'bamboo-railing',
    title: 'BAMBOO RAILING',
    category: 'bamboo-hut',
    image: '/img/our-services/bamboo-railing.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-railing.jpg',
    price: 'From ₹130 / running ft.',
    shortDesc: 'Solid bamboo balustrades and balcony perimeter railings delivering rustic sophistication, high strength, and eco-safety.',
    features: [
      'Architectural Heavy Bamboo Timber',
      'Smooth Sanded & Protective Clear Coat',
      'Stainless Steel Heavy Base Mounts',
      'High Impact Load Safety Tested',
    ],
    specs: {
      material: 'Solid Assam Bamboo + SS Connectors',
      warranty: '5-Year Quality Warranty',
      deliveryTime: '2-3 Days Installation',
    },
  },
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ShowcaseService | null>(null);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Responsive items-per-view calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // 1 card on mobile (matching user screenshot)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // 2 cards on tablet
      } else {
        setItemsPerView(4); // 4 cards on desktop (matching user screenshot)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, SHOWCASE_SERVICES.length - itemsPerView);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-[#FAF4F0] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header: Matching User Provided Image Exactly */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-950 uppercase tracking-tight font-hero">
            OUR SERVICES
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base mt-2 font-medium">
            By One Of The best chick Maker Near You
          </p>
        </div>

        {/* Carousel Outer Container with Orange Arrow Buttons */}
        <div className="relative px-2 sm:px-4">

          {/* Left Circular Orange Navigation Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E85D26] hover:bg-[#D94E18] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-orange-600/30 transition-all duration-200 focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Circular Orange Navigation Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E85D26] hover:bg-[#D94E18] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-orange-600/30 transition-all duration-200 focus:outline-none"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Cards Track */}
          <div
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="overflow-hidden py-3"
          >
            <div
              className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView + (itemsPerView > 1 ? 1.5 : 0))}%)`,
              }}
            >
              {SHOWCASE_SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                >
                  {/* Clean Card: Crisp Photo + Bold Orange Title + Solid Orange Button */}
                  <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">

                    {/* Card Photo */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                      <img
                        src={service.image}
                        alt={service.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = service.fallbackImage;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Card Body: Minimalist, clean, ZERO clutter */}
                    <div className="p-4 sm:p-5 flex flex-col items-center justify-between flex-1 bg-white">
                      
                      {/* Bold Orange Title Matching User Screenshot */}
                      <h3 className="text-[#E85D26] font-black tracking-wide text-base sm:text-lg uppercase text-center mb-3 mt-1 line-clamp-1">
                        {service.title}
                      </h3>

                      {/* Solid Orange READ MORE Button Matching User Screenshot */}
                      <button
                        onClick={() => setSelectedItem(service)}
                        className="w-full bg-[#E85D26] hover:bg-[#D94E18] active:scale-98 text-white font-bold py-2.5 px-4 rounded-lg uppercase tracking-wider text-xs sm:text-sm text-center transition-all duration-200 shadow-sm hover:shadow"
                      >
                        READ MORE
                      </button>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator for Mobile & Desktop */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-[#E85D26]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

        </div>

        {/* View All Work Link */}
        <div className="mt-8 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#E85D26] hover:text-[#D94E18] transition-colors"
          >
            <span>View All 50+ Real Installation Photos in Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Clean Quick View Modal When User Clicks "READ MORE" */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedItem(null);
          }}
        >
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl border border-stone-200 animate-scale-in">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo */}
            <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = selectedItem.fallbackImage;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#E85D26] text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                {selectedItem.price}
              </div>
            </div>

            {/* Modal Body: Concise, clean information */}
            <div className="p-5 sm:p-6">
              
              <h3 className="text-xl sm:text-2xl font-black text-[#E85D26] uppercase tracking-wide mb-2">
                {selectedItem.title}
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                {selectedItem.shortDesc}
              </p>

              {/* Key Features */}
              <div className="space-y-1.5 mb-5 bg-[#FAF4F0] p-3.5 rounded-xl border border-stone-200/60">
                <div className="text-[11px] font-bold text-stone-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E85D26]" /> Key Benefits
                </div>
                {selectedItem.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D26]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Specs Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-5 py-2 border-y border-stone-100">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Warranty</span>
                  <span className="font-semibold text-stone-800">{selectedItem.specs.warranty}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Doorstep Fitting</span>
                  <span className="font-semibold text-stone-800">{selectedItem.specs.deliveryTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  to="/book-measurement"
                  onClick={() => setSelectedItem(null)}
                  className="w-full bg-[#E85D26] hover:bg-[#D94E18] text-white font-bold py-3 px-4 rounded-xl uppercase tracking-wider text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Ruler className="w-4 h-4" /> Book Free Laser Measurement
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919910426084"
                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E85D26]" /> Call Directly
                  </a>
                  <a
                    href={`https://wa.me/919910426084?text=Hi%2C%20I%20saw%20${encodeURIComponent(selectedItem.title)}%20on%20ChickMakers%20and%20want%20a%20quote.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
