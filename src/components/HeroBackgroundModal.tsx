import { useState, useRef } from 'react';
import { X, Check, Image as ImageIcon, Link as LinkIcon, Upload, Sparkles, RotateCcw, Sliders, ExternalLink } from 'lucide-react';

export interface BambooBackgroundPreset {
  id: string;
  name: string;
  category: 'Bamboo Hut' | 'Bamboo Blind' | 'Bamboo Curtain' | 'Bamboo Chick';
  description: string;
  url: string;
  sourceLabel: string;
}

export const BAMBOO_DESIGN_PRESETS: BambooBackgroundPreset[] = [
  {
    id: 'bamboo-slat-window',
    name: 'Balcony Bamboo Chick Blinds',
    category: 'Bamboo Blind',
    description: 'Natural Assam bamboo slats with smooth dual-pulley roll-up mechanism',
    url: '/img/our-services/bamboo-chick-blinds.jpg',
    sourceLabel: 'Artisan Workshop',
  },
  {
    id: 'bamboo-hut-gazebo',
    name: 'Authentic Bamboo Hut & Gazebo',
    category: 'Bamboo Hut',
    description: 'Architectural eco-resort cottage built with solid treated bamboo columns and thatched roof',
    url: '/img/our-services/bamboo-hut.jpg',
    sourceLabel: 'Artisan Workshop',
  },
  {
    id: 'chick-curtain-french',
    name: 'French Door Bamboo Chick Curtain',
    category: 'Bamboo Curtain',
    description: 'Fine-weave bamboo roll-up curtain providing sunlight diffusion and natural room cooling',
    url: '/img/gallery/1.jpg',
    sourceLabel: 'Artisan Workshop',
  },
  {
    id: 'conical-bamboo-hut',
    name: 'Conical Bamboo Hut Roof Pavilion',
    category: 'Bamboo Hut',
    description: 'Traditional round conical bamboo gazebo with waterproof thatch and framework',
    url: '/img/gallery/6.jpg',
    sourceLabel: 'Artisan Workshop',
  },
  {
    id: 'warm-honey-window-blind',
    name: 'Warm Honey Bamboo Window Blinds',
    category: 'Bamboo Blind',
    description: 'Treated natural bamboo reed blind with brass cleat lock for windows and study rooms',
    url: '/img/gallery/2.jpg',
    sourceLabel: 'Artisan Workshop',
  },
  {
    id: 'garden-bamboo-cottage',
    name: 'Garden Bamboo Hut Cottage',
    category: 'Bamboo Hut',
    description: 'Outdoor terrace and farmhouse bamboo cottage with woven lattice walls',
    url: '/img/gallery/7.jpg',
    sourceLabel: 'Artisan Workshop',
  },
  {
    id: 'fine-weave-chick',
    name: 'Traditional Assam Bamboo Chick',
    category: 'Bamboo Chick',
    description: 'Heavy braided nylon cord lacing with sun-cured Assam bamboo slats',
    url: '/img/our-services/bamboo-chick.jpg',
    sourceLabel: 'Artisan Workshop',
  },
  {
    id: 'pergola-bamboo-curtain',
    name: 'Balcony Pergola Bamboo Curtain',
    category: 'Bamboo Curtain',
    description: 'Full perimeter high-rise balcony shade curtain deflecting heat, rain, and dust',
    url: '/img/gallery/3.jpg',
    sourceLabel: 'Artisan Workshop',
  },
  {
    id: 'sunlit-chick-hd',
    name: 'Sunlit Window Bamboo Chick Blind',
    category: 'Bamboo Blind',
    description: 'Golden ambient sunlight softly diffused through hand-split bamboo slats',
    url: '/img/hero-window-chick-hd.jpg',
    sourceLabel: 'Artisan Workshop',
  },
  {
    id: 'high-floor-balcony-screen',
    name: 'High-Floor Balcony Bamboo Chick',
    category: 'Bamboo Chick',
    description: 'Heavy canvas border piping and wind-resistant bottom tie-downs for high-rise balconies',
    url: '/img/gallery/9.jpg',
    sourceLabel: 'Artisan Workshop',
  },
];

interface HeroBackgroundModalProps {
  open: boolean;
  onClose: () => void;
  currentBg: string;
  onSelectBg: (url: string) => void;
  overlayStyle: 'balanced' | 'dark' | 'subtle';
  onChangeOverlay: (style: 'balanced' | 'dark' | 'subtle') => void;
  isAutoChanging: boolean;
  onToggleAutoChange: () => void;
  changeInterval: number;
  onChangeInterval: (ms: number) => void;
}

