<template>
  <RightParamsWraper v-if="isCanConfig" ref="RightParamsWraperRef">
    <ConfigHtml v-if="isHtmlConfigPanel" @unExpand="unExpandClickHd"></ConfigHtml>
  </RightParamsWraper>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import RightParamsWraper from "@/components/wrapper/RightParamsWraper.vue";
  import ConfigHtml from "./ConfigHtml.vue";

  import { useEditorComponentstore } from "@/stores/editorConfig";

  const { editorComponents } = useEditorComponentstore();

  const RightParamsWraperRef = ref(null);
  const isHtmlConfigPanel = ref(false);

  const isCanConfig = ref(false);

  watch(
    () => editorComponents.currentComp,
    () => {
      if (editorComponents.currentComp) {
        if (editorComponents.currentComp.componentType == "html") {
          isHtmlConfigPanel.value = true;
        } else {
          isHtmlConfigPanel.value = false;
        }
        isCanConfig.value = true;
      } else {
        isCanConfig.value = false;
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
