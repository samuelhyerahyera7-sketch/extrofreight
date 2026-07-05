import type { Metadata } from 'next'
import Link from 'next/link'
import { Target, Eye, Users, Award, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us | Extrofreight',
  description: 'Extrofreight started as a freight carrier and grew into a full logistics and home moving company trusted nationwide.',
}

const VALUES = [
  { Icon: Target, title: 'Reliability first', desc: 'On-time performance is our core metric, not an afterthought.' },
  { Icon: Eye, title: 'Full transparency', desc: 'Fixed quotes and clear tracking — you always know where your goods are.' },
  { Icon: Users, title: 'Trained crews', desc: 'Every driver and mover is vetted, trained and insured.' },
  { Icon: Award, title: 'Continuous improvement', desc: 'We invest in fleet, technology and training every year.' },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-navy-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">Built on freight. Trusted with your home.</h1>
          <p className="text-white/70 leading-relaxed">
            Extrofreight began as a regional freight carrier moving goods for businesses across the
            country. Today, we bring that same logistics discipline — route planning, tracking,
            trained crews — to home moving, making it our flagship service alongside our freight and
            warehousing operations.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="p-8">
          <h2 className="text-2xl font-extrabold text-navy-900 mb-3">Our mission</h2>
          <p className="text-gray-500 leading-relaxed">
            To move people and businesses forward — literally — by delivering logistics and moving
            services that are on time, fully insured, and free of surprises.
          </p>
        </Card>
        <Card className="p-8">
          <h2 className="text-2xl font-extrabold text-navy-900 mb-3">Our vision</h2>
          <p className="text-gray-500 leading-relaxed">
            To be the most trusted name in home moving and logistics, known for treating every home
            and every shipment with the same care.
          </p>
        </Card>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-extrabold text-navy-900 text-center mb-12">What drives us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-navy-900 text-white flex items-center justify-center mx-auto mb-4">
                  <v.Icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Want to work with us?</h2>
        <p className="text-gray-500 mb-8">Get a fixed quote for your move or shipment today.</p>
        <Link href="/quote"><Button size="lg">Get a Free Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
      </section>
    </div>
  )
}
