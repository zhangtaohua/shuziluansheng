<template>
  <CommonWraper :vNodeData="props.vNodeData">
    <div class="row_nw_ce_ce" :class="divClassNames" :style="divStyles" @click="setEditorCurrentCompHd">
      <img
        style="width: 100%; height: 100%"
        :style="imageStyles"
        v-if="props.vNodeData.data.image"
        :src="props.vNodeData.data.image"
      />
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
      const style = {
        overflow: "hidden",
      };
      if (props.vNodeData.styles) {
        const keys = Object.keys(props.vNodeData.styles);
        keys.forEach((key) => {
          if (key != "image") {
            const values = Object.values(props.vNodeData.styles[key].properties);
            values.forEach((prop: any) => {
              if (prop.getStyleName() != "top" && prop.getStyleName() != "left" && prop.getStyleName() != "rotate") {
                style[prop.getStyleName()] = prop.getStyleValue();
              }
            });
          }
        });
      }
      return style;
    } else {
      return {};
    }
  });

  const imageStyles = computed(() => {
    if (props.vNodeData.styles) {
      const style = {};
      if (props.vNodeData.styles.image && props.vNodeData.styles.image.properties["object-fit"]) {
        const prop = props.vNodeData.styles.image.properties["object-fit"];
        style[prop.getStyleName()] = prop.getStyleValue();
      }
      if (props.vNodeData.styles.image && props.vNodeData.styles.image.properties["object-position"]) {
        const prop = props.vNodeData.styles.image.properties["object-position"];
        style[prop.getStyleName()] = prop.getStyleValue();
      }
      return style;
    } else {
      return {};
    }
  });

  function setEditorCurrentCompHd() {
    if (props.vNodeData) {
      setEditorCurrentComp(props.vNodeData);
      setEditorRefreshCompToTransFlag();
    }
  }
</script>

<style scoped></style>
