import type { Metadata } from 'next'
import { PhoneCall, Mail, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import QuoteForm from './QuoteForm'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Extrofreight',
  description: 'Request a free, no-obligation quote for home moving, office relocation, freight or warehousing.',
}

export default function QuotePage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-4">Get a free quote</h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            Fill in a few details and a move coordinator will send you a written quote —
            no obligation, no hidden fees.
          </p>
          <div className="space-y-4">
            <Card className="p-5 flex items-center gap-4">
              <PhoneCall className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-navy-900">Call us directly</p>
                <a href="tel:+27110000000" className="text-sm text-gray-500">+27 11 000 0000</a>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-4">
              <Mail className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-navy-900">Email us</p>
                <a href="mailto:hello@extrofreight.com" className="text-sm text-gray-500">hello@extrofreight.com</a>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-4">
              <Clock className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-navy-900">Response time</p>
                <p className="text-sm text-gray-500">Within 1 business day</p>
              </div>
            </Card>
          </div>
        </div>
        <Card className="lg:col-span-3 p-6 sm:p-8">
          <QuoteForm />
        </Card>
      </div>
    </div>
  )
}
