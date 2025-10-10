<template>
  <div class="row_nw_fs_ce header_container">
    <div class="row_nw_ce_ce header_item" @click="addTest">容器</div>
    <div class="row_nw_ce_ce header_item" @click="addBillboard">Billboard</div>
  </div>
  <!-- <div v-else class="row_nw_center_center header_small" @click="setIsFullView(false)"></div> -->
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  import { useSystemConfigStore } from "@/stores/systemConfig";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import divContainerConfig from "@/h5/divData/divContainerConfig.js";
  import divTextContainerConfig from "@/h5/divData/divTextConfig.js";
  import divImageContainerConfig from "@/h5/divData/divImageConfig.js";
  import divCesiumContainerConfig from "@/h5/divData/divCesiumConfig.js";

  import { nanoid } from "@/utils/common/nanoid";
  import { cloneDeep } from "es-toolkit";

  import * as csMap from "./CommonDivCesium.ts";

  import {
    CssNamePixel,
    CssWidthOptions,
    CssHeightOptions,
    CssTopOptions,
    CssLeftOptions,
    CssFontSizeOptions,
    CssLineHeightOptions,
    CssTextEllipseLines,
  } from "@/h5/cssData/NamePixel.ts";
  import { CssColorOptionsInput, CssBackgroundColorOptions } from "@/h5/cssData/NameColorOptions";
  import { CssColorInput, CssColorOptions } from "@/h5/cssData/NameColor";
  import {
    CssPureOptionsInput,
    CssDisplayOptions,
    CssPositionOptions,
    CssfontWeightOptions,
    CssfontStyleOptions,
    CssObjectFitOptions,
  } from "@/h5/cssData/PureOptions";

  import { CssCheckedInput, CssBackgroundClipTextOptions } from "@/h5/cssData/NameChecked";

  const { systemConfig } = useSystemConfigStore();
  const { editorConfig, addEditorComponents, setEditorCurrentParentComp } = useEditorConfigStore();

  import czmlBillboard from "@/czml/schema/entity/billboard.ts";

  function addTest() {
    console.log("divContainerConfig", divContainerConfig);
    const newdivConfig = cloneDeep(divContainerConfig);
    newdivConfig.styles["width"] = new CssNamePixel(CssWidthOptions);
    newdivConfig.styles["height"] = new CssNamePixel(CssHeightOptions);
    newdivConfig.styles["top"] = new CssNamePixel(CssTopOptions);
    newdivConfig.styles["left"] = new CssNamePixel(CssLeftOptions);
    newdivConfig.styles["background-color"] = new CssColorOptionsInput({
      ...CssBackgroundColorOptions,
    });
    newdivConfig.styles["display"] = new CssPureOptionsInput(CssDisplayOptions);
    newdivConfig.styles["position"] = new CssPureOptionsInput(CssPositionOptions);

    newdivConfig.styles.width.value = "320";
    newdivConfig.styles.height.value = "320";

    newdivConfig.id = nanoid();
    addEditorComponents(newdivConfig);

    const newdivConfig2 = cloneDeep(divContainerConfig);
    newdivConfig2.styles["width"] = new CssNamePixel(CssWidthOptions);
    newdivConfig2.styles["height"] = new CssNamePixel(CssHeightOptions);
    newdivConfig2.styles["top"] = new CssNamePixel(CssTopOptions);
    newdivConfig2.styles["left"] = new CssNamePixel(CssLeftOptions);
    newdivConfig2.styles["background-color"] = new CssColorOptionsInput({
      ...CssBackgroundColorOptions,
      value: "rgba(255,255,0,1)",
    });
    newdivConfig2.styles["display"] = new CssPureOptionsInput(CssDisplayOptions);
    newdivConfig2.styles["position"] = new CssPureOptionsInput(CssPositionOptions);

    newdivConfig2.styles.width.value = "320";
    newdivConfig2.styles.height.value = "320";
    newdivConfig2.styles.left.value = "500";
    console.log("newdivConfig2", newdivConfig2);

    newdivConfig2.id = nanoid();
    addEditorComponents(newdivConfig2);

    const textConfig = cloneDeep(divTextContainerConfig);
    textConfig.styles["width"] = new CssNamePixel({
      ...CssWidthOptions,
      value: "auto",
    });
    textConfig.styles["height"] = new CssNamePixel({
      ...CssHeightOptions,
      value: "auto",
    });
    textConfig.styles["top"] = new CssNamePixel(CssTopOptions);
    textConfig.styles["left"] = new CssNamePixel(CssLeftOptions);
    textConfig.styles["background-color"] = new CssColorOptionsInput({
      ...CssBackgroundColorOptions,
      value: "rgba(255,0,255,1)",
    });
    textConfig.styles["position"] = new CssPureOptionsInput(CssPositionOptions);

    textConfig.styles["font-size"] = new CssNamePixel(CssFontSizeOptions);
    textConfig.styles["line-height"] = new CssNamePixel(CssLineHeightOptions);
    textConfig.styles["color"] = new CssColorInput({
      ...CssColorOptions,
      value: "rgba(255,255,0,1)",
    });
    textConfig.styles["font-weight"] = new CssPureOptionsInput(CssfontWeightOptions);
    textConfig.styles["font-style"] = new CssPureOptionsInput(CssfontStyleOptions);
    textConfig.styles["text-ellipse-lines"] = new CssNamePixel(CssTextEllipseLines);
    textConfig.styles["background-clip-text"] = new CssCheckedInput(CssBackgroundClipTextOptions);
    textConfig.id = nanoid();
    addEditorComponents(textConfig);

    const imageConfig = cloneDeep(divImageContainerConfig);
    imageConfig.styles["width"] = new CssNamePixel(CssWidthOptions);
    imageConfig.styles["height"] = new CssNamePixel(CssHeightOptions);
    imageConfig.styles["top"] = new CssNamePixel(CssTopOptions);
    imageConfig.styles["left"] = new CssNamePixel(CssLeftOptions);
    imageConfig.styles["background-color"] = new CssColorOptionsInput({
      ...CssBackgroundColorOptions,
      value: "rgba(255,255,0,1)",
    });
    imageConfig.styles["position"] = new CssPureOptionsInput(CssPositionOptions);
    imageConfig.styles["object-fit"] = new CssPureOptionsInput(CssObjectFitOptions);

    imageConfig.styles.width.value = "320";
    imageConfig.styles.height.value = "320";
    imageConfig.styles.left.value = "10";
    imageConfig.styles.top.value = "500";
    imageConfig.image =
      "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/bd26f78c344b3ad6afef7b12b1421227.jpg?x-oss-process=image%2fresize%2cm_lfit%2cw_1920%2ch_1080";
    console.log("imageConfig", imageConfig);

    imageConfig.id = nanoid();
    addEditorComponents(imageConfig);

    const cesiumConfig = cloneDeep(divCesiumContainerConfig);
    cesiumConfig.styles["width"] = new CssNamePixel(CssWidthOptions);
    cesiumConfig.styles["height"] = new CssNamePixel(CssHeightOptions);
    cesiumConfig.styles["top"] = new CssNamePixel(CssTopOptions);
    cesiumConfig.styles["left"] = new CssNamePixel(CssLeftOptions);
    cesiumConfig.styles["background-color"] = new CssColorOptionsInput({
      ...CssBackgroundColorOptions,
      value: "rgba(255,255,0,1)",
    });

    cesiumConfig.styles["position"] = new CssPureOptionsInput(CssPositionOptions);

    cesiumConfig.styles.width.value = "600";
    cesiumConfig.styles.height.value = "600";
    cesiumConfig.styles.left.value = "400";
    cesiumConfig.styles.top.value = "400";

    cesiumConfig.id = nanoid();
    addEditorComponents(cesiumConfig);
  }

  function addBillboard() {
    const billboardOpt = new czmlBillboard();
    console.log("billboardOpt", billboardOpt);
    csMap.addCzmlGraphicLayer(billboardOpt);
    setEditorCurrentParentComp(billboardOpt);
  }

  function addTest2() {
    const newdivConfig = cloneDeep(divContainerConfig);
    newdivConfig.style.width = "320px";
    newdivConfig.style.height = "320px";

    newdivConfig.id = nanoid();

    addEditorComponents(newdivConfig);
    for (let i = 0; i < 10000; i++) {}
    setEditorCurrentParentComp(newdivConfig);

    const newdivConfig2 = cloneDeep(divContainerConfig);
    newdivConfig2.style.width = "160px";
    newdivConfig2.style.height = "160px";
    newdivConfig2.style.left = "10";
    newdivConfig2.style.backgroundColor = "rgba(255,255,0,1)";

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

    newdivConfig3.id = nanoid();

    addEditorComponents(newdivConfig3);
  }

  function addContainer() {
    const newdivConfig = cloneDeep(divContainerConfig);
    newdivConfig.id = nanoid();

    newdivConfig.style.width = "600px";
    newdivConfig.style.height = "600px";

    addEditorComponents(newdivConfig);
  }

  function addChild() {
    const newdivConfig = cloneDeep(divContainerConfig);
    newdivConfig.style.width = "320px";
    newdivConfig.style.height = "320px";

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
