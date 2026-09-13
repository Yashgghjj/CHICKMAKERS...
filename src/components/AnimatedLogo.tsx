import { Link } from 'react-router-dom';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitle?: string;
  showIcon?: boolean;
  showTitle?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

export default function AnimatedLogo({
  size = 'md',
  showSubtitle = true,
  subtitle = 'By Shiva · Huts, Chicks & Blinds',
  showIcon = true,
  showTitle = true,
  variant = 'light',
  className = '',
}: AnimatedLogoProps) {
  const iconDimensions = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 sm:w-13 sm:h-13',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
  }[size];

  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl md:text-[25px]',
    lg: 'text-2xl sm:text-3xl md:text-4xl',
  }[size];

  const subtitleSizes = {
    sm: 'text-[8.5px]',
    md: 'text-[9px] sm:text-[10px] md:text-[10.5px]',
    lg: 'text-xs',
  }[size];

  const isDark = variant === 'dark';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3.5 group select-none ${className}`}
    >
      {/* Handcrafted Timber Emblem With Active Saw Cutting Effect */}
      {showIcon && (
        <div className="relative shrink-0 flex items-center justify-center">
          {/* Ambient Wood Warm Shadow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4/5 h-2.5 bg-amber-950/30 dark:bg-black/60 rounded-full blur-md group-hover:scale-110 transition-all duration-300 pointer-events-none" />

          {/* Flying sawdust chips & sparks drifting outward as in reference */}
          <div className="absolute -top-1.5 right-1 pointer-events-none z-30">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#c28454] opacity-85 shadow-sm transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </div>
          <div className="absolute -top-0.5 right-3.5 pointer-events-none z-30">
            <span className="inline-block w-2 h-2 rounded-full bg-slate-300/80 shadow-sm" />
          </div>
          <div className="absolute -bottom-1 -right-1 pointer-events-none z-30">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b87640] opacity-80" />
          </div>

          {/* Master Emblem Disc */}
          <div
            className={`relative ${iconDimensions} rounded-full overflow-visible transition-transform duration-300 ease-out group-hover:scale-105 flex items-center justify-center`}
          >
            {/* Top Half of Wood Log */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden transition-transform duration-300 ease-out group-hover:-translate-y-[2px]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 48%, 0 48%)',
              }}
            >
              <img
                src="/img/wood-log.png"
                alt="Timber Top Half"
                className="w-full h-full object-cover object-center"
              />
              {/* Natural outer bark rim ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-900/60 pointer-events-none" />
              {/* Cut lip edge line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#d7b48c]/80 shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
            </div>

            {/* Bottom Half of Wood Log */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden transition-transform duration-300 ease-out group-hover:translate-y-[2px]"
              style={{
                clipPath: 'polygon(0 53%, 100% 53%, 100% 100%, 0 100%)',
              }}
            >
              <img
                src="/img/wood-log.png"
                alt="Timber Bottom Half"
                className="w-full h-full object-cover object-center"
              />
              {/* Natural outer bark rim ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-900/60 pointer-events-none" />
              {/* Cut lip shadow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-stone-900/70" />
            </div>

            {/* Glowing Golden Cutting Spark / Tooth at Left Kerf Entry */}
            <div className="absolute left-[3%] top-[50%] -translate-y-1/2 pointer-events-none z-20">
              <span className="block w-2.5 h-2 bg-amber-400 rounded-sm shadow-[0_0_8px_#f59e0b] animate-pulse" />
            </div>

            {/* Active Reciprocating Saw Cutter Assembly (Moving Left and Right along the cut line) */}
            <div
              className="absolute left-[14%] top-[21%] w-[58%] h-[58%] z-20 pointer-events-none animate-saw-stroke group-hover:[animation-duration:1.2s] will-change-transform"
            >
              {/* Bright Golden Spark at Top Cutting Contact Point (moves with the blade) */}
              <div className="absolute left-[50%] top-0 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-30">
                <span className="block w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24] animate-friction-glow" />
              </div>

              {/* Cutting micro-spark trailing */}
              <div className="absolute left-[30%] top-[48%] pointer-events-none z-25">
                <span className="block w-1.5 h-1.5 rounded-full bg-amber-300 animate-ember-drift shadow-[0_0_6px_#fde047]" />
              </div>

              {/* Circular Saw Blade */}
              <div className="relative w-full h-full rounded-full filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.75)]">
                <svg
                  className="w-full h-full animate-saw-spin group-hover:[animation-duration:0.4s]"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Chrome White/Silver Blade Sheen */}
                    <radialGradient id="silverBlade" cx="45%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="45%" stopColor="#f1f5f9" />
                      <stop offset="80%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </radialGradient>
                    {/* Outer Dark Carbide Ring */}
                    <linearGradient id="carbideRing" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="50%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Outer Dark Ring with Cutout Teeth */}
                  <circle cx="50" cy="50" r="47" fill="url(#carbideRing)" stroke="#0f172a" strokeWidth="1" />

                  {/* Silver Circular Blade Body */}
                  <circle cx="50" cy="50" r="41" fill="url(#silverBlade)" stroke="#94a3b8" strokeWidth="1.2" />

                  {/* Circumferential Teeth Slots (16 teeth with orange-gold carbide tips) */}
                  {[...Array(16)].map((_, i) => {
                    const angle = (i * 360) / 16;
                    return (
                      <g key={i} transform={`rotate(${angle} 50 50)`}>
                        {/* Gullet notch */}
                        <rect x="47.5" y="4" width="5" height="7" rx="1" fill="#0f172a" />
                        {/* Orange carbide tip accent on every tooth */}
                        <rect x="48.5" y="11" width="3" height="2" rx="0.5" fill="#f59e0b" />
                      </g>
                    );
                  })}

                  {/* Concentric Inner Tension Ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />

                  {/* Central Heavy Dark Arbor Collar */}
                  <circle cx="50" cy="50" r="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

                  {/* Central Deep Black Bore Hole */}
                  <circle cx="50" cy="50" r="9" fill="#020617" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brand Name & Artisan Subtitle */}
      {showTitle && (
        <div className="flex flex-col leading-none shrink-0">
          <div className="flex items-center gap-1">
            <span
              className={`font-display ${titleSizes} font-extrabold tracking-tight transition-colors ${
                isDark ? 'text-white' : 'text-slate-900 group-hover:text-brand-600'
              }`}
            >
              Bamboo
              <span className="text-brand-500 group-hover:text-brand-600 transition-colors">
                {' '}Chick Maker
              </span>
            </span>
            <span
              className={`text-[10px] md:text-xs font-bold ${
                isDark ? 'text-brand-300' : 'text-brand-500'
              } transition-transform group-hover:scale-125`}
            >
              ™
            </span>
          </div>

          {showSubtitle && (
            <span
              className={`hidden sm:inline-flex font-bold ${subtitleSizes} uppercase tracking-wider mt-1 items-center gap-1.5 whitespace-nowrap ${
                isDark ? 'text-stone-300' : 'text-stone-600 group-hover:text-stone-900'
              } transition-colors`}
            >
              {/* Spinning Timber Saw Accent */}
              <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5 items-center justify-center shrink-0">
                <svg
                  className="w-full h-full text-brand-500 group-hover:rotate-90 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M12 7v10M7 12h10" stroke="#C27D38" strokeWidth="2" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
              </span>
              <span className="font-bold text-brand-600">{subtitle}</span>
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
