export default function CookiePolicy() {
  const handleResetConsent = () => {
    localStorage.removeItem('cookie_consent');
    window.location.reload();
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
        <div className="space-y-4 text-gray-700 mb-8">
          <p>
            Usiamo cookie tecnici per il corretto funzionamento del sito e, su consenso, cookie analitici per migliorare l'esperienza.
          </p>
          <p>
            Puoi modificare le tue preferenze in qualsiasi momento.
          </p>
        </div>
        <button onClick={handleResetConsent} className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold">
          Modifica preferenze cookie
        </button>
      </div>
    </div>
  );
}

