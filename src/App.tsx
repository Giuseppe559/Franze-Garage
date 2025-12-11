import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import DetailPage from './pages/DetailPage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import FloatingActions from './components/FloatingActions';

type Page = 'home' | 'detail' | 'admin' | 'contact' | 'privacy' | 'cookie';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCarId, setSelectedCarId] = useState<string>('');
  const [showConsent, setShowConsent] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const v = localStorage.getItem('cookie_consent');
    return v !== 'accepted' && v !== 'rejected';
  });

  const handleNavigate = (page: string, carId?: string) => {
    setCurrentPage(page as Page);
    if (carId) {
      setSelectedCarId(carId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let title = 'Franzè Garage, la tua concessionaria di fiducia';
    if (currentPage === 'detail') title = 'Dettaglio Auto - Franzè Garage';
    if (currentPage === 'admin') title = 'Amministrazione - Franzè Garage';
    if (currentPage === 'contact') title = 'Contatti - Franzè Garage';
    if (currentPage === 'privacy') title = 'Privacy Policy - Franzè Garage';
    if (currentPage === 'cookie') title = 'Cookie Policy - Franzè Garage';
    document.title = title;

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, [currentPage]);

  const acceptConsent = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
      window.gtag('event', 'consent_update', { status: 'accepted' });
    }
    localStorage.setItem('cookie_consent', 'accepted');
    setShowConsent(false);
  };

  const rejectConsent = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
      window.gtag('event', 'consent_update', { status: 'rejected' });
    }
    localStorage.setItem('cookie_consent', 'rejected');
    setShowConsent(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-grow">
        {currentPage === 'home' && <Homepage onNavigate={handleNavigate} />}
        {currentPage === 'detail' && selectedCarId && (
          <DetailPage carId={selectedCarId} onNavigate={handleNavigate} />
        )}
        {currentPage === 'admin' && <AdminPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'cookie' && <CookiePolicy />}
      </main>

      <Footer onNavigate={handleNavigate} />

      <FloatingActions />

      {showConsent && (
        <div className="fixed bottom-0 inset-x-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-0">
                Usiamo cookie per analisi e migliorare l'esperienza. Puoi accettare o rifiutare gli strumenti di analisi.
              </div>
              <div className="flex items-center gap-2">
                <button onClick={rejectConsent} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-semibold">Rifiuta</button>
                <button onClick={acceptConsent} className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold">Accetta</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
