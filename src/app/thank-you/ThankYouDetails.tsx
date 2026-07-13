'use client'

import { useSearchParams } from 'next/navigation'

export default function ThankYouDetails() {
  const params = useSearchParams()
  const name = params.get('name')
  const isBoxShop = params.get('type') === 'boxShop'
  const firstName = name?.split(' ')[0]

  return (
    <p className="text-gray-500 leading-relaxed mb-2">
      {firstName ? `Thanks, ${firstName} — ` : 'Thanks — '}
      {isBoxShop
        ? "we've received your order request. Our team will confirm stock and delivery cost, then get your boxes and packing supplies out to you."
        : "we've received your quote request. A move coordinator will get back to you within one business day with a written, no-obligation quote."}
    </p>
  )
}
