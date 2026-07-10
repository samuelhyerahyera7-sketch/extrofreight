import Link from 'next/link'
import type { Metadata } from 'next'
import { Truck, Building2, Warehouse, PackageSearch, ArrowRight, Check, Globe2, ThermometerSnowflake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Freight & Logistics Services | Extrofreight',
  description: 'Shared-load and dedicated-truck freight, office relocation, warehousing, storage and shipment tracking — nationwide logistics from Extrofreight.',
}

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Freight & Logistics</h1>
          <p className="text-white/70 max-w-xl">
            The backbone behind our home moving service — full freight, warehousing and distribution
            capability for businesses of every size.
          </p>
        </div>
      </section>

      <section id="freight" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-4">
            <Truck className="w-6 h-6" strokeWidth={1.75} />
          </div>
          <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Freight, small or large</h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            Whether you're shipping a single pallet or need a whole truck to yourself, our network of
            owned and partner vehicles keeps your freight moving on optimized routes with live tracking.
          </p>
          <ul className="space-y-3">
            {['Shared-truck shipments (LTL) for smaller loads — you only pay for the space you use', 'A dedicated truck just for your shipment (FTL) for larger loads', 'Cross-province & regional lanes', 'Real-time GPS tracking on every load'].map(f => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <Card className="overflow-hidden p-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/nationwide-service.jpg" alt="Extrofreight truck on a national highway" className="w-full h-56 object-cover" />
          <div className="p-6">
            <Globe2 className="w-8 h-8 text-orange-500 mb-3" />
            <p className="text-2xl font-extrabold text-navy-900 mb-1">Nationwide coverage</p>
            <p className="text-sm text-gray-500">9 provinces, daily departures from our main depots.</p>
          </div>
        </Card>
      </section>

      <section id="office" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Card className="p-8 order-2 lg:order-1">
            <PackageSearch className="w-10 h-10 text-orange-500 mb-4" />
            <p className="text-2xl font-extrabold text-navy-900 mb-1">Zero downtime moves</p>
            <p className="text-sm text-gray-500">We move overnight or on weekends so your team is back at their desks Monday morning.</p>
          </Card>
          <div className="order-1 lg:order-2">
            <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Office & Commercial Relocation</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              From single-floor offices to multi-site corporate moves, we handle IT equipment,
              furniture and sensitive documents with dedicated project management.
            </p>
            <ul className="space-y-3">
              {['Dedicated relocation project manager', 'IT & equipment de/re-installation', 'After-hours & weekend scheduling', 'Secure document & asset chain-of-custody'].map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="warehousing" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-4">
            <Warehouse className="w-6 h-6" strokeWidth={1.75} />
          </div>
          <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Warehousing & Storage</h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            Secure, monitored storage for both business inventory and household goods in transit —
            short-term bridging storage or long-term contracts.
          </p>
          <ul className="space-y-3">
            {['24/7 monitored facilities', 'Short & long-term contracts', 'Inventory management on request', 'Direct freight-to-storage handoff'].map(f => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <Card className="p-8 bg-gray-50">
          <ThermometerSnowflake className="w-10 h-10 text-orange-500 mb-4" />
          <p className="text-2xl font-extrabold text-navy-900 mb-1">Climate-aware storage</p>
          <p className="text-sm text-gray-500">Available for sensitive goods, electronics and furniture.</p>
        </Card>
      </section>

      <section className="bg-navy-900 py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Need a freight or logistics quote?</h2>
          <p className="text-white/70 mb-8">Tell us your lane, volume and timeline — we'll get back to you within one business day.</p>
          <Link href="/quote"><Button size="lg">Request a Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
        </div>
      </section>
    </div>
  )
}
