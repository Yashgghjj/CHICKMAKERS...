import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const FAQS = [
  { q: 'How do I measure my balcony for bamboo chick blinds?', a: 'Measure width and height in feet and inches at the widest points. We also offer free laser measurement visits across major metros for precision sizing.' },
  { q: 'What is the minimum order size?', a: 'Most bamboo chick products have a 12 sq.ft minimum billing area. Smaller windows are billed at the minimum rate to cover artisan setup costs.' },
  { q: 'How long does production take?', a: 'Standard bamboo chick blinds take 2-3 craft days. Premium wooden venetian blinds may take 4-5 days. Installation is scheduled within 7 days of order confirmation.' },
  { q: 'Are the blinds monsoon-proof?', a: 'Our natural bamboo blinds include optional waterproof PVC coating (+₹12/sq.ft). For heavy monsoon areas, we recommend our Dual-Layer PVC Monsoon Balcony Blinds.' },
  { q: 'What warranty do you provide?', a: 'All bamboo chick blinds come with a 5-year warranty covering weave integrity, hardware, and installation. Pigeon nets carry a 3-year warranty on net material.' },
  { q: 'Do you offer Cash on Delivery?', a: 'Yes! Pay on Installation (COD) is available with a 20% advance at booking. Balance is collected after successful mounting and demo.' },
  { q: 'Which cities do you serve?', a: 'We currently serve Delhi NCR (Delhi, Noida, Gurgaon, Faridabad, Ghaziabad), Mumbai, Bengaluru, Pune, and Hyderabad with free delivery and installation.' },
  { q: 'Can I customize the color or pattern?', a: 'Yes! We offer multiple bamboo finishes (Natural, Smoked, Walnut) and border tape colors. Premium products also support custom stain matching.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-sage-900 via-sage-800 to-brand-900 text-white py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
            <HelpCircle className="w-9 h-9 text-brand-300" /> Frequently Asked Questions
          </h1>
          <p className="text-stone-300 max-w-xl">
            Everything you need to know about our products, pricing, and installation.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="stagger-card border border-stone-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium hover:bg-stone-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 text-sm font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-300 shrink-0 ml-2 ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div className="accordion-body px-5 pb-5 text-sm text-stone-600 leading-relaxed pl-14">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
