'use client'

import { CreditCard, AirVent, Shield, MessageCircle, MapPin, Smartphone, Wind, ShieldCheck, Zap, Star, Calendar, Phone, Clock, Car, MapIcon, Navigation, Globe } from 'lucide-react'
import { useState } from 'react'
import { NetflixCarousel } from './NetflixCarousel'

const translations = {
  pt: {
    title: '+40 ANOS DE TRADIÇÃO',
    subtitle: 'Presença histórica, eficiência moderna. A principal referência em transporte confiável e veloz no coração do Bandeirante.',
    button1: 'CHAMAR TÁXI AGORA',
    button2: 'AGENDAR CORRIDA',
    button3: 'LIGAR NA CENTRAL',
    card: 'PIX/CARD',
    ac: 'AR COND.',
    security: 'SEGURANÇA',
    address: 'AV. CENTRAL LOTE 423, NÚCLEO BANDEIRANTE - DF'
  },
  en: {
    title: '+40 YEARS OF TRADITION',
    subtitle: 'TRADITION THAT NEVER STOPS: The absolute reference in safe and fast transportation in the heart of Bandeirante.',
    button1: 'CALL TAXI NOW',
    button2: 'SCHEDULE RIDE',
    button3: 'CALL CENTER',
    card: 'PIX/CARD',
    ac: 'A/C',
    security: 'SECURITY',
    address: 'AV. CENTRAL LOT 423, BANDEIRANTE NUCLEUS - DF'
  },
  es: {
    title: '+40 AÑOS DE TRADICIÓN',
    subtitle: 'TRADICIÓN QUE NUNCA PARA: La referencia absoluta en transporte seguro y rápido en el corazón de Bandeirante.',
    button1: 'LLAMAR TAXI AHORA',
    button2: 'PROGRAMAR VIAJE',
    button3: 'LLAMAR CENTRAL',
    card: 'PIX/TARJETA',
    ac: 'A/A',
    security: 'SEGURIDAD',
    address: 'AV. CENTRAL LOTE 423, NÚCLEO BANDEIRANTE - DF'
  }
}

export function IcebergPremiumGlass({ children }: { children: (t: any) => React.ReactNode }) {
  const [language, setLanguage] = useState<'pt' | 'en' | 'es'>('pt')
  const t = translations[language]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-center bg-cover bg-fixed"
        style={{ 
          backgroundImage: "url('/BACKGROUND.jpg')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-black/80 z-10" />

      {/* Language Buttons - Top Right */}
      <div className="absolute top-4 right-4 z-30 flex gap-2">
        <button
          onClick={() => setLanguage('pt')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
            language === 'pt'
              ? 'bg-yellow-400 text-black shadow-lg scale-110'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          PT
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
            language === 'en'
              ? 'bg-yellow-400 text-black shadow-lg scale-110'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('es')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
            language === 'es'
              ? 'bg-yellow-400 text-black shadow-lg scale-110'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          ES
        </button>
      </div>

      {/* Main Container - Premium Glass */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-2">
        <div 
          className="w-full max-w-[380px] flex flex-col items-center justify-center shadow-2xl"
          style={{
            backdropFilter: 'blur(40px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(250, 204, 21, 0.3)',
            borderRadius: '2rem',
            minHeight: '80vh',
            padding: '1.5rem'
          }}
        >
          {typeof children === 'function' ? children(t) : children}
        </div>
      </div>
    </div>
  )
}

export function HeaderSection({ t }: { t: any }) {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-4 mb-auto">
      {/* System Active Badge - LED Florescente com Efeito Sutil */}
      <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-green-400/30 mb-4">
        <div className="relative led-container">
          <div className="w-3 h-3 rounded-full led-fluorescent iridescent-led-circle"></div>
          <div className="iris-led-ring-3"></div>
        </div>
        <span className="text-green-300 text-sm font-semibold tracking-wide">
          SISTEMA ATIVO
        </span>
      </div>

      <img 
        src="/logotaxi.png" 
        alt="Ponto de Táxi Bandeirante" 
        className="w-48 h-48 object-contain"
      />

      <NetflixCarousel />

      <p className="text-sm text-gray-400 max-w-xs">
        {t.subtitle}
      </p>
    </div>
  )
}

export function WhatsAppActionEngine({ t }: { t: any }) {
  const handleWhatsAppClick = (message: string) => {
    const phoneNumber = '5561987654321'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const buttonStyle = {
    backgroundColor: 'rgba(250, 204, 21, 0.9)',
    border: '1px solid #000000',
    borderRadius: '1.5rem',
    width: '100%',
    maxWidth: '320px',
    color: '#000000'
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 my-8">
      <button
        onClick={() => handleWhatsAppClick('Olá! Gostaria de chamar um táxi agora.')}
        className="p-4 flex items-center justify-center gap-3 font-semibold transition-all duration-300 hover:scale-103 hover:shadow-lg group"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(250, 204, 21, 1)'
          e.currentTarget.style.transform = 'scale(1.03)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(250, 204, 21, 0.9)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        <Phone className="w-6 h-6 text-black group-hover:animate-pulse" />
        {t.button1}
      </button>
      
      <button
        onClick={() => handleWhatsAppClick('Olá! Gostaria de agendar uma corrida.')}
        className="p-4 flex items-center justify-center gap-3 font-semibold transition-all duration-300 hover:scale-103 hover:shadow-lg group"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(250, 204, 21, 1)'
          e.currentTarget.style.transform = 'scale(1.03)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(250, 204, 21, 0.9)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        <Calendar className="w-6 h-6 text-black group-hover:animate-pulse" />
        {t.button2}
      </button>
      
      <button
        onClick={() => handleWhatsAppClick('Olá! Gostaria de falar com a central.')}
        className="p-4 flex items-center justify-center gap-3 font-semibold transition-all duration-300 hover:scale-103 hover:shadow-lg group"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(250, 204, 21, 1)'
          e.currentTarget.style.transform = 'scale(1.03)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(250, 204, 21, 0.9)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        <MessageCircle className="w-6 h-6 text-black group-hover:animate-pulse" />
        {t.button3}
      </button>
    </div>
  )
}

export function FooterSection({ t }: { t: any }) {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-4 mt-auto">

      {/* Feature Icons */}
      <div className="flex justify-center gap-6">
        <div className="flex flex-col items-center gap-1 group cursor-pointer">
          <div className="p-2 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">{t.card}</span>
        </div>
        <div className="flex flex-col items-center gap-1 group cursor-pointer">
          <div className="p-2 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">{t.ac}</span>
        </div>
        <div className="flex flex-col items-center gap-1 group cursor-pointer">
          <div className="p-2 rounded-full bg-gradient-to-br from-red-400 to-rose-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-rose-400 group-hover:text-rose-300 transition-colors">{t.security}</span>
        </div>
      </div>

      {/* Address with Map Link */}
      <div className="flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer group">
        <MapIcon className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
        <a
          href="https://www.google.com/maps/place/Ponto+de+T%C3%A1xi+Bandeirante/@-15.8684547,-47.9677881,17z/data=!3m1!4b1!4m6!3m5!1s0x935a2e5924d450a7:0x3dfb6bc67cbbedf8!8m2!3d-15.8684547!4d-47.9652132!16s%2Fg%2F11b6hjrn1d?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-center group-hover:text-yellow-400 transition-colors"
        >
          {t.address}
        </a>
      </div>
    </div>
  )
}

export { NetflixCarousel }