<template>
  <div class="row_nw_fs_ce info_container">
    <div class="row_nw_ce_ce info_item">添加</div>
  </div>
  <!-- <div v-else class="row_nw_center_center info_small" @click="setIsFullView(false)"></div> -->
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  // import { useSystemStore } from "@/store/systemConfig";
</script>

<style scoped lang="scss">
  .info_container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
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
