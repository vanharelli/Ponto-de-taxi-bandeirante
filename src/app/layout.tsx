import './globals.css'
import './animations_led.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Ponto de Táxi Bandeirante',
  description: 'O Ponto Oficial do Núcleo Bandeirante. Tradição e Segurança 24h.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Ponto Bandeirante'
  },
  openGraph: {
    title: 'Ponto de Táxi Bandeirante',
    description: 'O Ponto Oficial do Núcleo Bandeirante. Tradição e Segurança 24h.',
    images: [
      {
        url: '/logotaxi.png',
        width: 544,
        height: 459,
        alt: 'Ponto de Táxi Bandeirante'
      }
    ],
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Ponto de Táxi Bandeirante'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ponto de Táxi Bandeirante',
    description: 'O Ponto Oficial do Núcleo Bandeirante. Tradição e Segurança 24h.',
    images: ['/logotaxi.png']
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ponto Bandeirante" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="touch-manipulation">
        {children}
      </body>
    </html>
  )
}