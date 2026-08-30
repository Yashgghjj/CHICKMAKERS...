export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'bamboo-chick' | 'bamboo-fencing' | 'safety-nets' | 'agro-nets' | 'zebra-blinds' | 'bamboo-hut' | 'bamboo-railing';
  categoryLabel: string;
  image: string;
  fallbackImage: string;
  description: string;
  features: string[];
  specs: {
    material: string;
    warranty: string;
    craftTime: string;
    bestFor: string;
    priceGuide: string;
  };
  location: string;
  badge?: string;
}

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'bamboo-chick', label: 'Bamboo Chick & Blinds' },
  { id: 'safety-nets', label: 'Bird & Pigeon Nets' },
  { id: 'bamboo-fencing', label: 'Bamboo Fencing' },
  { id: 'agro-nets', label: 'Agro Shade Nets' },
  { id: 'zebra-blinds', label: 'Zebra Blinds' },
  { id: 'bamboo-hut', label: 'Bamboo Huts & Railings' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'Fine Weave Bamboo Chick for French Doors & Balcony',
    category: 'bamboo-chick',
    categoryLabel: 'Bamboo Chick',
    image: '/img/gallery/1.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/1.jpg',
    description: 'Precision handcrafted natural bamboo chick blind with dual pull-cord pulley system for smooth lifting. Provides natural cooling, glare filtering, and elegant balcony aesthetics.',
    features: [
      'Natural Seasoned Bamboo Slats',
      'Dual Pulley Smooth Roll-up',
      'UV & Heat Reflection',
      'Termite Resistant Treatment'
    ],
    specs: {
      material: 'Assam Natural Bamboo + Cotton Border Piping',
      warranty: '5-Year Guarantee on Weave & Cord',
      craftTime: '24-48 Hours Custom Sizing',
      bestFor: 'Balconies, French Windows, Glass Doors, Porches',
      priceGuide: '₹55 - ₹75 / sq. ft.'
    },
    location: 'Sector 137, Noida',
    badge: 'Popular'
  },
  {
    id: 'gallery-2',
    title: 'Warm Honey-Tone Bamboo Window Blinds',
    category: 'bamboo-chick',
    categoryLabel: 'Bamboo Chick',
    image: '/img/gallery/2.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/2.jpg',
    description: 'Warm honey-stained natural bamboo reed blind designed for living rooms, master bedrooms, and sunlit study areas. Balances natural daylight with complete interior privacy.',
    features: [
      'Warm Tone Natural Polish',
      'Soft Filtered Daylight',
      'Eco-friendly Sustainable Material',
      'Easy Dust-off Maintenance'
    ],
    specs: {
      material: 'Treated Reed Bamboo + Brass Locking Cleat',
      warranty: '5-Year Warranty',
      craftTime: '1-2 Days',
      bestFor: 'Living Rooms, Bedrooms, Study & Office Windows',
      priceGuide: '₹60 - ₹80 / sq. ft.'
    },
    location: 'Sector 78, Noida'
  },
  {
    id: 'gallery-3',
    title: 'Balcony Pergola Bamboo Chick Installation',
    category: 'bamboo-chick',
    categoryLabel: 'Bamboo Chick',
    image: '/img/gallery/3.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/3.jpg',
    description: 'Comprehensive high-rise balcony sun-shading solution fitted with custom wooden pergola supports. Deflects harsh direct afternoon sun while keeping ambient air circulating freely.',
    features: [
      'Full Balcony Perimeter Coverage',
      'Wind-Tolerant Bottom Anchorage',
      'Monsoon Water Repellent Finish',
      'Reduces Balcony Temperature by 4-6°C'
    ],
    specs: {
      material: 'Heavy-Duty Outer Slats + Nylon Weather Cord',
      warranty: '5-Year Anti-Fade Guarantee',
      craftTime: '2 Days',
      bestFor: 'High-Rise Balconies, Terrace Pergolas, Rooftop Patios',
      priceGuide: '₹65 - ₹85 / sq. ft.'
    },
    location: 'Greater Noida West (Noida Extension)',
    badge: 'Bestseller'
  },
  {
    id: 'gallery-4',
    title: 'High-Tensile Anti-Bird & Pigeon Safety Netting',
    category: 'safety-nets',
    categoryLabel: 'Bird & Pigeon Nets',
    image: '/img/gallery/4.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/4.jpg',
    description: 'Garware monofilament anti-bird safety net installed on apartment balcony railings. Effectively prevents pigeon nesting and droppings while preserving 100% panoramic outdoor view.',
    features: [
      'Nearly Invisible from 3+ Meters',
      'UV-Stabilized High Tensile Strength',
      'Humane Bird Protection (Zero Harm)',
      'Rust-Proof SS 304 Anchor Fasteners'
    ],
    specs: {
      material: 'Garware Monofilament HDPE / Nylon Netting',
      warranty: '3-Year Installation & Snap Warranty',
      craftTime: 'Same Day 2-3 Hours Installation',
      bestFor: 'Balconies, Utility Areas, Window AC Cavities, Ducts',
      priceGuide: '₹18 - ₹25 / sq. ft. (Installed)'
    },
    location: 'Sector 149, Greater Noida'
  },
  {
    id: 'gallery-5',
    title: 'Square Mesh Balcony & Child Safety Net',
    category: 'safety-nets',
    categoryLabel: 'Bird & Pigeon Nets',
    image: '/img/gallery/5.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/5.jpg',
    description: 'Heavy gauge square grid safety netting designed for high-altitude balconies. Prevents small birds, stray objects, and child/pet hazards while maintaining unrestricted airflow.',
    features: [
      'Reinforced Diamond/Square Knotted Grid',
      'High Impact Resistance',
      'Non-Obstructive Daylight & Airflow',
      'Certified Safe for Pets & Toddlers'
    ],
    specs: {
      material: 'UV-Coated Braided Copolymer + Galvanized Wire Base',
      warranty: '5-Year Durability Warranty',
      craftTime: 'Same Day On-Site Fitting',
      bestFor: 'Apartment Balconies, Open Shafts, Railings',
      priceGuide: '₹22 - ₹32 / sq. ft.'
    },
    location: 'Sector 62, Noida'
  },
  {
    id: 'gallery-6',
    title: 'Conical Thatch & Bamboo Gazebo Roof',
    category: 'bamboo-hut',
    categoryLabel: 'Bamboo Huts',
    image: '/img/gallery/6.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/6.jpg',
    description: 'Authentic handcrafted conical bamboo hut and gazebo roof structure. Perfect for terrace gardens, resorts, farmhouses, and outdoor cafeteria seating with natural weatherproofing.',
    features: [
      'Multi-Layer Waterproof Thatch & Bamboo Framework',
      'Natural Thermal Insulation (Keeps Interior Cool)',
      'Handcrafted Traditional Artisan Build',
      'Treated for Fire Retardancy and Termite Protection'
    ],
    specs: {
      material: 'Solid Structural Assam Bamboo + Eco Thatch + Waterproof Sublayer',
      warranty: '3-Year Structural Warranty',
      craftTime: '3-5 Days On-Site Assembly',
      bestFor: 'Farmhouses, Terrace Gardens, Resorts, Cafés, Lawn Gazebos',
      priceGuide: '₹180 - ₹280 / sq. ft. (Custom Quote)'
    },
    location: 'Noida Expressway Farmhouses',
    badge: 'Luxury'
  },
  {
    id: 'gallery-7',
    title: 'Terrace Garden Bamboo Hut & Relaxation Pavilion',
    category: 'bamboo-hut',
    categoryLabel: 'Bamboo Huts',
    image: '/img/gallery/7.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/7.jpg',
    description: 'Full custom bamboo cottage pavilion designed for residential rooftop terraces and private gardens. Combines solid bamboo poles with woven bamboo lattice walls.',
    features: [
      'Architectural Heavy-Duty Bamboo Columns',
      'Weather-Sealed Polyurethane Protective Coating',
      'Integrated Bench & Ambient Shade Design',
      'Eco-Friendly Green Building Material'
    ],
    specs: {
      material: 'Heavy Assam Bamboo Bamboos + Polished Bamboo Slats',
      warranty: '4-Year Warranty',
      craftTime: '4-6 Days',
      bestFor: 'Rooftop Gardens, Villas, Poolside Lounges',
      priceGuide: '₹200 - ₹320 / sq. ft.'
    },
    location: 'Sector 150, Noida'
  },
  {
    id: 'gallery-8',
    title: 'Solid Bamboo Balcony Railing & Safety Partition',
    category: 'bamboo-hut',
    categoryLabel: 'Bamboo Railings',
    image: '/img/gallery/8.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/8.jpg',
    description: 'Architectural bamboo railing and security barrier for balconies, verandas, and stairways. Delivers high strength, rustic sophistication, and eco-conscious perimeter security.',
    features: [
      'Solid Kiln-Dried Bamboo Poles',
      'Stainless Steel Anchor Mountings',
      'Smooth Touch Sanded & Sealed Finish',
      'High Load-Bearing Safety Factor'
    ],
    specs: {
      material: 'Grade-A Solid Bamboo + Metal Internal Connectors',
      warranty: '5-Year Warranty',
      craftTime: '2-3 Days',
      bestFor: 'Balcony Boundaries, Garden Walkways, Resort Staircases',
      priceGuide: '₹120 - ₹175 / running ft.'
    },
    location: 'Sector 93A, Noida'
  },
  {
    id: 'gallery-9',
    title: 'Custom High-Floor Balcony Bamboo Sunshade Screen',
    category: 'bamboo-chick',
    categoryLabel: 'Bamboo Chick',
    image: '/img/gallery/9.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/gallery/9.jpg',
    description: 'Specially engineered high-wind balcony bamboo screen for 15th+ floor apartments. Fitted with reinforced bottom tie-down loops and stainless steel pulleys to resist heavy monsoon gusts.',
    features: [
      'High Wind Stability Tie-Down Rings',
      'Dense Bamboo Weave for 85% Sunlight Block',
      'Heavy Duty Nylon Braided Cords',
      'Easy One-Hand Pull Operation'
    ],
    specs: {
      material: 'Seasoned Natural Assam Bamboo + Heavy Canvas Piping',
      warranty: '5-Year Guarantee',
      craftTime: '24-48 Hours',
      bestFor: 'High-Rise Apartments, Penthouses, Open Balconies',
      priceGuide: '₹62 - ₹82 / sq. ft.'
    },
    location: 'Sector 134, Noida',
    badge: 'High-Rise Special'
  },
  {
    id: 'service-1',
    title: 'Bamboo Chick Maker Craftsmanship',
    category: 'bamboo-chick',
    categoryLabel: 'Bamboo Chick',
    image: '/img/our-services/bamboo-chick.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-chick.jpg',
    description: 'Traditional Assam bamboo chicks crafted with precision for maximum heat, dust, and rain deflection while preserving natural ventilation and traditional Indian charm.',
    features: [
      'Eco-Friendly 100% Assam Bamboo',
      'Blocks 80-90% Direct Sun Heat',
      'Smooth Pulley Cord Operation',
      'Custom Measurements Available'
    ],
    specs: {
      material: 'Assam Bamboo + Poly-cotton Cord',
      warranty: '5-Year Warranty',
      craftTime: '1-2 Days',
      bestFor: 'Balconies, Verandas, Living Windows',
      priceGuide: '₹58 / sq. ft.'
    },
    location: 'Noida & Delhi NCR'
  },
  {
    id: 'service-2',
    title: 'Heavy-Duty Bamboo Fencing & Garden Partition',
    category: 'bamboo-fencing',
    categoryLabel: 'Bamboo Fencing',
    image: '/img/our-services/bamboo-fencing.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-fencing.jpg',
    description: 'Durable, weather-resistant bamboo fencing made from high-strength bamboo poles bound with galvanized wire. Ideal for garden boundaries, privacy partitions, and terrace screens.',
    features: [
      'Galvanized Rust-Proof Wire Binding',
      'Anti-Termite & Weather Sealed',
      '100% Privacy Boundary Solution',
      'Fast Professional On-Site Installation'
    ],
    specs: {
      material: 'Solid Bamboo Poles + Galvanized Steel Wire',
      warranty: '3-Year Warranty',
      craftTime: '2-3 Days',
      bestFor: 'Garden Boundaries, Terraces, Farmhouses, Cafes',
      priceGuide: '₹85 / sq. ft.'
    },
    location: 'Greater Noida & Faridabad'
  },
  {
    id: 'service-3',
    title: 'Custom Bamboo Chick Blinds with Fabric Trim',
    category: 'bamboo-chick',
    categoryLabel: 'Bamboo Chick',
    image: '/img/our-services/bamboo-chick-blinds.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-chick-blinds.jpg',
    description: 'Modern rollup bamboo blinds with decorative border tape. Perfect for blending natural warmth with modern architectural interiors in homes and cafes.',
    features: [
      'Reinforced Border Fabric Edge',
      'Precision Slat Alignment',
      'Smooth Lock & Release Cord Lock',
      'Variety of Border Colors'
    ],
    specs: {
      material: 'Fine Bamboo Reed + Canvas Border',
      warranty: '5-Year Warranty',
      craftTime: '2 Days',
      bestFor: 'Living Rooms, Sunrooms, Cafés, Offices',
      priceGuide: '₹68 / sq. ft.'
    },
    location: 'Noida Sector 128'
  },
  {
    id: 'service-4',
    title: 'Anti-Bird & Pigeon Safety Netting Solutions',
    category: 'safety-nets',
    categoryLabel: 'Bird & Pigeon Nets',
    image: '/img/our-services/anti-birds-safety-net.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/anti-birds-safety-net.jpg',
    description: 'Permanent anti-bird protection net engineered from UV-stabilized virgin polymer. Invisible look from ground level, humane protection with zero bird entanglement.',
    features: [
      'UV-Stabilized Weather Proof Polyethylene',
      'Zero Obstruction to Air and Sunlight',
      'Marine Grade Stainless Steel Clamps',
      'Humane & Bird-Safe Construction'
    ],
    specs: {
      material: 'Garware Monofilament 0.8mm-1.2mm',
      warranty: '3-Year Replacement Guarantee',
      craftTime: 'Same Day (2 Hours)',
      bestFor: 'Apartment Balconies, AC Outer Ducts, Windows',
      priceGuide: '₹20 / sq. ft.'
    },
    location: 'Noida Sector 74'
  },
  {
    id: 'service-5',
    title: 'Agro Green Shade Nets (50% to 90% Shade)',
    category: 'agro-nets',
    categoryLabel: 'Agro Shade Nets',
    image: '/img/our-services/agro-shade-nets.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/agro-shade-nets.jpg',
    description: 'High-density polyethylene agro shade nets providing controlled light diffusion and temperature reduction for terrace nurseries, gardens, parking shade, and construction sites.',
    features: [
      'UV-Stabilized Virgin HDPE Material',
      'Knitted Lock-Stitch Tear Resistance',
      '50%, 75%, and 90% Shade Factors Available',
      'Temperature Reduction by up to 6-8°C'
    ],
    specs: {
      material: '100% Virgin HDPE Knitted Monofilament',
      warranty: '3-Year UV Degradation Warranty',
      craftTime: '1 Day',
      bestFor: 'Terrace Gardens, Plant Nurseries, Car Parking, Balcony Sunshade',
      priceGuide: '₹14 - ₹28 / sq. ft.'
    },
    location: 'Greater Noida & Ghaziabad'
  },
  {
    id: 'service-6',
    title: 'Heavy Duty Balcony Pigeon Netting',
    category: 'safety-nets',
    categoryLabel: 'Bird & Pigeon Nets',
    image: '/img/our-services/pigeon-net.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/pigeon-net.jpg',
    description: 'Tough braided nylon pigeon nets designed specifically to prevent pigeon roosting, nesting, and droppings on high-rise residential balconies.',
    features: [
      'High Breaking Strength (25kg+ per strand)',
      'Weather Proof & UV Resistant',
      'Tightly Anchored Perimeter Cable',
      'Hygiene Protection for Balconies'
    ],
    specs: {
      material: 'Nylon Braided Twine + SS Anchor Hooks',
      warranty: '3-Year Guarantee',
      craftTime: 'Same-Day Install',
      bestFor: 'High-Rise Balconies, Ventilation Shafts',
      priceGuide: '₹22 / sq. ft.'
    },
    location: 'Noida Sector 121'
  },
  {
    id: 'service-7',
    title: 'Dual Day & Night Zebra Blinds',
    category: 'zebra-blinds',
    categoryLabel: 'Zebra Blinds',
    image: '/img/our-services/zebra-blinds.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/zebra-blinds.jpg',
    description: 'Modern zebra roller blinds with alternating translucent and opaque stripes for variable light control, visual privacy, and contemporary interior styling.',
    features: [
      'Precision Dual-Layer Light Control',
      'Smooth Roller Chain Mechanism',
      'Dust-Repellent Polyester Fabric',
      'Motorized Remote Option Available'
    ],
    specs: {
      material: '100% Premium Polyester + Aluminum Roller Cassette',
      warranty: '3-Year Mechanism Warranty',
      craftTime: '2-3 Days',
      bestFor: 'Offices, Modern Living Rooms, Bedrooms',
      priceGuide: '₹88 / sq. ft.'
    },
    location: 'Sector 18 & Sector 62, Noida'
  },
  {
    id: 'service-8',
    title: 'Artisan Handcrafted Bamboo Huts & Gazebos',
    category: 'bamboo-hut',
    categoryLabel: 'Bamboo Huts',
    image: '/img/our-services/bamboo-hut.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-hut.jpg',
    description: 'Custom designed eco-luxury bamboo huts, gazebos, and canopy structures built for resorts, farmhouse lawns, rooftop cafes, and residential terrace gardens.',
    features: [
      'Heavy Seasoned Bamboo Frame Structure',
      'Waterproof Thatch & Canvas Roofing',
      'Termite & Weather Sealed',
      'Complete Custom Architectural Layouts'
    ],
    specs: {
      material: 'Structural Assam Bamboo + Weatherproof Thatch',
      warranty: '3-Year Warranty',
      craftTime: '4-7 Days On-Site Build',
      bestFor: 'Farmhouses, Rooftop Cafés, Resorts, Gardens',
      priceGuide: '₹190 - ₹300 / sq. ft.'
    },
    location: 'Greater Noida & Delhi NCR'
  },
  {
    id: 'service-9',
    title: 'Natural Bamboo Railings & Balcony Barriers',
    category: 'bamboo-hut',
    categoryLabel: 'Bamboo Railings',
    image: '/img/our-services/bamboo-railing.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/our-services/bamboo-railing.jpg',
    description: 'Solid natural bamboo railings and perimeter fences for balconies, verandas, garden walkways, and staircase balustrades with weather-sealed finish.',
    features: [
      'High Tensile Structural Bamboo',
      'Smooth Sanded & Protective Clear Coat',
      'Sturdy Metal Ground Anchors',
      'Eco-Friendly Natural Elegance'
    ],
    specs: {
      material: 'Solid Assam Bamboo + SS Fixings',
      warranty: '5-Year Warranty',
      craftTime: '2-3 Days',
      bestFor: 'Balcony Boundaries, Garden Pathways, Resorts',
      priceGuide: '₹130 / running ft.'
    },
    location: 'Sector 149, Greater Noida'
  },
  {
    id: 'workshop-1',
    title: 'Master Craftsman Workshop & Handloom Weaving',
    category: 'bamboo-chick',
    categoryLabel: 'Craftsmanship',
    image: '/img/about-us.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/about-us.jpg',
    description: 'Inside our Noida artisan workshop where every bamboo chick, blind, and screen is meticulously handwoven using traditional Assam techniques refined over decades.',
    features: [
      '100% Traditional Handloom Weave',
      'Strict Quality Inspection of Slats',
      'Precision Knotting & Cord Alignment',
      'Custom Sizing to Exact Millimeters'
    ],
    specs: {
      material: 'Selected Assam Bamboo Slats',
      warranty: '5-Year Quality Guarantee',
      craftTime: 'Handcrafted on Order',
      bestFor: 'Custom Architecture & Bespoke Projects',
      priceGuide: 'Artisan Direct Factory Pricing'
    },
    location: 'Shiva Chick Maker Workshop, Greater Noida'
  },
  {
    id: 'showcase-1',
    title: 'Balcony Weather Shield & Privacy Installation',
    category: 'bamboo-chick',
    categoryLabel: 'Showcase',
    image: '/img/blog-image.jpg',
    fallbackImage: 'https://shivachickmaker.in/img/blog-image.jpg',
    description: 'On-site installation showcase of full-length bamboo chick blinds protecting a residential balcony from afternoon heat, torrential rain, and dust storms.',
    features: [
      'Full Height Sun & Weather Shield',
      'Reinforced Upper Header Rail',
      'Smooth Cord Lock Release',
      'Instant Privacy & Shading'
    ],
    specs: {
      material: 'Assam Bamboo + Anti-Rust Hardware',
      warranty: '5-Year Warranty',
      craftTime: '24 Hours Delivery & Fit',
      bestFor: 'High-Rise Balconies, Verandas',
      priceGuide: '₹60 / sq. ft.'
    },
    location: 'Sector 143, Noida'
  }
];

export const GALLERY_STATS = [
  { value: '5,000+', label: 'Installations Completed' },
  { value: '4.9 ★', label: 'Google Rating (Noida & NCR)' },
  { value: '100%', label: 'Assam Natural Bamboo' },
  { value: '5 Years', label: 'Replacement Warranty' },
];
