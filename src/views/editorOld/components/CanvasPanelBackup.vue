<template>
  <div class="row_nw_ce_ce canvas_container">
    <div
      ref="controlRef"
      id="control_container"
      class="control_wrapper"
      :style="controlStyle"
      @dblclick="changeToRenderLayer"
    ></div>
    <div class="canvas_ctx_wraper" :style="renderStyle" @dblclick="changeLayer">
      <div class="row_nw_ce_ce" :style="echartItemStyle">
        <Bar001></Bar001>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted } from "vue";
  import Konva from "konva";
  import { useSystemConfigStore } from "@/stores/systemConfig";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";
  import Bar001 from "@/views/echart/components/Bar001.vue";

  const { systemConfig } = useSystemConfigStore();
  const { editorConfig } = useEditorConfigStore();

  const controlRef = ref(null);
  let width = 0;
  let height = 0;

  let stage = null;
  let layer = null;
  let tr = null;
  let currentShape = null;
  let gridGroup = null;

  const echartItemStyle = reactive({
    position: "absolute",
    top: "10px",
    nTop: 10,
    left: "10px",
    nLeft: 10,
    width: "500px",
    nWidth: 500,
    height: "300px",
    nHeight: 300,
    backgroundColor: "rgba(16, 42, 88, 0.5)",
    border: "1px solid rgba(0, 240, 255, 0.4)",
    borderRadius: "0.75rem",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 1.875rem rgba(0, 114, 255, 0.3)",
  });

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
    const rect = new Konva.Rect({
      x: 0,
      y: height / 2,
      width: 300,
      height: 300,
      offsetX: 200,
      fill: "rgba(255, 0, 0, 0.25)",
      stroke: "black",
      strokeWidth: 4,
      draggable: true,
      ...options,
    });
    rect.on("transform", function (event) {
      console.log("transform", createRect);
      rect.setAttrs({
        width: rect.width() * rect.scaleX(),
        scaleX: 1,
      });
    });

    rect.on("dragmove", function (event) {
      console.log("dragmove", event);
      const { x, y } = event.target.attrs;
      const { gapX, gapY } = editorConfig.grid;
      const newX = getPosXY(x, gapX);
      const newY = getPosXY(y, gapY);
      echartItemStyle.nLeft = newX;
      echartItemStyle.left = newX + "px";

      echartItemStyle.nTop = newY;
      echartItemStyle.top = newY + "px";
      rect.setAttrs({
        x: newX,
        y: newY,
      });
    });

    // textNode.on("dblclick dbltap", () => {
    //   textNode.hide();
    //   tr.hide();
    // });
    return rect;
  }

  //   stage.on('dblclick dbltap', function () {
  //   isPaint = false;
  // });

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

    // create our shape
    currentShape = createRect({
      x: echartItemStyle.nLeft,
      y: echartItemStyle.nTop,
      width: echartItemStyle.nWidth,
      height: echartItemStyle.nHeight,
      visible: false,
    });

    tr = new Konva.Transformer({
      nodes: [],
      anchorDragBoundFunc: function (oldPos, newPos) {
        console.log("drg", newPos.x, newPos.y);
        // if (dist < 10) {
        //   return {
        //     ...newPos,
        //     x: width / 2,
        //   };
        // }
        return newPos;
      },
      boundBoxFunc: function (oldPos, newPos) {
        console.log("boundBoxFunc", newPos.x, newPos.y);
        return newPos;
      },
    });

    layer.add(currentShape);
    layer.add(tr);

    // add the layer to the stage
    stage.add(layer);
    createRuler(editorConfig.grid);
  }

  const controlStyle = reactive({
    zIndex: 1,
  });

  const renderStyle = reactive({
    zIndex: 2,
  });

  function activeShape() {
    if (tr) {
      currentShape.show();
      tr.nodes([currentShape]);
      tr.forceUpdate();
    }
  }

  function disactiveShape() {
    if (tr) {
      tr.detach();
      tr.forceUpdate();
    }
  }

  function changeLayer() {
    console.log("dbclick");
    controlStyle.zIndex = 2;
    renderStyle.zIndex = 1;
    activeShape();
  }

  function changeToRenderLayer(event) {
    console.log("dbclick", event);
    if (stage) {
      const shape = stage.getIntersection(event);
      console.log("shape", shape);
      if (!shape) {
        disactiveShape();
        controlStyle.zIndex = 1;
        renderStyle.zIndex = 2;
      }
    }
  }

  onMounted(() => {
    init();
  });
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
