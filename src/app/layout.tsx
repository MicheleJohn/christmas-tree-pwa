import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Christmas Tree - Albero di Natale Virtuale',
  description: 'Crea il tuo albero di Natale 3D e ricevi regali virtuali crittografati',
  manifest: '/manifest.json',
  themeColor: '#1a472a',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'XmasTree',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
