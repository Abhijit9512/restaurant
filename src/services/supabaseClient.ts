import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  created_at: string;
};

export type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: number;
  customer_name: string;
  phone: string;
  table_number: number | null;
  items: OrderItem[];
  total_price: number;
  status: 'pending' | 'cooking' | 'ready' | 'completed';
  created_at: string;
};

export type Reservation = {
  id: number;
  name: string;
  phone: string;
  date: string;
  time: string;
  people: number;
  created_at: string;
};

export type Table = {
  id: number;
  table_number: number;
  seats: number;
  status: 'available' | 'reserved' | 'occupied';
  created_at: string;
};
