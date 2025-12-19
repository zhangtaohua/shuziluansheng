<template>
  <div class="row_nw_fs_ce header_container"></div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  import { useSystemConfigStore } from "@/stores/systemConfig";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  import { nanoid } from "@/utils/common/nanoid";
  import { cloneDeep } from "es-toolkit";
</script>

<style scoped lang="scss">
  .header_container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 3rem;
    background-color: rgba(26, 30, 39, 1);
  }

  .header_item {
    width: auto;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    background-color: red;
    padding: 0 0.75rem;
    margin-right: 0.75rem;
  }

  .header_small {
    position: fixed;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 999999;
    width: 3rem;
    height: 3rem;
    background-color: rgba(26, 30, 39, 1);
    border-radius: 0;
    cursor: pointer;
    padding: 0 0.75rem;
    border: 1px solid red;
  }
</style>
