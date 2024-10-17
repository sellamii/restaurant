<script setup lang="ts">
import { useFetchRestaurant } from '~/composables/restaurants';
import { computed } from 'vue';

const { params } = useRoute();
const { data: restaurant, error } = useFetchRestaurant({ restaurantId: params.restaurantId });

const averageRating = computed(() => {
  if (restaurant.value && restaurant.value.reviews.length > 0) {
    const total = restaurant.value.reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / restaurant.value.reviews.length;
  }
  return 0;
});
</script>

<template>
  <VAlert v-if="error" type="error" class="mt-4">
    {{ error === 'Not Found, No any handler or file route' ? 'Restaurant not found. Please check the ID.' : error }}
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
