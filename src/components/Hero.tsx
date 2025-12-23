import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden flex flex-col md:block bg-gray-900 bg-[url('/0.jpg')] bg-[position:50%_28%] md:bg-[position:50%_22%] bg-no-repeat bg-[length:210%_auto] md:bg-[length:210%_auto] lg:bg-[url('/0.jpg')] lg:bg-[length:99%_auto] lg:bg-top lg:bg-fixed min-h-[70vh] lg:min-h-[720px]">
      <div className="hidden lg:block absolute inset-0 bg-black/25 z-0"></div>
      <div className="lg:hidden absolute inset-0 bg-transparent z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 md:pt-16 md:pb-12 lg:pt-40 lg:pb-36 bg-transparent w-full">
        <div className="grid grid-cols-1 gap-4 md:gap-10 lg:gap-12 items-center justify-items-center">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 text-center">
            <div className="relative lg:hidden px-6 sm:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
              <div className="max-w-md w-full rounded-2xl bg-transparent shadow-2xl px-6 py-7 space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white">
                  La Tua Prossima Auto È Qui.
                </h1>
                <p className="text-2xl sm:text-3xl font-bold text-orange-500">
                  Benvenuto da Franzè Garage.
                </p>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                  Selezioniamo con cura auto usate garantite. Trasparenza, sicurezza e professionalità per ogni tuo viaggio.
                </p>
              </div>
              <div className="max-w-md w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                <button
                  onClick={() => {
                    document.getElementById('home-inventory')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold text-base transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Scopri le nostre auto</span>
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-white/0 hover:bg-white/10 text-white px-5 py-3 rounded-xl font-semibold text-base transition-all border border-white/40"
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

            <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 pt-6 md:pt-8 lg:pt-12 justify-items-center">
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
