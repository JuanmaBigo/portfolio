import type { Metadata } from 'next'
import 'lenis/dist/lenis.css'
import './globals.css'
import { LenisScroll } from '@/components/animations/LenisScroll'

export const metadata: Metadata = {
  title: 'Portfolio - Tu Nombre',
  description: 'Portfolio personal de desarrollo web',
  keywords: ['portfolio', 'web developer', 'frontend', 'backend', 'full stack'],
  authors: [{ name: 'Tu Nombre' }],
  openGraph: {
    title: 'Portfolio - Tu Nombre',
    description: 'Portfolio personal de desarrollo web',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <LenisScroll />
        {children}
      </body>
    </html>
  )
}



