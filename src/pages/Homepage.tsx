import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import { Search, Calendar, Fuel, Gauge, ArrowRight } from 'lucide-react';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ContactForm from '../components/ContactForm';
import { supabase, Car } from '../lib/supabase';

interface HomepageProps {
  onNavigate: (page: string, carId?: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    fuelType: ''
  });

  const minPriceOptions = [1000, 5000, 10000, 20000, 30000, 40000, 50000, 75000, 100000];
  const maxPriceOptions = [5000, 10000, 20000, 30000, 40000, 50000, 75000, 100000, 150000];
  const yearOptions = Array.from({ length: 2026 - 1995 + 1 }, (_, i) => 2026 - i);

  const brandOptions = Array.from(new Set(cars.map((c) => c.brand))).sort();
  const modelOptions = filters.brand
    ? Array.from(new Set(cars.filter((c) => c.brand === filters.brand).map((c) => c.model))).sort()
    : [];

  const sampleCars: Car[] = [
    {
      id: 'sample-1',
      brand: 'Fiat',
      model: '500',
      year: 2020,
      price: 12000,
      mileage: 25000,
      fuel_type: 'Benzina',
      transmission: 'Manuale',
      description: 'City car compatta, perfetta per la città, consumi contenuti.',
      main_image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4b?q=80&w=1600&auto=format&fit=crop',
      certified: true,
      available: true
    },
    {
      id: 'sample-2',
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2018,
      price: 16500,
      mileage: 60000,
      fuel_type: 'Diesel',
      transmission: 'Manuale',
      description: 'Compatta solida e affidabile, ideale per viaggi e quotidiano.',
      main_image: 'https://images.unsplash.com/photo-1517940310602-94f3543a9a18?q=80&w=1600&auto=format&fit=crop',
      certified: true,
      available: true
    },
    {
      id: 'sample-3',
      brand: 'BMW',
      model: '320d',
      year: 2019,
      price: 26500,
      mileage: 55000,
      fuel_type: 'Diesel',
      transmission: 'Automatico',
      description: 'Berlina premium, comfort e prestazioni con consumi ridotti.',
      main_image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600&auto=format&fit=crop',
      certified: true,
      available: true
    },
    {
      id: 'sample-4',
      brand: 'Tesla',
      model: 'Model 3',
      year: 2021,
      price: 38900,
      mileage: 30000,
      fuel_type: 'Elettrica',
      transmission: 'Automatico',
      description: 'Elettrica con autonomia elevata e tecnologia avanzata.',
      main_image: 'https://images.unsplash.com/photo-1609621838510-5b8511bcf821?q=80&w=1600&auto=format&fit=crop',
      certified: true,
      available: true
    }
  ];

  const fetchCars = async () => {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('available', true)
      .order('created_at', { ascending: false });
    if (error) {
      const list = sampleCars;
      setCars(list);
      setFilteredCars(list);
    } else {
      const list = data || [];
      if (list.length === 0) {
        setCars(sampleCars);
        setFilteredCars(sampleCars);
      } else {
        setCars(list);
        setFilteredCars(list);
      }
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('cars-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, () => {
        fetchCars();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let filtered = [...cars];

    if (filters.brand) {
      filtered = filtered.filter(car => car.brand === filters.brand);
    }

    if (filters.model) {
      filtered = filtered.filter(car => car.model === filters.model);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= Number(filters.maxPrice));
    }

    if (filters.minYear) {
      filtered = filtered.filter(car => car.year >= Number(filters.minYear));
    }

    if (filters.maxYear) {
      filtered = filtered.filter(car => car.year <= Number(filters.maxYear));
    }

    if (filters.fuelType) {
      filtered = filtered.filter(car =>
        car.fuel_type.toLowerCase() === filters.fuelType.toLowerCase()
      );
    }

    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleResetFilters = () => {
    setFilters({
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      fuelType: ''
    });
  };

  return (
    <div>
      <Hero />
      <AboutSection />
      <section id="home-inventory" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Le Nostre Auto Selezionate
            </h1>
            <p className="text-xl text-gray-600">
              Sfoglia il nostro parco auto. Qualità garantita e controlli certificati.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Search className="mr-2 text-orange-500" size={24} />
              Trova l'auto che fa per te
            </h2>

            <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 mb-4">
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value, model: '' })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Marca</option>
                {brandOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <select
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                disabled={!filters.brand}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
              >
                <option value="">Modello</option>
                {modelOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Prezzo min</option>
                {minPriceOptions.map((v) => (
                  <option key={v} value={v}>{`€${v.toLocaleString()}`}</option>
                ))}
              </select>

              <select
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Prezzo max</option>
                {maxPriceOptions.map((v) => (
                  <option key={v} value={v}>{`€${v.toLocaleString()}`}</option>
                ))}
              </select>

              <select
                value={filters.minYear}
                onChange={(e) => setFilters({ ...filters, minYear: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Anno min</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select
                value={filters.maxYear}
                onChange={(e) => setFilters({ ...filters, maxYear: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Anno max</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select
                value={filters.fuelType}
                onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Alimentazione</option>
                <option value="Benzina">Benzina</option>
                <option value="Diesel">Diesel</option>
                <option value="Ibrida">Ibrida</option>
                <option value="Elettrica">Elettrica</option>
                <option value="GPL">GPL</option>
                <option value="Metano">Metano</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Resetta filtri
            </button>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-600">
              {filteredCars.length} {filteredCars.length === 1 ? 'auto trovata' : 'auto trovate'}
            </p>
          </div>

          {filteredCars.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-500">Nessuna auto trovata con questi filtri.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 text-orange-500 hover:text-orange-600 font-semibold"
              >
                Resetta i filtri per vedere tutte le auto
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
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
                      {car.description}
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
          )}
        </div>
      </section>
      <ServicesSection />
      <WhyChooseUs />
      <ContactForm />
    </div>
  );
}
