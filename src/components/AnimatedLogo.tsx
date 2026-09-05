import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

export default function AnimatedLogo({
  size = 'md',
  showSubtitle = true,
  variant = 'light',
  className = '',
}: AnimatedLogoProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (rect.width / 2)) * 14;
    const rotateX = -(mouseY / (rect.height / 2)) * 14;
    setTilt({ x: rotateX, y: rotateY, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, active: false });
  }, []);

  const iconDimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14 md:w-16 md:h-16',
    lg: 'w-20 h-20 md:w-24 md:h-24',
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
  }[size];

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px] md:text-xs',
    lg: 'text-xs',
  }[size];

  const isDark = variant === 'dark';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3.5 group select-none ${className}`}
    >
      {/* 3D Animated Wood Log Cutting Emblem */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-[1000px] cursor-pointer shrink-0"
      >
        {/* Natural Shadow Underneath Log */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-2.5 bg-amber-950/35 rounded-full blur-md group-hover:scale-125 group-hover:bg-brand-500/40 transition-all duration-500 pointer-events-none" />

        {/* 3D Container */}
        <div
          className={`relative ${iconDimensions} transition-transform duration-300 ease-out flex items-center justify-center`}
          style={{
            transform: tilt.active
              ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.1, 1.1, 1.1)`
              : 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Split Circular Wood Log Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden filter drop-shadow-[0_8px_12px_rgba(30,41,59,0.35)] group-hover:drop-shadow-[0_16px_24px_rgba(30,41,59,0.45)] transition-all duration-300">

            {/* Top Half of Log */}
            <div
              className="absolute inset-0 animate-log-top"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 48%, 50% 50%, 0 52%)' }}
            >
              <img
                src="/img/wood-log.png"
                alt="Chick Makers 3D Wood Log Top Half"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Bottom Half of Log */}
            <div
              className="absolute inset-0 animate-log-bottom"
              style={{ clipPath: 'polygon(0 52%, 50% 50%, 100% 48%, 100% 100%, 0 100%)' }}
            >
              <img
                src="/img/wood-log.png"
                alt="Chick Makers 3D Wood Log Bottom Half"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Glowing Friction Seam along the cut line */}
            <div className="absolute top-[48%] left-[8%] w-[45%] h-[4px] bg-gradient-to-r from-amber-400 via-brand-500 to-amber-300 animate-pulse shadow-[0_0_12px_rgba(194,125,56,0.9)]" />
          </div>

          {/* Continuous Saw Cutting Tool & Flying Sparks Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{ transform: 'translateZ(25px)' }}
          >
            {/* Moving Saw Tool */}
            <div className="absolute top-[34%] left-[10%] animate-saw-stroke">
              <div className="w-7 h-7 rounded-full border-2 border-slate-800 bg-gradient-to-tr from-stone-300 via-white to-stone-200 shadow-xl animate-saw-spin flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-stone-400" />
                <div className="absolute inset-0 border-2 border-dashed border-slate-700 rounded-full" />
                <div className="absolute inset-0.5 border border-dashed border-brand-500 rounded-full opacity-70" />
              </div>
            </div>

            {/* Hyper-Realistic Spark & Sawdust Fountain */}
            <div className="absolute top-[42%] left-[28%] pointer-events-none">
              <span className="absolute w-2 h-2 rounded-full bg-brand-300 animate-spark-1 shadow-[0_0_6px_#e5c192]" />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-brand-500 animate-spark-2 shadow-[0_0_6px_#c27d38]" style={{ animationDelay: '0.25s' }} />
              <span className="absolute w-2 h-2 rounded-full bg-amber-300 animate-spark-3 shadow-[0_0_8px_#fde047]" style={{ animationDelay: '0.5s' }} />
              <span className="absolute w-1 h-1 rounded-full bg-brand-600 animate-spark-1" style={{ animationDelay: '0.75s' }} />

              <span className="absolute w-2.5 h-2.5 rounded-full bg-amber-800/80 animate-sawdust" />
              <span className="absolute w-2 h-2 rounded-full bg-amber-700/90 animate-sawdust" style={{ animationDelay: '0.4s' }} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-slate-300/80 animate-sawdust" style={{ animationDelay: '0.8s' }} />
            </div>
          </div>

          {/* Light Shimmer Reflection Sweep */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none rounded-full"
            style={{ transform: 'translateZ(15px)' }}
          />
        </div>
      </div>

      {/* Brand Name & Warm Ochre Subtitle */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className={`font-display ${titleSizes} font-extrabold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900 group-hover:text-brand-600'
            }`}>
            Chick<span className="text-brand-500 group-hover:text-brand-600 transition-colors">Makers</span>
          </span>
          <span className={`text-[10px] md:text-xs font-bold ${isDark ? 'text-brand-300' : 'text-brand-500'} transition-transform group-hover:scale-125`}>
            ™
          </span>
        </div>

        {showSubtitle && (
          <span className={`hidden sm:flex font-bold ${subtitleSizes} uppercase tracking-widest mt-1.5 items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-600 group-hover:text-slate-900'
            } transition-colors`}>
            {/* Spinning Timber Saw Icon */}
            <span className="relative flex h-3.5 w-3.5 items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-brand-500 animate-saw-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M12 7v10M7 12h10" stroke="#C27D38" strokeWidth="2" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </span>
            <span className="font-bold tracking-wider text-brand-600">Handcrafted Wood &amp; Bamboo</span>
          </span>
        )}
      </div>
    </Link>
  );
}
