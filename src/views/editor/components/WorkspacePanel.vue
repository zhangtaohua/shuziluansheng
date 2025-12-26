<template>
  <div id="editor_workspace_id" class="row_nw_ce_ce ws_container">
    <div id="editor_render_id" class="ws_ctx_wraper">
      <component
        v-if="editorComponents.workSpace"
        :is="editorComponents.workSpace.tag"
        :vNodeData="editorComponents.workSpace"
      >
        <component
          v-for="comp in editorComponents.components"
          :key="comp.id"
          :is="comp.tag"
          :vNodeData="comp"
        ></component>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEditorComponentstore } from "@/stores/editorConfig";

  const { editorComponents } = useEditorComponentstore();
</script>

<style scoped>
  .ws_container {
    position: fixed;
    width: calc(100vw - 2rem);
    height: calc(100vh - 5rem);
    top: 5rem;
    left: 2rem;
    z-index: 1;
    background-color: rebeccapurple;
  }

  .ws_ctx_wraper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 2;
    overflow: scroll;
  }

  .ws_ctx_wraper::-webkit-scrollbar {
    display: none;
  }
</style>
