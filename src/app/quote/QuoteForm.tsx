'use client'

import { useState } from 'react'
import {
  Home as HomeIcon, Building2, Warehouse, Truck, Check, ChevronLeft, ChevronRight, ChevronDown,
  CheckCircle2, MapPin, Calendar, User, Minus, Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
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

// Item names bake in the size/type (e.g. "TV (55"-70")", "Couch (L-Shape)") so we get
// enough detail to estimate volume without ever having to ask for exact measurements.
const ROOM_CATALOG: Partial<Record<MoveType, { room: string; items: string[] }[]>> = {
  home: [
    {
      room: 'Lounge',
      items: [
        'Couch (2-Seater)', 'Couch (3-Seater)', 'Couch (L-Shape / Corner)', 'Armchair',
        'Coffee Table (Wood)', 'Coffee Table (Glass)', 'TV (32"-55")', 'TV (55"-70")',
        'TV Unit / Wall Cabinet', 'Bookshelf', 'Rug / Carpet', 'Sound System',
      ],
    },
    {
      room: 'Dining Room',
      items: [
        'Dining Table (4-6 Seater)', 'Dining Table (8+ Seater)', 'Dining Chair',
        'Sideboard / Buffet', 'Bar Counter', 'Bar Stool',
      ],
    },
    {
      room: 'Kitchen & Scullery',
      items: [
        'Fridge (Standard)', 'Fridge (Side-by-Side)', 'Bar Fridge', 'Microwave',
        'Dishwasher', 'Washing Machine', 'Tumble Dryer', 'Oven / Stove', 'Kitchen Table & Chairs',
      ],
    },
    {
      room: 'Study',
      items: ['Desk', 'Office Chair', 'Bookcase', 'Filing Cabinet', 'Printer'],
    },
    {
      room: 'Bedroom',
      items: [
        'Bed (Single)', 'Bed (Double / Queen)', 'Bed (King)', 'Wardrobe (Small)',
        'Wardrobe (Large)', 'Dresser / Chest of Drawers', 'Bedside Table',
      ],
    },
    {
      room: 'Garage & Outdoor',
      items: [
        'Patio Table & Chairs', 'BBQ / Braai', 'Bicycle', 'Lawnmower',
        'Tool Cabinet', 'Garden / Storage Boxes',
      ],
    },
    {
      room: 'Boxes',
      items: ['Small Boxes', 'Medium Boxes', 'Large Boxes', 'Wardrobe Boxes'],
    },
  ],
  office: [
    {
      room: 'Workstations',
      items: ['Desk', 'Office Chair', 'Filing Cabinet', 'Monitor / PC', 'Printer'],
    },
    {
      room: 'Meeting & Common Areas',
      items: ['Meeting Table', 'Meeting Chair', 'Reception Desk', 'Sofa / Couch', 'Boardroom Screen'],
    },
    {
      room: 'Kitchen & Storage',
      items: ['Fridge', 'Microwave', 'Storage Shelving'],
    },
    {
      room: 'Boxes',
      items: ['Small Boxes', 'Medium Boxes', 'Large Boxes'],
    },
  ],
  storage: [
    {
      room: 'Items',
      items: ['Furniture (large)', 'Furniture (small)', 'Appliances', 'Boxes', 'Documents / Files', 'Seasonal Items'],
    },
  ],
}

const SA_PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
  'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
]

// No mapping API is wired up, so this is a lightweight native <datalist> suggestion
// list (no key/billing required) rather than true address autocomplete.
const SA_CITIES = [
  'Johannesburg', 'Sandton', 'Pretoria', 'Centurion', 'Cape Town', 'Durban',
  'Gqeberha (Port Elizabeth)', 'Bloemfontein', 'East London', 'Polokwane',
  'Mbombela (Nelspruit)', 'Kimberley', 'Pietermaritzburg', 'George',
  'Rustenburg', 'Randburg', 'Soweto', 'Vereeniging', 'Witbank (eMalahleni)', 'Stellenbosch',
]

type MoveDateMode = 'fixed' | 'flexible'

const emptyAddress = { street: '', suburb: '', city: '', province: '' }

type MoveAddress = typeof emptyAddress

const STEPS = ['Move Type', 'Size', 'Items', 'Details', 'Contact', 'Review']

const emptyForm = {
  moveType: '' as MoveType | '',
  size: '',
  itemQty: {} as Record<string, number>,
  itemsOther: '',
  from: { ...emptyAddress },
  to: { ...emptyAddress },
  dateMode: 'fixed' as MoveDateMode,
  date: '',
  notes: '',
  name: '',
  phone: '',
  email: '',
}

function formatAddress(a: MoveAddress) {
  const parts = [a.street, a.suburb, a.city, a.province].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
}

