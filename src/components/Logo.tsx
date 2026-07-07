import { cn } from '@/lib/utils'

export default function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  const ink = light ? '#ffffff' : '#0a0a0a'
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18.5" stroke={ink} strokeWidth="1.5" />
        <path d="M15 11v18M15 11h7.5a4 4 0 1 1 0 8H15M15 19h6.5a3.5 3.5 0 1 1 0 7" stroke={ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span
        className="font-bold text-lg tracking-[0.14em] uppercase"
        style={{ color: ink }}
      >
        Extro<span className="font-normal">freight</span>
      </span>
    </span>
  )
}
