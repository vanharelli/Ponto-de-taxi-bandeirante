import { IcebergPremiumGlass } from './components/IcebergPremiumGlass.tsx';
import './assets/core.css';
import './assets/animations_led.css';
import './App.css';

function App() {
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
          <source src="/taxi-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90"></div>
      </div>

      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/BACKGROUND.jpg')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Premium Glass Container */}
        <div className="flex-1 flex items-center justify-center px-4 pb-8">
          <div className="premium-glass w-full max-w-6xl mx-auto">
            <IcebergPremiumGlass />
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;