import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import DetailPage from './pages/DetailPage';
import AdminPage from './pages/AdminPage';

type Page = 'home' | 'detail' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCarId, setSelectedCarId] = useState<string>('');

  const handleNavigate = (page: string, carId?: string) => {
    setCurrentPage(page as Page);
    if (carId) {
      setSelectedCarId(carId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let title = 'Franzè Garage - La tua concessionaria di fiducia';
    if (currentPage === 'detail') title = 'Dettaglio Auto - Franzè Garage';
    if (currentPage === 'admin') title = 'Amministrazione - Franzè Garage';
    document.title = title;
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-grow">
        {currentPage === 'home' && <Homepage onNavigate={handleNavigate} />}
        {currentPage === 'detail' && selectedCarId && (
          <DetailPage carId={selectedCarId} onNavigate={handleNavigate} />
        )}
        {currentPage === 'admin' && <AdminPage onNavigate={handleNavigate} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
