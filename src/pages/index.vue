<script setup lang="ts">
import { ref } from 'vue';
import { useFetchRestaurants } from '~/composables/restaurants';

const { data: restaurants, isError } = useFetchRestaurants();
const selectedRatingFilter = ref(0);

// update notation filter
function updateRatingFilter(value: number) {
  selectedRatingFilter.value = value;
}

// Filter Restaurant by Rating
const filteredRestaurants = computed(() => {
  if (!restaurants.value) return [];
  if (selectedRatingFilter.value === 0) return restaurants.value;
  return restaurants.value.filter((restaurant) => {
    const averageRating = restaurant.reviews.reduce((sum, review) => sum + review.rating, 0) / restaurant.reviews.length;
    return averageRating >= selectedRatingFilter.value;
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
