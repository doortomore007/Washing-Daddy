export type PlanType = 'hatchback' | 'sedan' | 'mid-suv' | 'full-suv';

export interface User {
  id: string;
  name: string;
  phone: string;
  plan: PlanType;
  profilePic?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  isPrimary: boolean;
}

export type WashStatus = 'scheduled' | 'assigned' | 'en_route' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';

export interface Washer {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  photo?: string;
  phone: string;
}

export interface WashJob {
  id: string;
  date: string;
  time: string;
  type: string;
  status: WashStatus;
  washer: Washer;
  price?: number;
}
