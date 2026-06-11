import { User, Vehicle, WashJob } from './types';

export const currentUser: User = {
  id: 'u1',
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  plan: 'sedan',
  profilePic: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rahul'
};

export const currentVehicles: Vehicle[] = [
  {
    id: 'v1',
    make: 'Honda',
    model: 'City',
    year: 2023,
    color: 'White',
    plate: 'DL 8C 1234',
    isPrimary: true
  }
];

export const upcomingJob: WashJob = {
  id: 'wj1',
  date: 'Tomorrow, Jan 24',
  time: '7:00 AM',
  type: 'Exterior Wash',
  status: 'assigned',
  washer: {
    id: 'w1',
    name: 'Rajesh Kumar',
    rating: 4.8,
    reviews: 240,
    phone: '+919999999999',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh'
  }
};

export const liveJob: WashJob = {
  id: 'wj2',
  date: 'Today',
  time: '8:00 AM',
  type: 'Premium Wash',
  status: 'en_route',
  washer: {
    id: 'w1',
    name: 'Rajesh Kumar',
    rating: 4.8,
    reviews: 240,
    phone: '+919999999999',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh'
  }
};
