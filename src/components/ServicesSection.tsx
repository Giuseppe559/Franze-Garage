import { Car, CreditCard, Shield, HeadphonesIcon } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Car,
      title: 'Permuta e Valutazione Auto',
      description: 'Portaci la tua auto: la valutiamo subito e ti offriamo la miglior proposta del mercato.'
    },
    {
      icon: CreditCard,
      title: 'Finanziamenti Personalizzati',
      description: 'Soluzioni flessibili, rate su misura e consulenza trasparente.'
    },
    {
      icon: Shield,
      title: 'Garanzia Estesa',
      description: 'Pacchetti di garanzia sulle parti principali del veicolo per viaggiare senza pensieri.'
    },
    {
      icon: HeadphonesIcon,
      title: 'Assistenza Post Vendita',
      description: 'Il nostro team è al tuo fianco anche dopo l\'acquisto.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Servizi Pensati per Ogni Esigenza
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:bg-orange-50 transition-all hover:shadow-lg transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
