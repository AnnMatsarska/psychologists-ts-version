export interface IPsychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  reviews: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export interface User {
  currentUser: any | null;
}
