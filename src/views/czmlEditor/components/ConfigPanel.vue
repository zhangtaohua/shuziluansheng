<template>
  <RightParamsEmbedWraper v-if="isCanShowConfigPanel" ref="RightParamsEmWraperRef">
    <div class="row_nw_fs_fs czml_configbox"></div>
  </RightParamsEmbedWraper>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import RightParamsEmbedWraper from "@/components/wrapper/RightParamsEmbedWraper.vue";

  import { useEditorComponentstore } from "@/stores/editorConfig";

  const { editorComponents } = useEditorComponentstore();

  const RightParamsEmWraperRef = ref(null);

  const isCanShowConfigPanel = ref(true);

  function unExpandClickHd() {
    if (RightParamsEmWraperRef.value) {
      RightParamsEmWraperRef.value.unExpandClickHd();
    }
  }
</script>

<style scoped>
  .czml_configbox {
    width: 100%;
    height: 100%;
    background-color: rosybrown;
  }
</style>
