import { useState, type MouseEvent } from 'react'
import { CreditCard, AirVent, Shield, MessageCircle, MapPin, Calendar, Phone, Star } from 'lucide-react'
import { NetflixCarousel } from './NetflixCarousel';

const translations = {
  pt: {
    title: '+40 ANOS DE TRADIÇÃO',
    subtitle: 'Presença histórica, eficiência moderna. A principal referência em transporte confiável e veloz no coração do Bandeirante.',
    readiness: 'PRONTIDÃO ABSOLUTA 24 HORAS. INDEPENDENTE DO DESTINO OU DO HORÁRIO, NOSSOS MELHORES VEÍCULOS JÁ ESTÃO À SUA DISPOSIÇÃO.',
    button1: 'CHAMAR TÁXI AGORA',
    button2: 'AGENDAR CORRIDA',
    button3: 'VIAGENS / CITYTOUR',
    statusActive: 'SISTEMA ATIVO',
    card: 'PIX/CARD',
    ac: 'AR COND.',
    security: 'SEGURANÇA',
    address: 'AV. CENTRAL LOTE 423, NÚCLEO BANDEIRANTE - DF'
  },
  en: {
    title: '+40 YEARS OF TRADITION',
    subtitle: 'Historic presence, modern efficiency. The leading reference for reliable and fast transportation in the heart of Bandeirante.',
    readiness: 'ABSOLUTE 24-HOUR READINESS. REGARDLESS OF DESTINATION OR TIME, OUR BEST VEHICLES ARE ALREADY AT YOUR DISPOSAL.',
    button1: 'CALL TAXI NOW',
    button2: 'SCHEDULE RIDE',
    button3: 'CALL DISPATCH',
    statusActive: 'SYSTEM ACTIVE',
    card: 'PIX/CARD',
    ac: 'A/C',
    security: 'SECURITY',
    address: 'AV. CENTRAL LOT 423, NÚCLEO BANDEIRANTE - DF'
  },
  es: {
    title: '+40 AÑOS DE TRADICIÓN',
    subtitle: 'Presencia histórica, eficiencia moderna. La principal referencia en transporte confiable y rápido en el corazón de Bandeirante.',
    readiness: 'DISPONIBILIDAD ABSOLUTA 24 HORAS. INDEPENDIENTEMENTE DEL DESTINO O HORARIO, NUESTROS MEJORES VEHÍCULOS YA ESTÁN A SU DISPOSICIÓN.',
    button1: 'LLAMAR TAXI AHORA',
    button2: 'AGENDAR VIAJE',
    button3: 'LLAMAR A LA CENTRAL',
    statusActive: 'SISTEMA ACTIVO',
    card: 'PIX/TARJETA',
    ac: 'A/A',
    security: 'SEGURIDAD',
    address: 'AV. CENTRAL LOTE 423, NÚCLEO BANDEIRANTE - DF'
  }
}

export function IcebergPremiumGlass() {
  const [language, setLanguage] = useState<'pt' | 'en' | 'es'>('pt')
  const t = translations[language]
  const phoneNumber = '+556135521071'
  const phoneDisplay = '(61) 3552-1071'
  const handleCallClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const inIframe = window.self !== window.top
    if (inIframe) {
      e.preventDefault()
      const toCopy = phoneDisplay
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(toCopy)
          .then(() => alert(`Número copiado: ${phoneDisplay}`))
          .catch(() => alert(`Ligue para ${phoneDisplay}`))
      } else {
        alert(`Ligue para ${phoneDisplay}`)
      }
    }
  }

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
                      ? 'bg-yellow-400 text-black'
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
            <img src="/logotaxi.png" alt="Logo Ponto de Táxi Bandeirante" className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4 mt-18">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 text-center mb-6 max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Netflix Carousel */}
          <div className="mb-8">
            <NetflixCarousel />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 items-center mb-8">
            {/* Readiness Text */}
            <p className="text-base md:text-lg text-white/90 text-center mb-6 max-w-3xl mx-auto font-semibold">
              {t.readiness}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-green-400 text-green-400 text-xs font-semibold backdrop-blur-sm">
              <div className="relative w-3 h-3">
                <span className="prismatic-led"></span>
              </div>
              <span>{t.statusActive}</span>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 w-full max-w-xs border-2 border-black shimmer-button">
              <Phone className="w-5 h-5" />
              {t.button1}
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 w-full max-w-xs border-2 border-black shimmer-button">
              <Calendar className="w-5 h-5" />
              {t.button2}
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 w-full max-w-xs border-2 border-black shimmer-button">
              <MessageCircle className="w-5 h-5" />
              {t.button3}
            </button>
          </div>

          {/* Features - Horizontal colored icons with animations */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <CreditCard className="w-12 h-12 icon-professional no-float icon-green rounded-lg p-2" />
              <p className="text-green-400 font-bold text-sm mt-2">{t.card}</p>
            </div>
            <div className="flex flex-col items-center">
              <AirVent className="w-12 h-12 icon-professional no-float icon-blue rounded-lg p-2" />
              <p className="text-blue-400 font-bold text-sm mt-2">{t.ac}</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 icon-professional no-float icon-purple rounded-lg p-2" />
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
            <a 
              href={ `tel:${phoneNumber}` } 
              aria-label="Ligar para (61) 3552-1071"
              className="block text-white font-semibold mt-1 hover:text-green-400 hover:underline transition-colors duration-300"
              onClick={handleCallClick}
            >
              {phoneDisplay}
            </a>
            <div className="flex items-center justify-center gap-2">
               <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
               <a 
                 href="https://www.google.com/search?sca_esv=2cf39a8e3998f015&rlz=1C1VECK_pt-PTBR1186BR1186&sxsrf=ANbL-n5rwwULQ5EQBU9zivyFy8pGzsfy-g:1771891244853&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOV1qpzDiU2D3LVbTw9_R9ji3A_spuNT7nTp0KHlZj1yz-LyCKYbBy8hdfEHlY6xfl8tYF4Ka5movcYLEzNVXM7f9UrBZdb3wz1khrfsFT_qcgWG5_Q%3D%3D&q=Ponto+de+T%C3%A1xi+Bandeirante+Coment%C3%A1rios&sa=X&ved=2ahUKEwiQp-uh6fCSAxXxK7kGHawEAvEQ0bkNegQILhAH&biw=1280&bih=609&dpr=2#lrd=0x935a2e5924d450a7:0x3dfb6bc67cbbedf8,3,,,,"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="Avaliar Ponto de Táxi Bandeirante no Google"
                 className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold google-review-pulse transition-all duration-300 hover:shadow-lg"
               >
                 AVALIAR
               </a>
             </div>
          </div>
      </div>
    </div>
  )
}
