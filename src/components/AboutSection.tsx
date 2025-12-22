import { Shield, TrendingUp, Users, Wrench } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: 'Auto d\'importazione selezionate',
      description: 'Condizioni impeccabili e coperte da garanzia'
    },
    {
      icon: TrendingUp,
      title: 'Finanziamenti personalizzati',
      description: 'Soluzioni flessibili per ogni esigenza'
    },
    {
      icon: Users,
      title: 'Acquisto e permuta',
      description: 'Valutazioni trasparenti e immediate'
    },
    {
      icon: Wrench,
      title: 'Consulenza completa',
      description: 'Supporto in ogni fase dell\'acquisto'
    }
  ];

  return (
    <section className="pt-10 sm:pt-10 md:pt-10 lg:pt-20 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="items-center">
          <div className="space-y-6">
            <div className="space-y-4 text-center">
              

              <h2 className="text-4xl font-bold text-gray-900">
                Franzè Garage: la tua concessionaria di fiducia
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ogni auto che proponiamo viene selezionata con attenzione, perché crediamo che la fiducia nasca prima di tutto dalla qualità delle nostre scelte.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Crediamo nella trasparenza, nella cura del cliente e in un servizio post-vendita che non ti lascia mai solo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="text-orange-500" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
