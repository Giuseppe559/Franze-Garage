import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden flex flex-col lg:block bg-gray-900 lg:bg-gray-900 lg:bg-[url('/0.jpg')] lg:bg-[length:99%_auto] lg:bg-top lg:bg-fixed min-h-[90vh] lg:min-h-[720px]">
      <div className="hidden lg:block absolute inset-0 bg-black/25 z-0"></div>
      
      <div className="absolute inset-0 z-0 lg:hidden">
        <img 
          src="/0.jpg" 
          alt="Background" 
          className="w-full h-full object-contain md:object-cover object-center opacity-80 scale-125 md:scale-100"
        />
        <div className="absolute inset-x-0 top-0 h-1/6 md:h-full bg-gradient-to-b from-black/20 via-black/30 to-gray-900/70"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-0 lg:pt-40 lg:pb-36 bg-transparent w-full h-full flex flex-col justify-start lg:block min-h-[90vh] lg:min-h-0">
        <div className="grid grid-cols-1 gap-4 lg:gap-12 items-center justify-items-center h-full">
          <div className="space-y-6 lg:space-y-10 text-center w-full">
            <div className="lg:hidden flex flex-col items-center text-center justify-start h-full pt-0 pb-0 mt-0">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight drop-shadow-lg mb-2">
                La Tua Prossima<br />
                <span className="text-orange-500">Auto È Qui.</span>
              </h1>
              <p className="text-base font-medium text-gray-200 drop-shadow-md mt-2 mb-5 max-w-xs">
                Franzè Garage: Qualità, trasparenza e sicurezza per ogni tuo viaggio.
              </p>
              
              <div className="w-full max-w-sm space-y-3 mt-48 md:mt-64">
                <button
                  onClick={() => {
                    document.getElementById('home-inventory')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-bold text-base shadow-lg shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Scopri le nostre auto</span>
                  <ArrowRight size={22} />
                </button>
                <button
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 px-6 py-4 rounded-xl font-bold text-base transition-all active:scale-95"
                >
                  Valuta la tua auto
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="space-y-4 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  La Tua Prossima Auto È Qui.
                </h1>
                <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-orange-500">
                  Benvenuto da Franzè Garage.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                  Selezioniamo con cura auto usate garantite. Trasparenza, sicurezza e professionalità per ogni tuo viaggio.
                </p>
              </div>
            </div>

            <div className="hidden lg:flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => {
                  document.getElementById('home-inventory')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Scopri le nostre auto</span>
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all lg:bg-transparent lg:border-2 lg:border-white lg:hover:bg-white lg:hover:text-gray-900"
              >
                Valuta la tua auto
              </button>
            </div>

            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mt-28 lg:mt-40 justify-items-center">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-base lg:text-lg">Auto certificate</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-base lg:text-lg">Finanziamenti personalizzati</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-base lg:text-lg">Assistenza dedicata</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="absolute bottom-4 inset-x-0 md:hidden hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-orange-500 flex-shrink-0" size={20} />
              <span className="text-xs">Auto certificate</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-orange-500 flex-shrink-0" size={20} />
              <span className="text-xs">Finanziamenti personalizzati</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-orange-500 flex-shrink-0" size={20} />
              <span className="text-xs">Assistenza dedicata</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
