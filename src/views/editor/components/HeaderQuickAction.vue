<template>
  <div class="row_nw_sb_ce header_qk_container">
    <HeaderEditorScale></HeaderEditorScale>
    <HeaderHistroy></HeaderHistroy>
  </div>
</template>

<script setup lang="ts">
  import HeaderEditorScale from "./HeaderEditorScale.vue";
  import HeaderHistroy from "./HeaderHistroy.vue";
</script>

<style scoped>
  .header_qk_container {
    width: max-content;
    height: 100%;
    margin-right: 0.5rem;
  }
</style>
