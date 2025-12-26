<template>
  <div class="row_nw_sb_ce header_container">
    <div class="row_nw_fs_ce header_compbox">
      <HeaderComponents></HeaderComponents>
    </div>
    <div class="row_nw_fs_ce header_actbox">
      <HeaderQuickAction></HeaderQuickAction>
      <HeaderMenu></HeaderMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";

  import HeaderComponents from "./HeaderComponents.vue";

  import HeaderQuickAction from "./HeaderQuickAction.vue";
  import HeaderMenu from "./HeaderMenu.vue";
</script>

<style scoped>
  .header_container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 3rem;
    background-color: rgba(26, 30, 39, 1);
  }

  .header_compbox {
    width: max-content;
    height: 100%;
    margin-right: 2rem;
    margin-left: 1rem;
  }

  .header_actbox {
    width: max-content;
    height: 100%;
  }
</style>
