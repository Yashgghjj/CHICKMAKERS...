import { Star, Quote } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const REVIEWS = [
  { name: 'Priya Sharma', city: 'Noida', rating: 5, text: 'Beautiful bamboo blinds for our 12ft balcony. The laser measurement was spot-on and installation was professional. The craftsmen were so skilled!', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', product: 'Natural Assam Bamboo Chick' },
  { name: 'Rahul Mehta', city: 'Mumbai', rating: 5, text: 'Monsoon PVC blinds saved our balcony furniture. Survived heavy rains without any leakage. The quality is exceptional.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', product: 'Heavy-Duty Monsoon Blinds' },
  { name: 'Anita Desai', city: 'Bengaluru', rating: 5, text: 'Love tracking my order through the weaving process. Felt connected to the artisan craftsmanship. Would highly recommend.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', product: 'Bamboo Fencing' },
  { name: 'Vikram Singh', city: 'Delhi', rating: 5, text: 'The Somfy motorized blinds are a game changer. Opens with a remote, closes automatically during rain. Premium quality.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', product: 'Zebra Roller Blinds' },
  { name: 'Meera Patel', city: 'Pune', rating: 5, text: 'Got pigeon nets installed for our entire apartment. Nearly invisible and very sturdy. The team was professional and quick.', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', product: 'Pigeon Safety Netting' },
  { name: 'Arjun Nair', city: 'Hyderabad', rating: 5, text: 'Ordered wooden venetian blinds for our living room. The basswood quality is premium and the cordless mechanism is smooth.', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', product: 'Wooden Venetian Blinds' },
];

export default function ReviewsPage() {
  return (
    <PageTransition>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-sage-900 via-sage-800 to-brand-900 text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Customer Stories</h1>
          <p className="text-stone-300 max-w-xl">
            Verified reviews from homeowners across India who transformed their spaces with ChickMakers.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-center">
            <div className="stagger-card">
              <p className="text-3xl font-bold text-sage-900">4.9</p>
              <div className="flex text-amber-500 justify-center my-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-stone-500">Average Rating</p>
            </div>
            <div className="stagger-card">
              <p className="text-3xl font-bold text-sage-900">2,400+</p>
              <p className="text-xs text-stone-500 mt-2">Happy Customers</p>
            </div>
            <div className="stagger-card">
              <p className="text-3xl font-bold text-sage-900">12</p>
              <p className="text-xs text-stone-500 mt-2">Cities Served</p>
            </div>
          </div>

          {/* Reviews grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="stagger-card card-interactive bg-white p-6 rounded-2xl border border-stone-100 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-100" />
                <div className="flex items-center gap-3 mb-4">
                  <img src={r.photo} alt={r.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-100" />
                  <div>
                    <p className="font-semibold text-sage-900">{r.name}</p>
                    <p className="text-xs text-stone-400">{r.city}</p>
                  </div>
                </div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mb-3">"{r.text}"</p>
                <span className="inline-block text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded-full font-medium">{r.product}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
