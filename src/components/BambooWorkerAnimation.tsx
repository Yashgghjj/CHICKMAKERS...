import { useState } from 'react';
import { Hammer } from 'lucide-react';

interface BambooWorkerAnimationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BambooWorkerAnimation({
  className = '',
  size = 'md',
}: BambooWorkerAnimationProps) {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 1200);
  };

  // Compact, well-proportioned dimensions requested by user ("its too large make it smaall")
  const containerSizes = {
    sm: 'w-32 h-26',
    md: 'w-36 h-30 sm:w-42 sm:h-34',
    lg: 'w-44 h-36 sm:w-50 sm:h-40',
  }[size];

  return (
    <div
      onClick={handleTap}
      className={`relative inline-flex flex-col items-center select-none group cursor-pointer ${className}`}
      title="Craftsman Shiva actively assembling bamboo architecture"
    >
      {/* Compact SVG Artwork Canvas with Active Working Motions */}
      <div className={`relative ${containerSizes} transition-transform duration-200 group-hover:scale-105`}>
        <svg
          viewBox="0 0 540 400"
          className="w-full h-full overflow-visible drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Embedded High-Performance 60FPS Working Animations */}
            <style>{`
              @keyframes activeHammerArm {
                0%, 100% { transform: rotate(0deg); }
                12% { transform: rotate(-22deg); } /* wind-up back */
                24% { transform: rotate(16deg); }  /* STRIKE 1! */
                30% { transform: rotate(8deg); }   /* bounce */
                42% { transform: rotate(-24deg); } /* wind-up back */
                54% { transform: rotate(17deg); }  /* STRIKE 2! */
                60% { transform: rotate(9deg); }   /* bounce */
                72% { transform: rotate(-20deg); } /* wind-up back */
                84% { transform: rotate(16deg); }  /* STRIKE 3! */
                90% { transform: rotate(6deg); }   /* settle */
                94% { transform: rotate(0deg); }   /* check alignment */
              }

              @keyframes craftsmanHeadMotion {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                24%, 54%, 84% { transform: translateY(1.5px) rotate(1deg); }
                42%, 72% { transform: translateY(-0.8px) rotate(-1deg); }
                94% { transform: translateY(-1px) rotate(-1.5deg); } /* inspecting joint */
              }

              @keyframes hammerImpactSparks {
                0%, 20%, 28%, 50%, 58%, 80%, 88%, 100% { opacity: 0; transform: scale(0.3); }
                24%, 54%, 84% { opacity: 1; transform: scale(1.4); }
              }

              @keyframes woodChipFly {
                0% { opacity: 0; transform: translate(0, 0) scale(0.4); }
                24%, 54%, 84% { opacity: 1; transform: translate(-10px, -12px) scale(1); }
                34%, 64%, 94% { opacity: 0; transform: translate(-18px, -4px) scale(0.2); }
                100% { opacity: 0; }
              }

              @keyframes plumbBubbleFloat {
                0%, 100% { transform: translateY(0px); }
                24%, 54%, 84% { transform: translateY(-1.2px); }
                32%, 62%, 92% { transform: translateY(1.2px); }
                96% { transform: translateY(0px); }
              }

              @keyframes drillIndicator {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
              }

              .anim-hammer-arm {
                transform-origin: 304px 162px;
                animation: activeHammerArm 2.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
              }

              .anim-craftsman-head {
                transform-origin: 310px 142px;
                animation: craftsmanHeadMotion 2.8s ease-in-out infinite;
              }

              .anim-impact {
                transform-origin: 258px 94px;
                animation: hammerImpactSparks 2.8s ease-out infinite;
              }

              .anim-chip {
                animation: woodChipFly 2.8s ease-out infinite;
              }

              .anim-bubble {
                animation: plumbBubbleFloat 2.8s ease-in-out infinite;
              }

              .anim-drill-led {
                animation: drillIndicator 1.8s ease-in-out infinite;
              }
            `}</style>

            {/* Bamboo Wood Gradients */}
            <linearGradient id="goldBamboo" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#784118" />
              <stop offset="20%" stopColor="#b46e29" />
              <stop offset="50%" stopColor="#e5a953" />
              <stop offset="75%" stopColor="#f8d487" />
              <stop offset="90%" stopColor="#cf8c39" />
              <stop offset="100%" stopColor="#683411" />
            </linearGradient>

            <linearGradient id="greenBamboo" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3d11" />
              <stop offset="25%" stopColor="#3d6f24" />
              <stop offset="55%" stopColor="#71ab41" />
              <stop offset="78%" stopColor="#9fe266" />
              <stop offset="92%" stopColor="#55912f" />
              <stop offset="100%" stopColor="#1a350e" />
            </linearGradient>

            <radialGradient id="hollowEnd" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2c1a0e" />
              <stop offset="50%" stopColor="#5a381c" />
              <stop offset="75%" stopColor="#d8a356" />
              <stop offset="100%" stopColor="#703f19" />
            </radialGradient>

            {/* Natural Straw/Thatch Roof */}
            <linearGradient id="thatchMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9a6e2e" />
              <stop offset="35%" stopColor="#c59846" />
              <stop offset="65%" stopColor="#e8c26f" />
              <stop offset="85%" stopColor="#b88836" />
              <stop offset="100%" stopColor="#78501e" />
            </linearGradient>

            <linearGradient id="thatchUnder" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#45270c" />
              <stop offset="100%" stopColor="#78501e" />
            </linearGradient>

            {/* Craftsman Shading */}
            <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5c7a9" />
              <stop offset="50%" stopColor="#e6ab84" />
              <stop offset="100%" stopColor="#be7e57" />
            </linearGradient>

            <linearGradient id="poloBrown" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#523620" />
              <stop offset="50%" stopColor="#7c5332" />
              <stop offset="100%" stopColor="#432c1a" />
            </linearGradient>

            <linearGradient id="poloOrange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c2410c" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            <linearGradient id="denim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="ladderWood" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            <linearGradient id="steelClamp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="40%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="spiritYellow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>

            <linearGradient id="concreteTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5f5f4" />
              <stop offset="60%" stopColor="#e7e5e4" />
              <stop offset="100%" stopColor="#d6d3d1" />
            </linearGradient>
          </defs>

          {/* 1. CONCRETE WORKSHOP FOUNDATION BASE */}
          <g id="base">
            <ellipse cx="270" cy="370" rx="220" ry="20" fill="#0c0a09" fillOpacity="0.4" />
            <polygon
              points="105,355 435,355 395,385 65,385"
              fill="url(#concreteTop)"
              stroke="#a8a29e"
              strokeWidth="1"
            />
            <polygon points="65,385 395,385 395,394 65,394" fill="#78716c" />
            <polygon points="395,385 435,355 435,363 395,394" fill="#57534e" />
          </g>

          {/* 2. COMPACT ON-SITE TOOLS */}
          <g id="tools">
            {/* Cordless Drill on Base */}
            <g transform="translate(195, 335)">
              <ellipse cx="14" cy="22" rx="12" ry="3.5" fill="#1c1917" fillOpacity="0.4" />
              <rect x="2" y="16" width="22" height="10" rx="2" fill="#18181b" />
              <path d="M 8 4 L 16 4 L 14 16 L 8 16 Z" fill="#0d9488" />
              <path d="M 5 -5 L 20 -5 Q 23 -2 23 2 L 23 6 L 5 6 Z" fill="#0f766e" />
              <path d="M 20 -4 L 28 -2 L 28 4 L 20 5 Z" fill="url(#steelClamp)" />
              <line x1="28" y1="1" x2="34" y2="1" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
              <circle cx="19" cy="19" r="1.3" fill="#22c55e" className="anim-drill-led" />
            </g>

            {/* Compact Tool Caddy with Wrenches */}
            <g transform="translate(330, 328)">
              <ellipse cx="22" cy="28" rx="24" ry="5" fill="#1c1917" fillOpacity="0.35" />
              <polygon points="0,10 40,10 36,28 -4,28" fill="#78350f" stroke="#451a03" strokeWidth="1" />
              <rect x="0" y="9" width="38" height="2.5" fill="#9a3412" />
              <path d="M 4 10 L 4 0 Q 4 -3 7 -3 L 30 -3 Q 33 -3 33 0 L 33 10" stroke="#92400e" strokeWidth="3" strokeLinecap="round" fill="none" />
              <line x1="10" y1="10" x2="10" y2="-6" stroke="url(#steelClamp)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="10" cy="-6" r="3.5" fill="none" stroke="url(#steelClamp)" strokeWidth="2" />
              <line x1="24" y1="10" x2="24" y2="-4" stroke="url(#steelClamp)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="24" cy="-4" r="4" fill="none" stroke="url(#steelClamp)" strokeWidth="2.2" />
            </g>
          </g>

          {/* 3. LEFT MAIN BAMBOO PILLAR */}
          <g id="left-pillar">
            <rect x="110" y="135" width="28" height="225" rx="4" fill="url(#goldBamboo)" stroke="#592e10" strokeWidth="1.2" />
            {[170, 215, 260, 308, 350].map((y) => (
              <g key={`l-node-${y}`}>
                <ellipse cx="124" cy={y} rx="15" ry="3" fill="#542b0c" opacity="0.85" />
                <line x1="110" y1={y} x2="138" y2={y} stroke="#fef08a" strokeWidth="1" opacity="0.75" />
              </g>
            ))}
            {/* Jute Rope Lashings */}
            <rect x="108" y="310" width="32" height="15" rx="2" fill="#854d0e" stroke="#542b0c" strokeWidth="1" />
            {[313, 316, 319, 322].map((ly) => (
              <line key={`r-${ly}`} x1="108" y1={ly} x2="140" y2={ly} stroke="#fde047" strokeWidth="0.8" strokeDasharray="3 2" />
            ))}
            {/* Diagonal Strut Joint */}
            <rect x="126" y="185" width="12" height="15" rx="2" fill="url(#steelClamp)" />
            <line x1="130" y1="192" x2="195" y2="140" stroke="url(#goldBamboo)" strokeWidth="14" strokeLinecap="round" />
          </g>

          {/* 4. HARDWOOD STEPLADDER */}
          <g id="ladder" transform="translate(252, 215)">
            <line x1="52" y1="16" x2="76" y2="150" stroke="#713f12" strokeWidth="7" strokeLinecap="round" />
            <line x1="28" y1="12" x2="8" y2="150" stroke="url(#ladderWood)" strokeWidth="8.5" strokeLinecap="round" />
            <line x1="48" y1="12" x2="38" y2="150" stroke="url(#ladderWood)" strokeWidth="8.5" strokeLinecap="round" />
            {[34, 68, 100, 130].map((ry, idx) => (
              <line key={`rung-${idx}`} x1={26 - idx * 4} y1={ry} x2={46 - idx * 2} y2={ry} stroke="#d97706" strokeWidth="4.2" strokeLinecap="round" />
            ))}
            <line x1="18" y1="100" x2="62" y2="100" stroke="url(#steelClamp)" strokeWidth="2.5" />
            <circle cx="40" cy="100" r="2.2" fill="#1e293b" />
          </g>

          {/* 5. CENTER GREEN BAMBOO PILLAR WITH ATTACHED SPIRIT LEVEL */}
          <g id="center-pillar">
            <rect x="248" y="85" width="18" height="275" rx="3.5" fill="url(#greenBamboo)" stroke="#1a370e" strokeWidth="1.4" />
            {[110, 155, 202, 250, 298, 345].map((y) => (
              <g key={`g-node-${y}`}>
                <ellipse cx="257" cy={y} rx="10" ry="2.5" fill="#162e0c" opacity="0.9" />
                <line x1="248" y1={y} x2="266" y2={y} stroke="#bef264" strokeWidth="1" opacity="0.85" />
              </g>
            ))}
            {/* Top Saddle Bracket */}
            <rect x="245" y="82" width="24" height="10" rx="2" fill="url(#steelClamp)" />

            {/* Wooden Joint Dowel Pin Being Driven In By Craftsman */}
            <rect x="254" y="88" width="6" height="10" rx="1.5" fill="#facc15" stroke="#78350f" strokeWidth="0.8" />

            {/* Yellow Magnetic Spirit Level Mounted On Green Bamboo */}
            <g transform="translate(239, 140)">
              <rect x="0" y="0" width="7" height="38" rx="1.5" fill="url(#spiritYellow)" stroke="#78350f" strokeWidth="1" />
              <rect x="0" y="0" width="7" height="3.5" fill="#18181b" />
              <rect x="0" y="34.5" width="7" height="3.5" fill="#18181b" />
              {/* Level Vial */}
              <rect x="1.5" y="14" width="4" height="10" rx="1.5" fill="#84cc16" stroke="#14532d" strokeWidth="0.8" />
              <line x1="1.5" y1="17" x2="5.5" y2="17" stroke="#052e16" strokeWidth="0.6" />
              <line x1="1.5" y1="21" x2="5.5" y2="21" stroke="#052e16" strokeWidth="0.6" />
              {/* Actively Vibrating Plumb Bubble */}
              <circle cx="3.5" cy="19" r="1.6" fill="#ffffff" className="anim-bubble" />
            </g>
          </g>

          {/* 6. STRUCTURAL BAMBOO ROOF FRAME */}
          <g id="roof-frame">
            <line x1="120" y1="140" x2="415" y2="140" stroke="url(#goldBamboo)" strokeWidth="16" strokeLinecap="round" />
            <ellipse cx="415" cy="140" rx="5" ry="8" fill="url(#hollowEnd)" stroke="#451a03" strokeWidth="1.2" />
            <line x1="105" y1="140" x2="265" y2="35" stroke="url(#goldBamboo)" strokeWidth="16" strokeLinecap="round" />
            <line x1="260" y1="35" x2="435" y2="145" stroke="url(#goldBamboo)" strokeWidth="14" strokeLinecap="round" />
            <rect x="200" y="92" width="230" height="18" rx="4" fill="url(#goldBamboo)" stroke="#592e10" strokeWidth="1.2" />
            <ellipse cx="430" cy="101" rx="6" ry="9" fill="url(#hollowEnd)" stroke="#451a03" strokeWidth="1.2" />
            {/* Clamps */}
            <rect x="305" y="55" width="14" height="16" rx="2" fill="url(#steelClamp)" />
            <rect x="375" y="70" width="12" height="18" rx="2" fill="url(#steelClamp)" />
          </g>

          {/* 7. LAYERED GOLDEN THATCH ROOF */}
          <g id="roof-thatch">
            <polygon points="50,165 255,22 450,75 398,178 85,178" fill="url(#thatchUnder)" opacity="0.9" />
            <polygon points="45,160 250,18 445,70 395,174 80,174" fill="url(#thatchMain)" stroke="#713f12" strokeWidth="1.5" />
            {/* Natural Straw Fringe */}
            <path
              d="M 45,160 
                 Q 60,174 75,162 Q 90,178 105,164 Q 120,180 135,166 
                 Q 150,182 165,168 Q 180,184 195,170 Q 210,186 225,172 
                 Q 240,188 255,174 Q 270,186 285,172 Q 300,184 315,170 
                 Q 330,181 345,168 Q 360,179 375,165 Q 390,174 400,162"
              fill="none"
              stroke="#facc15"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </g>

          {/* 8. ACTIVE WORKING CRAFTSMAN: SHIVA */}
          <g id="craftsman-working">
            
            {/* Legs On Ladder */}
            <g id="legs">
              {/* Left Leg on Upper Step */}
              <path d="M 285 205 Q 268 226 262 248 L 275 250 Q 282 226 296 208 Z" fill="url(#denim)" />
              <path d="M 262 248 L 267 280 L 279 278 L 275 250 Z" fill="url(#denim)" />
              <path d="M 260 280 L 279 280 Q 288 282 286 289 L 256 289 Z" fill="#45230e" stroke="#1c1917" strokeWidth="1" />
              {/* Right Leg on Lower Step */}
              <path d="M 298 205 L 304 248 L 292 250 L 288 206 Z" fill="url(#denim)" />
              <path d="M 304 248 L 312 300 L 300 302 L 292 250 Z" fill="url(#denim)" />
              <path d="M 298 302 L 320 302 Q 328 304 326 311 L 295 311 Z" fill="#45230e" stroke="#1c1917" strokeWidth="1" />
            </g>

            {/* Tool Belt */}
            <rect x="282" y="198" width="30" height="9" rx="2" fill="#45230e" stroke="#1c1917" strokeWidth="1" />
            <rect x="294" y="199" width="7" height="7" rx="1" fill="#facc15" />
            <path d="M 300 205 L 314 205 L 311 222 L 300 219 Z" fill="#78350f" />

            {/* Torso in Brown Polo with Orange Accents */}
            <path d="M 282 145 L 314 148 L 311 202 L 282 200 Z" fill="url(#poloBrown)" />
            <path d="M 282 145 L 314 148 L 312 161 L 282 158 Z" fill="url(#poloOrange)" />
            <rect x="303" y="163" width="6" height="5" rx="1" fill="#ea580c" stroke="#fef08a" strokeWidth="0.7" />

            {/* Head & Natural Profile (With Responsive Nod Animation) */}
            <g id="head" className="anim-craftsman-head">
              <path d="M 292 132 L 304 134 L 302 147 L 292 145 Z" fill="url(#skin)" />
              <path
                d="M 292 120 
                   Q 294 110 305 110 
                   Q 316 111 315 123 
                   Q 314 135 306 138 
                   Q 296 139 292 131 Z"
                fill="url(#skin)"
                stroke="#9a3412"
                strokeWidth="0.8"
              />
              <path d="M 292 120 L 288 124 L 291 127 L 289 130 L 293 132" stroke="#9a3412" strokeWidth="1" fill="none" />
              <ellipse cx="295" cy="120" rx="2" ry="1.3" fill="#ffffff" />
              <circle cx="294" cy="120" r="1" fill="#18181b" />
              <ellipse cx="307" cy="126" rx="3" ry="5" fill="url(#skin)" stroke="#9a3412" strokeWidth="0.7" />
              {/* Combed Dark Hair */}
              <path
                d="M 290 117 
                   Q 293 105 307 106 
                   Q 318 107 318 120 
                   Q 316 126 312 128 
                   Q 310 118 303 115 
                   Q 295 115 290 117 Z"
                fill="#18181b"
              />
            </g>

            {/* Left Arm Steadily Bracing Green Bamboo */}
            <g id="left-arm">
              <path d="M 282 152 L 258 144 L 257 154 L 280 162 Z" fill="url(#poloBrown)" />
              <path d="M 258 144 L 244 142 L 243 152 L 257 154 Z" fill="url(#skin)" />
              {/* Hand gripping column */}
              <path d="M 244 142 Q 238 144 240 152 Q 248 153 248 147 Z" fill="url(#skin)" stroke="#9a3412" strokeWidth="0.8" />
              <path d="M 240 145 L 244 145 M 240 148 L 244 148 M 241 151 L 245 151" stroke="#7c2d12" strokeWidth="0.8" />
            </g>

            {/* ACTIVE WORKING RIGHT ARM WITH CARPENTER'S HAMMER */}
            <g id="active-hammer-arm" className="anim-hammer-arm">
              {/* Shoulder & Upper Arm */}
              <path d="M 298 154 L 278 142 L 282 152 L 302 164 Z" fill="url(#poloBrown)" />
              {/* Forearm angled up to strike */}
              <path d="M 278 142 L 260 118 L 267 114 L 284 140 Z" fill="url(#skin)" />
              {/* Right Hand firmly clasping hammer handle */}
              <ellipse cx="262" cy="116" rx="4.5" ry="4" fill="url(#skin)" stroke="#9a3412" strokeWidth="0.8" />

              {/* Carpenter's Mallet / Hammer */}
              <g id="hammer-tool">
                {/* Hardwood Hammer Handle */}
                <line x1="272" y1="126" x2="246" y2="92" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="272" y1="126" x2="246" y2="92" stroke="#451a03" strokeWidth="0.8" strokeDasharray="1 4" />
                
                {/* Steel Hammer Head Striking the Joint Pin */}
                <polygon points="241,96 253,88 249,82 237,90" fill="url(#steelClamp)" stroke="#1e293b" strokeWidth="1" />
                {/* Polished Impact Striking Face */}
                <line x1="253" y1="88" x2="249" y2="82" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            </g>

            {/* HAMMER IMPACT RADIATING SPARKS & WOOD CHIPS AT JOINT */}
            <g id="impact-effects" className="anim-impact">
              {/* Impact Flash Core */}
              <circle cx="257" cy="91" r="5" fill="#facc15" fillOpacity="0.8" />
              <circle cx="257" cy="91" r="2.5" fill="#ffffff" />
              {/* Impact Radiating Star Rays */}
              <line x1="257" y1="83" x2="257" y2="78" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="264" y1="86" x2="269" y2="83" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="264" y1="96" x2="270" y2="98" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="250" y1="96" x2="244" y2="100" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="250" y1="86" x2="244" y2="83" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Flying Artisan Sawdust Chips on Strike */}
            <g id="flying-chips" className="anim-chip">
              <circle cx="252" cy="88" r="1.5" fill="#fde047" />
              <circle cx="248" cy="94" r="1.2" fill="#ca8a04" />
              <circle cx="262" cy="85" r="1" fill="#f59e0b" />
            </g>

          </g>
        </svg>
      </div>

      {/* Neat, Compact Footer Label (Proportionate and minimal) */}
      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-medium text-amber-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="tracking-wide">Shiva · Assam Bamboo Craft</span>
      </div>
    </div>
  );
}
