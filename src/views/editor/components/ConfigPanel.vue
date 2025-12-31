<template>
  <RightParamsWraper v-if="isCanShowConfigPanel" ref="RightParamsWraperRef">
    <ConfigHtml v-if="isHtmlConfigPanel" @unExpand="unExpandClickHd"></ConfigHtml>
    <ConfigCzml v-if="isCzmlConfigPanel" @unExpand="unExpandClickHd"></ConfigCzml>
    <ConfigWorkspace v-if="isworkspaceConfigPanel" @unExpand="unExpandClickHd"></ConfigWorkspace>
  </RightParamsWraper>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import RightParamsWraper from "@/components/wrapper/RightParamsWraper.vue";
  import ConfigWorkspace from "./ConfigWorkspace.vue";

  import ConfigHtml from "./ConfigHtml.vue";
  import ConfigCzml from "./ConfigCzml.vue";

  import { useEditorComponentstore } from "@/stores/editorConfig";

  const { editorComponents } = useEditorComponentstore();

  const RightParamsWraperRef = ref(null);
  const isworkspaceConfigPanel = ref(false);
  const isHtmlConfigPanel = ref(false);
  const isCzmlConfigPanel = ref(false);

  const isCanShowConfigPanel = ref(false);

  watch(
    () => editorComponents.currentComp,
    () => {
      if (editorComponents.currentComp) {
        isworkspaceConfigPanel.value = false;
        isHtmlConfigPanel.value = false;
        isCzmlConfigPanel.value = false;

        if (editorComponents.currentComp.componentType == "html") {
          isHtmlConfigPanel.value = true;
        } else if (editorComponents.currentComp.componentType == "czml") {
          isCzmlConfigPanel.value = true;
        } else if (editorComponents.currentComp.componentType == "workspace") {
          isworkspaceConfigPanel.value = true;
        }

        isCanShowConfigPanel.value = true;
      } else {
        isCanShowConfigPanel.value = false;
        isHtmlConfigPanel.value = false;
      }
    },
    {
      immediate: true,
      deep: false,
    },
  );

  function unExpandClickHd() {
    if (RightParamsWraperRef.value) {
      RightParamsWraperRef.value.unExpandClickHd();
    }
  }
</script>

<style scoped></style>
