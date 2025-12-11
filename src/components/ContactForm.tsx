import { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase, ContactRequest } from '../lib/supabase';

interface ContactFormProps {
  compact?: boolean;
  hideHeader?: boolean;
}

export default function ContactForm({ compact = false, hideHeader = false }: ContactFormProps) {
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
  const [notifyError, setNotifyError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setDbError(null);
    setNotifyError(null);

    try {
      const { error } = await supabase
        .from('contact_requests')
        .insert([formData]);

      if (error) {
        const msg = error.message || 'Archivio non disponibile';
        setDbError(msg);
        setSubmitStatus('error');
      }

      if (!error) {
        setSubmitStatus('success');
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { source: 'contact_form' });
        }
        const { data: notifyData, error: notifyErr } = await supabase.functions.invoke('notify-request', { body: { formData } });
        if (notifyErr) {
          setNotifyError(notifyErr.message || 'Notifica non inviata');
        } else if (notifyData && (!notifyData.emailSent && !notifyData.whatsappSent)) {
          setNotifyError('Notifica non inviata');
        }
        setFormData({
          name: '',
          phone: '',
          email: '',
          car_interest: '',
          message: '',
          request_type: 'info'
        });
      }
    } catch (error) {
      const err = error as unknown as { message?: string };
      const msg = err?.message || 'Errore imprevisto';
      setDbError(msg);
      setSubmitStatus('error');
      const { data: notifyData, error: notifyErr } = await supabase.functions.invoke('notify-request', { body: { formData } });
      if (notifyErr) {
        setNotifyError(notifyErr.message || 'Notifica non inviata');
      } else if (notifyData && (!notifyData.emailSent && !notifyData.whatsappSent)) {
        setNotifyError('Notifica non inviata');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className={`${compact ? 'py-8' : 'py-20'} bg-gray-50`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          <div className={`text-center ${compact ? 'mb-6' : 'mb-12'}`}>
            <h2 className={`${compact ? 'text-2xl' : 'text-4xl'} font-bold text-gray-900 mb-2`}>
              Hai Trovato l'Auto Che Cerchi? Contattaci!
            </h2>
            <p className={`${compact ? 'text-base' : 'text-xl'} text-gray-600`}>
              compila il modulo per ricevere maggiori informaioni, fissare un appuntamento, richiedere un test drive o ottenere una valutazione della tua auto
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`bg-white rounded-2xl shadow-xl ${compact ? 'p-6' : 'p-8'}`}>
          <div className={`grid md:grid-cols-2 ${compact ? 'gap-4 mb-4' : 'gap-6 mb-6'}`}>
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
                className={`w-full ${compact ? 'px-3 py-2' : 'px-4 py-3'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
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
                className={`w-full ${compact ? 'px-3 py-2' : 'px-4 py-3'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                placeholder="+39 123 456 789"
              />
            </div>
          </div>

          <div className={`${compact ? 'mb-4' : 'mb-6'}`}>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full ${compact ? 'px-3 py-2' : 'px-4 py-3'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="tua@email.com"
            />
          </div>

          <div className={`${compact ? 'mb-4' : 'mb-6'}`}>
            <label htmlFor="car_interest" className="block text-sm font-semibold text-gray-700 mb-2">
              Auto di interesse
            </label>
            <input
              type="text"
              id="car_interest"
              value={formData.car_interest}
              onChange={(e) => setFormData({ ...formData, car_interest: e.target.value })}
              className={`w-full ${compact ? 'px-3 py-2' : 'px-4 py-3'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="Es: BMW Serie 3 2020"
            />
          </div>

          <div className={`${compact ? 'mb-4' : 'mb-6'}`}>
            <label htmlFor="request_type" className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo di richiesta
            </label>
            <select
              id="request_type"
              value={formData.request_type}
              onChange={(e) => setFormData({ ...formData, request_type: e.target.value })}
              className={`w-full ${compact ? 'px-3 py-2' : 'px-4 py-3'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
            >
              <option value="info">Richiesta informazioni</option>
              <option value="test_drive">Test drive</option>
              <option value="valutation">Valutazione permuta</option>
            </select>
          </div>

          <div className={`${compact ? 'mb-4' : 'mb-6'}`}>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Messaggio
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full ${compact ? 'px-3 py-2' : 'px-4 py-3'} border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
              placeholder="Scrivi qui il tuo messaggio..."
            />
          </div>

          {submitStatus === 'success' && (
          <div className={`${compact ? 'mb-4' : 'mb-6'} bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg`}>
            {notifyError ? 'Richiesta salvata. Notifica non inviata; ti contatteremo presto.' : 'Richiesta inviata con successo! Ti contatteremo presto.'}
          </div>
          )}

          {dbError && (
            <div className={`${compact ? 'mb-4' : 'mb-6'} bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg`}>
              Salvataggio su archivio non riuscito.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className={`${compact ? 'mb-4' : 'mb-6'} bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg`}>
              Si è verificato un errore. Riprova più tardi.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white ${compact ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'} rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2`}
          >
            <span>{isSubmitting ? 'Invio in corso...' : 'Invia richiesta'}</span>
            <Send size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}
