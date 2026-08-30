import { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';

const COMPARISON_PRESETS = [
  {
    id: 'assam-bamboo',
    label: 'Assam Bamboo Chick',
    subtitle: '100% Seasoned Natural Assam Bamboo Roll-Up Blinds',
    beforeImage: '/img/our-services/bamboo-chick.jpg',
    afterImage: '/img/our-services/bamboo-chick-blinds.jpg',
    beforeTag: 'BEFORE · Unshaded Balcony',
    afterTag: 'AFTER · Assam Bamboo Chick',
  },
  {
    id: 'weatherproof-blind',
    label: 'Dark Weatherproof Chick',
    subtitle: 'Oil-Treated Heavy-Duty Sun & Rain Shield Chick',
    beforeImage: '/img/gallery/4.jpg',
    afterImage: '/img/gallery/1.jpg',
    beforeTag: 'BEFORE · Open Sunlit Patio',
    afterTag: 'AFTER · Dark Weatherproof Blind',
  },
  {
    id: 'pigeon-net',
    label: 'Garware Safety Netting',
    subtitle: 'High-Density Translucent Anti-Bird Balcony Net',
    beforeImage: '/img/our-services/anti-birds-safety-net.jpg',
    afterImage: '/img/our-services/pigeon-net.jpg',
    beforeTag: 'BEFORE · Unprotected Balcony Railing',
    afterTag: 'AFTER · Garware Safety Net',
  },
  {
    id: 'bamboo-fencing',
    label: 'Bamboo Wall Fencing',
    subtitle: 'Decorative Hand-Split Bamboo Privacy Screen',
    beforeImage: '/img/gallery/3.jpg',
    afterImage: '/img/our-services/bamboo-fencing.jpg',
    beforeTag: 'BEFORE · Plain Boundary Wall',
    afterTag: 'AFTER · Bamboo Privacy Fencing',
  },
];

export default function BeforeAfterSlider() {
  const [selectedPresetId, setSelectedPresetId] = useState('assam-bamboo');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePreset = COMPARISON_PRESETS.find(p => p.id === selectedPresetId) || COMPARISON_PRESETS[0];

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [selectedPresetId]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <section className="py-16 md:py-24 bg-stone-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-3 border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Interactive Comparison Showcase
          </div>
          <h2 className="font-hero text-2xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight text-white leading-tight">
            See the Balcony Transformation
          </h2>
          <p className="font-hero text-stone-300 text-sm md:text-base leading-relaxed">
            Select a product below and drag the interactive slider to compare real before &amp; after installations.
          </p>
        </div>

        {/* Product Selector Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 max-w-4xl mx-auto">
          {COMPARISON_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPresetId(preset.id);
                  setSliderPosition(50);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                  isSelected
                    ? 'bg-brand-500 text-white border-brand-400 shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-stone-300 border-white/15'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Active Product Subtitle */}
        <div className="text-center mb-6">
          <span className="text-xs text-brand-300 font-semibold bg-brand-950/60 px-4 py-1.5 rounded-full border border-brand-700/40 inline-block">
            Showing: {activePreset.subtitle}
          </span>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-white/20 bg-stone-900"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={(e) => handleMove(e.touches[0].clientX)}
            onTouchMove={handleTouchMove}
          >
            {/* AFTER Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={activePreset.afterImage}
                alt={activePreset.afterTag}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute top-4 right-4 bg-brand-600/95 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg z-10 border border-white/20">
                {activePreset.afterTag}
              </div>
            </div>

            {/* BEFORE Image (Clipped overlay) */}
            <div 
              className="absolute inset-0 overflow-hidden border-r-2 border-white/80 shadow-2xl z-10 transition-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activePreset.beforeImage}
                alt={activePreset.beforeTag}
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{ 
                  width: containerWidth ? `${containerWidth}px` : '100%',
                  minWidth: containerWidth ? `${containerWidth}px` : '100%'
                }}
                loading="eager"
              />
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg border border-white/20 whitespace-nowrap">
                {activePreset.beforeTag}
              </div>
            </div>

            {/* Divider Handle Bar */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_16px_rgba(0,0,0,0.9)] flex items-center justify-center z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white shadow-2xl flex items-center justify-center border-2 border-white transform -translate-x-1/2">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-stone-400 font-medium px-2">
            <span>👈 Drag left for BEFORE view</span>
            <span className="text-brand-400 font-bold">{Math.round(sliderPosition)}% Transformation</span>
            <span>Drag right for AFTER view 👉</span>
          </div>
        </div>

      </div>
    </section>
  );
}
