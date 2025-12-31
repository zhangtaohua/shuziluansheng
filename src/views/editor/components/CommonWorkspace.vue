<template>
  <div :style="divStyles" @click.stop.prevent="setEditorCurrentParentCompHd">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from "vue";
  import { useEditorComponentstore } from "@/stores/editorConfig";

  const { setEditorCurrentComp } = useEditorComponentstore();

  const props = defineProps({
    vNodeData: {
      type: Object,
      default() {
        return null;
      },
    },
  });

  const divStyles = computed(() => {
    if (props.vNodeData.styles) {
      const style = {
        position: "absolute",
        overflow: "hidden",
      };
      if (props.vNodeData.styles.basic && props.vNodeData.styles.basic.properties) {
        const values = Object.values(props.vNodeData.styles.basic.properties);
        values.forEach((prop: any) => {
          style[prop.getStyleName()] = prop.getStyleValue();
        });
      }
      return style;
    } else {
      return {};
    }
  });

  function setEditorCurrentParentCompHd() {
    if (props.vNodeData) {
      setEditorCurrentComp(props.vNodeData);
    }
  }
</script>

<style scoped></style>
