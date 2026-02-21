'use client'

import { CreditCard, AirVent, Shield, MessageCircle, CheckCircle } from 'lucide-react'
import Image from 'next/image'

interface PremiumGlassLayoutProps {
  children: React.ReactNode
}

export function PremiumGlassLayout({ children }: PremiumGlassLayoutProps) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden touch-manipulation">
      {/* Background Engine - 5 cinematic videos loop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="absolute inset-0 cinematic-layer"
              style={{
                animationDelay: `${idx * -1.6}s`,
                opacity: 0.18 + idx * 0.03,
                transform: `scale(${1.03 + idx * 0.01})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4 safe-area-padding">
        <div className="w-full max-w-[420px] premium-glass p-6 sm:p-8 shadow-2xl flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}

export function HeaderSection() {
  return (
    <div className="text-center mb-8 flex flex-col items-center justify-center">
      {/* Circular profile with gold ring */}
      <div className="relative mx-auto mb-4 flex justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <span className="text-3xl font-bold text-yellow-400">🚕</span>
            </div>
          </div>
        </div>
        {/* Blue verified badge */}
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-white mb-2 text-center">
        PONTO DE TÁXI
        <span className="block text-yellow-400">BANDEIRANTE</span>
      </h1>
    </div>
  )
}

export function ActionEngine() {
  const handleWhatsAppClick = (message: string) => {
    const phoneNumber = '5561987654321'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 mb-8 w-full px-4">
      {/* Main Action - Yellow */}
      <button
        onClick={() => handleWhatsAppClick('Olá! Gostaria de chamar um táxi agora.')}
        className="w-full max-w-sm glass-button p-5 flex items-center justify-center gap-3 text-black font-bold transition-all duration-300 active:scale-95 touch-manipulation"
        style={{ backgroundColor: '#FACC15', borderColor: 'rgba(255, 255, 255, 0.3)' }}
      >
        <MessageCircle size={24} className="flex-shrink-0" />
        <span className="text-base sm:text-lg">CHAMAR TÁXI AGORA</span>
      </button>

      {/* Secondary Actions - White/10 */}
      <button
        onClick={() => handleWhatsAppClick('Olá! Gostaria de agendar um táxi para o aeroporto.')}
        className="w-full max-w-sm glass-button p-5 flex items-center justify-center gap-3 text-white font-semibold transition-all duration-300 active:scale-95 touch-manipulation"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <MessageCircle size={24} className="flex-shrink-0" />
        <span className="text-base sm:text-lg">AGENDAR AEROPORTO</span>
      </button>

      <button
        onClick={() => handleWhatsAppClick('Olá! Gostaria de ligar para a central.')}
        className="w-full max-w-sm glass-button p-5 flex items-center justify-center gap-3 text-white font-semibold transition-all duration-300 active:scale-95 touch-manipulation"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <MessageCircle size={24} className="flex-shrink-0" />
        <span className="text-base sm:text-lg">LIGAR NA CENTRAL</span>
      </button>
    </div>
  )
}

export function FooterStats() {
  return (
    <div className="text-center flex flex-col items-center justify-center">
      <div className="flex justify-center gap-6 mb-4">
        <div className="flex flex-col items-center gap-2">
          <CreditCard className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">CARD/PIX</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AirVent className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">A/C</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Shield className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">SEGURANÇA</span>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-lg font-bold text-yellow-400 mb-1">40 ANOS DE TRADIÇÃO</p>
        <p className="text-sm text-gray-400">O Ponto Oficial do Núcleo Bandeirante</p>
      </div>
    </div>
  )
}