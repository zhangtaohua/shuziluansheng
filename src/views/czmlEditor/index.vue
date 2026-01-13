<template>
  <div class="row_nw_fs_fs editor_container">
    <WorkspacePanel></WorkspacePanel>
    <ConfigPanel></ConfigPanel>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import WorkspacePanel from "./components/WorkspacePanel.vue";
  import ConfigPanel from "./components/ConfigPanel.vue";

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
    z-index: 2;
  }

  .editor_ctxbox {
    width: 100vw;
    height: 100vh;
  }
</style>
