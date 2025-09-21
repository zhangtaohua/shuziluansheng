<template>
  <div class="row_nw_ce_ce config_container">
    <div class="config_wraper">
      <NumberInputSlider></NumberInputSlider>
      <LineGap></LineGap>
      <RadioSingleInput></RadioSingleInput>
      <LineGap></LineGap>
      <ColorInput></ColorInput>
      <LineGap></LineGap>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  // import { useSystemStore } from "@/store/systemConfig";

  import NumberInputSlider from "@/components/css/NumberInputSlider.vue";
  import RadioSingleInput from "@/components/css/RadioSingleInput.vue";
  import ColorInput from "@/components/css/ColorInput.vue";
  import LineGap from "@/components/css/LineGap.vue";
</script>

<style scoped lang="scss">
  .config_container {
    position: fixed;
    bottom: 3rem;
    right: 0;
    z-index: 10;
    width: 30rem;
    height: calc(100vh - 7rem);
    background-color: rgba(26, 30, 39, 1);
    border-radius: 0.75rem 0 0 0.75rem;
  }

  .config_wraper {
    width: 28rem;
    height: calc(100% - 2rem);
    color: white;
    font-size: 1rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .config_wraper::-webkit-scrollbar {
    display: none;
  }
</style>
