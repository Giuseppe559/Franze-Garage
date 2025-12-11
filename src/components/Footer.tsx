import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="/88.jpg"
              alt="Franzè Garage"
              className="w-24 md:w-32 lg:w-40 h-auto mb-4 object-contain mx-auto md:mx-0 mix-blend-multiply opacity-90"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              La tua concessionaria di fiducia. Selezioniamo con cura auto usate garantite per ogni tuo viaggio.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-500">Contatti</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a onClick={() => {
                  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                    window.gtag('event', 'click_contact', { method: 'phone', location: 'footer' });
                  }
                }}
                  href="tel:+393295531339"
                  target="_blank"
                  className="group flex items-center justify-center space-x-2 px-5 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg transition-all"
                  aria-label="Chiama Franzè Garage"
                >
                  <Phone size={18} className="opacity-90 group-hover:opacity-100" />
                  <span>Chiama ora</span>
                </a>
                <a onClick={() => {
                  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                    window.gtag('event', 'click_contact', { method: 'whatsapp', location: 'footer' });
                  }
                }}
                  href="https://wa.me/393295531339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center space-x-2 px-5 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition-all"
                  aria-label="Scrivi su WhatsApp"
                >
                  <MessageCircle size={18} className="opacity-90 group-hover:opacity-100" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-orange-500 flex-shrink-0" />
                  <a onClick={() => {
                    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                      window.gtag('event', 'click_contact', { method: 'phone', location: 'footer-number' });
                    }
                  }} href="tel:+393295531339" target="_blank" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                    +39 329 5531 339
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Via%20Prospero%20Rizzini%206%2FA%2C%20Cazzago%20San%20Martino%20(BS)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Via Prospero Rizzini 6/A<br />Cazzago San Martino (BS)
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:info@franzegarage.it" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  info@franzegarage.it
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-500">Seguici</h3>
            <div className="flex space-x-4">
              <a
                href="https://m.facebook.com/100090415548551/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="http://www.instagram.com/franzegarage/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Dati fiscali: Franzè Garage CF/P.IVA: IT04401580982.
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2024 Franzè Garage. Tutti i diritti riservati.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button type="button" onClick={() => onNavigate && onNavigate('privacy')} className="hover:text-orange-500 transition-colors">Privacy Policy</button>
              <button type="button" onClick={() => onNavigate && onNavigate('cookie')} className="hover:text-orange-500 transition-colors">Cookie Policy</button>
              <span>P.iva: IT04401580982</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
