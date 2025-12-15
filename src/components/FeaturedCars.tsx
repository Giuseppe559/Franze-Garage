import { ArrowRight, Fuel, Gauge, Calendar } from 'lucide-react';
import { Car } from '../lib/supabase';

interface FeaturedCarsProps {
  cars: Car[];
  onNavigate: (page: string, carId?: string) => void;
}

export default function FeaturedCars({ cars, onNavigate }: FeaturedCarsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Le Nostre Auto Selezionate
          </h2>
          <p className="text-xl text-gray-600">
            Sfoglia il nostro parco auto. Qualità garantita e controlli certificati.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cars.slice(0, 3).map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
              onClick={() => onNavigate('detail', car.id)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.main_image || '/placeholder-car.jpg'}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {car.certified && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Certificata
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {car.brand} {car.model}
                </h3>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar size={16} className="text-orange-500" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Gauge size={16} className="text-orange-500" />
                    <span>{car.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Fuel size={16} className="text-orange-500" />
                    <span>{car.fuel_type}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {(function () {
                    const list = car.features || [];
                    const found = list.find((s) => s.toLowerCase().startsWith('allestimento'));
                    if (!found) {
                      const desc = car.description || '';
                      const match = desc.match(/(^|\n)\s*Allestimento\s*:\s*(.*)/i);
                      return match ? match[2].trim() : desc;
                    }
                    const idx = found.indexOf(':');
                    const value = idx >= 0 ? found.slice(idx + 1).trim() : found.replace(/allestimento/i, '').trim();
                    return value || (car.description || '');
                  })()}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-orange-500">
                    €{car.price.toLocaleString()}
                  </span>
                  <button className="text-orange-500 hover:text-orange-600 font-semibold flex items-center space-x-2">
                    <span>Dettagli</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
