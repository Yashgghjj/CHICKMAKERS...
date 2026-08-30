import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2, MapPin } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryData';

export default function GallerySection() {
  // Show first 6 featured gallery items on homepage
  const featured = GALLERY_ITEMS.slice(0, 6);

  return (
    <section id="gallery" className="pt-2 pb-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pt-4">
          <div>
            <span className="text-brand-600 font-bold text-xs tracking-wider uppercase">Our Handcrafted Portfolio</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mt-1 mb-2">
              Recent Balcony &amp; Net Installations
            </h2>
            <p className="text-stone-600 max-w-xl text-sm md:text-base">
              Real projects completed across Noida, Greater Noida, and Delhi NCR using authentic Assam bamboo and Garware safety netting.
            </p>
          </div>
          <Link
            to="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 font-bold text-brand-600 hover:text-brand-700 transition-colors text-sm"
          >
            View Full Photo Gallery ({GALLERY_ITEMS.length}+ Photos) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Grid Matching Shiva Chick Maker */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="group bg-white rounded-2xl overflow-hidden border border-amber-900/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:border-brand-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.fallbackImage;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-brand-300 mb-1">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </div>
                  <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit">
                    View in Gallery <Maximize2 className="w-3 h-3 inline ml-1" />
                  </span>
                </div>
                <span className="absolute top-3 left-3 bg-sage-950/85 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {item.categoryLabel}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-stone-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1 text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2">{item.description}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-amber-900/10 flex items-center justify-between text-xs text-stone-500 font-medium">
                  <span>{item.location}</span>
                  <span className="text-brand-600 font-bold">{item.specs.priceGuide}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105 shadow-md text-sm"
          >
            Explore All Work Photos &amp; Specifications <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
