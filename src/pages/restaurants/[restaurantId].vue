<script setup lang="ts">
import { useFetchRestaurant } from '~/composables/restaurants';
import { useAverageRating } from '~/composables/useAverageRating';

const { params } = useRoute();
const { data: restaurant, error } = useFetchRestaurant({ restaurantId: params.restaurantId });

// Ensure restaurant is either a Restaurant or null (not undefined)
const restaurantValue = computed(() => restaurant.value ?? null);

// Use the composable to compute the average rating
const averageRating = useAverageRating(restaurantValue.value);
</script>

<template>
  <VAlert v-if="error" type="error" class="mt-4">
    {{ error === 'Not Found, No any handler or file route' ? 'Restaurant not found. Please check the ID.' : 'Error: An error occurred while fetching the restaurant' }}
  </VAlert>
  <div v-else-if="restaurant" class="grid grid-cols-1 md:grid-cols-[minmax(0,_1fr)_16rem] gap-6">
    <VCard>
      <VImg
        v-for="photo in restaurant.photos"
        :key="photo"
        :src="restaurant.photos[0]"
        height="250"
        cover
        gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <VCardTitle class="!text-4xl text-white">
          {{ restaurant.name }}
        </VCardTitle>
        <VRating :model-value="averageRating" color="warning" readonly />
      </VImg>
      <VCardText>
        <div class="grid grid-cols-2 gap-4">
          <RestaurantLocation :location="restaurant.location" />
          <KeyValue icon="mdi-phone">
            <p class="text-body-1">
              {{ restaurant.display_phone || restaurant.phone }}
            </p>
          </KeyValue>
        </div>
      </VCardText>
    </VCard>
    <aside class="md:col-start-2 md:row-start-1 col-span-full">
      <ul class="pa-0">
        <RestaurantReview v-for="review in restaurant.reviews" :key="review.id" :review="review" />
      </ul>
    </aside>
  </div>
</template>
