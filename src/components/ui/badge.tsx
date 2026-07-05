import * as React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        {
          'bg-orange-100 text-orange-700': variant === 'default',
          'bg-gray-100 text-gray-800': variant === 'secondary',
          'bg-emerald-100 text-emerald-800': variant === 'success',
          'border border-white/30 text-white': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
