<template>
  <div v-if="isOffline" class="row_nw_ce_ce netline_box">
    <div class="row_nw_ce_ce offline_tips">无网络，请检查网络</div>
  </div>

  <div v-if="isOnline" class="row_nw_ce_ce netline_box">
    <div class="row_nw_ce_ce online_tips">网络已恢复</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const isOffline = ref(false);
  const isOnline = ref(false);

  window.addEventListener("offline", function (e) {
    isOffline.value = true;
    isOnline.value = false;
  });

  window.addEventListener("online", function (e) {
    isOffline.value = false;
    isOnline.value = true;
    setTimeout(() => {
      isOnline.value = false;
    }, 3000);
  });
</script>

<style>
  .netline_box {
    position: fixed;
    width: 100vw;
    height: 60px;
    top: calc(50vh - 30px);
    z-index: 9999;
  }

  .offline_tips {
    width: auto;
    height: 100%;
    color: #ffffff;
    font-size: 48px;
    padding: 0 32px;
    background-color: #ef0d2e;
    border-radius: 8px;
  }

  .online_tips {
    width: auto;
    height: 100%;
    color: #ffffff;
    font-size: 48px;
    padding: 0 32px;
    background-color: #409eff;
    border-radius: 8px;
  }
</style>
