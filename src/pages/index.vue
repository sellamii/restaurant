<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFetchRestaurants } from '~/composables/restaurants';

const { data: restaurants, isError } = useFetchRestaurants();
const selectedRatingFilter = ref(0);

// update notation filter
function updateRatingFilter(value:number) {
  selectedRatingFilter.value = value;
}

// Filter Restaurant by Rating
const filteredRestaurants = computed(() => {
  if (!restaurants.value) return [];
  if (selectedRatingFilter.value === 0) return restaurants.value;
  return restaurants.value.filter(restaurant => {
    const averageRating = restaurant.reviews.reduce((sum, review) => sum + review.rating, 0) / restaurant.reviews.length;
    return averageRating >= selectedRatingFilter.value;
  });
});
</script>

<template>
  <div>
    <RatingFilter @update:filter="updateRatingFilter" />
    <VAlert type="warning" class="my-4">
      TODO: this should be presented as a grid<br>
      • 3 columns max<br>
      • 1 column on small devices <br>
      • DO NOT USE
      <a
        href="https://vuetifyjs.com/en/components/grids/"
        target="_blank"
        class="text-indigo-700"
        rel="noopener noreferrer"
      >
        Vuetify's grid components
      </a>
    </VAlert>
    <LoadingError v-if="isError" />  
    <div v-else-if="filteredRestaurants.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <RestaurantCard
        v-for="restaurant in filteredRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>  
    <VAlert type="warning" v-else>Aucun restaurant ne correspond au filtre de notation sélectionné.</VAlert>
  </div>
</template>
