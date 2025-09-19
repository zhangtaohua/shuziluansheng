<template>
  <div class="editor_container">
    <HeaderPanel></HeaderPanel>
    <InfoPanel></InfoPanel>
    <CanvasPanel></CanvasPanel>
    <ConfigPanel></ConfigPanel>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import Konva from "konva";
  import HeaderPanel from "@/views/editor/components/HeaderPanel.vue";
  import InfoPanel from "@/views/editor/components/InfoPanel.vue";
  import ConfigPanel from "@/views/editor/components/ConfigPanel.vue";
  import CanvasPanel from "@/views/editor/components/CanvasPanel.vue";

  function init() {}

  onMounted(() => {
    init();
  });
</script>

<style scoped>
  .editor_container {
    position: relative;
    width: 100vw;
    height: 100vh;
  }
</style>
