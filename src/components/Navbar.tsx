'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import Logo from '@/components/Logo'

const LINKS = [
  { label: 'Home Moving', href: '/home-moving' },
  { label: 'Freight & Logistics', href: '/services' },
  { label: 'Track Shipment', href: '/track' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="bg-navy-900 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          <span className="hidden sm:inline text-white/70">Nationwide freight &amp; home moving — fully licensed &amp; insured</span>
          <a href="tel:+27110000000" className="flex items-center gap-1.5 font-semibold ml-auto">
            <Phone className="w-3.5 h-3.5" /> +27 11 000 0000
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-navy-800 hover:text-orange-600 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/quote"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <Link href="/quote" className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
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
        </div>
      )}
    </nav>
  )
}
