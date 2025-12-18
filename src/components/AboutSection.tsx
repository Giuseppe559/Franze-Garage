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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="items-center">
          <div className="space-y-6">
            <div className="space-y-4 text-center">
              {/* Sezione visibile solo su mobile/tablet, spostata qui come richiesto */}
              <div className="md:hidden grid grid-cols-1 gap-3 justify-items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Auto certificate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Finanziamenti personalizzati</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Assistenza dedicata</span>
                </div>
              </div>

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