export default function QuoteForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [openRooms, setOpenRooms] = useState<Record<string, boolean>>({ Lounge: true, Workstations: true, Items: true })

  function update<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function updateAddress(which: 'from' | 'to', field: keyof MoveAddress, value: string) {
    setForm(f => ({ ...f, [which]: { ...f[which], [field]: value } }))
  }

  function setQty(key: string, qty: number) {
    setForm(f => {
      const itemQty = { ...f.itemQty }
      if (qty <= 0) delete itemQty[key]
      else itemQty[key] = qty
      return { ...f, itemQty }
    })
  }

  function toggleRoom(room: string) {
    setOpenRooms(r => ({ ...r, [room]: !r[room] }))
  }

  const addressComplete = (a: MoveAddress) => !!a.street && !!a.suburb && !!a.city

  const canProceed = [
    !!form.moveType,
    !!form.size,
    true,
    addressComplete(form.from) && addressComplete(form.to) && (form.dateMode === 'flexible' || !!form.date),
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

  const itemSummary = Object.entries(form.itemQty)
    .filter(([, qty]) => qty > 0)
    .map(([item, qty]) => `${qty} x ${item}`)

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

  const rooms = form.moveType ? ROOM_CATALOG[form.moveType] : undefined

  return (
    <div>
      <datalist id="sa-cities">
        {SA_CITIES.map(c => <option key={c} value={c} />)}
      </datalist>

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
            {form.moveType === 'freight' ? (
              'Tell us what the shipment contains.'
            ) : (
              <>
                Pick the closest match and how many — sizes and types are built into the list
                (e.g. couch shape, TV size, fridge type), so we don&apos;t need exact measurements.
                Something unusual? Add it below.
              </>
            )}
          </p>

          {form.moveType !== 'freight' && rooms && (
            <div className="space-y-3 mb-6">
              {rooms.map(({ room, items }) => {
                const roomCount = items.reduce((sum, item) => sum + (form.itemQty[`${room}::${item}`] || 0), 0)
                const isOpen = !!openRooms[room]
                return (
                  <div key={room} className="rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleRoom(room)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-semibold text-navy-900 flex items-center gap-2">
                        {room}
                        {roomCount > 0 && (
                          <span className="text-xs font-bold text-orange-700 bg-orange-100 rounded-full px-2 py-0.5">
                            {roomCount}
                          </span>
                        )}
                      </span>
                      <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', isOpen && 'rotate-180')} />
                    </button>
                    {isOpen && (
                      <div className="divide-y divide-gray-100">
                        {items.map(item => {
                          const key = `${room}::${item}`
                          const qty = form.itemQty[key] || 0
                          return (
                            <div key={item} className="flex items-center justify-between px-4 py-2.5">
                              <span className="text-sm text-gray-700">{item}</span>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => setQty(key, qty - 1)}
                                  disabled={qty === 0}
                                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-600 disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-gray-500 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-5 text-center text-sm font-semibold text-navy-900">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => setQty(key, qty + 1)}
                                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-600 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
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
                : 'e.g. piano, safe, gym equipment, artwork — include size if it\'s unusually large'
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
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-navy-900 mb-3">Moving from</p>
              <div className="space-y-3">
                <Input
                  value={form.from.street}
                  onChange={e => updateAddress('from', 'street', e.target.value)}
                  placeholder="Street address"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    value={form.from.suburb}
                    onChange={e => updateAddress('from', 'suburb', e.target.value)}
                    placeholder="Suburb"
                  />
                  <Input
                    list="sa-cities"
                    value={form.from.city}
                    onChange={e => updateAddress('from', 'city', e.target.value)}
                    placeholder="City / Town"
                  />
                </div>
                <Select value={form.from.province} onChange={e => updateAddress('from', 'province', e.target.value)}>
                  <option value="">Province...</option>
                  {SA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </Select>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-navy-900 mb-3">Moving to</p>
              <div className="space-y-3">
                <Input
                  value={form.to.street}
                  onChange={e => updateAddress('to', 'street', e.target.value)}
                  placeholder="Street address"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    value={form.to.suburb}
                    onChange={e => updateAddress('to', 'suburb', e.target.value)}
                    placeholder="Suburb"
                  />
                  <Input
                    list="sa-cities"
                    value={form.to.city}
                    onChange={e => updateAddress('to', 'city', e.target.value)}
                    placeholder="City / Town"
                  />
                </div>
                <Select value={form.to.province} onChange={e => updateAddress('to', 'province', e.target.value)}>
                  <option value="">Province...</option>
                  {SA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-navy-900 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Moving date
              </label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => update('dateMode', 'fixed')}
                  className={cn(
                    'rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-colors',
                    form.dateMode === 'fixed' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  )}
                >
                  Fixed date
                </button>
                <button
                  type="button"
                  onClick={() => update('dateMode', 'flexible')}
                  className={cn(
                    'rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-colors',
                    form.dateMode === 'flexible' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  )}
                >
                  Flexible dates
                </button>
              </div>
              {form.dateMode === 'fixed' ? (
                <Input type="date" value={form.date} onChange={e => update('date', e.target.value)} />
              ) : (
                <p className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  No problem — moving between the 3rd and 25th of the month often costs less since
                  trucks have more availability. A coordinator will confirm dates with you.
                </p>
              )}
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
              ['Items', itemSummary.length ? itemSummary.join(', ') : '—'],
              ...(form.itemsOther ? [['Other items / cargo', form.itemsOther]] : []),
              ['From', formatAddress(form.from)],
              ['To', formatAddress(form.to)],
              ['Moving date', form.dateMode === 'flexible' ? 'Flexible' : (form.date || '—')],
              ['Name', form.name || '—'],
              ['Phone', form.phone || '—'],
              ['Email', form.email || '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
                <span className="text-gray-500 shrink-0">{label}</span>
                <span className="font-semibold text-navy-900 text-right break-words min-w-0">{value}</span>
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
