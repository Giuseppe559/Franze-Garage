import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET ?? 'car-images';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  power?: number;
  power_kw?: number;
  displacement?: number;
  color?: string;
  interior_color?: string;
  emission_class?: string;
  owners?: number;
  doors?: number;
  description?: string;
  features?: string[];
  images?: string[];
  main_image?: string;
  certified?: boolean;
  warranty?: boolean;
  available?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ContactRequest {
  name: string;
  phone: string;
  email?: string;
  car_interest?: string;
  message?: string;
  request_type?: string;
}
