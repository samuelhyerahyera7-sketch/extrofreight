import Link from 'next/link'
import type { Metadata } from 'next'
import { PhoneCall, ClipboardList, Truck, PackageCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'How It Works | Extrofreight',
  description: 'How an Extrofreight home move or freight shipment works, from quote to delivery.',
}

const STEPS = [
  { Icon: PhoneCall, title: 'Free survey & quote', desc: 'Tell us about your move or shipment — on video or online — and get a transparent, written quote within one business day.' },
  { Icon: ClipboardList, title: 'Plan & pack', desc: 'We schedule your date and, for home moves, pack your belongings with the right materials for every item.' },
  { Icon: Truck, title: 'Move / transit day', desc: 'Our trained crews load, transport and deliver on time, with live tracking and updates along the way.' },
  { Icon: PackageCheck, title: 'Unpack & settle', desc: 'For moves, we unpack, assemble furniture, and clear away the boxes. For freight, we confirm proof of delivery.' },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <section className="bg-navy-900 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">How it works</h1>
          <p className="text-white/70">From first call to final delivery, here's exactly what to expect.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] route-line" />
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center mb-4 relative z-10 shadow-sm">
                <step.Icon className="w-7 h-7 text-orange-500" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">Step {i + 1}</span>
              <h3 className="font-bold text-navy-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Ready to get started?</h2>
        <p className="text-gray-500 mb-8">Get a written quote in minutes — no obligation, no hidden fees.</p>
        <Link href="/quote"><Button size="lg">Get a Free Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
      </section>
    </div>
  )
}
