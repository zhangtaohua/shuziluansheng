<template>
  <div id="vanta_background" class="vanta_container"></div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted } from "vue";

  let timer = null;
  let effect = null;
  // effect.resize()
  onMounted(() => {
    timer = setInterval(() => {
      if (VANTA) {
        clearInterval(timer);
        // VANTA.TOPOLOGY({
        effect = VANTA.WAVES({
          el: "#vanta_background", // element selector string or DOM object reference
          color: 0x5588,
          waveHeight: 15,
          shininess: 30,
          waveSpeed: 1.5,
          zoom: 1,
          mouseControls: true,
          touchControls: false,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
        });
      }
    }, 300);
  });

  onUnmounted(() => {
    if (effect) {
      effect.destroy();
    }
  });
</script>

<style>
  .vanta_container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    color: #ffffff;
    z-index: -1;
  }
</style>
