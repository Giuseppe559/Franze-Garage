import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden flex flex-col md:block bg-gray-900 lg:bg-gray-900 lg:min-h-[720px]">
      <div className="hidden lg:block absolute inset-0">
        <img
          src="/0.jpg"
          alt=""
          className="w-full h-full object-cover lg:transform lg:scale-90"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-16 lg:py-36 bg-transparent w-full">
        <div className="grid grid-cols-1 gap-4 md:gap-10 lg:gap-12 items-center justify-items-center">
          <div className="space-y-6 md:space-y-8 lg:space-y-10 text-center">
            <div className="relative overflow-hidden rounded-xl p-3 sm:p-4 lg:p-0">
              <img
                src="/0.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-[1px] lg:hidden"
              />
              <div className="relative space-y-3 md:space-y-4 text-center">
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
