import Link from 'next/link'
import {
  Home as HomeIcon, Truck, Globe2, Building2, ShieldCheck, Clock, MapPin, Star, Users,
  ArrowRight, PhoneCall, PackageCheck, ClipboardList, FileText, Package, Boxes,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const TRUST_ITEMS = [
  { Icon: ShieldCheck, title: 'Insured', desc: 'Your move is fully covered.' },
  { Icon: Users, title: 'Vetted Movers', desc: 'Experienced, reliable moving professionals.' },
  { Icon: MapPin, title: 'Live Tracking', desc: 'Track your move in real time.' },
  { Icon: FileText, title: 'Free Quotes', desc: 'No obligation, written quotes for every move.' },
]

const SERVICES = [
  {
    icon: HomeIcon,
    title: 'Home Moves',
    desc: 'Moving your home with care.',
    href: '/home-moving',
    image: '/images/home-moves.jpg',
  },
  {
    icon: Building2,
    title: 'Office Relocations',
    desc: "Minimise downtime. We'll handle it all.",
    href: '/services#office',
    image: '/images/office-relocations.jpg',
  },
  {
    icon: Package,
    title: 'Packing Services',
    desc: 'Professional packing for total protection.',
    href: '/home-moving',
    image: '/images/packing-services.jpg',
  },
  {
    icon: Globe2,
    title: 'Nationwide Service',
    desc: "Wherever you are in South Africa, we've got you covered.",
    href: '/services#freight',
    image: '/images/nationwide-service.jpg',
    fit: 'contain' as const,
  },
]

const MOVING_STEPS = [
  { Icon: PhoneCall, title: 'Free survey & quote', desc: 'Tell us about your move — in person, on video, or online — and get a transparent, written quote.' },
  { Icon: ClipboardList, title: 'Plan & pack', desc: 'We schedule your date and pack your belongings with the right materials for every item.' },
  { Icon: Truck, title: 'Move day', desc: 'Our trained crews load, transport and deliver on time, with live updates along the way.' },
  { Icon: PackageCheck, title: 'Unpack & settle', desc: 'We unpack, assemble furniture, and clear away the boxes so you can just move in.' },
]

const TESTIMONIALS = [
  { name: 'Naledi M.', role: 'Home move, Johannesburg → Cape Town', quote: 'Extrofreight packed our entire house in a day and nothing arrived broken. The crew was careful and genuinely kind.' },
  { name: 'Riaan P.', role: 'Office relocation, Pretoria', quote: 'We moved 40 staff over a weekend with zero downtime on Monday morning. Communication was excellent throughout.' },
  { name: 'Thandiwe K.', role: 'Freight client, national retailer', quote: 'Reliable dedicated-truck lanes and real-time tracking. Extrofreight is now our default carrier for inland freight.' },
]

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-white h-[460px] sm:h-[560px] lg:h-[640px] flex items-center">
        <div className="absolute inset-0 flex justify-end overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-moving.jpg"
            alt="Extrofreight movers loading a truck outside a family home"
            className="h-full w-auto max-w-none"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.5) 38%, black 58%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.5) 38%, black 58%)',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative w-full">
          <div className="fade-up relative z-10 max-w-lg">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-navy-900 leading-[1.05] mb-6">
              Moving made <span className="text-orange-500">simple.</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Professional home and office moving services you can trust. Book in minutes and
              we&apos;ll take care of the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button size="lg" className="w-full sm:w-auto bg-navy-900 hover:bg-navy-800 text-white">
                  Get a Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto border border-orange-300 text-orange-600 bg-white hover:bg-orange-50">
                  <FileText className="w-4 h-4 mr-2" /> How Pricing Works
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 absolute left-0 right-0 bottom-0 translate-y-1/2 z-10">
          <div className="bg-navy-900 rounded-2xl px-6 sm:px-10 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_ITEMS.map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <item.Icon className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-white/60 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* spacer to account for the trust bar overlapping below the hero */}
      <div className="h-[92px] sm:h-[68px]" />

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">Moving solutions for every need.</h2>
          <p className="text-gray-500 mt-3">From home moves to office relocations, we make every move seamless.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(s => (
            <Link href={s.href} key={s.title}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-200 p-0">
                <div className={`relative h-56 ${s.fit === 'contain' ? 'bg-gray-100' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.title}
                    className={`absolute inset-0 w-full h-full ${s.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  />
                  <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-xl bg-navy-900 text-white flex items-center justify-center shadow-md">
                    <s.icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                </div>
                <div className="p-5 pt-8">
                  <h3 className="font-bold text-navy-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
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
                'Detailed, written quotes — no surprise fees on move day',
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
              Get a written, no-obligation quote in minutes — for a home move, an office relocation, or a freight lane.
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
