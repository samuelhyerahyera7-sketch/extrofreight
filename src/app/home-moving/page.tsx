import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Home as HomeIcon, Building, Warehouse as WarehouseIcon, ArrowRight, Check, ShieldCheck,
  PackageCheck, Truck, Sofa, PhoneCall, Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Home Moving Services | Extrofreight',
  description: 'Full-service home moving — local & long-distance, packing, storage and office relocation. Written quotes, insured crews, on-time delivery.',
}

const MOVE_TYPES = [
  { Icon: HomeIcon, title: 'Local Moves', desc: 'Moving within the same city or metro area, usually completed in a single day.' },
  { Icon: Truck, title: 'Long-Distance Moves', desc: 'Cross-province and interstate moves with dedicated route planning and tracking.' },
  { Icon: Building, title: 'Apartment & Complex Moves', desc: 'Lift bookings, parking permits and building coordination handled for you.' },
  { Icon: WarehouseIcon, title: 'Storage & Transit', desc: 'Secure short or long-term storage when your move and move-in dates don\'t line up.' },
]

const PLANS = [
  {
    name: 'Essential',
    desc: 'For small apartments & studios moving locally.',
    features: ['Truck & 2-person crew', 'Loading & unloading', 'Basic furniture blankets', 'Local moves up to 20km'],
  },
  {
    name: 'Complete',
    desc: 'Our most popular option for full households.',
    features: ['Truck & 4-person crew', 'Full packing service', 'Furniture disassembly/reassembly', 'Move insurance included', 'Local & regional moves'],
    featured: true,
  },
  {
    name: 'Premium',
    desc: 'For large homes, long-distance or high-value moves.',
    features: ['Dedicated move coordinator', 'Full-service packing & unpacking', 'Climate-aware storage option', 'White-glove handling for fragiles/antiques', 'Nationwide long-distance coverage'],
  },
]

const CHECKLIST = [
  '6-8 weeks before: Book your move date and get your written quote',
  '3-4 weeks before: Declutter, start using up food, and notify service providers',
  '1-2 weeks before: We deliver packing materials and confirm your move-day timeline',
  'Move day: Our crew arrives on time, protects your home, and loads with care',
  'After: We unpack, reassemble furniture, and remove all packaging',
]

const FAQ = [
  { q: 'How far in advance should I book?', a: 'We recommend 2-4 weeks for local moves and 4-6 weeks for long-distance moves, especially at month-end. Same-week bookings are often possible — ask us.' },
  { q: 'Is my move insured?', a: 'Yes. Every move on our Complete and Premium plans includes comprehensive move insurance. Basic carrier liability cover is included on all plans as standard.' },
  { q: 'Do you provide packing materials?', a: 'Yes, boxes, tape, bubble wrap and wardrobe cartons are available to purchase or included depending on your plan.' },
  { q: 'Can you move pianos, safes or antiques?', a: 'Yes, our Premium plan includes specialist handling and equipment for heavy, fragile or high-value items.' },
]

export default function HomeMovingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 85% 15%, #f5711b 0, transparent 40%)'
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative">
          <Badge className="mb-5">Flagship service</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 max-w-2xl leading-tight">
            Home moving that runs like a freight operation
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
            Packing, loading, transport and unpacking — handled by trained crews, tracked in real time,
            and backed by the same logistics network we use to move freight nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/quote"><Button size="lg">Get My Moving Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            <a href="tel:+27813756494"><Button size="lg" variant="outline"><PhoneCall className="w-4 h-4 mr-2" /> Speak to a Move Coordinator</Button></a>
          </div>
        </div>
      </section>

      {/* Move types */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Every kind of move</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">Wherever you're headed, we'll get you there</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOVE_TYPES.map(t => (
            <Card key={t.title} className="p-6">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-4">
                <t.Icon className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-navy-900 mb-2">{t.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Service tiers */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Service levels</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">Pick the level of service that fits your move</h2>
            <p className="text-gray-500 mt-3">We don't publish fixed prices — every move gets its own written quote based on your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
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
                <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/quote">
                  <Button className="w-full" variant={plan.featured ? 'default' : 'secondary'}>
                    Request a Quote
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist + trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Your moving timeline</p>
          <h2 className="text-3xl font-extrabold text-navy-900 mb-6">What to expect, start to finish</h2>
          <ol className="space-y-5">
            {CHECKLIST.map((item, i) => (
              <li key={item} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-navy-900 text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <p className="text-sm text-gray-700 leading-relaxed pt-1">{item}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-5">
          <Card className="p-6 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-orange-500 shrink-0" />
            <div>
              <h3 className="font-bold text-navy-900 mb-1">Fully insured moves</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Every item is covered from the moment it leaves your door to the moment it's placed in your new home.</p>
            </div>
          </Card>
          <Card className="p-6 flex items-start gap-4">
            <PackageCheck className="w-8 h-8 text-orange-500 shrink-0" />
            <div>
              <h3 className="font-bold text-navy-900 mb-1">Professional packing</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Trained packers use the right materials for electronics, glassware, art and everything in between.</p>
            </div>
          </Card>
          <Card className="p-6 flex items-start gap-4">
            <Sofa className="w-8 h-8 text-orange-500 shrink-0" />
            <div>
              <h3 className="font-bold text-navy-900 mb-1">Furniture care</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Disassembly, blanket-wrapping and reassembly included on Complete and Premium plans.</p>
            </div>
          </Card>
          <Card className="p-6 bg-navy-900 border-none flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
            </div>
            <p className="text-white text-sm font-semibold">4.9/5 average rating across 3,200+ home moves</p>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-navy-900 text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQ.map(item => (
              <Card key={item.q} className="p-6">
                <h3 className="font-bold text-navy-900 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-4">Let's plan your move</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">Get a written quote in minutes — no obligation, no hidden fees.</p>
        <Link href="/quote"><Button size="lg">Get a Free Moving Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
      </section>
    </div>
  )
}
