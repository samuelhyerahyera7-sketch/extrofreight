'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="w-14 h-14 text-orange-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy-900 mb-2">Quote request received</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Thanks — a move coordinator will get back to you within one business day with a fixed quote.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-navy-900 mb-1.5 block">Full name</label>
          <Input required placeholder="Your name" />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-900 mb-1.5 block">Phone number</label>
          <Input required type="tel" placeholder="+27 ..." />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-navy-900 mb-1.5 block">Email</label>
        <Input required type="email" placeholder="you@example.com" />
      </div>

      <div>
        <label className="text-sm font-medium text-navy-900 mb-1.5 block">Service needed</label>
        <Select defaultValue="home-moving" required>
          <option value="home-moving">Home Moving</option>
          <option value="office-relocation">Office Relocation</option>
          <option value="freight">Freight (LTL/FTL)</option>
          <option value="warehousing">Warehousing & Storage</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-navy-900 mb-1.5 block">Moving from</label>
          <Input placeholder="Suburb, city" />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-900 mb-1.5 block">Moving to</label>
          <Input placeholder="Suburb, city" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-navy-900 mb-1.5 block">Preferred move date</label>
        <Input type="date" />
      </div>

      <div>
        <label className="text-sm font-medium text-navy-900 mb-1.5 block">Tell us more about your move</label>
        <Textarea placeholder="Number of rooms, special items, access notes, etc." />
      </div>

      <Button type="submit" size="lg" className="w-full">Request My Free Quote</Button>
      <p className="text-xs text-gray-400 text-center">No obligation. We'll respond within one business day.</p>
    </form>
  )
}
