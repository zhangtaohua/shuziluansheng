<template>
  <div class="props_line_gap" :style="props.style"></div>
</template>

<script setup lang="ts">
  const props = defineProps({
    style: {
      type: Object,
      default() {
        return {
          width: "100%",
        };
      },
    },
  });
</script>

<style scoped>
  .props_line_gap {
    width: 100%;
    border-bottom: 0.125rem groove rgba(255, 255, 255, 0.5);
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
