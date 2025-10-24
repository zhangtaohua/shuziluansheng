import { reactive } from "vue";
import { defineStore } from "pinia";
import Storage from "@/utils/storage/storage";

import pointSvg from "@/assets/images/icons/mapdrawpoint.svg";

export const MAP_DRAW_TEXT = "Text";
export const MAP_DRAW_POINT = "Point";
export const MAP_DRAW_SQUARE = "Square";
export const MAP_DRAW_RECTANGLE = "Rectangle";
export const MAP_DRAW_POLYGON = "Polygon";
export const MAP_DRAW_LINE = "LineString";
export const MAP_DRAW_CURVE = "CurveLineString";
export const MAP_DRAW_CIRCLE = "Circle";
export const MAP_DRAW_GEOMETRY_CIRCLE = MAP_DRAW_CIRCLE;
export const MAP_DRAW_GEODESIC_CIRCLE = "GeodesicCircle";
export const MAP_DRAW_GEOMETRYCOLLECTION = "GeometryCollection";
export const MAP_DRAW_UPLOAD_IMAGE = "GeoUploadImage";

export const MAP_DRAW_CLEAR = "Clear";
export const MAP_DRAW_OBJ_SELECT = "OBJSelect";

export const MAP_MEASURE_DISTANCE = "Distance";
export const MAP_MEASURE_AREA = "Area";
export const MAP_SELECT_DRAW_MODE = "SetDrawMode";

export const MAP_SHOW_PROPS = "ShowProps";
export const MAP_HIDDEN_PROPS = "HiddenProps";

export const MapDrawPointAction = {
  id: "interaction_1",
  image: pointSvg,
  name: "点",
  tipEn: "click map get a point value",
  tipZh: "点击地图获取点值",
  action: MAP_DRAW_POINT,
  enable: true,
  useIcon: true,
};

export const globalCzmlMapData = {
  drawData: null,
};

export const useCzmlMapDataConfigStore = defineStore("useCzmlMapDataConfigStore", () => {
  const czmlMapDataConfig = reactive({
    currentDrawAction: null,
    currentActionRefresh: 0,
    currentDataId: "",
    currentDataRefresh: 0,
    isConfirmDrawData: false,
    isConfirmDrawDataRefresh: 0,
  });

  function setCzmlMapCurrentAction(act: any) {
    czmlMapDataConfig.currentDrawAction = act;
    if (act) {
      czmlMapDataConfig.currentActionRefresh = czmlMapDataConfig.currentActionRefresh + 1;
    } else {
      czmlMapDataConfig.currentActionRefresh = 0;
    }
  }

  function setCzmlMapCurrentData(data: any) {
    if (data) {
      czmlMapDataConfig.currentDataId = data.id;
      czmlMapDataConfig.currentDataRefresh = czmlMapDataConfig.currentDataRefresh + 1;
    } else {
      czmlMapDataConfig.currentDataId = "";
      czmlMapDataConfig.currentDataRefresh = 0;
    }
    globalCzmlMapData.drawData = data;
    czmlMapDataConfig.currentDrawAction = null;
  }

  function setCzmlMapIsConfirmDrawData(isConfirm: boolean) {
    czmlMapDataConfig.isConfirmDrawData = isConfirm;
    czmlMapDataConfig.isConfirmDrawDataRefresh = czmlMapDataConfig.isConfirmDrawDataRefresh + 1;
  }

  return {
    czmlMapDataConfig,
    setCzmlMapCurrentAction,
    setCzmlMapCurrentData,
    setCzmlMapIsConfirmDrawData,
  };
});
