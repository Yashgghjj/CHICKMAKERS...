import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  MessageSquare, 
  Ruler, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Maximize2, 
  Sparkles,
  Grid,
  List
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GALLERY_STATS, GalleryItem } from '../data/galleryData';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('grid');
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Keyboard navigation for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalItem) return;
      if (e.key === 'Escape') {
        setActiveModalItem(null);
      } else if (e.key === 'ArrowRight') {
        navigateModal(1);
      } else if (e.key === 'ArrowLeft') {
        navigateModal(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem, filteredItems]);

  const navigateModal = (direction: number) => {
    if (!activeModalItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeModalItem.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIndex]);
  };

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const getImageSrc = (item: GalleryItem) => {
    if (imageErrorMap[item.id]) {
      return item.fallbackImage;
    }
    return item.image;
  };

  return (
    <PageTransition>
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sage-950 via-sage-900 to-brand-950 text-white py-16 md:py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Official Portfolio &amp; Work Showcase
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Photo Gallery &amp; Portfolio
          </h1>
          <p className="text-stone-300 text-lg max-w-2xl leading-relaxed mb-8">
            Explore authentic photos of our Bamboo Chicks, Safety Nets, Bamboo Fencing, Zebra Blinds, and Bamboo Huts installed across Noida, Greater Noida, and Delhi NCR.
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 max-w-4xl">
            {GALLERY_STATS.map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="font-display text-2xl md:text-3xl font-bold text-brand-400 mb-1">{stat.value}</div>
                <div className="text-xs text-stone-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Gallery Content */}
      <section className="py-10 md:py-16 bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Controls Bar: Categories, Search, View Switcher */}
          <div className="flex flex-col gap-6 mb-10">
            
            {/* Search and Layout Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search photos, products, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-xs text-stone-500 font-medium">
                  Showing <span className="font-bold text-sage-900">{filteredItems.length}</span> photos
                </span>
                <div className="flex items-center bg-white rounded-xl border border-stone-200 p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-brand-50 text-brand-600 font-semibold' 
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                    title="Grid View (3-Column)"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('detailed')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'detailed' 
                        ? 'bg-brand-50 text-brand-600 font-semibold' 
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                    title="Detailed Specs View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 scale-[1.02]'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100 hover:text-sage-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery View 1: Clean Photo Grid matching user image design */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalItem(item)}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={getImageSrc(item)}
                      alt={item.title}
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Category / Badge Tags */}
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
                      <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="bg-[#E85D26] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                        {item.specs.priceGuide}
                      </span>
                    </div>
                  </div>

                  {/* Card Content: Bold Orange Title + Orange READ MORE Button (matching user image) */}
                  <div className="p-4 flex flex-col items-center justify-between flex-1 bg-white">
                    <h3 className="text-[#E85D26] font-black tracking-wide text-sm sm:text-base uppercase text-center mb-3 line-clamp-1 group-hover:text-[#D94E18] transition-colors">
                      {item.title}
                    </h3>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalItem(item);
                      }}
                      className="w-full bg-[#E85D26] hover:bg-[#D94E18] active:scale-98 text-white font-bold py-2.5 px-4 rounded-lg uppercase tracking-wider text-xs text-center transition-all duration-200 shadow-sm"
                    >
                      READ MORE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Gallery View 2: Detailed Specs Cards */
            <div className="space-y-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-all md:flex gap-8 items-center"
                >
                  <div 
                    className="md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden relative cursor-pointer group shrink-0 mb-4 md:mb-0"
                    onClick={() => setActiveModalItem(item)}
                  >
                    <img
                      src={getImageSrc(item)}
                      alt={item.title}
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <span className="inline-flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5" /> Enlarge Photo
                      </span>
                    </div>
                  </div>

                  <div className="md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {item.categoryLabel}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-stone-400">
                          <MapPin className="w-3 h-3" /> {item.location}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-sage-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 rounded-xl p-3 mb-4 text-xs">
                        <div>
                          <span className="text-stone-400 block mb-0.5">Material:</span>
                          <span className="font-semibold text-sage-900">{item.specs.material.split('+')[0]}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block mb-0.5">Warranty:</span>
                          <span className="font-semibold text-sage-900">{item.specs.warranty}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block mb-0.5">Timeline:</span>
                          <span className="font-semibold text-sage-900">{item.specs.craftTime}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block mb-0.5">Est. Price:</span>
                          <span className="font-semibold text-brand-700">{item.specs.priceGuide}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="px-4 py-2 bg-sage-900 text-white rounded-xl text-xs font-semibold hover:bg-sage-800 transition-colors"
                      >
                        View Full Specs &amp; Gallery
                      </button>
                      <a
                        href="tel:+919910426084"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-50 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-600" /> Call for Quote
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty Search Result */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 my-8">
              <Search className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-display text-xl font-bold text-sage-900 mb-1">No matching photos found</h3>
              <p className="text-sm text-stone-500 mb-4">Try searching for "bamboo", "pigeon net", "balcony", or select another category.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Call-To-Action Banner at Bottom */}
          <div className="mt-16 bg-gradient-to-r from-sage-900 via-sage-800 to-brand-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-brand-400 text-xs font-bold uppercase tracking-wider">Free On-Site Service</span>
              <h2 className="font-display text-2xl md:text-4xl font-bold mt-2 mb-4">
                Want Similar Bamboo Chicks or Safety Nets for Your Home?
              </h2>
              <p className="text-stone-300 text-sm md:text-base mb-6 leading-relaxed">
                Book a free laser measurement visit anywhere in Noida, Greater Noida, or Delhi NCR. Our master craftsmen carry physical samples right to your doorstep.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/book-measurement"
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  <Ruler className="w-4 h-4" /> Book Free Measurement
                </Link>
                <a
                  href="tel:+919910426084"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur px-6 py-3.5 rounded-xl font-semibold transition-all border border-white/20"
                >
                  <Phone className="w-4 h-4" /> Call +91-9910426084
                </a>
                <a
                  href="https://wa.me/919910426084?text=Hi%20Shiva%20Chick%20Maker%2C%20I%20saw%20your%20photo%20gallery%20and%20would%20like%20a%20quotation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-all"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Enquiry
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Lightbox / Detail Modal */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModalItem(null); }}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveModalItem(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev / Next Navigation Arrows */}
          <button
            onClick={() => navigateModal(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-all hover:scale-110 hidden sm:flex"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigateModal(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur transition-all hover:scale-110 hidden sm:flex"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full shadow-2xl flex flex-col md:flex-row my-auto max-h-[90vh]">
            
            {/* Left: High-Res Image View */}
            <div className="md:w-7/12 bg-stone-950 flex flex-col justify-center items-center relative overflow-hidden group">
              <img
                src={getImageSrc(activeModalItem)}
                alt={activeModalItem.title}
                onError={() => handleImageError(activeModalItem.id)}
                className="w-full h-full max-h-[60vh] md:max-h-[80vh] object-contain p-2"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>{activeModalItem.location}</span>
              </div>
            </div>

            {/* Right: Rich Project Details & Action Buttons */}
            <div className="md:w-5/12 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {activeModalItem.categoryLabel}
                  </span>
                  {activeModalItem.badge && (
                    <span className="bg-sage-100 text-sage-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {activeModalItem.badge}
                    </span>
                  )}
                </div>

                <h2 className="font-display text-xl md:text-2xl font-bold text-sage-900 mb-3 leading-snug">
                  {activeModalItem.title}
                </h2>

                <p className="text-stone-600 text-sm leading-relaxed mb-5">
                  {activeModalItem.description}
                </p>

                {/* Key Features Bullet List */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-sage-900 uppercase tracking-wider mb-2">Key Highlights</h4>
                  <ul className="space-y-1.5">
                    {activeModalItem.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specifications Table */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 mb-6 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Material:</span>
                    <span className="font-semibold text-sage-900 text-right">{activeModalItem.specs.material}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Warranty:</span>
                    <span className="font-semibold text-sage-900">{activeModalItem.specs.warranty}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Installation Time:</span>
                    <span className="font-semibold text-sage-900">{activeModalItem.specs.craftTime}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Ideal For:</span>
                    <span className="font-semibold text-sage-900 text-right">{activeModalItem.specs.bestFor}</span>
                  </div>
                  <div className="flex justify-between py-1 text-brand-700 font-bold">
                    <span>Est. Price:</span>
                    <span>{activeModalItem.specs.priceGuide}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-stone-100">
                <Link
                  to="/book-measurement"
                  onClick={() => setActiveModalItem(null)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-md"
                >
                  <Ruler className="w-4 h-4" /> Book Free Measurement for this Design
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919910426084"
                    className="inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 py-2.5 rounded-xl font-semibold text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-600" /> Call +91-9910426084
                  </a>
                  <a
                    href={`https://wa.me/919910426084?text=Hi%20Shiva%20Chick%20Maker%2C%20I%20am%20interested%20in%20"${encodeURIComponent(activeModalItem.title)}"%20from%20your%20photo%20gallery.%20Please%20provide%20a%20quote.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 py-2.5 rounded-xl font-semibold text-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </PageTransition>
  );
}
