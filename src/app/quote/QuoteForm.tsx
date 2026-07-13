'use client'

import { useState } from 'react'
import {
  Home as HomeIcon, Building2, Package, Truck, Check, ChevronLeft, ChevronRight, ChevronDown,
  CheckCircle2, MapPin, Calendar, User, Minus, Plus, ShoppingCart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'

type MoveType = 'home' | 'office' | 'boxShop' | 'freight'

const MOVE_TYPES: { id: MoveType; label: string; Icon: typeof HomeIcon }[] = [
  { id: 'home', label: 'Home Move', Icon: HomeIcon },
  { id: 'office', label: 'Office Move', Icon: Building2 },
  { id: 'boxShop', label: 'Box Shop', Icon: Package },
  { id: 'freight', label: 'Freight', Icon: Truck },
]

const SIZE_OPTIONS: Partial<Record<MoveType, string[]>> = {
  home: ['Bachelor / Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', '4+ Bedroom', 'Full House'],
  office: ['Small (1-10 staff)', 'Medium (11-50 staff)', 'Large (50+ staff)'],
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
    {
      room: 'Packing Materials',
      items: [
        'Bubble Wrap', 'Packing Tape', 'Furniture Blankets', 'Mattress Bags', 'Packing Paper',
      ],
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
    {
      room: 'Packing Materials',
      items: [
        'Bubble Wrap', 'Packing Tape', 'Furniture Blankets', 'Packing Paper',
      ],
    },
  ],
}

// Box Shop: real retail products with real prices — unlike a moving quote, box/packing
// supplies are a straightforward retail purchase, so a fixed price list makes sense here.
const BOX_PRODUCTS = [
  { name: 'Small Box', price: 25 },
  { name: 'Medium Box', price: 35 },
  { name: 'Large Box', price: 45 },
  { name: 'Wardrobe Box', price: 120 },
  { name: 'Book / Heavy-Duty Box', price: 30 },
  { name: 'Bubble Wrap (10m roll)', price: 150 },
  { name: 'Packing Tape (roll)', price: 35 },
  { name: 'Furniture Blanket', price: 80 },
  { name: 'Mattress Bag', price: 90 },
  { name: 'Packing Paper (bundle)', price: 60 },
]

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
type StepKey = 'moveType' | 'size' | 'items' | 'shop' | 'details' | 'contact' | 'review'

const emptyAddress = { street: '', suburb: '', city: '', province: '', postalCode: '' }
type MoveAddress = typeof emptyAddress

const BASE_STEPS: { key: StepKey; label: string }[] = [
  { key: 'moveType', label: 'Move Type' },
  { key: 'size', label: 'Size' },
  { key: 'items', label: 'Items' },
  { key: 'details', label: 'Details' },
  { key: 'contact', label: 'Contact' },
  { key: 'review', label: 'Review' },
]

const BOX_SHOP_STEPS: { key: StepKey; label: string }[] = [
  { key: 'moveType', label: 'Move Type' },
  { key: 'shop', label: 'Shop' },
  { key: 'details', label: 'Delivery' },
  { key: 'contact', label: 'Contact' },
  { key: 'review', label: 'Review' },
]

const emptyForm = {
  moveType: '' as MoveType | '',
  size: '',
  itemQty: {} as Record<string, number>,
  itemsOther: '',
  boxQty: {} as Record<string, number>,
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
  const parts = [a.street, a.suburb, a.city, a.province, a.postalCode].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
}

export default function QuoteForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [openRooms, setOpenRooms] = useState<Record<string, boolean>>({ Lounge: true, Workstations: true })

  const isBoxShop = form.moveType === 'boxShop'
  const steps = isBoxShop ? BOX_SHOP_STEPS : BASE_STEPS
  const currentKey = steps[step]?.key

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

  function setBoxQty(name: string, qty: number) {
    setForm(f => {
      const boxQty = { ...f.boxQty }
      if (qty <= 0) delete boxQty[name]
      else boxQty[name] = qty
      return { ...f, boxQty }
    })
  }

  function toggleRoom(room: string) {
    setOpenRooms(r => ({ ...r, [room]: !r[room] }))
  }

  const addressComplete = (a: MoveAddress) => !!a.street && !!a.suburb && !!a.city

  const boxTotal = Object.entries(form.boxQty).reduce((sum, [name, qty]) => {
    const product = BOX_PRODUCTS.find(p => p.name === name)
    return sum + (product ? product.price * qty : 0)
  }, 0)

  const stepValid: Record<StepKey, boolean> = {
    moveType: !!form.moveType,
    size: !!form.size,
    items: true,
    shop: Object.keys(form.boxQty).length > 0,
    details: isBoxShop
      ? addressComplete(form.to) && (form.dateMode === 'flexible' || !!form.date)
      : addressComplete(form.from) && addressComplete(form.to) && (form.dateMode === 'flexible' || !!form.date),
    contact: !!form.name && !!form.phone && !!form.email,
    review: true,
  }
  const canProceed = currentKey ? stepValid[currentKey] : false

  function next() {
    if (step < steps.length - 1) setStep(step + 1)
  }
  function back() {
    if (step > 0) setStep(step - 1)
  }
  const itemSummary = Object.entries(form.itemQty)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => `${qty} x ${key.split('::')[1]}`)

  const boxSummary = Object.entries(form.boxQty)
    .filter(([, qty]) => qty > 0)
    .map(([name, qty]) => `${qty} x ${name}`)

  async function handleSubmit() {
    setSubmitting(true)
    setSubmitError(false)
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moveType: form.moveType,
          isBoxShop,
          size: form.size,
          itemSummary,
          itemsOther: form.itemsOther,
          boxSummary,
          boxTotal: isBoxShop ? boxTotal : undefined,
          fromAddress: !isBoxShop ? formatAddress(form.from) : undefined,
          toAddress: formatAddress(form.to),
          dateMode: form.dateMode,
          date: form.date,
          notes: form.notes,
          name: form.name,
          phone: form.phone,
          email: form.email,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="w-14 h-14 text-orange-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy-900 mb-2">
          {isBoxShop ? 'Order request received' : 'Quote request received'}
        </h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          {isBoxShop ? (
            <>Thanks, {form.name.split(' ')[0] || 'there'} — we'll confirm stock and delivery cost, then get your boxes and packing supplies out to you.</>
          ) : (
            <>Thanks, {form.name.split(' ')[0] || 'there'} — a move coordinator will get back to you within one business day with a written quote for your {form.moveType} move.</>
          )}
        </p>
      </div>
    )
  }

  const rooms = form.moveType && form.moveType !== 'boxShop' && form.moveType !== 'freight' ? ROOM_CATALOG[form.moveType] : undefined

  return (
    <div>
      <datalist id="sa-cities">
        {SA_CITIES.map(c => <option key={c} value={c} />)}
      </datalist>

      {/* Stepper */}
      <p className="sm:hidden text-center text-xs font-semibold text-orange-600 uppercase tracking-wide mb-3">
        Step {step + 1} of {steps.length}: {steps[step]?.label}
      </p>
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
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
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn('h-0.5 flex-1 mx-1.5 -mt-5 sm:mt-0', i < step ? 'bg-orange-500' : 'bg-gray-200')} />
            )}
          </div>
        ))}
      </div>

      {/* Move type */}
      {currentKey === 'moveType' && (
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

      {/* Size */}
      {currentKey === 'size' && form.moveType && form.moveType !== 'boxShop' && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1">What size is your move?</h3>
          <p className="text-sm text-gray-500 mb-6">This helps us estimate crew size and truck space.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(SIZE_OPTIONS[form.moveType] ?? []).map(size => (
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

      {/* Items */}
      {currentKey === 'items' && form.moveType && (
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

          {itemSummary.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Selected</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {itemSummary.map(s => (
                  <span key={s} className="text-sm font-semibold text-orange-600">{s}</span>
                ))}
              </div>
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

      {/* Box Shop */}
      {currentKey === 'shop' && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-orange-500" /> Boxes & packing supplies
          </h3>
          <p className="text-sm text-gray-500 mb-6">Pick what you need — we'll confirm stock and delivery cost with your order.</p>
          <div className="rounded-xl border border-gray-200 divide-y divide-gray-100 mb-4">
            {BOX_PRODUCTS.map(product => {
              const qty = form.boxQty[product.name] || 0
              return (
                <div key={product.name} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-navy-900">{product.name}</p>
                    <p className="text-xs text-gray-500">R{product.price} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setBoxQty(product.name, qty - 1)}
                      disabled={qty === 0}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-600 disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-gray-500 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-navy-900">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setBoxQty(product.name, qty + 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-orange-400 hover:text-orange-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {boxSummary.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Selected</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {boxSummary.map(s => (
                  <span key={s} className="text-sm font-semibold text-orange-600">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between rounded-xl bg-navy-900 px-5 py-4">
            <span className="text-sm font-semibold text-white">Estimated total</span>
            <span className="text-lg font-extrabold text-white">R{boxTotal}</span>
          </div>
        </div>
      )}

      {/* Details / Delivery */}
      {currentKey === 'details' && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" /> {isBoxShop ? 'Delivery details' : 'Move details'}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {isBoxShop ? 'Where and when should we deliver?' : 'Where and when is this happening?'}
          </p>
          <div className="space-y-6">
            {!isBoxShop && (
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select value={form.from.province} onChange={e => updateAddress('from', 'province', e.target.value)}>
                      <option value="">Province...</option>
                      {SA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </Select>
                    <Input
                      value={form.from.postalCode}
                      onChange={e => updateAddress('from', 'postalCode', e.target.value)}
                      placeholder="Postal code"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-navy-900 mb-3">{isBoxShop ? 'Delivery address' : 'Moving to'}</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Select value={form.to.province} onChange={e => updateAddress('to', 'province', e.target.value)}>
                    <option value="">Province...</option>
                    {SA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </Select>
                  <Input
                    value={form.to.postalCode}
                    onChange={e => updateAddress('to', 'postalCode', e.target.value)}
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-navy-900 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {isBoxShop ? 'Preferred delivery date' : 'Moving date'}
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
                  {isBoxShop
                    ? "No problem — we'll confirm the soonest available delivery slot with you."
                    : 'No problem — moving between the 3rd and 25th of the month often costs less since trucks have more availability. A coordinator will confirm dates with you.'}
                </p>
              )}
            </div>

            {!isBoxShop && (
              <div>
                <label className="text-sm font-medium text-navy-900 mb-1.5 block">Anything else we should know?</label>
                <Textarea
                  value={form.notes}
                  onChange={e => update('notes', e.target.value)}
                  placeholder="Stairs, lift access, fragile or high-value items, etc."
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact */}
      {currentKey === 'contact' && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1 flex items-center gap-2">
            <User className="w-5 h-5 text-orange-500" /> Your contact details
          </h3>
          <p className="text-sm text-gray-500 mb-6">So we can send your {isBoxShop ? 'order confirmation' : 'written quote'}.</p>
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

      {/* Review */}
      {currentKey === 'review' && (
        <div>
          <h3 className="font-bold text-navy-900 text-lg mb-1">{isBoxShop ? 'Review your order' : 'Review your request'}</h3>
          <p className="text-sm text-gray-500 mb-6">
            {isBoxShop ? 'Check your order below, then submit.' : 'Check the details below, then submit for your free quote.'}
          </p>
          <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">
            {(isBoxShop ? [
              ['Order', boxSummary.length ? boxSummary.join(', ') : '—'],
              ['Estimated total', `R${boxTotal}`],
              ['Deliver to', formatAddress(form.to)],
              ['Delivery date', form.dateMode === 'flexible' ? 'Flexible' : (form.date || '—')],
              ['Name', form.name || '—'],
              ['Phone', form.phone || '—'],
              ['Email', form.email || '—'],
            ] : [
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
            ]).map(([label, value]) => (
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
        {step < steps.length - 1 ? (
          <Button type="button" onClick={next} disabled={!canProceed}>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Sending…' : (isBoxShop ? 'Place Order' : 'Get My Free Quote')}
          </Button>
        )}
      </div>
      {submitError && (
        <p className="text-sm text-red-600 text-center mt-4">
          Something went wrong sending your request. Please try again, or call us on{' '}
          <a href="tel:+27813756494" className="underline">081 375 6494</a>.
        </p>
      )}
      <p className="text-xs text-gray-400 text-center mt-4">No obligation. We&apos;ll respond within one business day.</p>
    </div>
  )
}
