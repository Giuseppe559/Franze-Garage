import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Review = { name: string; rating: number; text: string; date: string };

const fallbackReviews: Review[] = [
  { name: 'Marco R.', rating: 5, text: "Esperienza eccellente. Ho trovato l'auto perfetta e il team è stato professionale e disponibile in ogni fase.", date: 'Novembre 2024' },
  { name: 'Laura M.', rating: 5, text: 'Servizio impeccabile, auto in condizioni perfette e finanziamento personalizzato. Consigliatissimo!', date: 'Ottobre 2024' },
  { name: 'Giuseppe T.', rating: 5, text: 'Professionalità e trasparenza. La permuta della mia vecchia auto è stata veloce e onesta.', date: 'Settembre 2024' },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  type FnResp = { reviews?: Array<{ name?: string; rating?: number; text?: string; date?: string }> };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-google-reviews', { body: {} });
        const resp = (data as FnResp) ?? {};
        if (!error && resp.reviews && Array.isArray(resp.reviews) && resp.reviews.length > 0) {
          const mapped: Review[] = resp.reviews.map((r) => ({
            name: String(r.name || ''),
            rating: Number(r.rating || 0),
            text: String(r.text || ''),
            date: String(r.date || ''),
          }));
          if (isMounted) setReviews(mapped);
        }
      } catch {
        // noop: fallbackReviews already set
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Le Opinioni di Chi Ci Ha Scelto
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all relative"
            >
              <Quote className="absolute top-6 right-6 text-orange-500 opacity-20" size={48} />

              <div className="flex items-center space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="text-orange-500 fill-orange-500" size={20} />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                "{review.text}"
              </p>

              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
