import { Sparkles } from 'lucide-react';

export default function BambooSectionDivider() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-[#FAF7F2] pt-8 pb-10">
      
      {/* Repeating Bamboo Stalks Row with mix-blend-multiply to remove yellow boxes */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-around opacity-30 pointer-events-none overflow-hidden select-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <img
            key={i}
            src="/img/bamboo-divider.png"
            alt="Handcrafted Bamboo Stalk"
            className={`h-20 sm:h-28 object-contain mix-blend-multiply transform transition-transform duration-1000 ${
              i % 2 === 0 ? 'animate-pulse' : '-scale-x-100'
            }`}
            style={{ animationDuration: `${2.5 + (i % 3)}s` }}
          />
        ))}
      </div>

      {/* Decorative Center Badge */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        {/* Left: Icon & Description */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 p-1 shrink-0 shadow-md backdrop-blur-md overflow-hidden flex items-center justify-center">
            <img 
              src="/img/bamboo-divider.png" 
              alt="Assam Bamboo Icon" 
              className="w-full h-full object-contain mix-blend-multiply filter drop-shadow animate-pulse" 
            />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Seasoned Assam Bamboo Weave
            </div>
            <p className="text-xs text-stone-200 font-medium">
              Hand-laced with weatherproof nylon-bound cords for long-lasting durability.
            </p>
          </div>
        </div>

        {/* Right: Quality Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-stone-300">
          <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            ✓ Termite Treated
          </span>
          <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            ✓ Sun &amp; Rain Shield
          </span>
          <span className="bg-amber-600/80 text-white backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/30 font-bold">
            Assam Quality Guaranteed
          </span>
        </div>

      </div>

    </div>
  );
}
