import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="/unnamed.jpg"
              alt="Franzè Garage Logo"
              className="h-16 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              La tua concessionaria di fiducia. Selezioniamo con cura auto usate garantite per ogni tuo viaggio.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-500">Contatti</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-400">Via Example, 123<br />00000 Città (XX)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <a href="tel:+393295531339" target="_blank" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
                  +39 329 5531 339
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle size={18} className="text-green-500 flex-shrink-0" />
                <a href="https://wa.me/393295531339" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
                  +39 329 5531 339
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:info@franzegarage.it" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
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
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2024 Franzè Garage. Tutti i diritti riservati.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a>
              <span>P.IVA: 12345678901</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
