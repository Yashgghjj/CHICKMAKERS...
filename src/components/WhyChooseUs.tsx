import { Shield, Truck, Award, Headphones, Sparkles } from 'lucide-react';

const USPS = [
  { 
    icon: Shield, 
    title: '5-Year Warranty', 
    desc: 'Full replacement coverage on bamboo weave, pull-cord pulleys, hardware & installation.' 
  },
  { 
    icon: Truck, 
    title: 'Free Doorstep Measurement', 
    desc: 'Laser measurement & physical swatch display in Noida, Greater Noida, Ghaziabad & NCR.' 
  },
  { 
    icon: Award, 
    title: 'Master Craftsmen', 
    desc: '12+ years of authentic handloom Assam bamboo weaving & heavy-duty weatherproofing.' 
  },
  { 
    icon: Headphones, 
    title: '24/7 Fast Support', 
    desc: 'Direct phone & WhatsApp support (+91-9910426084) for orders, quotes & custom builds.' 
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-white py-24 md:py-32">
      {/* Background Image Layer with Enhanced Brightness & High Contrast Visibility */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/img/why-choose-bg.png"
          alt="Shiva Chick Maker Artisan Bamboo Craftsmanship"
          className="w-full h-full object-cover object-center brightness-105 contrast-110 opacity-80"
        />
        {/* Subtle vignette overlay so photo details remain clearly visible while text is crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/65" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/40 backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-brand-400" /> Artisan Craftsmanship & Direct Factory Value
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
            Why Choose Chick Maker?
          </h2>
          <p className="text-stone-100 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium drop-shadow">
            Your trusted destination for premium handcrafted Assam bamboo chicks, fencing, blinds, and Garware safety netting in Noida.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USPS.map(({ icon: Icon, title, desc }) => (
            <div 
              key={title} 
              className="stagger-card group bg-black/80 hover:bg-black/90 backdrop-blur-xl p-7 rounded-3xl border border-white/25 hover:border-brand-400 shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-600/30 border border-brand-400/50 flex items-center justify-center mb-5 text-brand-400 group-hover:scale-110 group-hover:bg-brand-500/40 transition-all shadow-md">
                <Icon className="w-7 h-7 text-brand-300" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2.5 group-hover:text-brand-300 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-stone-200 leading-relaxed font-normal">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-black/75 backdrop-blur-xl px-7 py-4 rounded-2xl border border-white/20 text-xs md:text-sm text-stone-100 shadow-2xl font-medium">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Workshop: Sector 149, Greater Noida
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span>100% Assam Seasoned Bamboo</span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span>Zero Middlemen · Direct Artisan Pricing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
