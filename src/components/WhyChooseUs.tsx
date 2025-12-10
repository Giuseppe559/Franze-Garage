import { CheckCircle } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    'Auto controllate e garantite',
    'Storico manutenzione verificabile',
    'Trattative chiare e senza sorprese',
    'Supporto a 360°',
    'Esperienza reale nel settore automotive',
    'Ricerca personalizzata dell\'auto perfetta'
  ];

  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold mb-6">
              Perché Scegliere <span className="text-orange-500">Franzè Garage</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              La nostra priorità è farvi guidare un'auto sicura e adatta alle vostre esigenze.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/0.jpg"
              alt="Franzè Garage"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
