import { X, Car, Calendar, Map, Navigation, ArrowRight, User, Phone, Luggage, MapPin, Banknote, CreditCard, QrCode, Users, ArrowLeft, Clock, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { translations, type Language } from '../utils/translations';

interface TriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  language: Language;
}

type Step = 
  | 'select-service' 
  // Common Steps
  | 'location' | 'destination' | 'luggage' | 'luggage-count' | 'passengers' | 'payment-method' | 'cash-change' | 'cash-change-amount' | 'contact'
  // Specific Steps
  | 'schedule-datetime' | 'description';

type ServiceType = 'Agora' | 'Agendar Horário' | 'City Tour' | 'Viagem Particular' | '';

interface FormData {
  serviceType: ServiceType;
  location: string;
  destination: string;
  hasLuggage: string;
  luggageCount: string;
  passengerCount: string;
  paymentMethod: string;
  needsChange: string;
  changeAmount: string;
  scheduleDateTime: string;
  description: string;
  name: string;
  whatsapp: string;
}

export function TriageModal({ isOpen, onClose, phoneNumber, language }: TriageModalProps) {
  const [step, setStep] = useState<Step>('select-service');
  const [showTerms, setShowTerms] = useState(false);
  const t = translations[language].triage;
  // Get terms translations directly from translations object
  // We use type assertion or access directly if we are sure keys exist
  const tTerms = translations[language] as any; 

  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    location: '',
    destination: '',
    hasLuggage: '',
    luggageCount: '',
    passengerCount: '',
    paymentMethod: '',
    needsChange: '',
    changeAmount: '',
    scheduleDateTime: '',
    description: '',
    name: '',
    whatsapp: '',
  });

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      const preventDefault = (e: Event) => e.preventDefault();
      document.body.addEventListener('touchmove', preventDefault, { passive: false });

      setStep('select-service');
      setFormData({
        serviceType: '',
        location: '',
        destination: '',
        hasLuggage: '',
        luggageCount: '',
        passengerCount: '',
        paymentMethod: '',
        needsChange: '',
        changeAmount: '',
        scheduleDateTime: '',
        description: '',
        name: '',
        whatsapp: '',
      });

      return () => {
        document.body.style.overflow = originalStyle;
        document.body.removeEventListener('touchmove', preventDefault);
      };
    }
  }, [isOpen]);

  const handleNextStep = (nextStep: Step) => {
    setStep(nextStep);
  };

  const handleServiceSelect = (type: ServiceType) => {
    setFormData({ ...formData, serviceType: type });
    if (type === 'Agora') handleNextStep('location');
    else if (type === 'Agendar Horário') handleNextStep('schedule-datetime');
    else if (type === 'City Tour' || type === 'Viagem Particular') handleNextStep('description');
  };

  // Centralized Navigation Logic
  const navigateNext = () => {
    switch (step) {
      // Flow Start points are handled in handleServiceSelect

      case 'schedule-datetime':
        if (formData.serviceType === 'Agendar Horário') handleNextStep('location');
        else handleNextStep('passengers'); // Tour/Trip
        break;

      case 'location':
        handleNextStep('destination');
        break;

      case 'destination':
        handleNextStep('luggage');
        break;

      case 'luggage':
        if (formData.hasLuggage === 'Sim') handleNextStep('luggage-count');
        else handleNextStep('passengers');
        break;

      case 'luggage-count':
        handleNextStep('passengers');
        break;

      case 'passengers':
        if (formData.serviceType === 'City Tour' || formData.serviceType === 'Viagem Particular') {
          handleNextStep('contact');
        } else {
          handleNextStep('payment-method');
        }
        break;

      case 'payment-method':
        if (formData.paymentMethod === 'Dinheiro') handleNextStep('cash-change');
        else handleNextStep('contact');
        break;

      case 'cash-change':
        if (formData.needsChange === 'Sim') handleNextStep('cash-change-amount');
        else handleNextStep('contact');
        break;

      case 'cash-change-amount':
        handleNextStep('contact');
        break;
      
      case 'description':
        handleNextStep('schedule-datetime');
        break;
    }
  };

  const handleBack = () => {
    switch (step) {
      case 'select-service': onClose(); break;
      
      // Common & Shared Steps
      case 'location': 
        if (formData.serviceType === 'Agora') setStep('select-service');
        else if (formData.serviceType === 'Agendar Horário') setStep('schedule-datetime');
        break;

      case 'destination': setStep('location'); break;
      case 'luggage': setStep('destination'); break;
      case 'luggage-count': setStep('luggage'); break;
      
      case 'passengers': 
        if (formData.serviceType === 'City Tour' || formData.serviceType === 'Viagem Particular') {
          setStep('schedule-datetime');
        } else {
          setStep(formData.hasLuggage === 'Sim' ? 'luggage-count' : 'luggage'); 
        }
        break;

      case 'payment-method': setStep('passengers'); break;
      case 'cash-change': setStep('payment-method'); break;
      case 'cash-change-amount': setStep('cash-change'); break;
      
      // Specific Steps
      case 'schedule-datetime': 
        if (formData.serviceType === 'Agendar Horário') setStep('select-service');
        else setStep('description'); // Tour/Trip
        break;

      case 'description': setStep('select-service'); break;

      case 'contact': 
        if (formData.serviceType === 'City Tour' || formData.serviceType === 'Viagem Particular') {
          setStep('passengers');
        } else {
          // Agora or Agendar
          if (formData.paymentMethod === 'Dinheiro') {
            setStep(formData.needsChange === 'Sim' ? 'cash-change-amount' : 'cash-change');
          } else {
            setStep('payment-method');
          }
        }
        break;
    }
  };

  const handleFinalSubmit = () => {
    const { serviceType, name, location, destination, passengerCount, hasLuggage, luggageCount, paymentMethod, scheduleDateTime, description } = formData;

    let message = `*🚕 NOVA SOLICITAÇÃO - PONTO BANDEIRANTE*\n` +
      `------------------------------------------\n` +
      `*📍 SERVIÇO:* ${serviceType}\n` +
      `*👤 CLIENTE:* ${name}\n` +
      `------------------------------------------\n`;

    if (serviceType === 'Agora' || serviceType === 'Agendar Horário') {
      if (serviceType === 'Agendar Horário') {
         message += `*📅 DATA/HORA:* ${scheduleDateTime}\n`;
      }
      
      message += `*🛫 EMBARQUE:* ${location}\n` +
        `*🏁 DESTINO:* ${destination}\n` +
        `------------------------------------------\n` +
        `*📦 VEÍCULO:* Padrão\n` +
        `*👥 PASSAGEIROS:* ${passengerCount}\n` +
        `*🧳 BAGAGEM:* ${hasLuggage}${luggageCount ? ` (${luggageCount})` : ''}\n` +
        `*💳 PAGAMENTO:* ${paymentMethod}\n` +
        (formData.needsChange === 'Sim' ? `*💵 TROCO:* Sim (para R$ ${formData.changeAmount})\n` : '');
    } else {
      // Tour or Trip
      message += `*📝 DETALHES/ROTEIRO:* ${description}\n` +
        `*📅 DATA/HORA PREFERIDA:* ${scheduleDateTime}\n` +
        `*👥 PASSAGEIROS:* ${passengerCount}\n` +
        `*ℹ️ INFO:* Sob Consulta (Orçamento)\n`;
    }

    message += `------------------------------------------\n` +
      `_Enviado via Central Digital Bandeirante_`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    onClose();
  };

  const getProgress = () => {
    // Determine total steps based on flow
    let totalSteps = 1;
    let currentStepIndex = 0;

    if (formData.serviceType === 'Agora') {
      // loc, dest, lug, (lug-cnt), pass, pay, (change), (change-amt), contact
      // Simplified linear view: 
      // 1. Loc, 2. Dest, 3. Lug, 4. Pass, 5. Pay, 6. Contact
      totalSteps = 6;
      if (step === 'location') currentStepIndex = 1;
      if (step === 'destination') currentStepIndex = 2;
      if (step.includes('luggage')) currentStepIndex = 3;
      if (step === 'passengers') currentStepIndex = 4;
      if (step.includes('payment') || step.includes('cash')) currentStepIndex = 5;
      if (step === 'contact') currentStepIndex = 6;
    } else if (formData.serviceType === 'Agendar Horário') {
      // date, loc, dest, lug, pass, pay, contact
      totalSteps = 7;
      if (step === 'schedule-datetime') currentStepIndex = 1;
      if (step === 'location') currentStepIndex = 2;
      if (step === 'destination') currentStepIndex = 3;
      if (step.includes('luggage')) currentStepIndex = 4;
      if (step === 'passengers') currentStepIndex = 5;
      if (step.includes('payment') || step.includes('cash')) currentStepIndex = 6;
      if (step === 'contact') currentStepIndex = 7;
    } else {
      // Tour/Trip: desc, date, pass, contact
      totalSteps = 4;
      if (step === 'description') currentStepIndex = 1;
      if (step === 'schedule-datetime') currentStepIndex = 2;
      if (step === 'passengers') currentStepIndex = 3;
      if (step === 'contact') currentStepIndex = 4;
    }

    return (currentStepIndex / totalSteps) * 100;
  };

  const getTitle = () => {
    switch (step) {
      case 'select-service': return t.selectService;
      case 'location': return t.locationTitle;
      case 'destination': return t.destinationTitle;
      case 'luggage': return t.luggageTitle;
      case 'luggage-count': return t.luggageCountTitle;
      case 'passengers': return t.passengersTitle;
      case 'payment-method': return t.paymentTitle;
      case 'cash-change': return t.changeTitle;
      case 'cash-change-amount': return t.changeAmountTitle;
      case 'schedule-datetime': return t.scheduleTitle;
      case 'description': return formData.serviceType === 'City Tour' ? t.tourTitle : t.tripTitle;
      case 'contact': return t.contactTitle;
      default: return '';
    }
  };

  const getSubtitle = () => {
    switch (step) {
      case 'select-service': return t.howCanWeHelp;
      case 'location': return t.locationSubtitle;
      case 'destination': return t.destinationSubtitle;
      case 'luggage': return t.luggageSubtitle;
      case 'luggage-count': return t.luggageCountSubtitle;
      case 'passengers': return t.passengersSubtitle;
      case 'payment-method': return t.paymentSubtitle;
      case 'cash-change': return t.changeSubtitle;
      case 'cash-change-amount': return t.changeAmountSubtitle;
      case 'schedule-datetime': return t.scheduleSubtitleStep;
      case 'description': return formData.serviceType === 'City Tour' ? t.tourSubtitleStep : t.tripSubtitleStep;
      case 'contact': return t.contactSubtitle;
      default: return '';
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-6 shadow-2xl transform transition-all scale-100 animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Progress Bar */}
        {step !== 'select-service' && (
          <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
            <div 
              className="h-full bg-[#F2B705] transition-all duration-500 ease-out"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="absolute top-4 w-full px-8 left-0 flex justify-between items-center z-10 pointer-events-none">
          {step !== 'select-service' && (
            <button 
              onClick={handleBack}
              className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 pointer-events-auto -ml-2"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 pointer-events-auto ml-auto -mr-2"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8 mt-2">
          <h2 className="text-2xl font-bold text-white tracking-tight uppercase drop-shadow-md transition-all">
            {getTitle()}
          </h2>
          <p className="text-white/80 text-sm mt-2 font-medium transition-all">
            {getSubtitle()}
          </p>
        </div>

        {/* Steps Content */}
        <div className="min-h-[300px]">
          {step === 'select-service' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <button 
                onClick={() => handleServiceSelect('Agora')}
                className="w-full bg-[#F2B705] hover:bg-[#D4A004] text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg group border border-white/10"
              >
                <Navigation className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-wide">{t.serviceNow}</span>
              </button>
              
              <button 
                onClick={() => handleServiceSelect('Agendar Horário')}
                className="w-full bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-4 flex items-center gap-3 transition-all group"
              >
                <div className="bg-[#F2B705]/15 p-2 rounded-lg border border-[#F2B705]/20 group-hover:bg-[#F2B705]/25 transition-colors">
                  <Calendar className="w-6 h-6 text-[#F2B705]" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white font-bold uppercase tracking-wide">{t.serviceSchedule}</span>
                  <span className="text-white/40 text-xs">{t.scheduleSubtitle}</span>
                </div>
              </button>

              <button 
                onClick={() => handleServiceSelect('City Tour')}
                className="w-full bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-4 flex items-center gap-3 transition-all group"
              >
                <div className="bg-[#F2B705]/15 p-2 rounded-lg border border-[#F2B705]/20 group-hover:bg-[#F2B705]/25 transition-colors">
                  <Map className="w-6 h-6 text-[#F2B705]" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white font-bold uppercase tracking-wide">{t.serviceTour}</span>
                  <span className="text-white/40 text-xs">{t.tourSubtitle}</span>
                </div>
              </button>

              <button 
                onClick={() => handleServiceSelect('Viagem Particular')}
                className="w-full bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-4 flex items-center gap-3 transition-all group"
              >
                <div className="bg-[#F2B705]/15 p-2 rounded-lg border border-[#F2B705]/20 group-hover:bg-[#F2B705]/25 transition-colors">
                  <Car className="w-6 h-6 text-[#F2B705]" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white font-bold uppercase tracking-wide">{t.serviceTrip}</span>
                  <span className="text-white/40 text-xs">{t.tripSubtitle}</span>
                </div>
              </button>
            </div>
          )}

          {/* SHARED STEPS */}
          {step === 'location' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.locationSubtitle}</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={t.locationPlaceholder} 
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <button 
                onClick={() => formData.location && navigateNext()}
                disabled={!formData.location}
                className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
              >
                {t.nextButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 'destination' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.destinationSubtitle}</label>
              <div className="relative">
                <Navigation className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={t.destinationPlaceholder} 
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>
              <button 
                onClick={() => formData.destination && navigateNext()}
                disabled={!formData.destination}
                className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
              >
                {t.nextButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 'luggage' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.hasLuggage}</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    setFormData({ ...formData, hasLuggage: 'Sim', luggageCount: '' });
                    handleNextStep('luggage-count');
                  }}
                  className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-6 flex flex-col items-center gap-3 transition-all group"
                >
                  <Luggage className="w-8 h-8 text-white group-hover:text-[#F2B705]" />
                  <span className="text-white font-bold">{t.yes}</span>
                </button>
                <button 
                  onClick={() => {
                    setFormData({ ...formData, hasLuggage: 'Não', luggageCount: '0' });
                    handleNextStep('passengers');
                  }}
                  className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-6 flex flex-col items-center gap-3 transition-all group"
                >
                  <Luggage className="w-8 h-8 text-white/50 group-hover:text-[#F2B705]" />
                  <span className="text-white font-bold">{t.no}</span>
                </button>
              </div>
            </div>
          )}

          {step === 'luggage-count' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.luggageCountLabel}</label>
              <div className="relative">
                <Luggage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={20}
                  placeholder="Ex: 2"
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  value={formData.luggageCount}
                  onChange={(e) => setFormData({ ...formData, luggageCount: e.target.value })}
                />
              </div>
              <button
                onClick={() => formData.luggageCount && navigateNext()}
                disabled={!formData.luggageCount}
                className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
              >
                {t.nextButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 'passengers' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.passengersLabel}</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={6}
                  placeholder="Ex: 2"
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  value={formData.passengerCount}
                  onChange={(e) => setFormData({ ...formData, passengerCount: e.target.value })}
                />
              </div>
              <button
                onClick={() => formData.passengerCount && navigateNext()}
                disabled={!formData.passengerCount}
                className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
              >
                {t.nextButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 'payment-method' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.paymentLabel}</label>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => {
                    setFormData({ ...formData, paymentMethod: 'Dinheiro', needsChange: '', changeAmount: '' });
                    handleNextStep('cash-change');
                  }}
                  className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-4 flex items-center gap-3 transition-all group"
                >
                  <div className="bg-[#F2B705]/15 p-2 rounded-lg border border-[#F2B705]/20 group-hover:bg-[#F2B705]/25 transition-colors">
                    <Banknote className="w-5 h-5 text-[#F2B705]" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-wide">{t.money}</span>
                </button>

                <button 
                  onClick={() => {
                    setFormData({ ...formData, paymentMethod: 'Cartão Crédito/Débito', needsChange: 'Não', changeAmount: '' });
                    handleNextStep('contact');
                  }}
                  className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-4 flex items-center gap-3 transition-all group"
                >
                  <div className="bg-[#F2B705]/15 p-2 rounded-lg border border-[#F2B705]/20 group-hover:bg-[#F2B705]/25 transition-colors">
                    <CreditCard className="w-5 h-5 text-[#F2B705]" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-wide">{t.card}</span>
                </button>

                <button 
                  onClick={() => {
                    setFormData({ ...formData, paymentMethod: 'Pix', needsChange: 'Não', changeAmount: '' });
                    handleNextStep('contact');
                  }}
                  className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-4 flex items-center gap-3 transition-all group"
                >
                  <div className="bg-[#F2B705]/15 p-2 rounded-lg border border-[#F2B705]/20 group-hover:bg-[#F2B705]/25 transition-colors">
                    <QrCode className="w-5 h-5 text-[#F2B705]" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-wide">{t.pix}</span>
                </button>
              </div>
            </div>
          )}

          {step === 'cash-change' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.needsChange}</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    setFormData({ ...formData, needsChange: 'Sim', changeAmount: '' });
                    handleNextStep('cash-change-amount');
                  }}
                  className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-6 flex flex-col items-center gap-3 transition-all group"
                >
                  <Banknote className="w-8 h-8 text-white group-hover:text-[#F2B705]" />
                  <span className="text-white font-bold">{t.yes}</span>
                </button>
                <button 
                  onClick={() => {
                    setFormData({ ...formData, needsChange: 'Não', changeAmount: '' });
                    handleNextStep('contact');
                  }}
                  className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-6 flex flex-col items-center gap-3 transition-all group"
                >
                  <Banknote className="w-8 h-8 text-white/50 group-hover:text-[#F2B705]" />
                  <span className="text-white font-bold">{t.no}</span>
                </button>
              </div>
            </div>
          )}

          {step === 'cash-change-amount' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.changeAmountLabel}</label>
              <div className="relative">
                <Banknote className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 50"
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  value={formData.changeAmount}
                  onChange={(e) => setFormData({ ...formData, changeAmount: e.target.value })}
                />
              </div>
              <button
                onClick={() => formData.changeAmount.trim() && navigateNext()}
                disabled={!formData.changeAmount.trim()}
                className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
              >
                {t.nextButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* SPECIFIC STEPS */}
          {step === 'schedule-datetime' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.dateTimeLabel}</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={t.schedulePlaceholder} 
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  value={formData.scheduleDateTime}
                  onChange={(e) => setFormData({...formData, scheduleDateTime: e.target.value})}
                />
              </div>
              <button 
                onClick={() => formData.scheduleDateTime && navigateNext()}
                disabled={!formData.scheduleDateTime}
                className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
              >
                {t.nextButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 'description' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.descriptionLabel}</label>
              <div className="relative">
                <textarea 
                  placeholder={formData.serviceType === 'City Tour' ? t.tourPlaceholder : t.tripPlaceholder} 
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors h-32 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <button 
                onClick={() => formData.description && navigateNext()}
                disabled={!formData.description}
                className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
              >
                {t.nextButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* CONTACT STEP (COMMON) */}
          {step === 'contact' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
              <label className="text-white text-sm font-bold uppercase tracking-wide">{t.yourData}</label>
              
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
                <input 
                  type="text" 
                  placeholder={t.namePlaceholder} 
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
                <input 
                  type="tel" 
                  placeholder={t.whatsappPlaceholder} 
                  className="w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>

              <p className="text-white/60 text-xs text-center px-4">
                {t.whatsappInstruction}
              </p>

              <button 
                onClick={() => setShowTerms(true)}
                className="text-white/40 hover:text-white/80 text-[10px] uppercase tracking-widest underline transition-colors"
              >
                {tTerms.triage.termsLink}
              </button>

              <button 
                onClick={handleFinalSubmit}
                disabled={!formData.name || !formData.whatsapp}
                className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(242,183,5,0.3)] hover:shadow-[0_0_30px_rgba(242,183,5,0.5)]"
              >
                {t.sendButton} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest">
            PONTO DE TÁXI BANDEIRANTE
          </p>
        </div>

        {/* Terms Overlay - Protocolo de Operação Bandeirante */}
        {showTerms && (
          <div className="absolute inset-0 z-50 bg-[#000000] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Top Border Taxi Yellow */}
            <div className="h-1 w-full bg-[#F2B705] shadow-[0_0_15px_rgba(242,183,5,0.6)]" />
            
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className="text-white font-bold text-lg uppercase tracking-wider">{tTerms.triage.termsTitle}</h3>
                <button 
                  onClick={() => setShowTerms(false)}
                  className="text-white/60 hover:text-[#F2B705] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto text-white/80 text-sm space-y-6 pr-2 custom-scrollbar">
                <div className="space-y-1">
                  <h4 className="text-[#F2B705] font-bold text-xs uppercase tracking-wider">{tTerms.triage.terms1Title}</h4>
                  <p className="leading-relaxed font-light text-white/90">{tTerms.triage.terms1Text}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[#F2B705] font-bold text-xs uppercase tracking-wider">{tTerms.triage.terms2Title}</h4>
                  <p className="leading-relaxed font-light text-white/90">{tTerms.triage.terms2Text}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[#F2B705] font-bold text-xs uppercase tracking-wider">{tTerms.triage.terms3Title}</h4>
                  <p className="leading-relaxed font-light text-white/90">{tTerms.triage.terms3Text}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[#F2B705] font-bold text-xs uppercase tracking-wider">{tTerms.triage.terms4Title}</h4>
                  <p className="leading-relaxed font-light text-white/90">{tTerms.triage.terms4Text}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTerms(false)}
                className="w-full bg-[#F2B705] hover:bg-[#D4A004] text-black font-extrabold py-4 rounded-xl mt-6 transition-all uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(242,183,5,0.2)] hover:shadow-[0_0_30px_rgba(242,183,5,0.4)]"
              >
                {tTerms.triage.termsButton}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
