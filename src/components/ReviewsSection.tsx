import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Priya Sharma', city: 'Noida', rating: 5, text: 'Beautiful bamboo blinds for our 12ft balcony. The laser measurement was spot-on and installation was professional.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { name: 'Rahul Mehta', city: 'Mumbai', rating: 5, text: 'Monsoon PVC blinds saved our balcony furniture. Survived heavy rains without any leakage.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { name: 'Anita Desai', city: 'Bengaluru', rating: 5, text: 'Love tracking my order through the weaving process. Felt connected to the artisan craftsmanship.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop' },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 bg-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-sage-900 mb-3">Customer Stories</h2>
          <p className="text-stone-500">Verified reviews from homeowners across India</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <div className="flex items-center gap-3 mb-4">
                <img src={r.photo} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-stone-400">{r.city}</p>
                </div>
              </div>
              <div className="flex text-amber-500 mb-3">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
