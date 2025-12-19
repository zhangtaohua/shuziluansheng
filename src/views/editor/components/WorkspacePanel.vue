<template>
  <div id="editor_workspace_id" class="row_nw_ce_ce ws_container">
    <div id="editor_render_id" class="ws_ctx_wraper">
      <!-- <component v-for="comp in editorConfig.components" :key="comp.id" :is="comp.tag" :vNodeData="comp"></component> -->
      <CommonWraper>
        <div>我是内容</div>
      </CommonWraper>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";

  import CommonWraper from "./CommonWraper.vue";

  import { useRoute } from "vue-router";
  import { useSystemConfigStore } from "@/stores/systemConfig";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  import { nanoid } from "@/utils/common/nanoid";
  import { cloneDeep } from "es-toolkit";
</script>

<style scoped lang="scss">
  .ws_container {
    width: calc(100vw - 3rem);
    height: calc(100vh - 6rem);
    position: fixed;
    top: 6rem;
    left: 3rem;
    z-index: 3;
  }

  .ws_ctx_wraper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 3;
  }
</style>
