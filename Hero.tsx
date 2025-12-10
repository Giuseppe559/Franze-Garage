import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                La Tua Prossima Auto È Qui.{' '}
                <span className="text-orange-500">Benvenuto da Franzè Garage.</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Selezioniamo con cura auto usate garantite. Trasparenza, sicurezza e professionalità per ogni tuo viaggio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  document.getElementById('home-inventory')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Scopri le nostre auto</span>
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Valuta la tua auto
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
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

          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img
              src="/0.jpg"
              alt="Franzè Garage"
              className="relative rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
