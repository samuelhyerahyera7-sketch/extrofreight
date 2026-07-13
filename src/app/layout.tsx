import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

const SITE_URL = 'https://www.extrofreight.co.za'
const SITE_TITLE = 'Extrofreight — Home Moving, Office Relocation & Freight in South Africa'
const SITE_DESCRIPTION =
  'Extrofreight moves freight and families across South Africa. Reliable home moving, office relocations, packing services and nationwide freight — fully insured, free quotes, on time every time.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Extrofreight',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'movers South Africa', 'home movers', 'moving company', 'office relocation',
    'furniture removals', 'freight logistics South Africa', 'packing services',
    'movers Johannesburg', 'movers Sandton', 'movers Pretoria', 'movers Cape Town',
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Extrofreight',
    locale: 'en_ZA',
    type: 'website',
    images: [{ url: '/images/hero-moving.jpg', width: 1200, height: 630, alt: 'Extrofreight movers loading a truck' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/hero-moving.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  name: 'Extrofreight',
  image: `${SITE_URL}/images/hero-moving.jpg`,
  url: SITE_URL,
  telephone: '+27813756494',
  email: 'admin@extrofreight.co.za',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '155 West Street',
    addressLocality: 'Sandton',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  areaServed: 'ZA',
  priceRange: '$$',
  foundingDate: '2021',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-navy-900 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
