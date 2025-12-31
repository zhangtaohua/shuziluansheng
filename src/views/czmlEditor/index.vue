<template>
  <div class="col_nw_fs_fs editor_container">
    <HeaderPanel></HeaderPanel>
    <div class="row_nw_fs_fs editor_ctxbox">
      <WorkspacePanel></WorkspacePanel>
      <ConfigPanel></ConfigPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import HeaderPanel from "./components/HeaderPanel.vue";
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
    height: calc(100vh - 3rem);
  }
</style>
