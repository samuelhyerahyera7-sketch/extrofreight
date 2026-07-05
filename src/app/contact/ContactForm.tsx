'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="w-14 h-14 text-orange-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy-900 mb-2">Message sent</h3>
        <p className="text-gray-500 text-sm">We'll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-sm font-medium text-navy-900 mb-1.5 block">Name</label>
        <Input required placeholder="Your name" />
      </div>
      <div>
        <label className="text-sm font-medium text-navy-900 mb-1.5 block">Email</label>
        <Input required type="email" placeholder="you@example.com" />
      </div>
      <div>
        <label className="text-sm font-medium text-navy-900 mb-1.5 block">Message</label>
        <Textarea required placeholder="How can we help?" />
      </div>
      <Button type="submit" size="lg" className="w-full">Send Message</Button>
    </form>
  )
}
