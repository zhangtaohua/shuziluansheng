<template>
  <div class="row_nw_ce_ce rparams_in_container">
    <div class="rparams_in_wrapper">
      <CzmlPackagesRender :vdata="editorComponents.currentComp"></CzmlPackagesRender>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEditorComponentstore } from "@/stores/editorConfig";

  const { editorComponents } = useEditorComponentstore();

  const emits = defineEmits(["unExpand"]);

  function unExpandClickHd() {
    emits("unExpand");
  }
</script>

<style scoped>
  .rparams_in_container {
    width: 100%;
    height: 100%;
    background-color: rgba(26, 30, 39, 1);
    overflow: hidden;
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: -0.25rem 0 0.25rem rgba(255, 255, 255, 0.2);
  }

  .rparams_in_wrapper {
    width: calc(100% - 1.5rem);
    height: calc(100% - 3rem);
    color: white;
    font-size: 1rem;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .rparams_in_wrapper::-webkit-scrollbar {
    display: none;
    width: 0px;
  }
</style>
