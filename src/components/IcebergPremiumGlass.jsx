import React, { useState } from 'react'
import { CreditCard, AirVent, Shield, MessageCircle, MapPin, Smartphone, Wind, ShieldCheck, Zap, Star, Calendar, Phone, Clock, Car, MapIcon, Navigation, Globe } from 'lucide-react'
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

export function IcebergPremiumGlass() {
  const [language, setLanguage] = useState('pt')
  const t = translations[language]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/BACKGROUND.jpg')`,
          backgroundAttachment: 'fixed'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Language Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/10 backdrop-blur-md rounded-full p-1">
              {['pt', 'en', 'es'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
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
            <img
              src="/logotaxi.png"
              alt="Ponto de Táxi Bandeirante"
              width={200}
              height={169}
              className="w-48 h-auto"
            />
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              {t.button1}
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              {t.button2}
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {t.button3}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <CreditCard className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-semibold">{t.card}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <AirVent className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-semibold">{t.ac}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-semibold">{t.security}</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-white">
              <MapPin className="w-5 h-5" />
              <p className="font-semibold">{t.address}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-white">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>(61) 3456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                <span>(61) 9 8765-4321</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}