import { useEffect, useState } from 'react';
import { supabase, Car, STORAGE_BUCKET } from '../lib/supabase';
import { PlusCircle, Edit, Trash2, EyeOff, Eye, Save, UploadCloud, Images, LogIn, LogOut } from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export default function AdminPage({ onNavigate }: AdminPageProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [query, setQuery] = useState('');

  const [newCar, setNewCar] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '' as string,
    mileage: '' as string,
    fuel_type: 'Benzina',
    transmission: 'Manuale',
    displacement: '' as string,
    power_cv: '' as string,
    power_kw: '' as string,
    color: '' as string,
    interior_color: '' as string,
    emission_class: '' as string,
    doors: '' as string,
    description: '',
    allestimento: '' as string,
    main_image: '',
    imagesText: '' as string,
    certified: false,
    warranty: false,
    available: true
  });

  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const years = Array.from({ length: 2030 - 1990 + 1 }, (_, i) => 2030 - i);

  const listCars = async () => {
    setError('');
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      const needAuth = /permission|rls|unauthori|not allowed/i.test(error.message);
      if (needAuth) {
        const { data: avail, error: e2 } = await supabase
          .from('cars')
          .select('*')
          .eq('available', true)
          .order('created_at', { ascending: false });
        if (!e2) {
          setCars(avail || []);
          setError('Per vedere tutti gli annunci, effettua l\'accesso');
        } else {
          setError(`Errore nel caricamento degli annunci: ${e2.message}`);
        }
      } else {
        setError(`Errore nel caricamento degli annunci: ${error.message}`);
      }
    } else {
      setCars(data || []);
    }
  };

  useEffect(() => {
    listCars();
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
      setAuthChecked(true);
    });
  }, []);

  const parseImages = (text: string) => {
    return text
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  };

  const moveItem = (arr: string[], from: number, to: number) => {
    const copy = [...arr];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  };

  const selectAllOnQuadClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.detail >= 4) {
      e.currentTarget.select();
    }
  };

  const uploadFileToStorage = async (file: File, folder: string) => {
    const path = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleLogin = async () => {
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
    if (error) {
      const friendly = /invalid.*credential|invalid login/i.test(error.message)
        ? 'Credenziali non valide: email o password errate'
        : `Accesso fallito: ${error.message}`;
      setError(friendly);
    } else {
      setIsLoggedIn(true);
      setSuccess('Accesso effettuato');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setSuccess('Disconnessione effettuata');
  };

  const handleMainImageUpload = async (file?: File) => {
    if (!file) return;
    if (!isLoggedIn) { setError('Devi accedere per caricare immagini'); return; }
    setUploadingMain(true);
    setError('');
    setSuccess('');
    try {
      const url = await uploadFileToStorage(file, 'main');
      setNewCar({ ...newCar, main_image: url });
      setSuccess('Foto principale caricata');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      const extra = msg.includes('Bucket not found') ? ` • crea il bucket "${STORAGE_BUCKET}" in Supabase Storage e rendilo pubblico` : '';
      setError(`Errore caricamento foto principale${msg ? `: ${msg}` : ''}${extra}`);
    } finally {
      setUploadingMain(false);
    }
  };

  const handleGalleryUpload = async (files?: FileList | File[]) => {
    if (!files || (Array.isArray(files) && files.length === 0)) return;
    if (!isLoggedIn) { setError('Devi accedere per caricare immagini'); return; }
    const list = Array.from(files as FileList);
    setUploadingGallery(true);
    setError('');
    setSuccess('');
    try {
      const urls = await Promise.all(list.map((f) => uploadFileToStorage(f, 'gallery')));
      const merged = [
        ...parseImages(newCar.imagesText),
        ...urls
      ];
      setNewCar({ ...newCar, imagesText: merged.join('\n') });
      setSuccess('Fotografie caricate');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      const extra = msg.includes('Bucket not found') ? ` • crea il bucket "${STORAGE_BUCKET}" in Supabase Storage e rendilo pubblico` : '';
      setError(`Errore caricamento fotografie${msg ? `: ${msg}` : ''}${extra}`);
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    const priceVal = newCar.price === '' ? NaN : Number(newCar.price);
    const mileageVal = newCar.mileage === '' ? NaN : Number(newCar.mileage);
    if (!newCar.brand || !newCar.model || Number.isNaN(priceVal) || Number.isNaN(mileageVal)) {
      setLoading(false);
      setError('Compila marca, modello, prezzo e chilometraggio');
      return;
    }
    const images = parseImages(newCar.imagesText);
    const featuresPayload = newCar.allestimento.trim() ? [`Allestimento: ${newCar.allestimento.trim()}`] : undefined;
    const insertPayloadBase: Partial<Car> = {
      brand: newCar.brand,
      model: newCar.model,
      year: Number(newCar.year),
      price: priceVal,
      mileage: mileageVal,
      fuel_type: newCar.fuel_type,
      transmission: newCar.transmission,
      displacement: newCar.displacement === '' ? undefined : Number(newCar.displacement.replace(/[^\d]/g, '')),
      power: newCar.power_cv === '' ? undefined : Number(newCar.power_cv),
      power_kw: newCar.power_kw === '' ? undefined : Number(newCar.power_kw),
      color: newCar.color || undefined,
      interior_color: newCar.interior_color || undefined,
      emission_class: newCar.emission_class || undefined,
      doors: newCar.doors === '' ? undefined : Number(newCar.doors),
      description: newCar.description,
      main_image: newCar.main_image,
      images,
      certified: newCar.certified,
      warranty: newCar.warranty,
      available: newCar.available,
    };
    const payloadWithFeatures = featuresPayload ? { ...insertPayloadBase, features: featuresPayload } : insertPayloadBase;
    let { error } = await supabase.from('cars').insert(payloadWithFeatures);
    if (error) {
      const msg = error.message || '';
      const featuresMissing = /column\s+"?features"?\s+does not exist|unknown column.*features|column not found.*features/i.test(msg);
      if (featuresMissing && featuresPayload) {
        const descWithAllestimento = `Allestimento: ${newCar.allestimento.trim()}\n${newCar.description}`.trim();
        const payloadNoFeatures: Partial<Car> = { ...insertPayloadBase, description: descWithAllestimento };
        const retry = await supabase.from('cars').insert(payloadNoFeatures);
        error = retry.error ?? null;
      }
    }
    setLoading(false);
    if (error) {
      const msg = error.message || '';
      const needAuth = /permission|rls|unauthori|not allowed/i.test(msg);
      const notNull = /null value in column|violates not-null|not null/i.test(msg);
      const schemaCache = /could not find .* in the schema cache|schema cache/i.test(msg);
      const featuresMissing = /column\s+"?features"?\s+does not exist|unknown column.*features|column not found.*features/i.test(msg);
      const final = needAuth
        ? 'Accesso non autorizzato: configura policy RLS per utenti autenticati'
        : notNull
        ? 'Campi obbligatori mancanti: assicurati di compilare prezzo e chilometraggio'
        : featuresMissing
        ? 'La colonna "features" non esiste: ho salvato l’allestimento dentro la descrizione'
        : schemaCache
        ? 'Schema non aggiornato: esegui in Supabase SQL Editor → NOTIFY pgrst, "reload schema" e verifica le colonne della tabella public.cars'
        : `Errore durante la creazione dell'annuncio: ${msg}`;
      setError(final);
    } else {
      setSuccess('Annuncio creato con successo');
      setNewCar({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: '',
        mileage: '',
        fuel_type: 'Benzina',
        transmission: 'Manuale',
        displacement: '',
        power_cv: '',
        power_kw: '',
        color: '',
        interior_color: '',
        emission_class: '',
        doors: '',
        description: '',
        allestimento: '',
        main_image: '',
        imagesText: '',
        certified: false,
        warranty: false,
        available: true
      });
      listCars();
    }
  };

  const handleUpdate = async (id: string, changes: Partial<Car>) => {
    setLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.from('cars').update(changes).eq('id', id);
    setLoading(false);
    if (error) {
      setError('Errore durante l\'aggiornamento');
    } else {
      setSuccess('Annuncio aggiornato');
      listCars();
    }
  };

  const toggleAvailabilityOptimistic = async (id: string, available: boolean) => {
    const prev = cars;
    setCars((curr) => curr.map((c) => (c.id === id ? { ...c, available } : c)));
    const { error } = await supabase.from('cars').update({ available }).eq('id', id);
    if (error) {
      setError('Errore durante l\'aggiornamento visibilità');
      setCars(prev);
    } else {
      setSuccess(available ? 'Annuncio reso visibile' : 'Annuncio nascosto');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Sei sicuro di voler eliminare questo annuncio?');
    if (!ok) return;
    setLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.from('cars').delete().eq('id', id);
    setLoading(false);
    if (error) {
      setError('Errore durante l\'eliminazione');
    } else {
      setSuccess('Annuncio eliminato');
      listCars();
    }
  };

  const filtered = cars.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.brand.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {authChecked && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Accesso amministratore</h2>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center space-x-2 text-sm px-3 py-2 rounded bg-gray-100 hover:bg-gray-200">
                <LogOut size={16} /><span>Esci</span>
              </button>
            ) : null}
          </div>
          {!isLoggedIn && (
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              <input className="px-3 py-2 border rounded" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              <input className="px-3 py-2 border rounded" type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              <button onClick={handleLogin} className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                <LogIn size={16} /><span>Accedi</span>
              </button>
              <p className="sm:col-span-3 text-xs text-gray-500">Suggerimento: l'upload su Storage richiede accesso autenticato (policy predefinita).</p>
              {error && (
                <p className="sm:col-span-3 text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </div>
      )}
      {isLoggedIn && (
      <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Pannello di Amministrazione</h1>
        <button
          onClick={() => onNavigate('home')}
          className="text-orange-500 hover:text-orange-600 font-semibold"
        >
          Torna alla Home
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <PlusCircle className="mr-2 text-orange-500" size={24} />
          Aggiunta Nuove Auto
        </h2>
        

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input className="px-4 py-3 border rounded-lg" placeholder="Marca" value={newCar.brand} onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} />
            <input className="px-4 py-3 border rounded-lg" placeholder="Modello" value={newCar.model} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} />
            <select className="px-4 py-3 border rounded-lg" value={newCar.year} onChange={(e) => setNewCar({ ...newCar, year: Number(e.target.value) })}>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <div className="space-y-1">
              <input type="number" className="px-4 py-3 border rounded-lg" placeholder="Chilometraggio" value={newCar.mileage} onChange={(e) => setNewCar({ ...newCar, mileage: e.target.value })} />
              <p className="text-sm text-gray-500">Chilometraggio (km)</p>
            </div>
            <div className="space-y-1">
              <input type="number" className="px-4 py-3 border rounded-lg" placeholder="Prezzo" value={newCar.price} onChange={(e) => setNewCar({ ...newCar, price: e.target.value })} />
              <p className="text-sm text-gray-500">Prezzo in euro</p>
            </div>
            <select className="px-4 py-3 border rounded-lg" value={newCar.fuel_type} onChange={(e) => setNewCar({ ...newCar, fuel_type: e.target.value })}>
              <option>Benzina</option>
              <option>Diesel</option>
              <option>Ibrida</option>
              <option>Elettrica</option>
              <option>GPL</option>
              <option>Metano</option>
            </select>
            <select className="px-4 py-3 border rounded-lg" value={newCar.transmission} onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })}>
              <option>Manuale</option>
              <option>Automatico</option>
            </select>
            <div className="space-y-1">
              <input type="text" inputMode="numeric" className="px-4 py-3 border rounded-lg" placeholder="Cilindrata (cc)" value={newCar.displacement} onChange={(e) => setNewCar({ ...newCar, displacement: e.target.value })} />
              <p className="text-sm text-gray-500">Cilindrata (cc)</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <input type="number" className="px-4 py-3 border rounded-lg" placeholder="Potenza (CV)" value={newCar.power_cv} onChange={(e) => setNewCar({ ...newCar, power_cv: e.target.value })} />
                <p className="text-sm text-gray-500">Potenza (CV)</p>
              </div>
              <div className="space-y-1">
                <input type="number" className="px-4 py-3 border rounded-lg" placeholder="Potenza (kW)" value={newCar.power_kw} onChange={(e) => setNewCar({ ...newCar, power_kw: e.target.value })} />
                <p className="text-sm text-gray-500">Potenza (kW)</p>
              </div>
            </div>
            <input className="px-4 py-3 border rounded-lg" placeholder="Colore esterno" value={newCar.color} onChange={(e) => setNewCar({ ...newCar, color: e.target.value })} />
            <input className="px-4 py-3 border rounded-lg" placeholder="Colore interno" value={newCar.interior_color} onChange={(e) => setNewCar({ ...newCar, interior_color: e.target.value })} />
            <input className="px-4 py-3 border rounded-lg" placeholder="Classe emissioni" value={newCar.emission_class} onChange={(e) => setNewCar({ ...newCar, emission_class: e.target.value })} />
            <div className="space-y-1">
              <input type="number" className="px-4 py-3 border rounded-lg" placeholder="Porte" value={newCar.doors} onChange={(e) => setNewCar({ ...newCar, doors: e.target.value })} />
              <p className="text-sm text-gray-500">Numero porte</p>
            </div>
          </div>
          <div className="space-y-4">
              <div className="space-y-2">
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleMainImageUpload(f); }}
                  className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center"
                >
                <UploadCloud className="text-orange-500 mb-2" />
                <p className="text-sm text-gray-600">Trascina qui la foto principale</p>
                <input type="file" accept="image/*" className="mt-2" onChange={(e) => handleMainImageUpload(e.target.files?.[0])} />
                {uploadingMain && <p className="text-xs text-gray-500 mt-2">Caricamento...</p>}
              </div>
              {newCar.main_image && (
                <div className="mt-2 relative w-full max-w-xs">
                  <img src={newCar.main_image} alt="Foto principale" className="w-full h-40 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => setNewCar({ ...newCar, main_image: '' })}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const files = e.dataTransfer.files; if (files && files.length) handleGalleryUpload(files); }}
                  className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center"
                >
              <Images className="text-orange-500 mb-2" />
              <p className="text-sm text-gray-600">Trascina qui le fotografie del veicolo</p>
              <input type="file" accept="image/*" multiple className="mt-2" onChange={(e) => handleGalleryUpload(e.target.files || undefined)} />
              {uploadingGallery && <p className="text-xs text-gray-500 mt-2">Caricamento...</p>}
            </div>
            {parseImages(newCar.imagesText).length > 0 && (
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {parseImages(newCar.imagesText).map((url, idx) => (
                  <div
                    key={`${url}-${idx}`}
                    className="relative"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', String(idx));
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const from = Number(e.dataTransfer.getData('text/plain'));
                      const to = idx;
                      if (Number.isNaN(from) || from === to) return;
                      const list = parseImages(newCar.imagesText);
                      const reordered = moveItem(list, from, to);
                      setNewCar({ ...newCar, imagesText: reordered.join('\n') });
                    }}
                  >
                    <img src={url} alt="Foto" className="w-full h-24 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => {
                        const remaining = parseImages(newCar.imagesText).filter((u) => u !== url);
                        setNewCar({ ...newCar, imagesText: remaining.join('\n') });
                      }}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2"><input type="checkbox" checked={newCar.certified} onChange={(e) => setNewCar({ ...newCar, certified: e.target.checked })} /><span>Certificata</span></label>
              <label className="flex items-center space-x-2"><input type="checkbox" checked={newCar.warranty} onChange={(e) => setNewCar({ ...newCar, warranty: e.target.checked })} /><span>Garanzia</span></label>
              <label className="flex items-center space-x-2"><input type="checkbox" checked={newCar.available} onChange={(e) => setNewCar({ ...newCar, available: e.target.checked })} /><span>Disponibile</span></label>
            </div>
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Descrizione</label>
            <textarea className="px-4 py-3 border rounded-lg h-24 w-full" placeholder="Inserisci descrizione veicolo" value={newCar.description} onChange={(e) => setNewCar({ ...newCar, description: e.target.value })} onClick={selectAllOnQuadClick} />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Allestimento</label>
            <textarea className="px-4 py-3 border rounded-lg h-20 w-full" placeholder="Inserisci allestimento (es. pacchetti, finiture)" value={newCar.allestimento} onChange={(e) => setNewCar({ ...newCar, allestimento: e.target.value })} onClick={selectAllOnQuadClick} />
          </div>
        </div>
        <div className="mt-6">
          <button onClick={handleCreate} disabled={loading || !(newCar.brand && newCar.model && newCar.price !== '' && newCar.mileage !== '')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">
            Salva
          </button>
          {error && <p className="text-red-600 mt-3">{error}</p>}
          {success && <p className="text-green-600 mt-3">{success}</p>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Edit className="mr-2 text-orange-500" size={24} />
          Modifica degli Annunci
        </h2>
        <div className="flex items-center mb-4">
          <input className="px-4 py-3 border rounded-lg w-full" placeholder="Cerca per marca o modello" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="space-y-4">
          {filtered.map((car) => (
            <div key={car.id} className={`border rounded-lg p-4 ${car.available ? '' : 'opacity-70'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold flex items-center space-x-2">
                    <span>{car.brand} {car.model} • €{car.price.toLocaleString()}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold inline-flex items-center space-x-1 ${car.available ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                      {car.available ? <Eye size={12} /> : <EyeOff size={12} />}
                      <span>{car.available ? 'Visibile' : 'Nascosto'}</span>
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">{car.year} • {car.mileage.toLocaleString()} km • {car.fuel_type} • {car.transmission}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {car.available ? (
                    <button onClick={() => toggleAvailabilityOptimistic(car.id, false)} className="flex items-center space-x-1 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200">
                      <EyeOff size={16} /><span>Nascondi</span>
                    </button>
                  ) : (
                    <button onClick={() => toggleAvailabilityOptimistic(car.id, true)} className="flex items-center space-x-1 px-3 py-2 rounded bg-green-100 hover:bg-green-200">
                      <Save size={16} /><span>Rendi visibile</span>
                    </button>
                  )}
                  <button onClick={() => handleDelete(car.id)} className="flex items-center space-x-1 px-3 py-2 rounded bg-red-100 hover:bg-red-200">
                    <Trash2 size={16} /><span>Elimina</span>
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <input className="px-3 py-2 border rounded" defaultValue={car.price} type="number" onBlur={(e) => handleUpdate(car.id, { price: Number(e.target.value) })} />
                    <p className="text-xs text-gray-500">Prezzo in euro</p>
                  </div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Descrizione</label>
                  <textarea className="px-3 py-2 border rounded w-full min-h-48" defaultValue={car.description || ''} placeholder="Inserisci descrizione veicolo" onBlur={(e) => handleUpdate(car.id, { description: e.target.value })} onClick={selectAllOnQuadClick} />
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-700">Allestimento</label>
                    <input className="px-3 py-2 border rounded w-full" defaultValue={(car.features || []).find((s) => s.startsWith('Allestimento:'))?.replace(/^Allestimento:\s*/, '') || ''} placeholder="Inserisci allestimento" onBlur={(e) => {
                      const val = e.target.value.trim();
                      const others = (car.features || []).filter((s) => !s.startsWith('Allestimento:'));
                      const next = val.length ? [ `Allestimento: ${val}`, ...others ] : others;
                      handleUpdate(car.id, { features: next });
                    }} />
                    <p className="text-xs text-gray-500">Salvato in dotazioni come "Allestimento:"</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={async (e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) { try { const url = await uploadFileToStorage(f, 'main'); await handleUpdate(car.id, { main_image: url }); } catch (err) { const msg = err instanceof Error ? err.message : ''; setError(`Errore caricamento foto principale${msg ? `: ${msg}` : ''}`); } } }}
                    className="border-2 border-dashed rounded-lg p-3 text-center"
                  >
                    <UploadCloud className="inline-block text-orange-500" />
                    <span className="text-sm text-gray-600 ml-2">Trascina per sostituire foto principale</span>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (!isLoggedIn) { setError('Devi accedere per caricare immagini'); return; }
                          try {
                            const url = await uploadFileToStorage(file, 'main');
                            await handleUpdate(car.id, { main_image: url });
                            setSuccess('Foto principale aggiornata');
                          } catch (err) {
                            const msg = err instanceof Error ? err.message : '';
                            setError(`Errore caricamento foto principale${msg ? `: ${msg}` : ''}`);
                          }
                        }}
                      />
                      <p className="text-xs text-gray-500 mt-1">Oppure scegli file dalla cartella</p>
                    </div>
                  </div>
                  {car.main_image && (
                    <div className="mt-2 relative w-40">
                      <img src={car.main_image} alt="Foto principale" className="w-40 h-24 object-cover rounded border" />
                      <button
                        type="button"
                        onClick={() => handleUpdate(car.id, { main_image: '' })}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={async (e) => {
                      e.preventDefault();
                      const files = e.dataTransfer.files;
                      if (!files || files.length === 0) return;
                      try {
                        const urls = await Promise.all(Array.from(files).map((f) => uploadFileToStorage(f, 'gallery')));
                        const updated = [ ...(car.images || []), ...urls ];
                        await handleUpdate(car.id, { images: updated });
                      } catch (err) {
                        const msg = err instanceof Error ? err.message : '';
                        setError(`Errore caricamento fotografie${msg ? `: ${msg}` : ''}`);
                      }
                    }}
                    className="border-2 border-dashed rounded-lg p-3 text-center"
                  >
                    <Images className="inline-block text-orange-500" />
                    <span className="text-sm text-gray-600 ml-2">Trascina per aggiungere fotografie</span>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={async (e) => {
                          const files = e.target.files;
                          if (!files || files.length === 0) return;
                          if (!isLoggedIn) { setError('Devi accedere per caricare immagini'); return; }
                          try {
                            const urls = await Promise.all(Array.from(files).map((f) => uploadFileToStorage(f, 'gallery')));
                            const updated = [ ...(car.images || []), ...urls ];
                            await handleUpdate(car.id, { images: updated });
                            setSuccess('Fotografie aggiunte');
                          } catch (err) {
                            const msg = err instanceof Error ? err.message : '';
                            setError(`Errore caricamento fotografie${msg ? `: ${msg}` : ''}`);
                          }
                        }}
                      />
                      <p className="text-xs text-gray-500 mt-1">Oppure scegli file dalla cartella</p>
                    </div>
                  </div>
                  {(car.images || []).length > 0 && (
                    <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {(car.images || []).map((url, idx) => (
                        <div
                          key={`${url}-${idx}`}
                          className="relative"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', String(idx));
                          }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const from = Number(e.dataTransfer.getData('text/plain'));
                            const to = idx;
                            if (Number.isNaN(from) || from === to) return;
                            const current = car.images || [];
                            const reordered = moveItem(current, from, to);
                            handleUpdate(car.id, { images: reordered });
                          }}
                        >
                          <img src={url} alt="Foto" className="w-full h-20 object-cover rounded border" />
                          <button
                            type="button"
                            onClick={() => {
                              const remaining = (car.images || []).filter((u) => u !== url);
                              handleUpdate(car.id, { images: remaining });
                            }}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" type="number" defaultValue={car.year} placeholder="Anno" onBlur={(e) => {
                    const v = e.target.value.trim();
                    handleUpdate(car.id, { year: v === '' ? car.year : Number(v) });
                  }} />
                  <p className="text-xs text-gray-500">Anno</p>
                </div>
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" type="number" defaultValue={car.mileage} placeholder="Chilometraggio" onBlur={(e) => {
                    const v = e.target.value.trim();
                    handleUpdate(car.id, { mileage: v === '' ? car.mileage : Number(v) });
                  }} />
                  <p className="text-xs text-gray-500">Chilometraggio (km)</p>
                </div>
                <div className="space-y-1">
                  <select className="px-3 py-2 border rounded" defaultValue={car.fuel_type} onChange={(e) => handleUpdate(car.id, { fuel_type: e.target.value })}>
                    <option>Benzina</option>
                    <option>Diesel</option>
                    <option>Ibrida</option>
                    <option>Elettrica</option>
                    <option>GPL</option>
                    <option>Metano</option>
                  </select>
                  <p className="text-xs text-gray-500">Alimentazione</p>
                </div>
                <div className="space-y-1">
                  <select className="px-3 py-2 border rounded" defaultValue={car.transmission} onChange={(e) => handleUpdate(car.id, { transmission: e.target.value })}>
                    <option>Manuale</option>
                    <option>Automatico</option>
                  </select>
                  <p className="text-xs text-gray-500">Cambio</p>
                </div>
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" type="text" inputMode="numeric" defaultValue={car.displacement ?? ''} placeholder="Cilindrata (cc)" onBlur={(e) => {
                    const v = e.target.value.trim();
                    const num = v === '' ? undefined : Number(v.replace(/[^\d]/g, ''));
                    handleUpdate(car.id, { displacement: num });
                  }} />
                  <p className="text-xs text-gray-500">Cilindrata (cc)</p>
                </div>
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" type="number" defaultValue={car.power ?? ''} placeholder="Potenza (CV)" onBlur={(e) => {
                    const v = e.target.value.trim();
                    handleUpdate(car.id, { power: v === '' ? undefined : Number(v) });
                  }} />
                  <p className="text-xs text-gray-500">Potenza (CV)</p>
                </div>
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" type="number" defaultValue={car.power_kw ?? ''} placeholder="Potenza (kW)" onBlur={(e) => {
                    const v = e.target.value.trim();
                    handleUpdate(car.id, { power_kw: v === '' ? undefined : Number(v) });
                  }} />
                  <p className="text-xs text-gray-500">Potenza (kW)</p>
                </div>
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" defaultValue={car.color ?? ''} placeholder="Colore esterno" onBlur={(e) => handleUpdate(car.id, { color: e.target.value })} />
                  <p className="text-xs text-gray-500">Colore esterno</p>
                </div>
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" defaultValue={car.interior_color ?? ''} placeholder="Colore interno" onBlur={(e) => handleUpdate(car.id, { interior_color: e.target.value })} />
                  <p className="text-xs text-gray-500">Colore interno</p>
                </div>
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" defaultValue={car.emission_class ?? ''} placeholder="Classe emissioni" onBlur={(e) => handleUpdate(car.id, { emission_class: e.target.value })} />
                  <p className="text-xs text-gray-500">Classe emissioni</p>
                </div>
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" type="number" defaultValue={car.owners ?? ''} placeholder="Proprietari" onBlur={(e) => {
                    const v = e.target.value.trim();
                    handleUpdate(car.id, { owners: v === '' ? undefined : Number(v) });
                  }} />
                  <p className="text-xs text-gray-500">Numero proprietari</p>
                </div>
                <div className="space-y-1">
                  <input className="px-3 py-2 border rounded" type="number" defaultValue={car.doors ?? ''} placeholder="Porte" onBlur={(e) => {
                    const v = e.target.value.trim();
                    handleUpdate(car.id, { doors: v === '' ? undefined : Number(v) });
                  }} />
                  <p className="text-xs text-gray-500">Numero porte</p>
                </div>
                <div className="space-y-1 md:col-span-3">
                  <textarea className="px-3 py-2 border rounded h-20" defaultValue={(car.features || []).join('\n')} placeholder="Dotazioni (una per riga)" onBlur={(e) => {
                    const lines = e.target.value.split(/\n|,/).map((s) => s.trim()).filter((s) => s.length > 0);
                    handleUpdate(car.id, { features: lines });
                  }} />
                  <p className="text-xs text-gray-500">Dotazioni/optional</p>
                </div>
                <div className="flex items-center space-x-6 md:col-span-3">
                  <label className="flex items-center space-x-2"><input type="checkbox" checked={!!car.certified} onChange={(e) => handleUpdate(car.id, { certified: e.target.checked })} /><span>Certificata</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" checked={!!car.warranty} onChange={(e) => handleUpdate(car.id, { warranty: e.target.checked })} /><span>Garanzia</span></label>
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-2" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Trash2 className="mr-2 text-orange-500" size={24} />
          Eliminazione o Nascondimento dei Veicoli Venduti
        </h2>
        <p className="text-gray-600 mb-4">Quando l'auto è venduta, puoi eliminare l'annuncio oppure nasconderlo mantenendo il veicolo nel database come archivio interno.</p>
        <p className="text-sm text-gray-500">Suggerimento: usa "Nascondi" per conservare i dati storici e non mostrarla sul sito.</p>
      </div>
      </>
      )}
    </div>
  );
}
