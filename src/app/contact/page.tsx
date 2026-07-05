import type { Metadata } from 'next'
import { PhoneCall, Mail, MapPin, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Extrofreight',
  description: 'Get in touch with Extrofreight for home moving, freight and logistics enquiries.',
}

export default function ContactPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-4">Contact us</h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            Have a question before you book? Reach out and our team will get back to you quickly.
          </p>
          <div className="space-y-4">
            <Card className="p-5 flex items-center gap-4">
              <PhoneCall className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-navy-900">Phone</p>
                <a href="tel:+27110000000" className="text-sm text-gray-500">+27 11 000 0000</a>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-4">
              <Mail className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-navy-900">Email</p>
                <a href="mailto:hello@extrofreight.com" className="text-sm text-gray-500">hello@extrofreight.com</a>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-4">
              <MapPin className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-navy-900">Head office</p>
                <p className="text-sm text-gray-500">14 Depot Road, Johannesburg, South Africa</p>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-4">
              <Clock className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-navy-900">Hours</p>
                <p className="text-sm text-gray-500">Mon–Sat, 7am–6pm. Dispatch is 24/7.</p>
              </div>
            </Card>
          </div>
        </div>
        <Card className="p-6 sm:p-8">
          <ContactForm />
        </Card>
      </div>
    </div>
  )
}
