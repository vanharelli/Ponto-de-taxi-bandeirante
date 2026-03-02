import { X, Car, Calendar, Map, Navigation, ArrowRight, User, Phone, Luggage, MapPin, Banknote, CreditCard, QrCode } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface TriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}

type Step = 'select-service' | 'location' | 'destination' | 'luggage' | 'luggage-count' | 'payment-method' | 'cash-change' | 'cash-change-amount' | 'contact';

interface FormData {
  serviceType: string;
  location: string;
  destination: string;
  hasLuggage: string;
  luggageCount: string;
  paymentMethod: string;
  needsChange: string;
  changeAmount: string;
  name: string;
  whatsapp: string;
}

export function TriageModal({ isOpen, onClose, phoneNumber }: TriageModalProps) {
  const [step, setStep] = useState<Step>('select-service');
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    location: '',
    destination: '',
    hasLuggage: '',
    luggageCount: '',
    paymentMethod: '',
    needsChange: '',
    changeAmount: '',
    name: '',
    whatsapp: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('select-service'); // Reset step when opening
      setFormData({ // Reset form data
        serviceType: '',
        location: '',
        destination: '',
        hasLuggage: '',
        luggageCount: '',
        paymentMethod: '',
        needsChange: '',
        changeAmount: '',
        name: '',
        whatsapp: '',
      });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleServiceSelect = (service: string) => {
    // If it's "Solicitar Agora", we start the flow. 
    // Other options might just redirect directly or have different flows, 
    // but based on request "QUANDO EU CLICAR EM SOLICIAR AGORA", we focus on that.
    if (service === 'AGORA') {
      setFormData(prev => ({ ...prev, serviceType: 'AGORA' }));
      setStep('location');
    } else {
      // For other options, keep original behavior for now or adapt if needed
      // Assuming only "Solicitar Agora" triggers the multi-step flow as requested
      handleDirectAction(service);
    }
  };

  const handleDirectAction = (messagePrefix: string) => {
    let message = '';
    if (messagePrefix === 'AGENDAR') message = 'Olá, gostaria de AGENDAR um horário com o Ponto Bandeirante.';
    else if (messagePrefix === 'TOUR') message = 'Olá, gostaria de informações sobre o serviço de CITY TOUR.';
    else if (messagePrefix === 'PARTICULAR') message = 'Olá, gostaria de um orçamento para uma VIAGEM PARTICULAR.';
    
    sendToWhatsapp(message);
  };

  const sendToWhatsapp = (text: string) => {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleNextStep = (nextStep: Step) => {
    setStep(nextStep);
  };

  const handleFinalSubmit = () => {
    const luggageLabel =
      formData.hasLuggage === 'Sim'
        ? `Sim (${formData.luggageCount || '1'})`
        : formData.hasLuggage || 'Não informado';

    const paymentLabel = formData.paymentMethod || 'Não informado';
    const changeLine = (() => {
      if (formData.paymentMethod !== 'Dinheiro') return '';
      if (formData.needsChange === 'Sim') {
        const amount = formData.changeAmount?.trim();
        return `💵 *Troco:* Sim${amount ? ` (para R$ ${amount})` : ''}\n`;
      }
      if (formData.needsChange === 'Não') return `💵 *Troco:* Não\n`;
      return `💵 *Troco:* Não informado\n`;
    })();

    const message = `*NOVA SOLICITAÇÃO DE TÁXI*\n\n` +
      `👤 *Cliente:* ${formData.name}\n` +
      `📞 *WhatsApp:* ${formData.whatsapp}\n\n` +
      `📍 *Origem:* ${formData.location}\n` +
      `🏁 *Destino:* ${formData.destination}\n` +
      `🧳 *Bagagem:* ${luggageLabel}\n` +
      `💳 *Pagamento:* ${paymentLabel}\n` +
      changeLine +
      `🚕 *Tipo:* ${formData.serviceType}`;
    
    sendToWhatsapp(message);
  };

  const renderStepContent = () => {
    switch (step) {
      case 'select-service':
        return (
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => handleServiceSelect('AGORA')}
              className="w-full bg-[#F2B705] hover:bg-[#D4A004] text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg group border border-white/10"
            >
              <Navigation className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-wide">SOLICITAR AGORA</span>
            </button>
            <button 
              onClick={() => handleServiceSelect('AGENDAR')}
              className="w-full bg-black/40 hover:bg-black/60 text-white border border-white/10 hover:border-[#F2B705] font-semibold py-4 px-6 rounded-xl flex items-center justify-start gap-4 transition-all active:scale-95 shadow-lg group backdrop-blur-md"
            >
              <div className="bg-[#F2B705]/20 p-2 rounded-lg group-hover:bg-[#F2B705] group-hover:text-black transition-colors border border-[#F2B705]/20">
                <Calendar className="w-5 h-5 text-[#F2B705] group-hover:text-black transition-colors" />
              </div>
              <span className="uppercase tracking-tight text-sm">AGENDAR HORÁRIO</span>
            </button>
            <button 
              onClick={() => handleServiceSelect('TOUR')}
              className="w-full bg-black/40 hover:bg-black/60 text-white border border-white/10 hover:border-[#F2B705] font-semibold py-4 px-6 rounded-xl flex items-center justify-start gap-4 transition-all active:scale-95 shadow-lg group backdrop-blur-md"
            >
              <div className="bg-[#F2B705]/20 p-2 rounded-lg group-hover:bg-[#F2B705] group-hover:text-black transition-colors border border-[#F2B705]/20">
                <Map className="w-5 h-5 text-[#F2B705] group-hover:text-black transition-colors" />
              </div>
              <span className="uppercase tracking-tight text-sm">CITY TOUR</span>
            </button>
            <button 
              onClick={() => handleServiceSelect('PARTICULAR')}
              className="w-full bg-black/40 hover:bg-black/60 text-white border border-white/10 hover:border-[#F2B705] font-semibold py-4 px-6 rounded-xl flex items-center justify-start gap-4 transition-all active:scale-95 shadow-lg group backdrop-blur-md"
            >
              <div className="bg-[#F2B705]/20 p-2 rounded-lg group-hover:bg-[#F2B705] group-hover:text-black transition-colors border border-[#F2B705]/20">
                <Car className="w-5 h-5 text-[#F2B705] group-hover:text-black transition-colors" />
              </div>
              <span className="uppercase tracking-tight text-sm">VIAGEM PARTICULAR</span>
            </button>
          </div>
        );

      case 'location':
        return (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
            <label className="text-white text-sm font-bold uppercase tracking-wide">Onde devemos te buscar?</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
              <input 
                type="text" 
                placeholder="Ex: Aeroporto, Setor Hoteleiro..." 
                className="w-full bg-black/40 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                autoFocus
              />
            </div>
            <button 
              onClick={() => formData.location && handleNextStep('destination')}
              disabled={!formData.location}
              className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
            >
              PRÓXIMO <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 'destination':
        return (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
            <label className="text-white text-sm font-bold uppercase tracking-wide">Qual seu destino?</label>
            <div className="relative">
              <Navigation className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
              <input 
                type="text" 
                placeholder="Ex: Asa Sul, Lago Sul..." 
                className="w-full bg-black/40 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                autoFocus
              />
            </div>
            <button 
              onClick={() => formData.destination && handleNextStep('luggage')}
              disabled={!formData.destination}
              className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
            >
              PRÓXIMO <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 'luggage':
        return (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
            <label className="text-white text-sm font-bold uppercase tracking-wide">Você tem muita bagagem?</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  setFormData({ ...formData, hasLuggage: 'Sim', luggageCount: '', paymentMethod: '', needsChange: '' });
                  handleNextStep('luggage-count');
                }}
                className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-6 flex flex-col items-center gap-3 transition-all group"
              >
                <Luggage className="w-8 h-8 text-white group-hover:text-[#F2B705]" />
                <span className="text-white font-bold">SIM</span>
              </button>
              <button 
                onClick={() => {
                  setFormData({ ...formData, hasLuggage: 'Não', luggageCount: '0', paymentMethod: '', needsChange: '' });
                  handleNextStep('payment-method');
                }}
                className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-6 flex flex-col items-center gap-3 transition-all group"
              >
                <Luggage className="w-8 h-8 text-white/50 group-hover:text-[#F2B705]" />
                <span className="text-white font-bold">NÃO</span>
              </button>
            </div>
          </div>
        );

      case 'luggage-count':
        return (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
            <label className="text-white text-sm font-bold uppercase tracking-wide">São quantas bagagens?</label>
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
                autoFocus
              />
            </div>
            <button
              onClick={() => formData.luggageCount && handleNextStep('payment-method')}
              disabled={!formData.luggageCount}
              className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
            >
              PRÓXIMO <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 'payment-method':
        return (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
            <label className="text-white text-sm font-bold uppercase tracking-wide">Forma de pagamento</label>
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
                <span className="text-white font-bold uppercase tracking-wide">DINHEIRO</span>
              </button>

              <button
                onClick={() => {
                  setFormData({ ...formData, paymentMethod: 'Cartão', needsChange: '' });
                  handleNextStep('contact');
                }}
                className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-4 flex items-center gap-3 transition-all group"
              >
                <div className="bg-[#F2B705]/15 p-2 rounded-lg border border-[#F2B705]/20 group-hover:bg-[#F2B705]/25 transition-colors">
                  <CreditCard className="w-5 h-5 text-[#F2B705]" />
                </div>
                <span className="text-white font-bold uppercase tracking-wide">CARTÃO CRÉDITO/DÉBITO</span>
              </button>

              <button
                onClick={() => {
                  setFormData({ ...formData, paymentMethod: 'Pix', needsChange: '' });
                  handleNextStep('contact');
                }}
                className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-4 flex items-center gap-3 transition-all group"
              >
                <div className="bg-[#F2B705]/15 p-2 rounded-lg border border-[#F2B705]/20 group-hover:bg-[#F2B705]/25 transition-colors">
                  <QrCode className="w-5 h-5 text-[#F2B705]" />
                </div>
                <span className="text-white font-bold uppercase tracking-wide">PIX</span>
              </button>
            </div>
          </div>
        );

      case 'cash-change':
        return (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
            <label className="text-white text-sm font-bold uppercase tracking-wide">Vai precisar de troco?</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setFormData({ ...formData, needsChange: 'Sim', changeAmount: '' });
                  handleNextStep('cash-change-amount');
                }}
                className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-6 flex flex-col items-center gap-3 transition-all group"
              >
                <Banknote className="w-8 h-8 text-white group-hover:text-[#F2B705]" />
                <span className="text-white font-bold">SIM</span>
              </button>
              <button
                onClick={() => {
                  setFormData({ ...formData, needsChange: 'Não', changeAmount: '' });
                  handleNextStep('contact');
                }}
                className="bg-black/40 hover:bg-[#F2B705]/20 border border-white/20 hover:border-[#F2B705] rounded-xl p-6 flex flex-col items-center gap-3 transition-all group"
              >
                <Banknote className="w-8 h-8 text-white/50 group-hover:text-[#F2B705]" />
                <span className="text-white font-bold">NÃO</span>
              </button>
            </div>
          </div>
        );

      case 'cash-change-amount':
        return (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
            <label className="text-white text-sm font-bold uppercase tracking-wide">Troco para quanto?</label>
            <div className="relative">
              <Banknote className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
              <input
                type="text"
                inputMode="decimal"
                placeholder="Ex: 50"
                className="w-full bg-black/40 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                value={formData.changeAmount}
                onChange={(e) => setFormData({ ...formData, changeAmount: e.target.value })}
                autoFocus
              />
            </div>
            <button
              onClick={() => formData.changeAmount.trim() && handleNextStep('contact')}
              disabled={!formData.changeAmount.trim()}
              className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
            >
              PRÓXIMO <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 'contact':
        return (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-300">
            <label className="text-white text-sm font-bold uppercase tracking-wide">Seus Dados</label>
            
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
              <input 
                type="text" 
                placeholder="Nome Completo" 
                className="w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F2B705] w-5 h-5" />
              <input 
                type="tel" 
                placeholder="WhatsApp" 
                className="w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F2B705] transition-colors"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>

            <p className="text-white/60 text-xs text-center px-4">
              Ao tocar em “ENVIAR PARA WHATSAPP”, você será direcionado ao WhatsApp. Basta confirmar e enviar a mensagem automática para a Central de Atendimento.
            </p>

            <button 
              onClick={handleFinalSubmit}
              disabled={!formData.name || !formData.whatsapp}
              className="w-full bg-[#F2B705] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A004] text-black font-bold py-4 rounded-xl mt-2 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(242,183,5,0.3)] hover:shadow-[0_0_30px_rgba(242,183,5,0.5)]"
            >
              ENVIAR PARA WHATSAPP <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (step) {
      case 'select-service': return 'SELECIONE O SERVIÇO';
      case 'location': return 'LOCAL DE PARTIDA';
      case 'destination': return 'SEU DESTINO';
      case 'luggage': return 'BAGAGEM';
      case 'luggage-count': return 'BAGAGEM';
      case 'payment-method': return 'PAGAMENTO';
      case 'cash-change': return 'TROCO';
      case 'cash-change-amount': return 'TROCO';
      case 'contact': return 'FINALIZAR';
    }
  };

  const getSubtitle = () => {
    switch (step) {
      case 'select-service': return 'Como podemos ajudar você hoje?';
      case 'location': return 'Informe onde o motorista deve te encontrar';
      case 'destination': return 'Para onde você vai?';
      case 'luggage': return 'Precisamos definir o tamanho do veículo';
      case 'luggage-count': return 'Quantas bagagens você vai levar?';
      case 'payment-method': return 'Escolha a forma de pagamento';
      case 'cash-change': return 'Se precisar, avisamos o motorista';
      case 'cash-change-amount': return 'Assim o motorista já vai preparado';
      case 'contact': return 'Último passo para confirmar seu pedido';
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-6 shadow-2xl transform transition-all scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 mt-2">
          <h2 className="text-2xl font-bold text-white tracking-tight uppercase drop-shadow-md transition-all">
            {getTitle()}
          </h2>
          <p className="text-white/80 text-sm mt-2 font-medium transition-all">
            {getSubtitle()}
          </p>
        </div>

        {/* Dynamic Content */}
        {renderStepContent()}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs font-medium uppercase tracking-widest">
            PONTO DE TÁXI BANDEIRANTE
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
