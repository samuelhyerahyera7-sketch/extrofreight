'use client'

import { useState, type FormEvent } from 'react'
import { Search, Truck, PackageCheck, Warehouse, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const STAGES = [
  { Icon: PackageCheck, label: 'Order confirmed' },
  { Icon: Warehouse, label: 'At depot' },
  { Icon: Truck, label: 'In transit' },
  { Icon: CheckCircle2, label: 'Delivered' },
]

export default function TrackForm() {
  const [tracked, setTracked] = useState<string | null>(null)
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (value.trim()) setTracked(value.trim())
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-10">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter tracking number, e.g. EXF-284719"
          className="flex-1"
        />
        <Button type="submit" size="lg">
          <Search className="w-4 h-4 mr-2" /> Track
        </Button>
      </form>

      {tracked && (
        <Card className="p-8">
          <p className="text-sm text-gray-500 mb-1">Tracking number</p>
          <p className="font-bold text-navy-900 mb-8">{tracked.toUpperCase()}</p>
          <div className="relative grid grid-cols-4 gap-4">
            <div className="absolute top-6 left-[12%] right-[12%] h-0.5 bg-gray-200">
              <div className="h-full bg-orange-500" style={{ width: '66%' }} />
            </div>
            {STAGES.map((s, i) => (
              <div key={s.label} className="relative text-center flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 relative z-10 border-2 ${i <= 2 ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                  <s.Icon className="w-5 h-5" />
                </div>
                <p className={`text-xs font-medium ${i <= 2 ? 'text-navy-900' : 'text-gray-400'}`}>{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center mt-8">
            Estimated delivery: <span className="font-semibold text-navy-900">Tomorrow, by 5:00 PM</span>
          </p>
        </Card>
      )}
    </div>
  )
}
