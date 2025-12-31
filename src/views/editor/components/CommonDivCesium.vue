<template>
  <CommonWraper :vNodeData="props.vNodeData">
    <div class="row_nw_ce_ce" :class="divClassNames" :style="divStyles">
      <div class="row_nw_ce_ce cesium_map_container" :id="props.vNodeData.id" @click="setEditorCurrentCompHd"></div>
      <div v-if="isControlMaping" class="row_nw_ce_ce cesium_map_close">
        <el-icon
          color="rgba(15, 55, 175, 1)"
          size="1.5rem"
          class="row_nw_ce_ce cesium_map_closeicon"
          @click="exitMapControl"
        >
          <CircleCloseFilled />
        </el-icon>
      </div>
    </div>
  </CommonWraper>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted, nextTick, onUnmounted } from "vue";
  import { useEditorComponentstore, globalEditor } from "@/stores/editorConfig";
  import {
    globalCzmlMapData,
    useCzmlMapDataConfigStore,
    MAP_DRAW_POINT,
    MAP_DRAW_LINE,
    MAP_DRAW_FREELINE,
    MAP_DRAW_CURVE,
    MAP_DRAW_SQUARE,
    MAP_DRAW_RECTANGLE,
    MAP_DRAW_POLYGON,
    MAP_DRAW_CIRCLE,
  } from "@/stores/czmlMapDataConfig";

  import * as csMap from "./CommonDivCesium.ts";
  import { tiandituZh } from "@/utils/map/MapConst";

  const { editorComponents, setEditorCurrentComp, setEditorRefreshCompToTransFlag } = useEditorComponentstore();

  const { czmlMapDataConfig, setCzmlMapCurrentData } = useCzmlMapDataConfigStore();

  let isStopCanvasPropagation = false;
  const isControlMaping = ref(false);

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

  function setEditorCurrentCompHd() {
    if (props.vNodeData) {
      setEditorCurrentComp(props.vNodeData);
      setEditorRefreshCompToTransFlag();
    }
  }

  function exitMapControl() {
    isControlMaping.value = false;
  }

  let lastDrawGraphic = null;
  let keyDownCode = undefined;
  const currentPopupOptions = csMap.MapDrawActionPopupOptions;

  const keyDownCb = (event) => {
    if (csMap) {
      csMap.keyDownCode.code = event.keyCode;
      keyDownCode = event.keyCode;
    }
  };

  const keyUpCb = (event) => {
    if (csMap) {
      csMap.keyDownCode.code = undefined;
      keyDownCode = undefined;
    }
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
    cancelDrawAction();
    const action = drawAction.action;
    if (action == MAP_DRAW_POINT) {
      csMap.drawPoint();
    } else if (action == MAP_DRAW_LINE) {
      csMap.drawPolyline();
    } else if (action == MAP_DRAW_FREELINE) {
      csMap.drawBrushLine();
    } else if (action == MAP_DRAW_CURVE) {
      csMap.drawCurve();
    } else if (action == MAP_DRAW_RECTANGLE) {
      csMap.drawRectangle();
    } else if (action == MAP_DRAW_POLYGON) {
      csMap.drawPolygon();
    } else if (action == MAP_DRAW_CIRCLE) {
      csMap.drawEllipse();
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
              lastDrawGraphic instanceof mars3d.graphic.PolylineEntity ||
              lastDrawGraphic.type === "polyline" ||
              lastDrawGraphic instanceof mars3d.graphic.BrushLineEntity ||
              lastDrawGraphic.type === "brushLine" ||
              lastDrawGraphic instanceof mars3d.graphic.CurveEntity ||
              lastDrawGraphic.type === "curve"
            ) {
              positions = mars3d.Util.clone(lastDrawGraphic.positionsShow);
              if (positions && positions.length) {
                coordinates = {
                  id: sourceId,
                  coordinates: positions,
                };
              } else {
                coordinates = {
                  id: sourceId,
                  coordinates: [],
                };
              }
            } else if (
              lastDrawGraphic instanceof mars3d.graphic.RectangleEntity ||
              lastDrawGraphic.type === "rectangle"
            ) {
              // positions = mars3d.Util.clone(lastDrawGraphic.outlineCoordinates); // 这个就可以直接拿到经纬度这些了
              positions = mars3d.Util.clone(lastDrawGraphic.outlinePositions);
              coordinates = {
                id: sourceId,
                coordinates: positions,
              };
            } else if (lastDrawGraphic instanceof mars3d.graphic.CircleEntity || lastDrawGraphic.type === "circle") {
              positions = mars3d.Util.clone(lastDrawGraphic.outlinePositions);
              coordinates = {
                id: sourceId,
                coordinates: positions,
              };
            } else if (lastDrawGraphic instanceof mars3d.graphic.PolygonEntity || lastDrawGraphic.type === "polygon") {
              // positions = mars3d.Util.clone(lastDrawGraphic.positions);
              // if (positions && positions.length) {
              //   positions.push(positions[0]);
              // }
              positions = mars3d.Util.clone(lastDrawGraphic.outlinePositions);
              coordinates = {
                id: sourceId,
                coordinates: positions,
              };
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

  watch(
    [() => czmlMapDataConfig.currentViewDataRefresh, () => czmlMapDataConfig.isViewDrawDataPath],
    () => {
      if (czmlMapDataConfig.currentViewDataRefresh) {
        const opts = globalCzmlMapData.viewDrawData;
        const isViewDrawDataPath = czmlMapDataConfig.isViewDrawDataPath;
        // 显示
        if (isViewDrawDataPath) {
          if (opts.type == "point") {
            csMap.addPathViewBillboradPointGraphic(opts.data);
          } else if (opts.type == "polyline") {
            csMap.addPathViewLineraphic(opts.data);
          } else if (opts.type == "mutilpolylines") {
            csMap.addMutilPathViewLineraphic(opts.data);
          }
        } else {
          csMap.removePathViewAllGraphics();
        }
      } else {
        csMap.removePathViewAllGraphics();
      }
    },
    {
      deep: false,
      immediate: false,
    },
  );

  watch(
    () => props.vNodeData.children,
    () => {
      console.log("has children", props.vNodeData.children);
      const children = props.vNodeData.children;
      if (children) {
        const ckeys = Object.keys(children);
        for (let i = 0; i < ckeys.length; i++) {
          const ckey = ckeys[i];
          const cvalue = children[ckey];
          if (csMap && cvalue && cvalue.type == "czml") {
            csMap.addCzmlGraphicLayer(cvalue);
          }
        }
      }
    },
    {
      deep: false,
      immediate: true,
    },
  );
  const mapClickHandler = (event) => {
    console.log("map 鼠标单击", event);
    if (event.czmObject) {
      // event.stopPropagation();
      isControlMaping.value = true;
      const layer = event.layer;
      if (layer instanceof mars3d.layer.CzmlLayer) {
        const options = layer.options;
        const id = options.id;
        if (id) {
          const layerObj = csMap.getCzmlGraphicLayerById(id);
          if (layerObj) {
            setEditorCurrentComp(layerObj.options);
          }
        }
      }
    }
    // else {
    //   isControlMaping.value = false;
    // }
  };

  const mapCanvasClickHandler = (event) => {
    if (isControlMaping.value || isStopCanvasPropagation || lastDrawGraphic) {
      event.stopPropagation();
      event.preventDefault(); // Prevent default behavior, like selecting credit text
    }
  };

  const addMapEventHd = () => {
    if (csMap.map) {
      csMap.map.on(mars3d.EventType.click, mapClickHandler);
      csMap.viewer.canvas.addEventListener("click", mapCanvasClickHandler);
      csMap.viewer.canvas.addEventListener("dblclick", mapCanvasClickHandler);
    }
  };

  const removeMapEventHd = () => {
    if (csMap.map) {
      csMap.map.off(mars3d.EventType.click, mapClickHandler);
      csMap.viewer.canvas.removeEventListener("click", mapCanvasClickHandler);
      csMap.viewer.canvas.removeEventListener("dblclick", mapCanvasClickHandler);
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

<style scoped>
  .active_container {
    outline: 1px solid rgba(235, 3, 3, 1);
    box-shadow: 0 0 10px rgba(235, 3, 3, 0.5);
  }

  .cesium_map_container {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .cesium_map_close {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 999;
  }

  .props_it_acticon2 {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
</style>
