import { Wrench, Building2, Home } from 'lucide-react';

const SERVICES = [
  {
    icon: Home,
    title: 'Residential Balcony Blinds',
    desc: 'Custom bamboo chick blinds for apartments, villas, and farmhouses with monsoon protection.',
  },
  {
    icon: Building2,
    title: 'Commercial & Café Screens',
    desc: 'Heavy-duty PVC screens and bamboo cladding for restaurants, offices, and retail spaces.',
  },
  {
    icon: Wrench,
    title: 'Repair & Re-Weaving',
    desc: 'Professional repair, pulley replacement, and full re-weaving for aging blinds.',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-sage-900 text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <Icon className="w-8 h-8 text-brand-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-stone-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
