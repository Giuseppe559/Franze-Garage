import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden min-h-[320px] md:min-h-[520px] lg:min-h-[640px]">
      <img
        src="/0.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover blur-[2px]"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-8 md:gap-12 items-center justify-items-center">
          <div className="space-y-6 md:space-y-8 text-center">
            <div className="space-y-3 md:space-y-4">
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

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
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
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-5 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all"
              >
                Valuta la tua auto
              </button>
            </div>

            <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 md:pt-8 justify-items-center">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-sm">Auto certificate</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-sm">Finanziamenti personalizzati</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-sm">Assistenza dedicata</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="absolute bottom-4 inset-x-0 md:hidden">
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
