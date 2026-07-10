import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '@/components/Logo'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <Logo light size="sm" className="mb-4" />
            <p className="text-sm leading-relaxed max-w-xs">
              Extrofreight moves freight and families — reliable home moving and nationwide
              logistics, fully insured and on time, every time.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <span key={i} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <Icon className="w-4 h-4" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/home-moving" className="hover:text-white transition-colors">Home Moving</Link></li>
              <li><Link href="/services#office" className="hover:text-white transition-colors">Office Relocation</Link></li>
              <li><Link href="/services#freight" className="hover:text-white transition-colors">Freight & Trucking</Link></li>
              <li><Link href="/services#warehousing" className="hover:text-white transition-colors">Warehousing & Storage</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Track a Shipment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/quote" className="hover:text-white transition-colors">Get a Quote</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Get in touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> 14 Depot Road, Johannesburg, South Africa</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> +27 11 000 0000</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> hello@extrofreight.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} Extrofreight. All rights reserved.</p>
          <p>Licensed & insured freight carrier</p>
        </div>
      </div>
    </footer>
  )
}
