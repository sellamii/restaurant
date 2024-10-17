<script setup lang="ts">
import { defineProps } from 'vue';
import { type Review } from '~/composables/restaurants';

defineProps<{
  review: Review
}>();
</script>

<template>
  <VCard class="va-company-review" tag="li">
    <VCardText>
      <VRating :model-value="review.rating" readonly class="mb-2" />
      <p>{{ review.text }}</p>
    </VCardText>
  </VCard>
</template>
