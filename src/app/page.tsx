import Link from 'next/link'
import {
  Home as HomeIcon, Truck, Warehouse, Building2, ShieldCheck, Clock, MapPin, Star,
  ArrowRight, PhoneCall, PackageCheck, ClipboardList, Sparkles, Boxes,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const STATS = [
  { value: '12,000+', label: 'Moves & shipments completed' },
  { value: '9', label: 'Provinces covered' },
  { value: '4.9/5', label: 'Average customer rating' },
  { value: '24/7', label: 'Dispatch & support' },
]

const SERVICES = [
  {
    icon: HomeIcon,
    title: 'Home Moving',
    desc: 'Full-service residential moves — packing, loading, transport & unpacking, done with white-glove care.',
    href: '/home-moving',
    featured: true,
  },
  {
    icon: Building2,
    title: 'Office Relocation',
    desc: 'Minimal downtime moves for businesses, with weekend & after-hours scheduling.',
    href: '/services#office',
  },
  {
    icon: Truck,
    title: 'Freight (LTL / FTL)',
    desc: 'Less-than-truckload and full-truckload freight across the country, tracked door to door.',
    href: '/services#freight',
  },
  {
    icon: Warehouse,
    title: 'Warehousing & Storage',
    desc: 'Short and long-term storage with secure, climate-aware facilities.',
    href: '/services#warehousing',
  },
]

const MOVING_STEPS = [
  { Icon: PhoneCall, title: 'Free survey & quote', desc: 'Tell us about your move — in person, on video, or online — and get a transparent, fixed quote.' },
  { Icon: ClipboardList, title: 'Plan & pack', desc: 'We schedule your date and pack your belongings with the right materials for every item.' },
  { Icon: Truck, title: 'Move day', desc: 'Our trained crews load, transport and deliver on time, with live updates along the way.' },
  { Icon: PackageCheck, title: 'Unpack & settle', desc: 'We unpack, assemble furniture, and clear away the boxes so you can just move in.' },
]

const TESTIMONIALS = [
  { name: 'Naledi M.', role: 'Home move, Johannesburg → Cape Town', quote: 'Extrofreight packed our entire house in a day and nothing arrived broken. The crew was careful and genuinely kind.' },
  { name: 'Riaan P.', role: 'Office relocation, Pretoria', quote: 'We moved 40 staff over a weekend with zero downtime on Monday morning. Communication was excellent throughout.' },
  { name: 'Thandiwe K.', role: 'Freight client, national retailer', quote: 'Reliable FTL lanes and real-time tracking. Extrofreight is now our default carrier for inland freight.' },
]

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, #f5711b 0, transparent 40%), radial-gradient(circle at 80% 60%, #1a3563 0, transparent 45%)'
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 relative">
          <div className="max-w-2xl fade-up">
            <Badge variant="outline" className="mb-5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Now booking home moves nationwide
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] mb-6">
              We move your <span className="text-orange-500">home</span>, your business, and everything between.
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Extrofreight is a full-service logistics company built on freight — now bringing that same
              reliability to home moving. Fixed quotes, trained crews, and real-time tracking from the
              first box to the last mile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button size="lg" className="w-full sm:w-auto">
                  Get a Free Moving Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Freight & Logistics
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-navy-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs sm:text-sm text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">What we do</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">One company, every kind of move</h2>
          <p className="text-gray-500 mt-3">From a single household to a nationwide supply chain — we've built the fleet and the crews to handle it.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(s => (
            <Link href={s.href} key={s.title}>
              <Card className={`h-full p-6 hover:shadow-lg transition-shadow duration-200 ${s.featured ? 'border-orange-300 ring-1 ring-orange-200 bg-orange-50/30' : ''}`}>
                {s.featured && <Badge className="mb-3">Flagship service</Badge>}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.featured ? 'bg-orange-500 text-white' : 'bg-navy-900 text-white'}`}>
                  <s.icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                <span className="text-sm font-semibold text-orange-600 inline-flex items-center gap-1">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Home Moving spotlight */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Our flagship service</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-5">Home moving, done the freight-company way</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Most movers are small crews with a truck. We're a logistics company — which means your move
              gets the same route planning, tracking and insurance backbone we use for national freight.
              That's fewer surprises, and a move that actually arrives when we say it will.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Fixed, itemized quotes — no surprise fees on move day',
                'Full-service packing with proper materials for fragile & high-value items',
                'GPS-tracked trucks with live ETA updates',
                'Comprehensive move insurance included as standard',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <PackageCheck className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/home-moving">
              <Button size="lg">See Home Moving Services <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-navy-900 text-white">
              <Boxes className="w-8 h-8 text-orange-500 mb-3" />
              <p className="text-2xl font-extrabold">98.4%</p>
              <p className="text-xs text-white/60 mt-1">On-time delivery rate</p>
            </Card>
            <Card className="p-6">
              <ShieldCheck className="w-8 h-8 text-orange-500 mb-3" />
              <p className="text-2xl font-extrabold text-navy-900">Fully insured</p>
              <p className="text-xs text-gray-500 mt-1">Every move, every item</p>
            </Card>
            <Card className="p-6">
              <Clock className="w-8 h-8 text-orange-500 mb-3" />
              <p className="text-2xl font-extrabold text-navy-900">Same-week</p>
              <p className="text-xs text-gray-500 mt-1">Booking available</p>
            </Card>
            <Card className="p-6 bg-orange-500 text-white">
              <MapPin className="w-8 h-8 mb-3" />
              <p className="text-2xl font-extrabold">Nationwide</p>
              <p className="text-xs text-white/80 mt-1">Coverage, door to door</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">Your move, in four steps</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] route-line" />
          {MOVING_STEPS.map((step, i) => (
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

      {/* Testimonials */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Trusted by thousands</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What our customers say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <Card key={t.name} className="bg-white/5 border-white/10 p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/50 text-xs">{t.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-orange-500 rounded-3xl px-8 py-14 sm:px-16 text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to move? Let's talk.</h2>
            <p className="text-white/90 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Get a fixed, no-obligation quote in minutes — for a home move, an office relocation, or a freight lane.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote">
                <Button size="lg" variant="navy" className="w-full sm:w-auto">
                  Get a Free Quote
                </Button>
              </Link>
              <a href="tel:+27110000000">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/50">
                  <PhoneCall className="w-4 h-4 mr-2" /> Call +27 11 000 0000
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
