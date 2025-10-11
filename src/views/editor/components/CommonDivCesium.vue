<template>
  <div
    class="row_nw_ce_ce"
    :class="{
      [divClassNames]: true,
      active_container: isActive,
    }"
    :style="divStyles"
    :id="props.vNodeData.id"
    @dblclick.stop.prevent="setEditorCurrentShapeHd"
    @click.stop.prevent="setEditorCurrentParentCompHd"
  ></div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted, nextTick, onUnmounted } from "vue";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import * as csMap from "./CommonDivCesium.ts";
  import { tiandituZh } from "@/utils/map/MapConst";

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

  let hasClickedCzmlObj = false;

  const mapClickHandler = (event) => {
    console.log("map 鼠标单击", event);
    if (event.czmObject) {
      // event.stopPropagation();
      hasClickedCzmlObj = true;
      const layer = event.layer;
      if (layer instanceof mars3d.layer.CzmlLayer) {
        const options = layer.options;
        setEditorCurrentParentComp(options);
      }
    } else {
      hasClickedCzmlObj = false;
    }
  };

  const mapCanvasClickHandler = (event) => {
    if (hasClickedCzmlObj) {
      event.stopPropagation();
      event.preventDefault(); // Prevent default behavior, like selecting credit text
    }
  };

  const addMapEventHd = () => {
    if (csMap.map) {
      csMap.map.on(mars3d.EventType.click, mapClickHandler);
      csMap.viewer.canvas.addEventListener("click", mapCanvasClickHandler);
    }
  };

  const removeMapEventHd = () => {
    if (csMap.map) {
      csMap.map.off(mars3d.EventType.click, mapClickHandler);
      csMap.viewer.canvas.removeEventListener("click", mapCanvasClickHandler);
    }
  };

  onMounted(() => {
    csMap.initMap(props.vNodeData.id);
    csMap.csBaseMap.addBgLayer(tiandituZh);
    csMap.createGraphicLayer();
    addMapEventHd();

    // setTimeout(() => {
    //   addGarphicLayerEvent();
    // }, 200);
  });

  onUnmounted(() => {
    removeMapEventHd();
    csMap.destroyMap();
  });
</script>

<style scoped lang="scss">
  .active_container {
    outline: 1px solid rgba(235, 3, 3, 1);
    box-shadow: 0 0 10px rgba(235, 3, 3, 0.5);
  }
</style>
