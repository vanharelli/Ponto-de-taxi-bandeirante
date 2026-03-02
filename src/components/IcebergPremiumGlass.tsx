import { useState, type MouseEvent, useEffect } from 'react'
import { CreditCard, AirVent, Shield, MapPin, Phone, Star, Clock, Music, Armchair, X } from 'lucide-react'
import { NetflixCarousel } from './NetflixCarousel';
import { TriageModal } from './TriageModal';
import { TouristCarousel } from './TouristCarousel';
import { createPortal } from 'react-dom';
import { translations, type Language } from '../utils/translations';

interface IcebergPremiumGlassProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function IcebergPremiumGlass({ language, setLanguage }: IcebergPremiumGlassProps) {
  const [showTriage, setShowTriage] = useState(false)
  const [isSystemActive, setIsSystemActive] = useState(true)
  const [showHours, setShowHours] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  
  const t = translations[language]
  const phoneNumber = '+556135521071'
  const phoneDisplay = '(61) 3552-1071'

  const reviews = [
    { name: "Carlos Silva", text: "Melhor ponto do Bandeirante, motoristas muito educados!", stars: 5 },
    { name: "Maria Oliveira", text: "Sempre pontuais e carros muito limpos. Recomendo!", stars: 5 },
    { name: "João Pereira", text: "Atendimento excelente, nota 10 para a central.", stars: 5 },
    { name: "Ana Costa", text: "Uso há anos e nunca tive problemas. Muito seguro.", stars: 5 },
    { name: "Ricardo Santos", text: "O City Tour por Brasília foi fantástico, parabéns!", stars: 5 },
    { name: "Juliana Lima", text: "Preço justo e rapidez no atendimento. Sensacional.", stars: 5 },
    { name: "Fernando Souza", text: "Carros novos e com ar condicionado gelando. Top!", stars: 5 },
    { name: "Patrícia Melo", text: "Motoristas conhecem muito bem a cidade. Rápido!", stars: 5 },
    { name: "Bruno Rocha", text: "Fiz uma viagem interestadual e foi muito tranquila.", stars: 5 },
    { name: "Camila Alves", text: "A melhor opção de transporte no Núcleo Bandeirante.", stars: 5 },
    { name: "Roberto Dias", text: "Educação e profissionalismo em primeiro lugar.", stars: 5 },
    { name: "Luciana Farias", text: "Central atende super rápido pelo WhatsApp. Prático!", stars: 5 }
  ];

  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      // Active from 03:00 (3 AM) to 20:00 (8 PM)
      // 03:00 <= time < 20:00
      const isActive = hours >= 3 && hours < 20;
      setIsSystemActive(isActive);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

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
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full p-4 safe-area-padding overflow-hidden">
        <TriageModal 
          isOpen={showTriage}
          onClose={() => setShowTriage(false)}
          phoneNumber="556135521071"
          language={language}
        />
        <div className="w-full h-full max-w-7xl flex flex-col items-center justify-start animate-fade-in-up overflow-y-auto custom-scrollbar relative mx-auto">
          
