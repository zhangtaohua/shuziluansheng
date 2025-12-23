<template>
  <div class="row_nw_fs_ce config_container"></div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  import { useSystemConfigStore } from "@/stores/systemConfig";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  import { nanoid } from "@/utils/common/nanoid";
  import { cloneDeep } from "es-toolkit";
</script>

<style scoped>
  .config_container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    width: 100vw;
    height: 3rem;
    background-color: rgba(26, 30, 39, 1);
  }
</style>
