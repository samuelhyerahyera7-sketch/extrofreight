import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, PhoneCall, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ThankYouDetails from './ThankYouDetails'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thanks for your Extrofreight quote or order request — a move coordinator will be in touch within one business day.',
  robots: { index: false, follow: true },
}

export default function ThankYouPage() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <CheckCircle2 className="w-16 h-16 text-orange-500 mx-auto mb-6" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-3">
          Thank you!
        </h1>
        <Suspense fallback={null}>
          <ThankYouDetails />
        </Suspense>

        <Card className="p-6 mt-10 text-left">
          <p className="text-sm font-semibold text-navy-900 mb-4">Need to reach us sooner?</p>
          <div className="space-y-3">
            <a href="tel:+27813756494" className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy-900">
              <PhoneCall className="w-4 h-4 text-orange-500 shrink-0" /> 081 375 6494
            </a>
            <a href="mailto:admin@extrofreight.co.za" className="flex items-center gap-3 text-sm text-gray-600 hover:text-navy-900">
              <Mail className="w-4 h-4 text-orange-500 shrink-0" /> admin@extrofreight.co.za
            </a>
          </div>
        </Card>

        <Link href="/" className="inline-block mt-8">
          <Button variant="secondary">
            Back to Home <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
