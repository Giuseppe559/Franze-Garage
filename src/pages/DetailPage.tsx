import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Fuel,
  Gauge,
  Cog,
  Zap,
  Palette,
  Users,
  Shield,
  CheckCircle,
  Send
} from 'lucide-react';
import { supabase, Car, ContactRequest } from '../lib/supabase';

interface DetailPageProps {
  carId: string;
  onNavigate: (page: string) => void;
}

export default function DetailPage({ carId, onNavigate }: DetailPageProps) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [formData, setFormData] = useState<ContactRequest>({
    name: '',
    phone: '',
    email: '',
    car_interest: '',
    message: '',
    request_type: 'info'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [dbError, setDbError] = useState<string | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const formScrollRef = useRef<HTMLDivElement | null>(null);
  const stickFormBottomRef = useRef<boolean>(false);

  useEffect(() => {
    async function fetchCar() {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching car:', error);
      } else {
        setCar(data);
        if (data) {
          setFormData(prev => ({
            ...prev,
            car_interest: `${data.brand} ${data.model} - ${data.year}`
          }));
        }
      }
      setLoading(false);
    }

    fetchCar();
  }, [carId]);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (!isMobile) return;
    document.body.style.overflow = isLightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isLightboxOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setDbError(null);
    const text = `Nuova richiesta\nNome: ${formData.name}\nTelefono: ${formData.phone}\nEmail: ${formData.email || '-'}\nAuto: ${formData.car_interest || (car ? `${car.brand} ${car.model} - ${car.year}` : '-') }\nTipo: ${formData.request_type || '-'}\nMessaggio: ${formData.message || '-'}`;
    const waNumber = '393295531339';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    const mailSubject = 'Nuova richiesta Franzè Garage';
    const mailtoUrl = `mailto:franzegarage@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(text)}`;

    try {
      const { error } = await supabase
        .from('contact_requests')
        .insert([formData]);

      if (error) {
        const msg = error.message || 'Archivio non disponibile';
        setDbError(msg);
        setSubmitStatus('error');
        if (typeof window !== 'undefined') {
          window.open(waUrl, '_blank');
          window.open(mailtoUrl, '_blank');
        }
      }

      if (!error) {
        setSubmitStatus('success');
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { source: 'detail_form', car: car ? `${car.brand} ${car.model}` : '' });
        }
        if (typeof window !== 'undefined') {
          window.open(waUrl, '_blank');
          window.open(mailtoUrl, '_blank');
        }
        setFormData({
          name: '',
          phone: '',
          email: '',
          car_interest: car ? `${car.brand} ${car.model} - ${car.year}` : '',
          message: '',
          request_type: 'info'
        });
      }
    } catch (error) {
      const err = error as unknown as { message?: string };
      const msg = err?.message || 'Errore imprevisto';
      setDbError(msg);
      setSubmitStatus('error');
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
        window.open(mailtoUrl, '_blank');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // rimuoviamo auto-scroll globale sul change del messaggio;
    // la gestione avviene in onInput per evitare salti del contenitore
  }, [formData.message]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Caricamento...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-2xl text-gray-600 mb-4">Auto non trovata</div>
        <button
          onClick={() => onNavigate('home')}
          className="text-orange-500 hover:text-orange-600 font-semibold flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Torna alla home</span>
        </button>
      </div>
    );
  }

  const images = car.images && car.images.length > 0 ? car.images : [car.main_image || '/placeholder-car.jpg'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Torna alla home</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold">
            {car.brand} {car.model}
          </h1>
          <p className="text-xl text-gray-300 mt-2">
            {car.fuel_type} • {car.transmission} • {car.mileage.toLocaleString()} km
          </p>
          {(() => {
            const list = car.features || [];
            let value = '';
            const found = list.find((s) => s.toLowerCase().startsWith('allestimento'));
            if (found) {
              const idx = found.indexOf(':');
              value = idx >= 0 ? found.slice(idx + 1).trim() : found.replace(/allestimento/i, '').trim();
            } else {
              const desc = car.description || '';
              const match = desc.match(/(^|\n)\s*Allestimento\s*:\s*(.*)/i);
              if (match) value = match[2].trim();
            }
            if (!value) return null;
            return (
              <p className="text-base text-orange-400 mt-2 line-clamp-1">
                {value}
              </p>
            );
          })()}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <img
                  src={images[selectedImage]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => { setIsLightboxOpen(true); setLightboxIndex(selectedImage); }}
                />
                {car.certified && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Certificata
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 rounded-lg overflow-hidden ${
                        selectedImage === index
                          ? 'ring-4 ring-orange-500'
                          : 'opacity-60 hover:opacity-100'
                      } transition-all`}
                    >
                      <img
                        src={image}
                        alt={`${car.brand} ${car.model} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informazioni Tecniche
              </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Anno</p>
                      <p className="font-semibold text-gray-900">{car.year}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Gauge className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Chilometraggio</p>
                      <p className="font-semibold text-gray-900">{car.mileage.toLocaleString()} km</p>
                    </div>
                  </div>

                  {car.displacement && (
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Gauge className="text-orange-500" size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Cilindrata</p>
                        <p className="font-semibold text-gray-900">{car.displacement.toLocaleString()} cc</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Fuel className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Alimentazione</p>
                      <p className="font-semibold text-gray-900">{car.fuel_type}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Cog className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cambio</p>
                      <p className="font-semibold text-gray-900">{car.transmission}</p>
                    </div>
                  </div>

                {(car.power || car.power_kw) && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Zap className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Potenza</p>
                      <p className="font-semibold text-gray-900">{car.power_kw ? `${car.power_kw} kW` : ''}{car.power_kw && car.power ? ' / ' : ''}{car.power ? `${car.power} CV` : ''}</p>
                    </div>
                  </div>
                )}

                {car.color && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Palette className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Colore esterno</p>
                      <p className="font-semibold text-gray-900">{car.color}</p>
                    </div>
                  </div>
                )}

                {car.interior_color && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Palette className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Colore interno</p>
                      <p className="font-semibold text-gray-900">{car.interior_color}</p>
                    </div>
                  </div>
                )}

                {car.emission_class && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Shield className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Classe emissioni</p>
                      <p className="font-semibold text-gray-900">{car.emission_class}</p>
                    </div>
                  </div>
                )}

                {car.doors && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Porte</p>
                      <p className="font-semibold text-gray-900">{car.doors}</p>
                    </div>
                  </div>
                )}

                {car.owners && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Users className="text-orange-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Proprietari</p>
                      <p className="font-semibold text-gray-900">{car.owners}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {car.description && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Descrizione</h2>
                <p className="text-gray-700 whitespace-pre-line">{car.description}</p>
              </div>
            )}

            <div className="hidden lg:block bg-gray-900 text-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Garanzia e Certificazioni</h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                  <span>Veicolo controllato e certificato</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                  <span>Cronologia manutenzioni verificabile</span>
                </div>
                {car.warranty && (
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                    <span>Garanzia inclusa</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                  <span>Tagliando pre-consegna</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 lg:sticky lg:top-28 h-auto lg:h-[84vh] lg:overflow-hidden flex flex-col">
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Prezzo</p>
                <p className="text-4xl font-bold text-orange-500">
                  €{car.price.toLocaleString()}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Richiedi Informazioni
                </h3>

                <div className="mb-3 flex-shrink-0">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>{isSubmitting ? 'Invio...' : 'Invia richiesta'}</span>
                    <Send size={20} />
                  </button>
                </div>

                <div ref={formScrollRef} className="space-y-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto pr-2 scrollbar-custom">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Il tuo nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+39 123 456 789"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="tua@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="request_type" className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo di richiesta
                    </label>
                    <select
                      id="request_type"
                      value={formData.request_type}
                      onChange={(e) => setFormData({ ...formData, request_type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="info">Richiesta informazioni</option>
                      <option value="test_drive">Test drive</option>
                      <option value="valutation">Valutazione permuta</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Messaggio
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ref={messageRef}
                    onFocus={() => { stickFormBottomRef.current = true; }}
                    onBlur={() => { stickFormBottomRef.current = false; }}
                    onInput={(e) => {
                      const el = e.currentTarget;
                      const max = Math.floor(window.innerHeight * 0.7);
                      el.style.height = 'auto';
                      const next = Math.min(el.scrollHeight, max);
                      const min = 224; // ~ h-56
                      el.style.height = `${Math.max(next, min)}px`;
                      el.scrollTop = el.scrollHeight;
                      if (stickFormBottomRef.current && formScrollRef.current) {
                        formScrollRef.current.scrollTop = formScrollRef.current.scrollHeight;
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent overflow-y-auto resize-none max-h-[70vh] mb-4"
                    placeholder="Scrivi qui il tuo messaggio..."
                  />
                  <div className="h-0" />
                  </div>

                </div>

                <div className="bg-white pt-3 border-t border-gray-100 flex-shrink-0">
                  {dbError && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm mb-3">
                      Salvataggio su archivio non riuscito.
                    </div>
                  )}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm mb-3">
                      Richiesta inviata! Ti contatteremo presto.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm mb-3">
                      Errore. Riprova più tardi.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>{isSubmitting ? 'Invio...' : 'Invia richiesta'}</span>
                    <Send size={20} />
                  </button>
              </div>
            </form>
            </div>
            <div className="lg:hidden bg-gray-900 text-white rounded-xl shadow-lg p-8 mt-6">
              <h2 className="text-2xl font-bold mb-6">Garanzia e Certificazioni</h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                  <span>Veicolo controllato e certificato</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                  <span>Cronologia manutenzioni verificabile</span>
                </div>
                {car.warranty && (
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                    <span>Garanzia inclusa</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                  <span>Tagliando pre-consegna</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center overflow-hidden" onClick={() => setIsLightboxOpen(false)}>
          <div
            className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
            >
              <ArrowLeft size={24} />
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
            >
              <ArrowRight size={24} />
            </button>

            <img
              src={images[lightboxIndex]}
              alt={`${car.brand} ${car.model} zoom`}
              className={`max-h-[85vh] w-auto object-contain select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'} ${dragging ? '' : 'transition-transform duration-200 ease-out'}`}
              style={{ transform: `translateX(${dragDeltaX}px)`, touchAction: (typeof window !== 'undefined' && window.innerWidth < 1024) ? 'none' : 'auto' }}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onPointerDown={(e) => {
                setDragging(true);
                setDragStartX(e.clientX);
              }}
              onPointerMove={(e) => {
                if (!dragging || dragStartX === null) return;
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
                const delta = e.clientX - dragStartX;
                setDragDeltaX(isMobile ? delta * 1.15 : delta);
              }}
              onPointerUp={() => {
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
                const threshold = isMobile ? 20 : 50;
                if (dragDeltaX > threshold) {
                  setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
                  setDragDeltaX(0);
                } else if (dragDeltaX < -threshold) {
                  setLightboxIndex((lightboxIndex + 1) % images.length);
                  setDragDeltaX(0);
                } else {
                  if (isMobile) {
                    const sign = dragDeltaX === 0 ? 0 : (dragDeltaX > 0 ? 1 : -1);
                    if (sign !== 0) {
                      setDragDeltaX(sign * 15);
                      setTimeout(() => setDragDeltaX(0), 120);
                    } else {
                      setDragDeltaX(0);
                    }
                  } else {
                    setDragDeltaX(0);
                  }
                }
                setDragging(false);
                setDragStartX(null);
              }}
              onPointerCancel={() => {
                setDragging(false);
                setDragStartX(null);
                setDragDeltaX(0);
              }}
            />

            <button
              className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 text-white rounded px-3 py-1"
              onClick={() => setIsLightboxOpen(false)}
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
