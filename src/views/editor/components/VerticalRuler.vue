<template>
  <div ref="verticalRulerRef" class="row_nw_fs_ce vertical_ruler_container"></div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted, onMounted } from "vue";
  import Guides from "@scena/guides";

  const verticalRulerRef = ref(null);
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
    guides = new Guides(verticalRulerRef.value, {
      type: "vertical",
      displayDragPos: true,
      // rulerStyle: { left: "30px", width: "calc(100% - 30px)", height: "100%" },
      // useResizeObserver: true,
    }).on("changeGuides", (e) => {
      console.log("vertical", e.guides);
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
  .vertical_ruler_container {
    position: fixed;
    width: 3rem;
    height: calc(100vh - 6rem);
    top: 6rem;
    left: 0;
    z-index: 10;
  }
</style>
