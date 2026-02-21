'use client'

import { CreditCard, AirVent, Shield, MessageCircle } from 'lucide-react'

export function IcebergPremiumGlass({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/BACKGROUND.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/80 z-10" />

      {/* Main Container - Premium Glass */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div 
          className="w-full max-w-[420px] flex flex-col items-center justify-center shadow-2xl"
          style={{
            backdropFilter: 'blur(40px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '2rem',
            minHeight: '80vh',
            padding: '2rem'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function HeaderSection() {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-4 mb-auto">
      <img 
        src="/logotaxi.png" 
        alt="Ponto de Táxi Bandeirante" 
        className="w-24 h-24 object-contain"
      />

      <h1 className="text-3xl font-bold text-white">
        PONTO DE TÁXI BANDEIRANTE
      </h1>

      <p className="text-sm text-gray-400 max-w-xs">
        O Ponto Oficial do Núcleo Bandeirante. Tradição e Segurança 24h.
      </p>
    </div>
  )
}

export function WhatsAppActionEngine() {
  const handleWhatsAppClick = (message: string) => {
    const phoneNumber = '5561987654321'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const buttonStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1.5rem',
    width: '100%',
    maxWidth: '320px'
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 my-8">
      <button
        onClick={() => handleWhatsAppClick('Olá! Gostaria de chamar um táxi agora.')}
        className="p-4 flex items-center justify-center gap-3 text-white font-semibold transition-all duration-300 hover:scale-103 hover:shadow-lg"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(250, 204, 21, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <MessageCircle size={24} />
        CHAMAR TÁXI AGORA
      </button>

      <button
        onClick={() => handleWhatsAppClick('Olá! Gostaria de ligar para a central.')}
        className="p-4 flex items-center justify-center gap-3 text-white font-semibold transition-all duration-300 hover:scale-103 hover:shadow-lg"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(250, 204, 21, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <MessageCircle size={24} />
        LIGAR NA CENTRAL
      </button>

      <button
        onClick={() => handleWhatsAppClick('Olá! Gostaria de agendar um táxi para o aeroporto.')}
        className="p-4 flex items-center justify-center gap-3 text-white font-semibold transition-all duration-300 hover:scale-103 hover:shadow-lg"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(250, 204, 21, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <MessageCircle size={24} />
        AGENDAR AEROPORTO
      </button>
    </div>
  )
}

export function FooterSection() {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-4 mt-auto">
      {/* Feature Icons */}
      <div className="flex justify-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <CreditCard className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400">CARD/PIX</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <AirVent className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400">A/C</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Shield className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400">SEGURANÇA</span>
        </div>
      </div>
      
      {/* Tradition Text */}
      <div className="text-center">
        <p className="text-lg font-bold text-yellow-400 mb-2">
          +40 ANOS DE TRADIÇÃO
        </p>
      </div>
      
      {/* Address */}
      <p className="text-xs text-gray-400 text-center max-w-xs">
        PONTO OFICIAL: AV. CENTRAL LOTE 423, NÚCLEO BANDEIRANTE - DF
      </p>
    </div>
  )
}
