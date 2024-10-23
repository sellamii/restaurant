import { api } from '~/services/api';

export interface Restaurant {
  name: string
  id: string
  url: string
  phone: string
  display_phone: string
  photos: string[]
  location?: Location
  reviews: Review[]
}

export interface Location {
  address1: string
  city: string
  postal_code: string
  formatted_address: string
}

export interface Review {
  text: string
  rating: number
  id: string
}

export function useFetchRestaurants() {
  return useQuery({
    queryKey: [`restaurants-list`],
    queryFn: () => {
      const url = `/restaurants.json`;

      // Check Env
      if (import.meta.env.VITE_API_ENV === `local`)
        return api(`restaurants`).json<Restaurant[]>();
      // Netlify Version Production
      return fetch(url)
        .then((response) => {
          if (!response.ok)
            throw new Error(`Erreur lors du chargement des restaurants`);
          return response.json();
        });
    },
  });
}

export function useFetchRestaurant({ restaurantId }: { restaurantId: string | string[] }) {
  return useQuery({
    queryKey: [`company`, restaurantId],
    queryFn: async () => {
      const url = `restaurants/${restaurantId}`;
      try {
        return await api(url).json<Restaurant>();
      }
      catch (error: any) {
        if (error.response && error.response.status === 404) {
          const errorMessage = await error.response.json();
          throw new Error(errorMessage.message || `Restaurant not found`);
        }
        throw new Error(`An error occurred while fetching the restaurant`);
      }
    },
  });
}
