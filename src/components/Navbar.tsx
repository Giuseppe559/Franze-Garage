import { Phone, MessageCircle, Facebook, Instagram } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const scrollTopMobile = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <>
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => { onNavigate('home'); scrollTopMobile(); }}
              className={`text-sm md:text-base transition-colors hover:text-orange-500 ${
                currentPage === 'home' ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                if (currentPage === 'home') {
                  document.getElementById('home-inventory')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('home-inventory')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }
              }}
              className="text-sm md:text-base transition-colors hover:text-orange-500"
            >
              Inventario Auto
            </button>
            <button
              onClick={() => { onNavigate('contact'); scrollTopMobile(); }}
              className="text-sm md:text-base transition-colors hover:text-orange-500"
            >
              Contatti
            </button>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <a
              href="https://m.facebook.com/100090415548551/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-orange-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="http://www.instagram.com/franzegarage/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-orange-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a href="tel:+393295531339" target="_blank" className="hidden sm:flex items-center space-x-2 hover:text-orange-500 transition-colors">
              <Phone size={18} />
              <span className="text-sm">+39 329 5531 339</span>
            </a>
            <a href="https://wa.me/393295531339" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center space-x-2 hover:text-orange-500 transition-colors">
              <MessageCircle size={18} className="text-green-500" />
              <span className="text-sm">+39 329 5531 339</span>
            </a>
            <button
              onClick={() => onNavigate('admin')}
              className={`hidden sm:flex transition-colors hover:text-orange-500 ${
                currentPage === 'admin' ? 'text-orange-500 font-semibold' : ''
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div className={`fixed top-14 md:top-18 w-36 md:w-52 z-[60] pointer-events-none ${
      currentPage === 'detail' ? 'right-4 md:right-6' : 'left-4 md:left-6'
    }`}>
      <img
        src="/ww.PNG"
        alt="Logo adesivo"
        className="w-full h-auto"
      />
    </div>
    </>
  );
}
