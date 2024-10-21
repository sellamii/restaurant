<script setup lang="ts">
import { type Restaurant } from '~/composables/restaurants';

const props = defineProps<{
  restaurant: Restaurant
}>();

// Compute the average rating based on the reviews array in the Restaurant type
const averageRating = computed(() => {
  if (props.restaurant?.reviews?.length > 0) {
    const total = props.restaurant.reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / props.restaurant.reviews.length;
  }
  return 0; // Default to 0 if there are no reviews
});
</script>

<template>
  <VCard v-if="restaurant">
    <VImg
      height="100"
      cover
      :src="restaurant.photos?.[0]"
    />
    <VCardTitle>
      {{ restaurant.name }}
    </VCardTitle>
    <VRating :model-value="averageRating" active-color="primary" readonly />
    <VCardText>
      <RestaurantLocation :location="restaurant.location" />
    </VCardText>
    <VCardActions class="mt-auto">
      <VBtn color="primary" variant="tonal" :to="`/restaurants/${restaurant.id}`">
        see more
      </VBtn>
    </VCardActions>
  </VCard>

  <!-- Fallback content when no restaurant prop is provided -->
  <VCard v-else>
    <VCardTitle>
      No restaurant information available
    </VCardTitle>
  </VCard>
</template>
