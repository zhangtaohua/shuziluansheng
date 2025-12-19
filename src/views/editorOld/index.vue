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
  import HeaderPanel from "@/views/editorOld/components/HeaderPanel.vue";
  import InfoPanel from "@/views/editorOld/components/InfoPanel.vue";
  import ConfigPanel from "@/views/editorOld/components/ConfigPanel.vue";
  import CanvasPanel from "@/views/editorOld/components/CanvasPanel.vue";

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
