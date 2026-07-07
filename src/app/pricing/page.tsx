import Link from 'next/link'
import type { Metadata } from 'next'
import { Check, ArrowRight, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Pricing | Extrofreight',
  description: 'Fixed, transparent pricing for home moving, office relocation, freight and warehousing.',
}

const MOVING_PLANS = [
  {
    name: 'Essential',
    price: 'From R2,499',
    desc: 'For small apartments & studios moving locally.',
    features: ['Truck & 2-person crew', 'Loading & unloading', 'Basic furniture blankets', 'Local moves up to 20km'],
  },
  {
    name: 'Complete',
    price: 'From R5,999',
    desc: 'Our most popular plan for full households.',
    features: ['Truck & 4-person crew', 'Full packing service', 'Furniture disassembly/reassembly', 'Move insurance included', 'Local & regional moves'],
    featured: true,
  },
  {
    name: 'Premium',
    price: 'Custom quote',
    desc: 'For large homes, long-distance or high-value moves.',
    features: ['Dedicated move coordinator', 'Full-service packing & unpacking', 'Climate-aware storage option', 'White-glove handling for fragiles/antiques', 'Nationwide long-distance coverage'],
  },
]

const OTHER_PRICING = [
  { name: 'Office Relocation', price: 'Custom quote', desc: 'Priced per project based on floor size, equipment and timeline.' },
  { name: 'Freight (LTL / FTL)', price: 'Per lane', desc: 'Quoted per shipment based on weight, volume and route.' },
  { name: 'Warehousing & Storage', price: 'From R450/month', desc: 'Per pallet or per cubic metre, month-to-month or contract.' },
]

export default function PricingPage() {
  return (
    <div className="bg-white">
      <section className="bg-navy-900 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Simple, fixed pricing</h1>
          <p className="text-white/70">No hidden fees. Every quote is confirmed in writing before the job starts.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-2xl font-extrabold text-navy-900 text-center mb-12">Home Moving Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOVING_PLANS.map(plan => (
            <Card
              key={plan.name}
              className={`p-8 flex flex-col ${plan.featured ? 'border-orange-400 ring-2 ring-orange-200 shadow-lg relative' : ''}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <h3 className="font-bold text-navy-900 text-xl mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
              <p className="text-3xl font-extrabold text-navy-900 mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/quote">
                <Button className="w-full" variant={plan.featured ? 'default' : 'secondary'}>
                  Choose {plan.name}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-navy-900 text-center mb-12">Freight & Business Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OTHER_PRICING.map(item => (
              <Card key={item.name} className="p-6">
                <h3 className="font-bold text-navy-900 mb-1">{item.name}</h3>
                <p className="text-xl font-extrabold text-orange-600 mb-3">{item.price}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Not sure which plan you need?</h2>
        <p className="text-gray-500 mb-8">Tell us about your move or shipment and we'll recommend the right option.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/quote"><Button size="lg">Get a Free Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
          <a href="tel:+27110000000"><Button size="lg" variant="secondary"><PhoneCall className="w-4 h-4 mr-2" /> Call +27 11 000 0000</Button></a>
        </div>
      </section>
    </div>
  )
}
