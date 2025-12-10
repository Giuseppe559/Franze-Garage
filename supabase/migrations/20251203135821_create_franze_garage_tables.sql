/*
  # Franzè Garage Database Schema

  1. New Tables
    - `cars`
      - `id` (uuid, primary key)
      - `brand` (text) - Marca del veicolo
      - `model` (text) - Modello del veicolo
      - `year` (integer) - Anno di immatricolazione
      - `price` (numeric) - Prezzo di vendita
      - `mileage` (integer) - Chilometraggio
      - `fuel_type` (text) - Tipo di alimentazione
      - `transmission` (text) - Tipo di cambio
      - `power` (integer) - Potenza in CV
      - `displacement` (integer) - Cilindrata in cc
      - `color` (text) - Colore del veicolo
      - `emission_class` (text) - Classe emissioni
      - `owners` (integer) - Numero proprietari
      - `description` (text) - Descrizione breve
      - `features` (text[]) - Array di optional/dotazioni
      - `images` (text[]) - Array di URL immagini
      - `main_image` (text) - Immagine principale
      - `certified` (boolean) - Veicolo certificato
      - `warranty` (boolean) - Garanzia inclusa
      - `available` (boolean) - Disponibile per la vendita
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `contact_requests`
      - `id` (uuid, primary key)
      - `name` (text) - Nome del richiedente
      - `phone` (text) - Telefono
      - `email` (text) - Email
      - `car_interest` (text) - Auto di interesse
      - `message` (text) - Messaggio
      - `request_type` (text) - Tipo richiesta (info, test_drive, valutation)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public can read cars (SELECT)
    - Anyone can insert contact requests
    - Only authenticated admins can manage data
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price numeric NOT NULL,
  mileage integer NOT NULL,
  fuel_type text NOT NULL,
  transmission text NOT NULL,
  power integer,
  displacement integer,
  color text,
  emission_class text,
  owners integer DEFAULT 1,
  description text,
  features text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  main_image text,
  certified boolean DEFAULT true,
  warranty boolean DEFAULT true,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  car_interest text,
  message text,
  request_type text DEFAULT 'info',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available cars"
  ON cars FOR SELECT
  USING (available = true);

CREATE POLICY "Anyone can submit contact requests"
  ON contact_requests FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
CREATE INDEX IF NOT EXISTS idx_cars_year ON cars(year);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
CREATE INDEX IF NOT EXISTS idx_cars_available ON cars(available);