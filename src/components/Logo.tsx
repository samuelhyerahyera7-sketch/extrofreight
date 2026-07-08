import { cn } from '@/lib/utils'

export default function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  const ink = light ? '#ffffff' : '#0a0a0a'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="33" ry="41" stroke={ink} strokeWidth="3" />
        {/* base E: spine + top/mid/bottom bars */}
        <rect x="39" y="15" width="9" height="70" fill={ink} />
        <rect x="39" y="15" width="27" height="9" fill={ink} />
        <rect x="39" y="45.5" width="20" height="9" fill={ink} />
        <rect x="39" y="76" width="27" height="9" fill={ink} />
        {/* offset upper stroke to suggest an interlocked F in front */}
        <rect x="50" y="6" width="9" height="39" fill={ink} />
        <rect x="50" y="6" width="24" height="9" fill={ink} />
      </svg>
      <span
        className="font-bold text-lg tracking-[0.22em] uppercase"
        style={{ color: ink }}
      >
        Extrofreight
      </span>
    </span>
  )
}
