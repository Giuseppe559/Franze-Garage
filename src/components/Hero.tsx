import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden flex flex-col md:block bg-gray-900 md:bg-gray-900 md:bg-[url('/0.jpg')] md:bg-[length:99%_auto] md:bg-top md:bg-fixed min-h-[60vh] md:min-h-[720px]">
      <div className="hidden md:block absolute inset-0 bg-black/25 z-0"></div>
      <div className="md:hidden absolute inset-0 bg-transparent z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0 md:pt-40 md:pb-36 bg-transparent w-full">
        <div className="grid grid-cols-1 gap-4 md:gap-12 items-center justify-items-center">
          <div className="space-y-6 md:space-y-10 text-center">
            <div className="relative md:hidden px-4 pt-10 pb-12 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 -z-10 w-56 h-56 mx-auto rounded-full bg-orange-500/20 blur-3xl"></div>
                <img
                  src="/0.jpg"
                  alt="Franzè Garage"
                  className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover shadow-xl ring-4 ring-orange-500/30"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                La Tua Prossima Auto È Qui.
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-orange-500 mt-1">
                Benvenuto da Franzè Garage.
              </p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-3 max-w-md">
                Selezioniamo con cura auto usate garantite. Trasparenza, sicurezza e professionalità per ogni tuo viaggio.
              </p>
              <div className="w-full max-w-sm mt-6 space-y-3">
                <button
                  onClick={() => {
                    document.getElementById('home-inventory')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-base transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <span>Scopri le nostre auto</span>
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-semibold text-base transition-all"
                >
                  Valuta la tua auto
                </button>
              </div>
            </div>



            <div className="hidden md:block">
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

            <div className="hidden md:flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
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
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all md:bg-transparent md:border-2 md:border-white md:hover:bg-white md:hover:text-gray-900"
              >
                Valuta la tua auto
              </button>
            </div>

            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-28 md:mt-40 justify-items-center">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-base md:text-lg">Auto certificate</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-base md:text-lg">Finanziamenti personalizzati</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-base md:text-lg">Assistenza dedicata</span>
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
