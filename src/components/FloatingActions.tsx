import { Phone, MessageCircle, MapPin } from 'lucide-react';

export default function FloatingActions() {
  const handleEvent = (method: string, location: string) => {
    const w = window as unknown as { gtag?: (event: string, action: string, params: Record<string, unknown>) => void };
    if (typeof window !== 'undefined' && typeof w.gtag === 'function') {
      w.gtag('event', 'click_contact', { method, location });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/393295531339"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleEvent('whatsapp', 'floating')}
        aria-label="Apri WhatsApp"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center"
      >
        <MessageCircle size={24} />
      </a>
      <a
        href="tel:+393295531339"
        target="_blank"
        onClick={() => handleEvent('phone', 'floating')}
        aria-label="Chiama telefono"
        className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg flex items-center justify-center"
      >
        <Phone size={24} />
      </a>
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=Via%20Prospero%20Rizzini%206%2FA%2C%20Cazzago%20San%20Martino%20(BS)"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleEvent('maps', 'floating')}
        aria-label="Apri posizione"
        className="w-14 h-14 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg flex items-center justify-center"
      >
        <MapPin size={24} className="text-orange-500" />
      </a>
    </div>
  );
}
