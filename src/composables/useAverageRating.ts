import { computed } from 'vue';
import type { Restaurant } from '~/composables/restaurants';

// Composable to calculate average rating
export function useAverageRating(restaurant: Restaurant | null) {
  return computed(() => {
    if (restaurant && restaurant.reviews.length > 0) {
      const total = restaurant.reviews.reduce((sum, review) => sum + review.rating, 0);
      return total / restaurant.reviews.length;
    }
    return 0; // Default to 0 if there are no reviews
  });
}
