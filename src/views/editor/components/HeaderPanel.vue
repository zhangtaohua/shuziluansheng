<template>
  <div class="row_nw_fs_ce header_container">
    <div class="row_nw_ce_ce header_item" @click="addTest">容器</div>
    <div class="row_nw_ce_ce header_item" @click="addChild">DIV</div>
  </div>
  <!-- <div v-else class="row_nw_center_center header_small" @click="setIsFullView(false)"></div> -->
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  import { useSystemConfigStore } from "@/stores/systemConfig";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import divContainerConfig from "@/common/data/divContainerConfig.js";
  import { nanoid } from "@/utils/common/nanoid";
  import { cloneDeep } from "es-toolkit";

  import {
    CssWidthOptions,
    CssHeightOptions,
    CssTopOptions,
    CssLeftOptions,
    CssNamePixel,
  } from "@/common/cssData/NamePixel.ts";
  import CssBackgroundColor from "@/common/cssData/BackgroundColor.ts";
  import { CssPureOptions, CssDisplayOptions, CssPositionOptions } from "@/common/cssData/PureOptions";
  import { getControlTransform } from "@/common/cssData/globalCss";

  const { systemConfig } = useSystemConfigStore();
  const { editorConfig, addEditorComponents, setEditorCurrentParentComp } = useEditorConfigStore();

  function addTest() {
    console.log("divContainerConfig", divContainerConfig);
    const newdivConfig = cloneDeep(divContainerConfig);
    newdivConfig.styles["width"] = new CssNamePixel(CssWidthOptions);
    newdivConfig.styles["height"] = new CssNamePixel(CssHeightOptions);
    newdivConfig.styles["top"] = new CssNamePixel(CssTopOptions);
    newdivConfig.styles["left"] = new CssNamePixel(CssLeftOptions);
    newdivConfig.styles["background-color"] = new CssBackgroundColor("rgba(255, 0, 0, 1)");
    newdivConfig.styles["display"] = new CssPureOptions(CssDisplayOptions);
    newdivConfig.styles["position"] = new CssPureOptions(CssPositionOptions);

    newdivConfig.styles.width.value = "320";
    newdivConfig.styles.height.value = "320";
    newdivConfig.transform = getControlTransform(newdivConfig.styles);

    newdivConfig.id = nanoid();
    addEditorComponents(newdivConfig);

    const newdivConfig2 = cloneDeep(divContainerConfig);
    newdivConfig2.styles["width"] = new CssNamePixel(CssWidthOptions);
    newdivConfig2.styles["height"] = new CssNamePixel(CssHeightOptions);
    newdivConfig2.styles["top"] = new CssNamePixel(CssTopOptions);
    newdivConfig2.styles["left"] = new CssNamePixel(CssLeftOptions);
    newdivConfig2.styles["background-color"] = new CssBackgroundColor("rgba(255, 255, 0, 1)");
    newdivConfig2.styles["display"] = new CssPureOptions(CssDisplayOptions);
    newdivConfig2.styles["position"] = new CssPureOptions(CssPositionOptions);

    newdivConfig2.styles.width.value = "320";
    newdivConfig2.styles.height.value = "320";
    newdivConfig2.styles.left.value = "500";
    newdivConfig2.transform = getControlTransform(newdivConfig2.styles);
    console.log("newdivConfig2", newdivConfig2);

    newdivConfig2.id = nanoid();
    addEditorComponents(newdivConfig2);
  }

  function addTest2() {
    const newdivConfig = cloneDeep(divContainerConfig);
    newdivConfig.style.width = "320px";
    newdivConfig.style.height = "320px";
    newdivConfig.transform = {
      x: 0,
      y: 0,
      width: 320,
      height: 320,
      rotation: 0,
    };

    newdivConfig.id = nanoid();

    addEditorComponents(newdivConfig);
    for (let i = 0; i < 10000; i++) {}
    setEditorCurrentParentComp(newdivConfig);

    const newdivConfig2 = cloneDeep(divContainerConfig);
    newdivConfig2.style.width = "160px";
    newdivConfig2.style.height = "160px";
    newdivConfig2.style.left = "10";
    newdivConfig2.style.backgroundColor = "rgba(255,255,0,1)";
    newdivConfig2.transform = {
      x: 10,
      y: 0,
      width: 160,
      height: 160,
      rotation: 0,
    };
    newdivConfig2.id = nanoid();

    addEditorComponents(newdivConfig2);
    for (let i = 0; i < 10000; i++) {}
    console.log("newdivConfig2", newdivConfig2);
    setEditorCurrentParentComp(newdivConfig2);

    const newdivConfig3 = cloneDeep(divContainerConfig);
    newdivConfig3.style.width = "60px";
    newdivConfig3.style.height = "60px";
    newdivConfig3.style.left = "10px";
    newdivConfig3.style.backgroundColor = "rgba(0,255,0,1)";
    newdivConfig3.transform = {
      x: 10,
      y: 0,
      width: 60,
      height: 60,
      rotation: 0,
    };
    newdivConfig3.id = nanoid();

    addEditorComponents(newdivConfig3);
  }

  function addContainer() {
    const newdivConfig = cloneDeep(divContainerConfig);
    newdivConfig.id = nanoid();

    newdivConfig.style.width = "600px";
    newdivConfig.style.height = "600px";
    newdivConfig.transform = {
      x: 0,
      y: 0,
      width: 600,
      height: 600,
      rotation: 0,
    };
    addEditorComponents(newdivConfig);
  }

  function addChild() {
    const newdivConfig = cloneDeep(divContainerConfig);
    newdivConfig.style.width = "320px";
    newdivConfig.style.height = "320px";
    newdivConfig.transform = {
      x: 0,
      y: 0,
      width: 320,
      height: 320,
      rotation: 0,
    };

    newdivConfig.id = nanoid();
    addEditorComponents(newdivConfig);
  }

  // const route = useRoute();
  // const showMapLngLat = ref(false);
  // // const { systemConfig, setIsFullView } = useSystemStore();
  // import screenfull from "screenfull";

  // const esc_handle = (event: any) => {
  //   if (systemConfig.isFullView) {
  //     if (event.key == "Escape" || event.key == "F11") {
  //       // if (event.code === "Escape") {
  //       setIsFullView(false);
  //     }
  //   } else {
  //     if (event.key == "F11") {
  //       event.preventDefault(); // 阻止默认事件
  //       event.stopPropagation(); // 阻止冒泡事件
  //       setIsFullView(true);
  //     }
  //   }
  // };
  // window.addEventListener("keydown", esc_handle);

  // function isFullScreen() {
  //   return !!(
  //     document.fullscreenElement ||
  //     document.webkitFullscreenElement ||
  //     document.mozFullScreenElement ||
  //     document.msFullscreenElement
  //   );
  // }

  // const fullscreen_handle = () => {
  //   setTimeout(() => {
  //     if (isFullScreen()) {
  //       setIsFullView(true, false);
  //     } else {
  //       setIsFullView(false, false);
  //     }
  //   }, 10);
  // };
  // document.addEventListener("fullscreenchange", fullscreen_handle);

  // onUnmounted(() => {
  //   window.removeEventListener("keydown", esc_handle);
  //   document.removeEventListener("fullscreenchange", fullscreen_handle);
  // });
</script>

<style scoped lang="scss">
  .header_container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 3rem;
    background-color: rgba(26, 30, 39, 1);
  }

  .header_item {
    width: auto;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1rem;
    background-color: red;
    padding: 0 0.75rem;
    margin-right: 0.75rem;
  }

  .header_small {
    position: fixed;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 999999;
    width: 3rem;
    height: 3rem;
    background-color: rgba(26, 30, 39, 1);
    border-radius: 0;
    cursor: pointer;
    padding: 0 0.75rem;
    border: 1px solid red;
  }
</style>
