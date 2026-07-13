import type { Metadata } from 'next'
import TrackForm from './TrackForm'

export const metadata: Metadata = {
  title: 'Track a Shipment',
  description: 'Track your home move or freight shipment with Extrofreight in real time.',
}

export default function TrackPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-3 text-center">Track your shipment</h1>
        <p className="text-gray-500 text-center mb-10">Enter your tracking number to see live status.</p>
        <TrackForm />
      </div>
    </div>
  )
}
