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
  import {
    useCzmlMapDataConfigStore,
    MAP_DRAW_POINT,
    MAP_DRAW_SQUARE,
    MAP_DRAW_RECTANGLE,
    MAP_DRAW_POLYGON,
    MAP_DRAW_LINE,
    MAP_DRAW_CURVE,
  } from "@/stores/czmlMapDataConfig";

  import * as csMap from "./CommonDivCesium.ts";
  import { tiandituZh } from "@/utils/map/MapConst";

  const { editorConfig, setEditorCurrentShape, setEditorRefreshShape, setEditorCurrentParentComp } =
    useEditorConfigStore();

  const { czmlMapDataConfig, setCzmlMapCurrentData } = useCzmlMapDataConfigStore();

  let isStopCanvasPropagation = false;

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

  let keyDownCode = undefined;
  let lastDrawGraphic = null;
  const currentPopupOptions = csMap.MapDrawActionPopupOptions;

  const keyDownCb = (event) => {
    keyDownCode = event.keyCode;
  };

  const keyUpCb = (event) => {
    keyDownCode = undefined;
    // 按 Escape 或 Backspace 或 Delete 按钮取消标注
    if (event.keyCode === 27 || event.keyCode === 8 || event.keyCode === 46) {
      if (graphicLayer) {
      }
      // KeyP -> 80  KeyQ -> 81
    } else if (event.keyCode === 80 || event.keyCode === 81) {
      if (graphicLayer) {
      }
    }
  };

  function addGarphicLayerEvent() {
    const graphicLayer = csMap.graphicLayer;
    if (graphicLayer) {
      // 在layer上绑定监听事件
      graphicLayer.on(mars3d.EventType.click, function (event) {
        console.log("监听layer，单击了矢量对象", event);
      });

      // 绑定layer标绘相关事件监听(可以自行加相关代码实现业务需求，此处主要做示例)
      graphicLayer.on(mars3d.EventType.drawStart, function (e) {
        console.log("开始绘制", e);
        lastDrawGraphic = null;
      });
      graphicLayer.on(mars3d.EventType.drawAddPoint, function (e) {
        console.log("绘制过程中增加了点", e);
      });
      graphicLayer.on(mars3d.EventType.drawRemovePoint, function (e) {
        console.log("绘制过程中删除了点", e);
      });
      graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
        console.log("创建完成", e);
        lastDrawGraphic = e.graphic;
        let positions = e.positions;

        if (positions && positions.length) {
          showDrawActionPopup(positions[positions.length - 1]);
        } else if (e.drawType == "point") {
          positions = e.graphic.positions;
          if (positions && positions.length) {
            showDrawActionPopup(positions[positions.length - 1]);
          }
        }
        // graphicLayer.stopDraw()
        // graphicLayer.startDraw(mars3d.Util.clone(e.graphic.options)) // 连续标绘时，可以代替isContinued
      });

      graphicLayer.on(mars3d.EventType.editStart, function (e) {
        console.log("开始编辑", e);
        // graphic.editing?.hasRestore();
        // graphic.editing?.hasRevoke();
      });
      graphicLayer.on(mars3d.EventType.editMovePoint, function (e) {
        console.log("编辑修改了点", e);
        showDrawActionPopup(e.cartesian);
      });
      graphicLayer.on(mars3d.EventType.editAddPoint, function (e) {
        console.log("编辑新增了点", e);
      });
      graphicLayer.on(mars3d.EventType.editRemovePoint, function (e) {
        console.log("编辑删除了点", e);
        if (e.sourceTarget && e.sourceTarget.position) {
          showDrawActionPopup(e.sourceTarget.position);
        }
      });
      graphicLayer.on(mars3d.EventType.editStop, function (e) {
        console.log("停止编辑", e);
      });
      graphicLayer.on(mars3d.EventType.removeGraphic, function (e) {
        console.log("删除了对象", e);
        csMap.hiddenVuePopup(currentPopupOptions);
      });
    }
  }

  function showDrawActionPopup(cartesian) {
    const pos = csMap.csBaseMap.cartesian3ToWgs84(cartesian);
    currentPopupOptions.position = [pos.longitude, pos.latitude, 0];
    console.log("showDrawActionPopup", cartesian, pos);
    csMap.addVuePopup(currentPopupOptions);
    csMap.showVuePopup(currentPopupOptions);
  }

  function cancelDrawAction() {
    if (csMap.graphicLayer) {
      if (csMap.graphicLayer.isDrawing) {
        csMap.graphicLayer.clearDrawing();
      }
      if (csMap.graphicLayer.isEditing) {
        csMap.graphicLayer.stopEditing();
      }
    }

    csMap.hiddenVuePopup(currentPopupOptions);
    csMap.removeVuePopup(currentPopupOptions);

    if (lastDrawGraphic) {
      csMap.removeGraphic(lastDrawGraphic);
      lastDrawGraphic = null;
    }
    isStopCanvasPropagation = false;
  }

  function mapDrawActionHd(drawAction: any) {
    isStopCanvasPropagation = true;
    const action = drawAction.action;
    if (action == MAP_DRAW_POINT) {
      csMap.drawPoint();
    } else if (action == MAP_DRAW_POLYGON) {
      csMap.drawRectangle();
    }
  }

  watch(
    () => czmlMapDataConfig.currentActionRefresh,
    () => {
      if (czmlMapDataConfig.currentActionRefresh) {
        const currentDrawAction = czmlMapDataConfig.currentDrawAction;
        console.log("通过地图获取值动作为", currentDrawAction);
        mapDrawActionHd(currentDrawAction);
      }
    },
    {
      deep: false,
      immediate: false,
    },
  );

  watch(
    () => czmlMapDataConfig.isConfirmDrawDataRefresh,
    () => {
      if (czmlMapDataConfig.isConfirmDrawDataRefresh) {
        if (czmlMapDataConfig.isConfirmDrawData) {
          // 确认数据 将数据设置到store
          if (lastDrawGraphic) {
            const sourceId = czmlMapDataConfig.currentDrawAction.id;

            // const geojsonData = lastDrawGraphic.toJSON(); 这是一种方法，已经转换了。

            console.log("lastDrawGraphic", lastDrawGraphic);

            let positions = null;
            let coordinates = null;
            if (lastDrawGraphic instanceof mars3d.graphic.PointEntity || lastDrawGraphic.type === "point") {
              positions = mars3d.Util.clone(lastDrawGraphic.positions);
              if (positions && positions.length == 1) {
                positions = positions[0];
                if (positions) {
                  const cartesian = [positions.x, positions.y, positions.z];
                  const pos = csMap.csBaseMap.cartesian3ToWgs84(positions);
                  const degrees = [pos.longitude, pos.latitude, pos.height];
                  const radians = [pos.longitudeRadians, pos.latitudeRadians, pos.height];
                  coordinates = {
                    id: sourceId,
                    cartesian,
                    degrees,
                    radians,
                  };
                }
              }
            } else if (
              lastDrawGraphic instanceof mars3d.graphic.RectangleEntity ||
              lastDrawGraphic.type === "rectangle"
            ) {
              positions = mars3d.Util.clone(lastDrawGraphic.outlineCoordinates);
            } else if (lastDrawGraphic instanceof mars3d.graphic.CircleEntity || lastDrawGraphic.type === "circle") {
              positions = mars3d.Util.clone(lastDrawGraphic.outlineCoordinates);
            } else if (lastDrawGraphic instanceof mars3d.graphic.PolygonEntity || lastDrawGraphic.type === "polygon") {
              positions = mars3d.Util.clone(lastDrawGraphic.positions);
              if (positions && positions.length) {
                positions.push(positions[0]);
              }
            }

            // noAlt
            // if (coordinates && coordinates.length) {
            //   for (let i = 0; i < coordinates.length; i++) {
            //     coordinates[i] = [coordinates[i][0], coordinates[i][1]];
            //   }
            // }

            console.log("coordinates", coordinates);

            setCzmlMapCurrentData(coordinates);
            cancelDrawAction();
          }
          isStopCanvasPropagation = false;
        } else {
          // 清除不要点
          isStopCanvasPropagation = false;
          cancelDrawAction();
        }
      }
    },
    {
      deep: false,
      immediate: false,
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
    if (hasClickedCzmlObj || isStopCanvasPropagation || lastDrawGraphic) {
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

    setTimeout(() => {
      csMap.addKeyDownEvent(keyDownCb, keyUpCb);
      addGarphicLayerEvent();
    }, 200);
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