          {/* Header: Logo Left, Language Right */}
          <div className="w-full flex justify-between items-center mb-6 px-2 sm:px-4 border-b border-yellow-400/30 pb-4">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <img 
                src="/logotaxi.webp" 
                alt="Logo Ponto de Táxi Bandeirante" 
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain pointer-events-none select-none"
                loading="eager"
                decoding="sync"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-xs sm:text-sm tracking-wider leading-none">
                  PONTO DE TÁXI
                </span>
                <span className="text-yellow-400 font-extrabold text-sm sm:text-base tracking-widest leading-none mt-0.5">
                  BANDEIRANTE
                </span>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex bg-white/10 backdrop-blur-md rounded-full p-0.5 scale-75 origin-right">
              {[
                { code: 'pt', flag: 'br', label: 'PT' },
                { code: 'en', flag: 'us', label: 'EN' },
                { code: 'es', flag: 'es', label: 'ES' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as 'pt' | 'en' | 'es')}
                  className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    language === lang.code
                      ? 'bg-yellow-400 text-black'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <img 
                    src={`https://flagcdn.com/w40/${lang.flag}.png`} 
                    alt={lang.label} 
                    className="w-3.5 h-2.5 object-cover rounded-sm shadow-sm" 
                  />
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Stars */}
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)] animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-2 mt-2 sm:mt-4 text-shimmer-gold">
            {t.title}
          </h1>

          {/* Tradition Tagline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 text-yellow-400 tracking-wider">
            {t.tradition}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 text-center mb-6 max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Call to Action Button */}
          <button
            onClick={() => setShowTriage(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 sm:px-12 sm:py-6 rounded-xl text-lg sm:text-xl font-bold transition-all duration-200 flex items-center justify-center gap-3 w-full max-w-[90%] sm:max-w-md border-2 border-black shimmer-button shadow-xl hover:scale-105 mb-8 mx-auto"
          >
            <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
            {t.serviceNow}
          </button>

          {/* Netflix Carousel */}
          <div className="mb-8 w-full">
            <NetflixCarousel />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 items-center mb-8 w-full">
            
            {/* Live Reviews - Neumorphism Style */}
            <div className="mb-4 h-24 w-full max-w-2xl mx-auto relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center p-4">
              {reviews.map((review, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform px-4 ${
                    index === currentReview ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <div className="flex gap-1 mb-2">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                    ))}
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-medium text-center italic leading-tight">"{review.text}"</p>
                  <p className="text-yellow-400/80 text-xs font-bold mt-1 uppercase tracking-wider">- {review.name}</p>
                </div>
              ))}
            </div>

            {/* Readiness Text */}
            <p className="text-sm sm:text-base md:text-lg text-white/90 text-center mb-6 max-w-3xl mx-auto font-semibold px-2">
              {t.readiness}
            </p>
            
            {/* System Status Badge - Clickable for Hours */}
            <div className="relative mb-6">
              <button 
                onClick={() => setShowHours(!showHours)}
                className={`flex items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-transparent border ${isSystemActive ? 'border-green-500/50 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' : 'border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]'} text-xs font-bold tracking-widest uppercase mx-auto transition-all duration-300 hover:scale-105`}
              >
                <div className="relative w-2 h-2 flex items-center justify-center">
                  <span className={`prismatic-led ${!isSystemActive && 'bg-red-500 shadow-red-500'}`}></span>
                </div>
                <span className="pt-0.5">{isSystemActive ? t.statusActive : t.statusInactive}</span>
              </button>

              {/* Operating Hours Popover */}
              {showHours && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-64 bg-black/80 backdrop-blur-xl border border-yellow-400/30 rounded-xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Clock className="w-6 h-6 text-yellow-400 mb-1" />
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide border-b border-white/10 pb-2 w-full">
                      {t.hoursTitle}
                    </h3>
                    <p className="text-white text-xs font-medium mt-1">
                      {t.hoursOpen}
                    </p>
                    <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${isSystemActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {isSystemActive ? t.hoursStatusOpen : t.hoursStatusClosed}
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black/80 backdrop-blur-xl border-t border-l border-yellow-400/30 rotate-45"></div>
                </div>
              )}
            </div>
            
            {/* Main Trigger Button */}
            <button 
              onClick={() => setShowTriage(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 sm:px-12 sm:py-6 rounded-xl text-lg sm:text-xl font-bold transition-all duration-200 flex items-center justify-center gap-3 w-full max-w-[90%] sm:max-w-md border-2 border-black shimmer-button shadow-xl hover:scale-105"
            >
              <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
              {t.button1}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-8 mb-8 w-full max-w-4xl px-2">
            <div className="flex flex-col items-center text-center">
              <CreditCard className="w-8 h-8 sm:w-12 sm:h-12 icon-professional no-float text-yellow-400 rounded-lg p-1.5 sm:p-2" />
              <p className="text-yellow-400 font-bold text-[10px] sm:text-sm mt-1 sm:mt-2">{t.card}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <AirVent className="w-8 h-8 sm:w-12 sm:h-12 icon-professional no-float text-yellow-400 rounded-lg p-1.5 sm:p-2" />
              <p className="text-yellow-400 font-bold text-[10px] sm:text-sm mt-1 sm:mt-2">{t.ac}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-8 h-8 sm:w-12 sm:h-12 icon-professional no-float text-yellow-400 rounded-lg p-1.5 sm:p-2" />
              <p className="text-yellow-400 font-bold text-[10px] sm:text-sm mt-1 sm:mt-2">{t.security}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Music className="w-8 h-8 sm:w-12 sm:h-12 icon-professional no-float text-yellow-400 rounded-lg p-1.5 sm:p-2" />
              <p className="text-yellow-400 font-bold text-[10px] sm:text-sm mt-1 sm:mt-2">{t.music}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Armchair className="w-8 h-8 sm:w-12 sm:h-12 icon-professional no-float text-yellow-400 rounded-lg p-1.5 sm:p-2" />
              <p className="text-yellow-400 font-bold text-[10px] sm:text-sm mt-1 sm:mt-2">{t.comfort}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="w-8 h-8 sm:w-12 sm:h-12 icon-professional no-float text-yellow-400 rounded-lg p-1.5 sm:p-2" />
              <p className="text-yellow-400 font-bold text-[10px] sm:text-sm mt-1 sm:mt-2">{t.punctuality}</p>
            </div>
          </div>

          {/* Map Location Card */}
          <div className="w-full max-w-4xl px-4 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-white tracking-wider uppercase drop-shadow-md">
              {t.locationTitle}
            </h2>
            <div className="relative block w-full rounded-2xl overflow-hidden group border border-white/10 hover:border-yellow-400/50 transition-all duration-300 shadow-lg hover:shadow-yellow-400/20">
              <TouristCarousel />
            </div>
          </div>

          {/* Footer Info Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto pt-8 border-t border-white/10">
            {/* Address */}
            <a 
              href="https://www.google.com/maps/place/Ponto+de+T%C3%A1xi+Bandeirante/@-15.8684547,-47.9677881,17z/data=!3m1!4b1!4m6!3m5!1s0x935a2e5924d450a7:0x3dfb6bc67cbbedf8!8m2!3d-15.8684547!4d-47.9652132!16s%2Fg%2F11b6hjrn1d?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-colors group border border-white/5 hover:border-white/20"
            >
              <div className="bg-green-500/20 p-3 rounded-full text-green-400 group-hover:bg-green-500 group-hover:text-black transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs text-white/60 uppercase tracking-wider font-bold">{t.footerAddress}</span>
              <p className="text-white text-sm font-medium text-center opacity-80 group-hover:opacity-100">{t.address}</p>
            </a>

            {/* Phone */}
            <a 
              href={ `tel:${phoneNumber}` } 
              onClick={handleCallClick}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-colors group border border-white/5 hover:border-white/20"
            >
              <div className="bg-blue-500/20 p-3 rounded-full text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs text-white/60 uppercase tracking-wider font-bold">{t.footerCall}</span>
              <p className="text-white text-sm font-medium opacity-80 group-hover:opacity-100">{phoneDisplay}</p>
            </a>

            {/* Review */}
            <a 
              href="https://www.google.com/search?sca_esv=2cf39a8e3998f015&rlz=1C1VECK_pt-PTBR1186BR1186&sxsrf=ANbL-n5rwwULQ5EQBU9zivyFy8pGzsfy-g:1771891244853&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOV1qpzDiU2D3LVbTw9_R9ji3A_spuNT7nTp0KHlZj1yz-LyCKYbBy8hdfEHlY6xfl8tYF4Ka5movcYLEzNVXM7f9UrBZdb3wz1khrfsFT_qcgWG5_Q%3D%3D&q=Ponto+de+T%C3%A1xi+Bandeirante+Coment%C3%A1rios&sa=X&ved=2ahUKEwiQp-uh6fCSAxXxK7kGHawEAvEQ0bkNegQILhAH&biw=1280&bih=609&dpr=2#lrd=0x935a2e5924d450a7:0x3dfb6bc67cbbedf8,3,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-colors group border border-white/5 hover:border-white/20"
            >
              <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-400 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                <Star className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-xs text-white/60 uppercase tracking-wider font-bold">{t.footerReview}</span>
              <p className="text-white text-sm font-medium opacity-80 group-hover:opacity-100">Google Reviews</p>
            </a>
          </div>

          {/* Terms and Developer Info */}
          <div className="w-full flex flex-col items-center justify-center gap-2 mt-8 mb-4 border-t border-yellow-400/30 pt-6">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowTerms(true);
              }}
              className="text-[#F2B705]/80 hover:text-[#F2B705] text-xs uppercase tracking-widest transition-colors duration-300 font-medium bg-transparent border-none cursor-pointer"
            >
              Termos de Uso e Privacidade
            </button>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest flex items-center gap-1 hover:text-gray-300 transition-colors duration-300">
              Desenvolvido por: <a href="https://www.marketelli.com" target="_blank" rel="noopener noreferrer" className="text-shimmer-gold hover:text-yellow-400 transition-colors font-bold">www.marketelli.com</a>
            </p>
          </div>

          </div>

      {/* Terms Overlay - Protocolo de Operação Bandeirante (Main Page) */}
      {showTerms && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#000000] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] animate-in zoom-in-95 duration-300">
            {/* Top Border Taxi Yellow */}
            <div className="h-1 w-full bg-[#F2B705] shadow-[0_0_15px_rgba(242,183,5,0.6)] shrink-0" />
            
            <div className="flex flex-col p-6 overflow-hidden h-full">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4 shrink-0">
                <h3 className="text-white font-bold text-lg uppercase tracking-wider">{translations[language].triage.termsTitle}</h3>
                <button 
                  type="button"
                  onClick={() => setShowTerms(false)}
                  className="text-white/60 hover:text-[#F2B705] transition-colors p-1 rounded-full hover:bg-white/5"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto text-white/80 text-sm space-y-5 pr-2 custom-scrollbar">
                <div className="space-y-1">
                  <h4 className="text-[#F2B705] font-bold text-xs uppercase tracking-wider">{translations[language].triage.terms1Title}</h4>
                  <p className="leading-relaxed font-light text-white/90">{translations[language].triage.terms1Text}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[#F2B705] font-bold text-xs uppercase tracking-wider">{translations[language].triage.terms2Title}</h4>
                  <p className="leading-relaxed font-light text-white/90">{translations[language].triage.terms2Text}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[#F2B705] font-bold text-xs uppercase tracking-wider">{translations[language].triage.terms3Title}</h4>
                  <p className="leading-relaxed font-light text-white/90">{translations[language].triage.terms3Text}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[#F2B705] font-bold text-xs uppercase tracking-wider">{translations[language].triage.terms4Title}</h4>
                  <p className="leading-relaxed font-light text-white/90">{translations[language].triage.terms4Text}</p>
                </div>
              </div>
              
              <button 
                type="button"
                onClick={() => setShowTerms(false)}
                className="w-full bg-[#F2B705] hover:bg-[#D4A004] text-black font-extrabold py-3.5 rounded-xl mt-6 transition-all uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(242,183,5,0.2)] hover:shadow-[0_0_30px_rgba(242,183,5,0.4)] shrink-0"
              >
                {translations[language].triage.termsButton}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
