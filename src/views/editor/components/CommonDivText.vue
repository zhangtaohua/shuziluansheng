<template>
  <div
    :class="{
      [divClassNames]: true,
      active_container: isActive,
    }"
    :style="divStyles"
    ref="divRef"
    @dblclick.stop.prevent="setEditorCurrentShapeHd"
    @click.stop.prevent="setEditorCurrentParentCompHd"
  >
    <span style="width: 100%; height: auto">{{ props.vNodeData.text }}</span>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  const { editorConfig, setEditorCurrentShape, setEditorRefreshShape, setEditorCurrentParentComp } =
    useEditorConfigStore();

  const props = defineProps({
    vNodeData: {
      type: Object,
      default() {
        return null;
      },
    },
  });

  const divRef = ref(null);

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
      const values = Object.values(props.vNodeData.styles);
      values.forEach((prop: any) => {
        style[prop.getStyleName()] = prop.getStyleValue();
      });
      return style;
    } else {
      return {};
    }
  });

  const isActive = computed(() => {
    if (props.vNodeData && editorConfig.currentParentComp && props.vNodeData.id == editorConfig.currentParentComp.id) {
      return true;
    } else {
      return false;
    }
  });

  function setEditorCurrentShapeHd() {
    if (props.vNodeData) {
      setEditorCurrentShape(props.vNodeData);
      setEditorRefreshShape();
    }
  }

  function setEditorCurrentParentCompHd() {
    if (props.vNodeData) {
      setEditorCurrentParentComp(props.vNodeData);
    }
  }

  function updateWidthHeight() {
    if (divRef.value) {
      const { width, height } = divRef.value.getBoundingClientRect();
      const { clientWidth, clientHeight } = divRef.value;
      const realWidth = Math.max(Math.floor(width), clientWidth);
      const realHeight = Math.max(Math.floor(height), clientHeight);
      const styles = props.vNodeData.styles;
      styles.width.value = realWidth;
      styles.height.value = realHeight;
    }
  }
  onMounted(() => {
    updateWidthHeight();
  });

  watch(
    [() => props.vNodeData.styles["font-size"].value, () => props.vNodeData.styles["line-height"].value],
    () => {
      updateWidthHeight();
    },
    {
      immediate: false,
      deep: true,
    },
  );

  watch(
    () => editorConfig.refreshShapeToCompFlag,
    () => {
      if (
        editorConfig.currentShapeOptions &&
        editorConfig.currentShapeOptions.transform &&
        editorConfig.currentShapeOptions.id == props.vNodeData.id
      ) {
        const transform = editorConfig.currentShapeOptions.transform;
        const styles = props.vNodeData.styles;
        if (styles.left) {
          styles.left.value = transform.left;
        }

        if (styles.top) {
          styles.top.value = transform.top;
        }

        if (styles.width) {
          styles.width.value = transform.width;
        }

        if (styles.height) {
          styles.height.value = transform.height;
        }
      }
    },
    {
      immediate: false,
      deep: false,
    },
  );
</script>

<style scoped lang="scss">
  .active_container {
    outline: 1px solid rgba(235, 3, 3, 1);
    box-shadow: 0 0 10px rgba(235, 3, 3, 0.5);
  }
</style>
