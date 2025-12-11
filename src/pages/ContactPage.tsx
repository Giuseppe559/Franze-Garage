import ContactForm from '../components/ContactForm';
import { MapPin, Phone } from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {onNavigate && (
          <div className="flex justify-end mb-4">
            <button onClick={() => onNavigate('home')} className="text-orange-500 hover:text-orange-600 font-semibold">Torna alla Home</button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin size={36} className="text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Indirizzo</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Via%20Prospero%20Rizzini%206%2FA%2C%20Cazzago%20San%20Martino%20(BS)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-orange-600"
                  >
                    Via Prospero Rizzini 6/A, Cazzago San Martino (BS)
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone size={36} className="text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Telefono</p>
                  <a href="tel:+393295531339" className="text-sm text-gray-700 hover:text-orange-600">+39 329 5531 339</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              title="Mappa Franzè Garage"
              src="https://www.google.com/maps?q=Via%20Prospero%20Rizzini%206%2FA%2C%20Cazzago%20San%20Martino%20(BS)&output=embed"
              className="w-full h-[360px] md:h-[420px] lg:h-[500px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <ContactForm compact hideHeader />
      </div>
    </div>
  );
}
