<script setup lang="ts">
import { type Restaurant } from '~/composables/restaurants';
import { computed } from 'vue';

const props = defineProps<{
  restaurant: Restaurant
}>();

// Compute the average rating based on the reviews array in the Restaurant type
const averageRating = computed(() => {
  if (props.restaurant.reviews.length > 0) {
    const total = props.restaurant.reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / props.restaurant.reviews.length;
  }
  return 0; // Default to 0 if there are no reviews
});
</script>

<template>
  <VCard>
    <VImg
      height="100"
      cover
      :src="props.restaurant.photos?.[0]"
    />
    <VCardTitle>
      {{ props.restaurant.name }}
    </VCardTitle>
    <VRating :model-value="averageRating" active-color="primary" readonly />
    <VCardText>
      <RestaurantLocation :location="props.restaurant.location" />
    </VCardText>
    <VCardActions class="mt-auto">
      <VBtn color="primary" variant="tonal" :to="`/restaurants/${props.restaurant.id}`">
        see more
      </VBtn>
    </VCardActions>
  </VCard>
</template>
