<template>
  <div class="editor_container">
    <HeaderPanel></HeaderPanel>
    <horizontalRuler></horizontalRuler>
    <VerticalRuler></VerticalRuler>
    <WorkspacePanel></WorkspacePanel>
    <!-- <RightParamsWraper></RightParamsWraper> -->
    <!-- <LeftParamsWraper></LeftParamsWraper> -->
    <InfoPanel></InfoPanel>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import HeaderPanel from "@/views/editor/components/HeaderPanel.vue";
  import WorkspacePanel from "@/views/editor/components/WorkspacePanel.vue";
  // import RightParamsWraper from "./components/RightParamsWraper.vue";
  // import LeftParamsWraper from "./components/LeftParamsWraper.vue";
  import horizontalRuler from "./components/horizontalRuler.vue";
  import VerticalRuler from "./components/VerticalRuler.vue";
  import InfoPanel from "@/views/editor/components/InfoPanel.vue";

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
</style>
