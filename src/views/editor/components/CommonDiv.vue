<template>
  <CommonWraper :vNodeData="props.vNodeData">
    <div :class="divClassNames" :style="divStyles" @click="setEditorCurrentCompHd">
      <component v-for="comp in childrenComps" :key="comp.id" :is="comp.tag" :vNodeData="comp"></component>
    </div>
  </CommonWraper>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import CommonWraper from "@/components/wrapper/CommonWraper.vue";

  import { useEditorComponentstore } from "@/stores/editorConfig";

  const { setEditorCurrentComp, setEditorRefreshCompToTransFlag } = useEditorComponentstore();

  const props = defineProps({
    vNodeData: {
      type: Object,
      default() {
        return null;
      },
    },
  });

  const divClassNames = computed(() => {
    if (props.vNodeData.classNames) {
      return Object.keys(props.vNodeData.classNames).join(" ");
    } else {
      return "";
    }
  });

  const divStyles = computed(() => {
    if (props.vNodeData.styles) {
      const style = {};
      if (props.vNodeData.styles) {
        const keys = Object.keys(props.vNodeData.styles);
        keys.forEach((key) => {
          const values = Object.values(props.vNodeData.styles[key].properties);
          values.forEach((prop: any) => {
            if (prop.getStyleName() != "top" && prop.getStyleName() != "left" && prop.getStyleName() != "rotate") {
              style[prop.getStyleName()] = prop.getStyleValue();
            }
          });
        });
      }
      return style;
    } else {
      return {};
    }
  });

  const childrenComps = computed(() => {
    return props.vNodeData.children ? props.vNodeData.children : [];
  });

  function setEditorCurrentCompHd() {
    if (props.vNodeData) {
      setEditorCurrentComp(props.vNodeData);
      setEditorRefreshCompToTransFlag();
    }
  }
</script>

<style scoped></style>
