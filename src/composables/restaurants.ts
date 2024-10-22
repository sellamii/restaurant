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
    queryKey: ['restaurants-list'],
    queryFn: () => {
      let url: string;

      // Check Env
      if (import.meta.env.VITE_API_ENV === 'local') {
        // use api local
        url = 'restaurants';
        return api(url).json<Restaurant[]>();
      } else {
        // Netlify Version Production
        url = '/restaurants.json'; // accès au fichier JSON dans le dossier public de Netlify
        return fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors du chargement des restaurants');
            }
            return response.json();
          });
      }
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
