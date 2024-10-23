<script setup lang="ts">
import { type Restaurant, useFetchRestaurants } from '~/composables/restaurants';
import { useAverageRating } from '~/composables/useAverageRating';

const { data: restaurants, isError } = useFetchRestaurants();
const selectedRatingFilter = ref(0);

// Update notation filter
function updateRatingFilter(value: number) {
  selectedRatingFilter.value = value;
}

// Filter restaurants by rating
const filteredRestaurants = computed(() => {
  if (!restaurants.value) return [];
  if (selectedRatingFilter.value === 0) return restaurants.value;

  return restaurants.value.filter((restaurant: Restaurant) => {
    const averageRating = useAverageRating(restaurant);
    return averageRating.value >= selectedRatingFilter.value;
  });
});
</script>

<template>
  <div>
    <RatingFilter @update:filter="updateRatingFilter" />
    <LoadingError v-if="isError" />

    <div
      v-else-if="filteredRestaurants.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <RestaurantCard
        v-for="restaurant in filteredRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>

    <VAlert v-else type="warning">
      Aucun restaurant ne correspond au filtre de notation sélectionné.
    </VAlert>
  </div>
</template>
