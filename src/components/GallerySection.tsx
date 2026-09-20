import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Phone, MessageSquare, Ruler, ShieldCheck, ArrowRight, CheckCircle2, Calculator } from 'lucide-react';

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

const SHOWCASE_SERVICES: ShowcaseService[] = [
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
    id: 'bamboo-jafri',
    title: 'BAMBOO JAFRI',
    category: 'bamboo-fencing',
    image: '/img/gallery/2.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/2.jpg',
    price: 'From ₹75 / sq.ft.',
    shortDesc: 'Handmade diamond lattice bamboo jafri for balcony privacy screens, garden dividers, restaurant booth partitions, and creeper trellises.',
    features: [
      'Artisan Diamond Lattice Pattern',
      'High Airflow with Privacy Shield',
      'Plant & Creeper Climbing Ready',
      'Custom Built for Balcony & Garden',
    ],
    specs: {
      material: 'Treated Assam Bamboo Split Slats',
      warranty: '4-Year Durability Guarantee',
      deliveryTime: '2 Days Delivery & Fitting',
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
    id: 'welding-roof-structure',
    title: 'WELDING ROOF STRUCTURE',
    category: 'fabrication-roof',
    image: '/img/gallery/7.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/7.jpg',
    price: 'From ₹145 / sq.ft.',
    shortDesc: 'Heavy-duty iron welding sheds, terrace roof structures, polycarbonate pergolas, and industrial fabrications built by Shiva Fabrication.',
    features: [
      'Heavy MS Tubular Pipe Welding',
      'Anti-Corrosive Red Oxide Primer Coating',
      'Polycarbonate / Profile Sheet Roofing',
      'Engineered for High Storm Wind Resistance',
    ],
    specs: {
      material: 'Tata / Jindal MS Steel + Polycarbonate',
      warranty: '7-Year Structural Warranty',
      deliveryTime: '3-5 Days On-Site Fabrication',
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
    id: 'chatri-stall',
    title: 'CHATRI STALL',
    category: 'bamboo-fencing',
    image: '/img/gallery/3.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/3.jpg',
    price: 'From ₹160 / sq.ft.',
    shortDesc: 'Artisan umbrella-style bamboo chatri stalls and kiosks designed for poolside resorts, dhaba dining, tea stalls, and exhibition booths.',
    features: [
      'Heavy Center Bamboo Pillar',
      'Handcrafted Palm Thatch Umbrella Cap',
      'Portable / Fixed Mounting Base Options',
      'Authentic Traditional Indian Aesthetic',
    ],
    specs: {
      material: 'Seasoned Assam Bamboo + Thatch',
      warranty: '3-Year Craft Guarantee',
      deliveryTime: '2-3 Days Assembly',
    },
  },
  {
    id: 'artificial-grass',
    title: 'ARTIFICIAL GRASS',
    category: 'artificial-grass',
    image: '/img/gallery/8.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/8.jpg',
    price: 'From ₹45 / sq.ft.',
    shortDesc: 'Lush 4-tone 35mm-40mm high-density artificial grass turf for balcony makeover, terrace gardens, courtyards, and play areas.',
    features: [
      '4-Tone Natural Spring Green Fibers',
      'Built-In Rapid Water Drainage Holes',
      'Zero Water, Zero Mowing, Zero Dirt',
      'UV-Treated, Child & Pet Safe',
    ],
    specs: {
      material: 'PP + PE Virgin Synthetic Monofilament',
      warranty: '5-Year UV Fade Warranty',
      deliveryTime: 'Same Day Doorstep Installation',
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
];

// Tripled list for infinite, seamless carousel loops in both directions
const EXTENDED_SERVICES = [
  ...SHOWCASE_SERVICES,
  ...SHOWCASE_SERVICES,
  ...SHOWCASE_SERVICES,
];

export default function GallerySection() {
  const [mounted, setMounted] = useState(false);
  // Start right in the middle set of cloned items
  const [currentIndex, setCurrentIndex] = useState(SHOWCASE_SERVICES.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [selectedItem, setSelectedItem] = useState<ShowcaseService | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  // Responsive items-per-view: 3 on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // 1 card on mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // 2 cards on tablet
      } else {
        setItemsPerView(3); // 3 cards on desktop (2-3 visible at a time)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slide navigation handlers
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Auto-slide every 3.5 seconds with smooth continuous transition
  useEffect(() => {
    if (isPaused || selectedItem !== null) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, selectedItem, nextSlide]);

  // Handle seamless infinite wrap-around on transition end
  const handleTransitionEnd = () => {
    // When we enter the third duplicated block, silently reset to middle block
    if (currentIndex >= SHOWCASE_SERVICES.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - SHOWCASE_SERVICES.length);
    } 
    // When moving backward past the first duplicated block, silently reset to middle block
    else if (currentIndex < SHOWCASE_SERVICES.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + SHOWCASE_SERVICES.length);
    }
  };

  // Re-enable CSS transitions right after instantaneous jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
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

  // Current active dot index (0 to 11)
  const activeDot = ((currentIndex % SHOWCASE_SERVICES.length) + SHOWCASE_SERVICES.length) % SHOWCASE_SERVICES.length;

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-[#FAF4F0] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-950 uppercase tracking-tight font-hero">
            OUR SERVICES
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base mt-2 font-medium">
            By One Of The best chick Maker Near You
          </p>
        </div>

        {/* Carousel Outer Container with Left & Right Arrow Buttons */}
        <div 
          className="relative px-2 sm:px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Left Circular Orange Navigation Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E85D26] hover:bg-[#D94E18] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-orange-600/30 transition-all duration-200 focus:outline-none cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Circular Orange Navigation Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E85D26] hover:bg-[#D94E18] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-orange-600/30 transition-all duration-200 focus:outline-none cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Cards Track Container */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="overflow-hidden py-3"
          >
            <div
              className={`flex ${
                isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''
              }`}
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {EXTENDED_SERVICES.map((service, index) => (
                <div
                  key={`${service.id}-${index}`}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3"
                >
                  {/* Clean Card: Rounded corners, large image, category name, and READ MORE button */}
                  <div 
                    onClick={() => setSelectedItem(service)}
                    className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer"
                  >

                    {/* Card Photo (Large aspect ratio) */}
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

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex flex-col items-center justify-between flex-1 bg-white">
                      
                      {/* Bold Category Name in Orange */}
                      <h3 className="text-[#E85D26] font-black tracking-wide text-base sm:text-lg uppercase text-center mb-3 mt-1 line-clamp-1 group-hover:text-[#D94E18] transition-colors">
                        {service.title}
                      </h3>

                      {/* Solid Orange READ MORE Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedItem(service);
                        }}
                        className="w-full bg-[#E85D26] hover:bg-[#D94E18] active:scale-98 text-white font-bold py-2.5 px-4 rounded-lg uppercase tracking-wider text-xs sm:text-sm text-center transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                      >
                        READ MORE
                      </button>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator: Shows current position across all categories */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 flex-wrap max-w-md mx-auto px-4">
            {SHOWCASE_SERVICES.map((service, idx) => (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  setIsTransitioning(true);
                  const diff = idx - activeDot;
                  setCurrentIndex((prev) => prev + diff);
                }}
                aria-label={`Go to ${service.title}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDot === idx ? 'w-8 bg-[#E85D26]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>

        </div>

        {/* View All Work Button */}
        <div className="mt-8 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#E85D26] hover:bg-[#D94E18] text-white font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-sm sm:text-base group"
          >
            <span>View All 50+ Real Installation Photos in Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Render Modal into document.body using createPortal so it is completely on top and never clipped */}
      {mounted && selectedItem && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl border border-stone-200 my-auto text-stone-900 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Photo Header */}
            <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = selectedItem.fallbackImage;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="inline-block bg-[#E85D26] text-white text-[11px] sm:text-xs font-black px-3 py-1 rounded-md shadow uppercase tracking-wider mb-1.5">
                  {selectedItem.price}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wide drop-shadow-md">
                  {selectedItem.title}
                </h3>
              </div>
            </div>

            {/* Modal Body: Rich Details */}
            <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-4">
              
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  Product Details &amp; Application
                </span>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                  {selectedItem.shortDesc}
                </p>
              </div>

              {/* Key Features */}
              <div className="bg-[#FAF4F0] p-4 rounded-xl border border-orange-200/60">
                <div className="text-xs font-black text-[#E85D26] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Key Advantages &amp; Craft Features
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedItem.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-stone-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E85D26] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                <div className="p-1">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">Material</span>
                  <span className="text-xs font-bold text-stone-900 mt-0.5 block line-clamp-1">{selectedItem.specs.material}</span>
                </div>
                <div className="p-1">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">Guarantee</span>
                  <span className="text-xs font-bold text-emerald-700 mt-0.5 block">{selectedItem.specs.warranty}</span>
                </div>
                <div className="p-1">
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">Doorstep Fitting</span>
                  <span className="text-xs font-bold text-stone-900 mt-0.5 block">{selectedItem.specs.deliveryTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <Link
                  to="/book-measurement"
                  onClick={() => setSelectedItem(null)}
                  className="w-full bg-[#E85D26] hover:bg-[#D94E18] text-white font-bold py-3.5 px-4 rounded-xl uppercase tracking-wider text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Ruler className="w-4 h-4" /> Book Free Laser Measurement
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+918826054537"
                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E85D26]" /> Call Shiva
                  </a>
                  <a
                    href={`https://wa.me/918826054537?text=Hi%20Shiva%2C%20I%20am%20interested%20in%20${encodeURIComponent(selectedItem.title)}%20from%20Bamboo%20Chick%20Maker.%20Please%20provide%20a%20quote.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Quote
                  </a>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                  <Link
                    to="/calculator"
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex items-center gap-1 font-bold text-[#E85D26] hover:underline"
                  >
                    <Calculator className="w-3.5 h-3.5" /> Calculate Price Online
                  </Link>
                  <Link
                    to="/services"
                    onClick={() => setSelectedItem(null)}
                    className="font-medium text-stone-500 hover:text-stone-800 hover:underline"
                  >
                    View All Services &rarr;
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
