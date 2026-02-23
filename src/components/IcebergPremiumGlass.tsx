import { useState } from 'react'
import { CreditCard, AirVent, Shield, MessageCircle, MapPin, Calendar, Phone } from 'lucide-react'
import { NetflixCarousel } from './NetflixCarousel';

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
    subtitle: 'Historic presence, modern efficiency. The leading reference for reliable and fast transportation in the heart of Bandeirante.',
    button1: 'CALL TAXI NOW',
    button2: 'SCHEDULE RIDE',
    button3: 'CALL DISPATCH',
    card: 'PIX/CARD',
    ac: 'A/C',
    security: 'SECURITY',
    address: 'AV. CENTRAL LOT 423, NÚCLEO BANDEIRANTE - DF'
  },
  es: {
    title: '+40 AÑOS DE TRADICIÓN',
    subtitle: 'Presencia histórica, eficiencia moderna. La principal referencia en transporte confiable y rápido en el corazón de Bandeirante.',
    button1: 'LLAMAR TAXI AHORA',
    button2: 'AGENDAR VIAJE',
    button3: 'LLAMAR A LA CENTRAL',
    card: 'PIX/TARJETA',
    ac: 'A/A',
    security: 'SEGURIDAD',
    address: 'AV. CENTRAL LOTE 423, NÚCLEO BANDEIRANTE - DF'
  }
}

export function IcebergPremiumGlass() {
  const [language, setLanguage] = useState<'pt' | 'en' | 'es'>('pt')
  const t = translations[language]

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Language Selector */}
          <div className="flex justify-center mb-4">
            <div className="flex bg-white/10 backdrop-blur-md rounded-full p-1">
              {['pt', 'en', 'es'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as 'pt' | 'en' | 'es')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    language === lang
                      ? 'bg-white text-black'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/logotaxi.png" alt="Logo Ponto de Táxi Bandeirante" className="w-48 h-48 object-contain" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 text-center mb-8 max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Netflix Carousel */}
          <div className="mb-8">
            <NetflixCarousel />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 items-center mb-8">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 w-full max-w-xs border-2 border-black shimmer-button">
              <Phone className="w-5 h-5" />
              {t.button1}
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 w-full max-w-xs border-2 border-black shimmer-button">
              <Calendar className="w-5 h-5" />
              {t.button2}
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 w-full max-w-xs border-2 border-black shimmer-button">
              <MessageCircle className="w-5 h-5" />
              {t.button3}
            </button>
          </div>

          {/* Features - Horizontal colored icons with animations */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <CreditCard className="w-12 h-12 icon-professional icon-green rounded-lg p-2" />
              <p className="text-green-400 font-bold text-sm mt-2">{t.card}</p>
            </div>
            <div className="flex flex-col items-center">
              <AirVent className="w-12 h-12 icon-professional icon-blue rounded-lg p-2" />
              <p className="text-blue-400 font-bold text-sm mt-2">{t.ac}</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 icon-professional icon-purple rounded-lg p-2" />
              <p className="text-purple-400 font-bold text-sm mt-2">{t.security}</p>
            </div>
          </div>

          {/* Address */}
          <div className="text-center">
            <a 
              href="https://www.google.com/maps/place/Ponto+de+T%C3%A1xi+Bandeirante/@-15.8684547,-47.9677881,17z/data=!3m1!4b1!4m6!3m5!1s0x935a2e5924d450a7:0x3dfb6bc67cbbedf8!8m2!3d-15.8684547!4d-47.9652132!16s%2Fg%2F11b6hjrn1d?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white hover:text-green-400 transition-colors duration-300 group"
            >
              <MapPin className="w-5 h-5 group-hover:animate-bounce" />
              <p className="font-semibold group-hover:underline">{t.address}</p>
            </a>
          </div>
      </div>
    </div>
  )
}