import { cn } from '@/lib/utils'

export default function Logo({
  light = false,
  size = 'default',
  className,
}: {
  light?: boolean
  size?: 'default' | 'sm'
  className?: string
}) {
  const suffix = light ? '-white' : ''
  const iconSize = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
  const wordSize = size === 'sm' ? 'h-2' : 'h-2.5 sm:h-3'
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/logo-icon${suffix}.png`} alt="" className={cn(iconSize, 'shrink-0')} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/images/logo-wordmark${suffix}.png`} alt="Extrofreight" className={cn(wordSize, 'w-auto')} />
    </span>
  )
}
