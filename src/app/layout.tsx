import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Namaqualand Environmental | Sustainable GIS Solutions',
  description: 'Namaqualand Environmental offers cutting-edge GIS technology and sustainable environmental practices. Expert services in environmental assessments, site analysis, and geospatial solutions.',
  keywords: [
    'Environmental Services',
    'GIS Technology',
    'Sustainable Practices',
    'Environmental Assessments',
    'Site Analysis',
    'Geospatial Solutions',
    'Environmental Consulting',
    'Land Management',
    'Ecological Conservation',
    'Spatial Data Analysis',
    'Environmental Mapping',
    'Sustainability',
    'South Africa',
    'Namaqualand',
    'Environmental Impact Assessment',
    'Biodiversity Conservation',
    'Remote Sensing',
    'Natural Resource Management',
    'Environmental Monitoring',
    'Sustainable Development',
    'Climate Change Adaptation',
    'Environmental Policy',
    'Ecosystem Services',
    'Environmental Education'
  ],
  authors: [{ name: 'Namaqualand Environmental' }],
  creator: 'Namaqualand Environmental Team',
  publisher: 'Namaqualand Environmental',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://www.namaquaenvironmental.co.za/',
    siteName: 'Namaqualand Environmental',
    title: 'Namaqualand Environmental | Sustainable GIS Solutions',
    description: 'Leading provider of environmental services and GIS technology solutions in South Africa. Specializing in sustainable practices and innovative geospatial analysis.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Namaqualand Environmental Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Namaqualand Environmental | Sustainable GIS Solutions',
    description: 'Innovative environmental services and GIS technology solutions for a sustainable future.',
    images: ['/twitter-image.jpg'],
    creator: '@NamaqualandEnv',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google523f418b1738107c',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="google523f418b1738107c" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}