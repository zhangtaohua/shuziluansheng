<template>
  <div class="row_nw_fs_ce hc_container red_debug"></div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useSystemConfigStore } from "@/stores/systemConfig";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
</script>

<style scoped>
  .hc_container {
    width: max-content;
    min-width: 2rem;
    height: 100%;
  }
</style>
