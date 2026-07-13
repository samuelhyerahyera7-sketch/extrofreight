import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight, PhoneCall, ClipboardList, Video, FileText,
  Ruler, MapPin, Calendar, Boxes, ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Quote Options',
  description: 'No fixed price lists — every move or shipment is quoted individually based on your needs. See the ways you can get a free Extrofreight quote.',
}

const QUOTE_WAYS = [
  {
    Icon: ClipboardList,
    title: 'Online quote form',
    desc: 'Answer a few quick questions about your move and get a written quote back within one business day.',
  },
  {
    Icon: Video,
    title: 'Video survey',
    desc: 'Book a video walkthrough with a move coordinator for an accurate, no-obligation quote on bigger moves.',
  },
  {
    Icon: PhoneCall,
    title: 'Call for an estimate',
    desc: 'Speak to a coordinator directly for a fast ballpark estimate on freight, office moves or home relocations.',
  },
]

const FACTORS = [
  { Icon: Boxes, title: 'Size of your move', desc: 'Number of rooms or volume of freight to be moved.' },
  { Icon: MapPin, title: 'Distance', desc: 'Local, regional or long-distance routes affect transport cost.' },
  { Icon: Ruler, title: 'Access', desc: 'Stairs, lifts, parking and distance from truck to door.' },
  { Icon: Calendar, title: 'Moving date', desc: 'Weekday, weekend and month-end availability can affect scheduling.' },
  { Icon: ShieldCheck, title: 'Insurance level', desc: 'Standard carrier cover or comprehensive move insurance.' },
  { Icon: FileText, title: 'Extra services', desc: 'Packing, storage, or specialist handling for fragile items.' },
]

export default function PricingPage() {
  return (
    <div className="bg-white">
      <section className="bg-navy-900 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Every move is quoted individually</h1>
          <p className="text-white/70">
            We don't publish a fixed price list — no two moves are the same. Tell us what you need and
            we'll send a written, no-obligation quote.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Ways to get a quote</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">Pick whichever's easiest for you</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUOTE_WAYS.map(w => (
            <Card key={w.title} className="p-6">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-4">
                <w.Icon className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-navy-900 mb-2">{w.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{w.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">What affects your quote</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">No two moves cost the same</h2>
            <p className="text-gray-500 mt-3">These are the main things a coordinator will ask about when quoting your move.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACTORS.map(f => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center shrink-0">
                  <f.Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Ready for your quote?</h2>
        <p className="text-gray-500 mb-8">No obligation, no hidden fees — just an honest, written quote.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/quote"><Button size="lg">Get a Free Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
          <a href="tel:+27813756494"><Button size="lg" variant="secondary"><PhoneCall className="w-4 h-4 mr-2" /> Call 081 375 6494</Button></a>
        </div>
      </section>
    </div>
  )
}
