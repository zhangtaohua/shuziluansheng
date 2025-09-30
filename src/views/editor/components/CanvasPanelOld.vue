<template>
  <div class="row_nw_ce_ce canvas_container">
    <div
      ref="controlRef"
      id="control_container"
      class="control_wrapper"
      :style="controlStyle"
      @dblclick="changeToRenderLayer"
    ></div>
    <div id="render_container" class="canvas_ctx_wraper" :style="renderStyle" @click="setEditorCurrentParentCompHd">
      <component v-for="comp in editorConfig.components" :key="comp.id" :is="comp.tag" :vNodeData="comp"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, watch, onMounted } from "vue";
  import Konva from "konva";
  import { useSystemConfigStore } from "@/stores/systemConfig";
  import { useEditorConfigStore, globalEditor, getParentComponentTransforms } from "@/stores/editorConfig";
  import { getControlTransform } from "@/common/cssData/globalCss";

  const { systemConfig } = useSystemConfigStore();
  const { editorConfig, setEditorRefreshComp, setEditorCurrentParentComp } = useEditorConfigStore();

  const controlRef = ref(null);
  let width = 0;
  let height = 0;

  let stage = null;
  let layer = null;
  let tr = null;
  let currentShape = null;
  let gridGroup = null;

  let currentShapeTransform = null;
  let parentsShapeTransform = [];

  function setEditorCurrentParentCompHd() {
    setEditorCurrentParentComp(null);
  }

  function getPosXY(pos, gap, limit = 2) {
    const pp = pos / gap;
    const min = Math.floor(pp) * gap;
    const max = Math.ceil(pp) * gap;
    const offsetMin = pos - min;
    const offsetMax = max - pos;
    if (offsetMin < offsetMax) {
      return min;
    } else {
      return max;
    }
  }

  function createRect(options: any) {
    disactiveCurrentShape();
    destroyCurrentShape();
    const rect = new Konva.Rect({
      x: options.left ?? 0,
      y: options.top ?? 0,
      width: options.width ?? 300,
      height: options.height ?? 300,
      // offsetX: 200,
      fill: "rgba(255, 0, 0, 0.25)",
      stroke: "black",
      strokeWidth: 4,
      draggable: true,
    });

    rect.on("transform", function (event) {
      console.log("transform", event);
      const newWidth = rect.width() * rect.scaleX();
      const newHeight = rect.height() * rect.scaleY();
      let newX = event.target.attrs.x;
      let newY = event.target.attrs.y;
      for (let i = 0; i < parentsShapeTransform.length; i++) {
        newX = newX - parentsShapeTransform[i].left;
        newY = newY - parentsShapeTransform[i].top;
      }
      if (currentShapeTransform) {
        currentShapeTransform.width = newWidth;
        currentShapeTransform.height = newHeight;
        currentShapeTransform.left = newX;
        currentShapeTransform.top = newY;
        editorConfig.currentShapeOptions.transform = {
          ...currentShapeTransform,
        };
        setEditorRefreshComp();
      }
      rect.setAttrs({
        width: newWidth,
        height: newHeight,
        scaleX: 1,
        scaleY: 1,
      });
    });

    rect.on("dragmove", function (event) {
      console.log("dragmove", event);
      const { x, y } = event.target.attrs;
      const { gapX, gapY } = editorConfig.grid;
      const newX = getPosXY(x, gapX);
      const newY = getPosXY(y, gapY);
      let newRealX = newX;
      let newRealY = newY;
      for (let i = 0; i < parentsShapeTransform.length; i++) {
        newRealX = newRealX - parentsShapeTransform[i].left;
        newRealY = newRealY - parentsShapeTransform[i].top;
      }
      if (currentShapeTransform) {
        currentShapeTransform.left = newRealX;
        currentShapeTransform.top = newRealY;
        editorConfig.currentShapeOptions.transform = {
          ...currentShapeTransform,
        };
        setEditorRefreshComp();
      }

      rect.setAttrs({
        x: newX,
        y: newY,
      });
    });

    // textNode.on("dblclick dbltap", () => {
    //   textNode.hide();
    //   tr.hide();
    // });

    //   stage.on('dblclick dbltap', function () {
    //   isPaint = false;
    // });

    currentShape = rect;
    return rect;
  }

  function createRuler(grid) {
    if (layer) {
      const { gapX, gapY } = grid;
      if (gridGroup) {
        gridGroup.destroyChildren();
      } else {
        gridGroup = new Konva.Group({
          draggable: false,
        });
        layer.add(gridGroup);
      }

      const xCnt = Math.ceil(width / gapX) - 1;
      const yCnt = Math.ceil(height / gapY) - 1;
      console.log("grid", width, height, xCnt, yCnt);
      for (let i = 1; i <= xCnt; i++) {
        const lineX = new Konva.Line({
          points: [i * gapX, 0, i * gapX, height],
          stroke: "rgba(0,0,0,0.5)",
          strokeWidth: 1,
          dash: [4, 4],
          draggable: false,
        });
        gridGroup.add(lineX);
      }

      for (let j = 1; j <= yCnt; j++) {
        const lineY = new Konva.Line({
          points: [0, j * gapY, width, j * gapY],
          stroke: "rgba(0,255,0,0.3)",
          strokeWidth: 1,
          dash: [5, 5],
          draggable: false,
        });
        gridGroup.add(lineY);
      }
    }
  }

  function init() {
    console.log("init", controlRef);
    width = controlRef.value.clientWidth;
    height = controlRef.value.clientHeight;

    stage = new Konva.Stage({
      container: "control_container",
      width: width,
      height: height,
    });

    layer = new Konva.Layer();

    tr = new Konva.Transformer({
      nodes: [],
      // anchorDragBoundFunc: function (oldPos, newPos) {
      //   console.log("drg", newPos.x, newPos.y);
      //   // if (dist < 10) {
      //   //   return {
      //   //     ...newPos,
      //   //     x: width / 2,
      //   //   };
      //   // }
      //   return newPos;
      // },
      // boundBoxFunc: function (oldPos, newPos) {
      //   console.log("boundBoxFunc", newPos.x, newPos.y);
      //   return newPos;
      // },
    });

    layer.add(tr);

    // add the layer to the stage
    stage.add(layer);
    createRuler(editorConfig.grid);

    console.log("nodes", tr.nodes());
  }

  const controlStyle = reactive({
    zIndex: 1,
  });

  const renderStyle = reactive({
    zIndex: 2,
  });

  function activeCurrentShape() {
    if (tr) {
      currentShape.show();
      tr.nodes([currentShape]);
      tr.forceUpdate();
    }
  }

  function disactiveCurrentShape() {
    if (tr) {
      const nodes = tr.nodes();
      if (nodes.length) {
        tr.detach();
        tr.forceUpdate();
      }
    }
  }

  function destroyCurrentShape() {
    if (currentShape) {
      currentShape.hide();
      currentShape.destroy();
      console.log("destroyCurrentShape", currentShape);
    }
  }

  function changeToControlLayer() {
    controlStyle.zIndex = 2;
    renderStyle.zIndex = 1;
    activeCurrentShape();
  }

  function changeToRenderLayer(event) {
    // console.log("dbclick", event);
    if (stage) {
      const shape = stage.getIntersection(event);
      console.log("shape", shape, event);
      if (!shape) {
        disactiveCurrentShape();
        destroyCurrentShape();
        controlStyle.zIndex = 1;
        renderStyle.zIndex = 2;
      }
    }
  }

  onMounted(() => {
    init();
  });

  watch(
    () => editorConfig.refreshCompToShapeFlag,
    () => {
      if (layer && editorConfig.currentShapeOptions) {
        console.log("NNNNDDDD", editorConfig);
        editorConfig.currentShapeOptions.transform = getControlTransform(editorConfig.currentShapeOptions.styles);
        currentShapeTransform = editorConfig.currentShapeOptions.transform;
        parentsShapeTransform = getParentComponentTransforms(
          editorConfig.components,
          editorConfig.currentShapeOptions.id,
          true,
        );
        const shapeOptions = {
          ...currentShapeTransform,
          visible: true,
        };
        for (let i = 0; i < parentsShapeTransform.length; i++) {
          shapeOptions.left = shapeOptions.left + parentsShapeTransform[i].left;
          shapeOptions.right = shapeOptions.right + parentsShapeTransform[i].right;
        }
        createRect(shapeOptions);
        layer.add(currentShape);
        changeToControlLayer();
      }
    },
    {
      immediate: false,
      deep: false,
    },
  );
</script>

<style scoped lang="scss">
  .canvas_container {
    position: fixed;
    top: 3rem;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: calc(100vh - 5rem);
    background-color: rgba(255, 255, 255, 1);
  }

  .control_wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0px;
    left: 0px;
    z-index: 1;
  }

  .canvas_ctx_wraper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 2;
    background-color: rgba(255, 0, 0, 0.3);
  }
</style>
