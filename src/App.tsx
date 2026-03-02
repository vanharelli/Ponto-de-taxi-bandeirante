import { IcebergPremiumGlass } from './components/IcebergPremiumGlass.tsx';
import { useDoubleBackExit } from './hooks/useDoubleBackExit';
import { useEffect } from 'react';
import './assets/core.css';
import './assets/animations_led.css';
import './App.css';

function App() {
  const { showExitToast } = useDoubleBackExit();

  useEffect(() => {
    // FRONTEND ARMOR (ANTI-PIRACY LEVEL 9)
    const handleContextMenu = (e: Event) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'U'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && ['S', 'P', 'C', 'U'].includes(e.key.toUpperCase()))
      ) {
        e.preventDefault();
      }
    };
    const handleDragStart = (e: Event) => e.preventDefault();

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Video Layer */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90"></div>
      </div>

      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/BACKGROUND.webp')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Premium Glass Container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-full">
            <IcebergPremiumGlass />
          </div>
        </div>
      </div>

      {/* Security Toast (Double-Back Protocol) */}
      {showExitToast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[9999] bg-[#0B1A30] border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-lg shadow-2xl font-bold tracking-wider animate-pulse">
          Press back again to exit
        </div>
      )}
    </div>
  );
}

export default App;