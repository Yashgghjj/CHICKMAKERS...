import { Shield, Check, Phone, ArrowRight, Home, Trees, EyeOff, Sun, Bird, Grid, Tent, Fence } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const SERVICES = [
  {
    id: 'bamboo-chick',
    icon: Home,
    title: 'Bamboo Chick Maker in Noida',
    desc: 'Specializing in high-quality bamboo chicks combining traditional craftsmanship with modern functionality. Crafted from premium Assam bamboo to provide effective shade, privacy, natural air cooling, and dust protection.',
    features: ['Natural Heat & UV Shield', 'Dual Pulley Smooth Roll-up', 'Treated Against Termites', 'Custom Sizing for All Balconies'],
    image: '/img/our-services/bamboo-chick.jpg',
    price: 'From ₹58 / sq.ft.',
  },
  {
    id: 'bamboo-fencing',
    icon: Fence,
    title: 'Bamboo Fencing in Noida',
    desc: 'Enhance the beauty and privacy of your outdoor spaces with premium Bamboo Fencing. Crafted using the finest quality bamboo, known for its durability, strength, and eco-friendliness. Ideal for garden boundaries and terraces.',
    features: ['Rust-Proof Galvanized Wire', 'Weather & Termite Resistant', '100% Privacy Boundary', 'Fast Professional Fitting'],
    image: '/img/our-services/bamboo-fencing.jpg',
    price: 'From ₹85 / sq.ft.',
  },
  {
    id: 'bamboo-chick-blinds',
    icon: Trees,
    title: 'Bamboo Chick Blinds in Noida',
    desc: 'Exquisite bamboo chick blinds with decorative fabric borders that blend traditional warmth with modern interior design. Perfect for living rooms, sunrooms, verandas, and cafes.',
    features: ['Reinforced Fabric Border', 'Smooth Lock & Release Cord', 'Gentle Filtered Sunlight', 'Low Maintenance Dust-Off'],
    image: '/img/our-services/bamboo-chick-blinds.jpg',
    price: 'From ₹68 / sq.ft.',
  },
  {
    id: 'anti-birds-safety-net',
    icon: Bird,
    title: 'Anti Birds Safety Net in Noida',
    desc: 'Protect balconies, windows, and open spaces from unwanted bird intrusions with high-grade Garware anti-bird safety nets. Durable, weather-resistant, nearly invisible, and zero harm to birds.',
    features: ['Garware Monofilament HDPE', 'UV-Stabilized (10-Yr Net Life)', 'Zero View Obstruction', 'Rust-Proof SS 304 Fixtures'],
    image: '/img/our-services/anti-birds-safety-net.jpg',
    price: 'From ₹20 / sq.ft.',
  },
  {
    id: 'agro-shade-nets',
    icon: Sun,
    title: 'Agro Shade Nets in Noida',
    desc: 'Protect your crops, terrace gardens, plants, and nurseries with high-quality Agro Shade Nets. Provides optimal protection against excessive sunlight, wind, and heat with 50% to 90% shade factors.',
    features: ['50% - 90% Shade Factors', 'UV-Stabilized Virgin HDPE', 'Knitted Anti-Tear Grid', 'Cools Ambient Temp by 6-8°C'],
    image: '/img/our-services/agro-shade-nets.jpg',
    price: 'From ₹18 / sq.ft.',
  },
  {
    id: 'pigeon-net',
    icon: Shield,
    title: 'Pigeon Net in Noida',
    desc: 'Say goodbye to pigeon problems with heavy-duty pigeon nets designed to keep pigeons away from balconies, duct shafts, and AC cavities, maintaining hygiene and clean surroundings.',
    features: ['High Tensile Nylon Cords', 'Non-Sagging Perimeter Wire', 'Maintains 100% Ventilation', 'Same-Day Fast Installation'],
    image: '/img/our-services/pigeon-net.jpg',
    price: 'From ₹22 / sq.ft.',
  },
  {
    id: 'zebra-blinds',
    icon: Grid,
    title: 'Zebra Blinds in Noida',
    desc: 'Elevate your interiors with modern Zebra Blinds featuring dual-layer fabric alternating between sheer and opaque stripes for effortless daylight control, elegance, and privacy.',
    features: ['Precision Dual-Layer Light Control', 'Smooth Roller Mechanism', 'Dust-Repellent Polyester', 'Motorized Remote Option'],
    image: '/img/our-services/zebra-blinds.jpg',
    price: 'From ₹88 / sq.ft.',
  },
  {
    id: 'bamboo-hut',
    icon: Tent,
    title: 'Bamboo Hut in Noida',
    desc: 'Eco-luxury rustic bamboo huts, gazebos, and canopy structures built for resorts, terrace gardens, farmhouses, and outdoor restaurants with natural weatherproofing.',
    features: ['Solid Structural Bamboo Poles', 'Waterproof Thatch Roofing', 'Termite & Weather Sealed', 'Custom Architectural Layouts'],
    image: '/img/our-services/bamboo-hut.jpg',
    price: 'From ₹190 / sq.ft.',
  },
  {
    id: 'bamboo-railing',
    icon: EyeOff,
    title: 'Bamboo Railing in Noida',
    desc: 'Add a touch of natural elegance to your space with premium bamboo railings and partitions for balconies, verandas, garden walkways, and stairways.',
    features: ['High Strength Bamboo Timber', 'Smooth Sanded PU Protective Finish', 'Stainless Steel Base Mounts', 'High Load-Bearing Safety'],
    image: '/img/our-services/bamboo-railing.jpg',
    price: 'From ₹130 / running ft.',
  },
];

export default function ServicesPage() {
  return (
    <PageTransition>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-sage-950 via-sage-900 to-brand-950 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="text-brand-400 text-xs font-semibold uppercase tracking-wider">What We Do</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">Our Services & Products</h1>
          <p className="text-stone-300 max-w-2xl text-base md:text-lg leading-relaxed">
            From handcrafted Assam bamboo chicks and fencing to high-tensile anti-bird safety nets and luxury bamboo huts in Noida & Delhi NCR.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(({ icon: Icon, title, desc, features, image, price }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img 
                      src={image} 
                      alt={title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-sage-900/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-sage-900 mb-2 group-hover:text-brand-600 transition-colors">{title}</h2>
                    <p className="text-stone-500 text-xs leading-relaxed mb-4">{desc}</p>
                    <div className="space-y-1.5 pt-3 border-t border-stone-100">
                      {features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-stone-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <Link
                    to="/book-measurement"
                    className="flex-1 text-center bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Book Free Visit
                  </Link>
                  <a
                    href="tel:+919910426084"
                    className="p-2.5 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-xl transition-colors flex items-center justify-center"
                    title="Call for Details"
                  >
                    <Phone className="w-4 h-4 text-brand-600" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-16 text-center bg-white border border-stone-200 rounded-3xl p-8 md:p-12 shadow-sm">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-sage-900 mb-3">
              Need a Custom Size or On-Site Inspection in Noida?
            </h3>
            <p className="text-stone-500 max-w-xl mx-auto text-sm mb-6">
              Our technicians carry physical bamboo samples, shade net swatches, and measuring lasers directly to your location.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/book-measurement"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-105"
              >
                Book Free Home Visit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3.5 rounded-xl font-semibold transition-all"
              >
                Browse Photo Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
