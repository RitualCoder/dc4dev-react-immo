export type CreateAdvertDto = {
  title: string;
  description: string;
  price: number;
  nb_rooms: number;
  surface: number;
};

export type AdvertType = {
  id?: number;
  price?: number;
  title?: string;
  createdAt?: string;
  nb_rooms?: number;
  surface?: number;
  description?: string;
  category?: {
    id?: number;
    name: string;
  };
};
