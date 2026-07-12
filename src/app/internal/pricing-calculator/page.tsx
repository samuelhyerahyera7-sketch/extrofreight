'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

const MOVE_SIZES = [
  { label: 'Studio / 1-bedroom', baseRooms: 2 },
  { label: '2-bedroom', baseRooms: 4 },
  { label: '3-bedroom', baseRooms: 6 },
  { label: '4-bedroom+', baseRooms: 8 },
  { label: 'Small office', baseRooms: 3 },
  { label: 'Large office', baseRooms: 8 },
]

const EXTRAS_DEFAULT = [
  { name: 'Packing service', enabled: false, cost: 800 },
  { name: 'Unpacking service', enabled: false, cost: 500 },
  { name: 'Insurance (comprehensive)', enabled: false, cost: 350 },
  { name: 'Boxes & packing materials', enabled: false, cost: 450 },
  { name: 'Storage (per month)', enabled: false, cost: 900 },
]

function currency(n: number) {
  return `R${Math.round(n).toLocaleString('en-ZA')}`
}

export default function PricingCalculatorPage() {
  const [distanceKm, setDistanceKm] = useState(20)
  const [ratePerKm, setRatePerKm] = useState(18)

  const [sizeIndex, setSizeIndex] = useState(2)
  const [ratePerRoom, setRatePerRoom] = useState(650)
  const [extraRooms, setExtraRooms] = useState(0)

  const [crewSize, setCrewSize] = useState(3)
  const [hours, setHours] = useState(4)
  const [hourlyRatePerMover, setHourlyRatePerMover] = useState(180)

  const [extras, setExtras] = useState(EXTRAS_DEFAULT)

  const rooms = MOVE_SIZES[sizeIndex].baseRooms + extraRooms
  const distanceCost = distanceKm * ratePerKm
  const roomsCost = rooms * ratePerRoom
  const labourCost = crewSize * hours * hourlyRatePerMover
  const extrasCost = extras.filter(e => e.enabled).reduce((sum, e) => sum + e.cost, 0)
  const subtotal = distanceCost + roomsCost + labourCost + extrasCost

  function toggleExtra(i: number) {
    setExtras(prev => prev.map((e, idx) => (idx === i ? { ...e, enabled: !e.enabled } : e)))
  }
  function updateExtraCost(i: number, cost: number) {
    setExtras(prev => prev.map((e, idx) => (idx === i ? { ...e, cost } : e)))
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-1">Internal pricing calculator</h1>
        <p className="text-sm text-gray-500 mb-8">
          Staff-only tool to work out what to quote a customer. Rates are editable — adjust the numbers below to match your real pricing, they are not shown to customers anywhere.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="font-bold text-navy-900 mb-4">Distance</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Distance (km)">
                  <NumberInput value={distanceKm} onChange={setDistanceKm} />
                </Field>
                <Field label="Rate per km (R)">
                  <NumberInput value={ratePerKm} onChange={setRatePerKm} />
                </Field>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-bold text-navy-900 mb-4">Move size</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {MOVE_SIZES.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSizeIndex(i)}
                    className={`text-sm rounded-lg border px-3 py-2 text-left transition-colors ${
                      i === sizeIndex ? 'border-orange-500 bg-orange-50 text-navy-900 font-semibold' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Extra rooms/items">
                  <NumberInput value={extraRooms} onChange={setExtraRooms} />
                </Field>
                <Field label="Rate per room (R)">
                  <NumberInput value={ratePerRoom} onChange={setRatePerRoom} />
                </Field>
              </div>
              <p className="text-xs text-gray-400 mt-3">Rooms/items used in calculation: {rooms}</p>
            </Card>

            <Card className="p-6">
              <h2 className="font-bold text-navy-900 mb-4">Labour</h2>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Crew size">
                  <NumberInput value={crewSize} onChange={setCrewSize} />
                </Field>
                <Field label="Est. hours on site">
                  <NumberInput value={hours} onChange={setHours} />
                </Field>
                <Field label="Rate / mover / hr (R)">
                  <NumberInput value={hourlyRatePerMover} onChange={setHourlyRatePerMover} />
                </Field>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-bold text-navy-900 mb-4">Extras</h2>
              <div className="space-y-3">
                {extras.map((extra, i) => (
                  <div key={extra.name} className="flex items-center justify-between gap-4">
                    <label className="flex items-center gap-3 text-sm text-navy-900 font-medium">
                      <input type="checkbox" checked={extra.enabled} onChange={() => toggleExtra(i)} className="w-4 h-4 accent-orange-500" />
                      {extra.name}
                    </label>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      R<input
                        type="number"
                        value={extra.cost}
                        onChange={e => updateExtraCost(i, Number(e.target.value))}
                        className="w-20 rounded-lg border border-gray-200 px-2 py-1 text-right focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="font-bold text-navy-900 mb-4">Estimate breakdown</h2>
              <div className="space-y-2 text-sm">
                <Row label={`Distance (${distanceKm}km × R${ratePerKm})`} value={distanceCost} />
                <Row label={`Rooms/items (${rooms} × R${ratePerRoom})`} value={roomsCost} />
                <Row label={`Labour (${crewSize} × ${hours}h × R${hourlyRatePerMover})`} value={labourCost} />
                {extras.filter(e => e.enabled).map(e => (
                  <Row key={e.name} label={e.name} value={e.cost} />
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
                <span className="font-bold text-navy-900">Suggested quote</span>
                <span className="text-2xl font-extrabold text-orange-600">{currency(subtotal)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                This is a starting estimate only — adjust for access difficulty, weekend/month-end rates, or fuel before sending a written quote.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</span>
      {children}
    </label>
  )
}

function NumberInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  )
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-navy-900 shrink-0">{currency(value)}</span>
    </div>
  )
}