export default function HeroBackgroundModal({
  open,
  onClose,
  currentBg,
  onSelectBg,
  overlayStyle,
  onChangeOverlay,
  isAutoChanging,
  onToggleAutoChange,
  changeInterval,
  onChangeInterval,
}: HeroBackgroundModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!open) return null;

  const filteredPresets =
    selectedCategory === 'all'
      ? BAMBOO_DESIGN_PRESETS
      : BAMBOO_DESIGN_PRESETS.filter((p) => p.category === selectedCategory);

  const handleApplyCustomUrl = () => {
    setUrlError(null);
    const trimmed = customUrlInput.trim();
    if (!trimmed) {
      setUrlError('Please enter or paste an image URL');
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('data:') && !trimmed.startsWith('/')) {
      setUrlError('Please provide a valid image URL (starting with https://)');
      return;
    }

    onSelectBg(trimmed);
    setCustomUrlInput('');
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size should be under 8MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onSelectBg(dataUrl);
        onClose();
      }
    };
    reader.onerror = () => {
      setUploadError('Could not read image file');
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    onSelectBg('/img/our-services/bamboo-chick-blinds.jpg');
    onChangeOverlay('balanced');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-700 text-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                Bamboo Photos &amp; Continuous Slideshow
              </h3>
              <p className="text-xs text-stone-400">
                Only authentic Bamboo Huts, Blinds, Curtains &amp; Chicks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1.5 rounded-lg border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs flex items-center gap-1.5 transition cursor-pointer"
              title="Reset to default background"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with Scrollable Area */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Continuous Slideshow Auto-Cycle Toggle Banner */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                {isAutoChanging && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${
                    isAutoChanging ? 'bg-emerald-500' : 'bg-stone-500'
                  }`}
                />
              </span>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                  Continuous Bamboo Background Slideshow
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isAutoChanging ? 'bg-emerald-500/30 text-emerald-300' : 'bg-stone-700 text-stone-300'
                    }`}
                  >
                    {isAutoChanging ? 'ACTIVELY CHANGING' : 'PAUSED'}
                  </span>
                </div>
                <div className="text-[11px] text-stone-300 mt-0.5">
                  Continuously transitions between bamboo huts, blinds, curtains &amp; chicks
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Interval Speed Buttons */}
              <div className="flex items-center rounded-xl bg-stone-950 p-1 border border-stone-800 text-[11px]">
                {[
                  { label: '3s', ms: 3000 },
                  { label: '4s', ms: 4000 },
                  { label: '6s', ms: 6000 },
                ].map((s) => (
                  <button
                    key={s.ms}
                    type="button"
                    onClick={() => onChangeInterval(s.ms)}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer font-medium ${
                      changeInterval === s.ms
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Master Play/Pause Toggle */}
              <button
                type="button"
                onClick={onToggleAutoChange}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md ${
                  isAutoChanging
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-stone-700 hover:bg-stone-600 text-white'
                }`}
              >
                {isAutoChanging ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>

          {/* Section 1: Curated Bamboo Design Photo Presets */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bamboo Photos ({filteredPresets.length})</span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All (10)' },
                  { id: 'Bamboo Hut', label: 'Bamboo Huts' },
                  { id: 'Bamboo Blind', label: 'Blinds' },
                  { id: 'Bamboo Curtain', label: 'Curtains' },
                  { id: 'Bamboo Chick', label: 'Chicks' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {filteredPresets.map((preset) => {
                const isSelected = currentBg === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      onSelectBg(preset.url);
                    }}
                    className={`group relative text-left rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-950/50 scale-[1.02]'
                        : 'border-stone-800 hover:border-stone-600 bg-stone-950/60 hover:bg-stone-800/50'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-28 w-full overflow-hidden bg-stone-800">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                      {/* Category tag */}
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[9px] font-semibold text-amber-300 border border-amber-400/30">
                        {preset.category}
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="p-2.5 flex-1 flex flex-col justify-between bg-stone-900/90">
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                          {preset.name}
                        </div>
                        <p className="text-[10px] text-stone-400 line-clamp-2 mt-0.5 leading-tight">
                          {preset.description}
                        </p>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
                        <span className="text-[9px] text-amber-400/90 font-medium">
                          {isSelected ? 'Active Now' : 'Click to show'}
                        </span>
                        <span className="text-amber-400 font-semibold group-hover:underline">View →</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Custom URL from Adobe Stock / Web */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400">
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Use Any Photo From Adobe Stock or Web URL</span>
              </div>
              <a
                href="https://stock.adobe.com/in/search?k=bamboo%20design"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 underline font-medium"
              >
                <span>Browse Adobe Stock Bamboo Designs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Find any photo on Adobe Stock, Behance, or Google Images, right-click and copy its image address, then paste it below:
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://... or paste photo URL here"
                className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleApplyCustomUrl}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer shrink-0 shadow-md flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Photo</span>
              </button>
            </div>

            {urlError && <p className="text-xs text-red-400 font-medium">{urlError}</p>}
          </div>

          {/* Section 3: Upload from Device & Readability Overlay controls */}
          <div className="grid sm:grid-cols-2 gap-4">
            
            {/* Upload */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400 mb-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload From Device</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed mb-3">
                  Select a photo of your bamboo work, chick blinds, or hut from your phone or PC.
                </p>
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-700 hover:border-amber-400 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Choose Image File...</span>
                </button>
                {uploadError && <p className="text-xs text-red-400 font-medium mt-1.5">{uploadError}</p>}
              </div>
            </div>

            {/* Readability Scrim / Overlay Control */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400 mb-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Background Darkness &amp; Contrast</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed mb-3">
                  Adjust darkness so headline and buttons stay easily readable over any photo.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'subtle', label: 'Lighter', desc: '40% scrim' },
                    { id: 'balanced', label: 'Balanced', desc: 'Recommended' },
                    { id: 'dark', label: 'Deep Dark', desc: 'Max contrast' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeOverlay(opt.id)}
                    className={`py-2 px-2 rounded-xl border text-center transition cursor-pointer ${
                      overlayStyle === opt.id
                        ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold'
                        : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs font-semibold">{opt.label}</div>
                    <div className="text-[10px] opacity-75">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs text-stone-400">
          <span className="truncate">Your selection is saved automatically in your browser.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
