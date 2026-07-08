'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'

const SERVICE_LINKS = [
  { label: 'Home Moving', href: '/home-moving' },
  { label: 'Office Relocation', href: '/services#office' },
  { label: 'Freight (LTL / FTL)', href: '/services#freight' },
  { label: 'Warehousing & Storage', href: '/services#warehousing' },
]

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-9">
            <Link
              href="/"
              className={cn(
                'text-[15px] font-semibold pb-1 border-b-2 transition-colors',
                pathname === '/' ? 'text-navy-900 border-orange-500' : 'text-navy-800 border-transparent hover:text-orange-600'
              )}
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-[15px] font-semibold text-navy-800 hover:text-orange-600 transition-colors pb-1 border-b-2 border-transparent">
                Services <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-60">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-lg py-2">
                    {SERVICE_LINKS.map(l => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block px-4 py-2.5 text-sm text-navy-800 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {LINKS.slice(1).map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'text-[15px] font-semibold pb-1 border-b-2 transition-colors',
                  pathname === l.href ? 'text-navy-900 border-orange-500' : 'text-navy-800 border-transparent hover:text-orange-600'
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <Link href="/quote" className="bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold px-4 py-2 rounded-full">
              Get a Quote
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 text-navy-800" aria-label="Menu">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-navy-800 font-medium py-2.5 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide pt-3 pb-1">Services</p>
          {SERVICE_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-navy-700 text-sm py-2 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
