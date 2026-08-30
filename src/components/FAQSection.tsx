import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  { q: 'How do I measure my balcony for bamboo chick blinds?', a: 'Measure width and height in feet and inches at the widest points. We also offer free laser measurement visits across major metros for precision sizing.' },
  { q: 'What is the minimum order size?', a: 'Most bamboo chick products have a 12 sq.ft minimum billing area. Smaller windows are billed at the minimum rate to cover artisan setup costs.' },
  { q: 'How long does production take?', a: 'Standard bamboo chick blinds take 2-3 craft days. Premium wooden venetian blinds may take 4-5 days. Installation is scheduled within 7 days of order confirmation.' },
  { q: 'Are the blinds monsoon-proof?', a: 'Our natural bamboo blinds include optional waterproof PVC coating (+₹12/sq.ft). For heavy monsoon areas, we recommend our Dual-Layer PVC Monsoon Balcony Blinds.' },
  { q: 'What warranty do you provide?', a: 'All bamboo chick blinds come with a 5-year warranty covering weave integrity, hardware, and installation. Pigeon nets carry a 3-year warranty on net material.' },
  { q: 'Do you offer Cash on Delivery?', a: 'Yes! Pay on Installation (COD) is available with a 20% advance at booking. Balance is collected after successful mounting and demo.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-sage-900 mb-3">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-stone-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-stone-50"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-sm text-stone-600 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
