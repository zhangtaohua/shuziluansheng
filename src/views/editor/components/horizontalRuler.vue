<template>
  <div ref="horizontalRulerRef" class="row_nw_fs_ce horizontal_ruler_container"></div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted, onMounted } from "vue";
  import Guides from "@scena/guides";

  const horizontalRulerRef = ref(null);
  let guides = null;
  let scrollX = 0;
  let scrollY = 0;

  const resizeCb = () => {
    if (guides) {
      guides.resize();
    }
  };

  const wheelCb = (e) => {
    if (guides) {
      scrollX += e.deltaX;
      scrollY += e.deltaY;

      guides.scrollGuides(scrollY);
      guides.scroll(scrollX);
    }
  };

  function init() {
    guides = new Guides(horizontalRulerRef.value, {
      type: "horizontal",
      displayDragPos: true,
    }).on("changeGuides", (e) => {
      console.log("horizontal", e.guides);
    });

    window.addEventListener("resize", resizeCb);

    window.addEventListener("wheel", wheelCb);
  }

  onMounted(() => {
    init();
  });

  onUnmounted(() => {
    if (guides) {
      guides.destroy();
    }

    window.removeEventListener("resize", resizeCb);

    window.removeEventListener("wheel", wheelCb);
  });
</script>

<style scoped lang="scss">
  .horizontal_ruler_container {
    position: fixed;
    width: calc(100vw - 2rem);
    height: 2rem;
    top: 3rem;
    left: 2rem;
    z-index: 10;
  }
</style>
