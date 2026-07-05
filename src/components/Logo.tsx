import { Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 font-extrabold text-xl tracking-tight', className)}>
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-orange-500 text-white">
        <Truck className="w-5 h-5" strokeWidth={2.5} />
      </span>
      <span className={light ? 'text-white' : 'text-navy-900'}>
        Extro<span className="text-orange-500">freight</span>
      </span>
    </span>
  )
}
