'use client'

import { useState } from 'react'
import {
  Home as HomeIcon, Building2, Warehouse, Truck, Check, ChevronLeft, ChevronRight,
  CheckCircle2, MapPin, Calendar, User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type MoveType = 'home' | 'office' | 'storage' | 'freight'

const MOVE_TYPES: { id: MoveType; label: string; Icon: typeof HomeIcon }[] = [
  { id: 'home', label: 'Home Move', Icon: HomeIcon },
  { id: 'office', label: 'Office Move', Icon: Building2 },
  { id: 'storage', label: 'Storage', Icon: Warehouse },
  { id: 'freight', label: 'Freight', Icon: Truck },
]

const SIZE_OPTIONS: Record<MoveType, string[]> = {
  home: ['Bachelor / Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4+ Bedroom', 'Full House'],
  office: ['Small (1-10 staff)', 'Medium (11-50 staff)', 'Large (50+ staff)'],
  storage: ['A few boxes', 'Single room', 'Full household', 'Business inventory'],
  freight: ['Single pallet', 'Part load (shared truck)', 'Full truckload (dedicated truck)'],
}

const ITEM_OPTIONS: Record<MoveType, string[]> = {
  home: ['Sofa / Couch', 'Bed', 'Wardrobe', 'Fridge', 'Washing Machine', 'Dining Table & Chairs', 'TV & Stand', 'Bookshelf', 'Boxes', 'Piano', 'Safe'],
  office: ['Desks', 'Office Chairs', 'Filing Cabinets', 'Monitors & PCs', 'Meeting Table', 'Server / IT Equipment', 'Boxes'],
  storage: ['Furniture', 'Appliances', 'Boxes', 'Documents / Files', 'Seasonal Items'],
  freight: [],
}

const STEPS = ['Move Type', 'Size', 'Items', 'Details', 'Contact', 'Review']

const emptyForm = {
  moveType: '' as MoveType | '',
  size: '',
  items: [] as string[],
  itemsOther: '',
  from: '',
  to: '',
  date: '',
  notes: '',
  name: '',
  phone: '',
  email: '',
}

export default function QuoteForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState(emptyForm)

  function update<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function toggleItem(item: string) {
    setForm(f => ({
      ...f,
      items: f.items.includes(item) ? f.items.filter(i => i !== item) : [...f.items, item],
    }))
  }

  const canProceed = [
    !!form.moveType,
    !!form.size,
    true,
    !!form.from && !!form.to && !!form.date,
    !!form.name && !!form.phone && !!form.email,
    true,
  ][step]

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1)
  }
  function back() {
    if (step > 0) setStep(step - 1)
  }
  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="w-14 h-14 text-orange-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy-900 mb-2">Quote request received</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Thanks, {form.name.split(' ')[0] || 'there'} — a move coordinator will get back to you
          within one business day with a written quote for your {form.moveType} move.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Stepper */}
      <div className="flex items-center mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 shrink-0 transition-colors',
                  i < step ? 'bg-orange-500 border-orange-500 text-white' :
                  i === step ? 'border-orange-500 text-orange-600 bg-orange-50' :
                  'border-gray-200 text-gray-300'
                )}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={cn('text-[11px] font-medium hidden sm:block', i <= step ? 'text-navy-900' : 'text-gray-400')}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn('h-0.5 flex-1 mx-1.5 -mt-5 sm:mt-0', i < step ? 'bg-orange-500' : 'bg-gray-200')} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Move type */}
      {step === 0 && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1">What are you moving?</h3>
          <p className="text-sm text-gray-500 mb-6">Choose the option that best fits your quote.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MOVE_TYPES.map(mt => (
              <button
                key={mt.id}
                type="button"
                onClick={() => update('moveType', mt.id)}
                className={cn(
                  'flex flex-col items-center gap-2.5 rounded-xl border-2 p-5 transition-colors text-center',
                  form.moveType === mt.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <mt.Icon className={cn('w-7 h-7', form.moveType === mt.id ? 'text-orange-600' : 'text-navy-700')} strokeWidth={1.75} />
                <span className="text-sm font-semibold text-navy-900">{mt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Size */}
      {step === 1 && form.moveType && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1">What size is your move?</h3>
          <p className="text-sm text-gray-500 mb-6">This helps us estimate crew size and truck space.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SIZE_OPTIONS[form.moveType].map(size => (
              <button
                key={size}
                type="button"
                onClick={() => update('size', size)}
                className={cn(
                  'flex items-center justify-between rounded-xl border-2 px-5 py-4 transition-colors text-left',
                  form.size === size ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <span className="text-sm font-semibold text-navy-900">{size}</span>
                {form.size === size && <Check className="w-4 h-4 text-orange-600 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Items */}
      {step === 2 && form.moveType && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1">What's moving?</h3>
          <p className="text-sm text-gray-500 mb-6">
            {form.moveType === 'freight'
              ? 'Tell us what the shipment contains.'
              : 'Select everything that applies — this helps us plan crew size and truck space.'}
          </p>

          {form.moveType !== 'freight' && (
            <div className="flex flex-wrap gap-2.5 mb-6">
              {ITEM_OPTIONS[form.moveType].map(item => {
                const selected = form.items.includes(item)
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleItem(item)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors',
                      selected ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    )}
                  >
                    {selected && <Check className="w-3.5 h-3.5" />}
                    {item}
                  </button>
                )
              })}
            </div>
          )}

          <label className="text-sm font-medium text-navy-900 mb-1.5 block">
            {form.moveType === 'freight' ? 'Cargo description' : 'Anything else moving that\'s not listed?'}
          </label>
          <Textarea
            value={form.itemsOther}
            onChange={e => update('itemsOther', e.target.value)}
            placeholder={
              form.moveType === 'freight'
                ? 'What are you shipping, and roughly how much (weight/volume)?'
                : 'e.g. gym equipment, artwork, garden furniture...'
            }
          />
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" /> Move details
          </h3>
          <p className="text-sm text-gray-500 mb-6">Where and when is this happening?</p>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-navy-900 mb-1.5 block">Moving from</label>
                <Input value={form.from} onChange={e => update('from', e.target.value)} placeholder="Suburb, city" />
              </div>
              <div>
                <label className="text-sm font-medium text-navy-900 mb-1.5 block">Moving to</label>
                <Input value={form.to} onChange={e => update('to', e.target.value)} placeholder="Suburb, city" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-navy-900 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Preferred date
              </label>
              <Input type="date" value={form.date} onChange={e => update('date', e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-900 mb-1.5 block">Anything else we should know?</label>
              <Textarea
                value={form.notes}
                onChange={e => update('notes', e.target.value)}
                placeholder="Stairs, lift access, fragile or high-value items, etc."
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Contact */}
      {step === 4 && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-500" /> Your contact details
          </h3>
          <p className="text-sm text-gray-500 mb-6">So we can send your written quote.</p>
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-navy-900 mb-1.5 block">Full name</label>
              <Input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-navy-900 mb-1.5 block">Phone number</label>
                <Input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+27 ..." />
              </div>
              <div>
                <label className="text-sm font-medium text-navy-900 mb-1.5 block">Email</label>
                <Input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1">Review your request</h3>
          <p className="text-sm text-gray-500 mb-6">Check the details below, then submit for your free quote.</p>
          <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">
            {[
              ['Move type', MOVE_TYPES.find(m => m.id === form.moveType)?.label ?? '—'],
              ['Size', form.size || '—'],
              ['Items', form.items.length ? form.items.join(', ') : '—'],
              ...(form.itemsOther ? [['Other items / cargo', form.itemsOther]] : []),
              ['From', form.from || '—'],
              ['To', form.to || '—'],
              ['Preferred date', form.date || '—'],
              ['Name', form.name || '—'],
              ['Phone', form.phone || '—'],
              ['Email', form.email || '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
                <span className="text-gray-500 shrink-0">{label}</span>
                <span className="font-semibold text-navy-900 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={back} disabled={step === 0}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={next} disabled={!canProceed}>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit}>
            Get My Free Quote
          </Button>
        )}
      </div>
      <p className="text-xs text-gray-400 text-center mt-4">No obligation. We&apos;ll respond within one business day.</p>
    </div>
  )
}
