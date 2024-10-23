<script setup lang="ts">
import { type Restaurant } from '~/composables/restaurants';
import { useAverageRating } from '~/composables/useAverageRating';

const props = defineProps<{
  restaurant: Restaurant
}>();

// Use the composable to compute the average rating
const averageRating = useAverageRating(props.restaurant);
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
