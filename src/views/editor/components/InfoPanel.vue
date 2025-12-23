<template>
  <div v-if="isShowInfoPanel" class="row_nw_fs_ce info_container"></div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  // import { useSystemStore } from "@/store/systemConfig";
  const isShowInfoPanel = ref(true);
</script>

<style scoped>
  .info_container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 30;
    width: 100vw;
    height: 2rem;
    background-color: rgba(26, 30, 39, 1);
  }

  .info_item {
    width: auto;
    height: 100%;
    color: white;
    font-size: 1rem;
  }
</style>
