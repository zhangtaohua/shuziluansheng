import { reactive } from "vue";
import { defineStore } from "pinia";
import Storage from "@/utils/storage/storage";

import mapPointSvg from "@/assets/images/icons/mapDrawpoint.svg";
import mapLineSvg from "@/assets/images/icons/mapDrawline.svg";
import mapSmoothLineSvg from "@/assets/images/icons/mapDrawSmoothLine.svg";
import mapBezierLineSvg from "@/assets/images/icons/mapDrawBezierCurve.svg";
import mapRectSvg from "@/assets/images/icons/mapDrawRect.svg";
import mapPolygonSvg from "@/assets/images/icons/mapDrawPolygon.svg";
import mapCircleSvg from "@/assets/images/icons/mapDrawCircle.svg";

export const MAP_DRAW_TEXT = "Text";
export const MAP_DRAW_POINT = "Point";
export const MAP_DRAW_SQUARE = "Square";
export const MAP_DRAW_RECTANGLE = "Rectangle";
export const MAP_DRAW_POLYGON = "Polygon";
export const MAP_DRAW_LINE = "LineString";
export const MAP_DRAW_FREELINE = "FreeLineString";
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
  image: mapPointSvg,
  name: "点",
  tipEn: "click map get a point value。",
  tipZh: "点击地图获取点值",
  action: MAP_DRAW_POINT,
  enable: true,
  useIcon: true,
};

export const MapDrawLineAction = {
  id: "interaction_2",
  image: mapLineSvg,
  name: "折线",
  tipEn: "Multiple points are obtained by drawing polylines on a map.",
  tipZh: "通过地图绘制折线获得多个点",
  action: MAP_DRAW_LINE,
  enable: true,
  useIcon: true,
};

export const MapDrawSmoothLineAction = {
  id: "interaction_3",
  image: mapSmoothLineSvg,
  name: "自由线",
  tipEn: "Multiple points can be obtained by freely drawing on a map.",
  tipZh: "通过地图绘制自由线获得多个点",
  action: MAP_DRAW_FREELINE,
  enable: true,
  useIcon: true,
};

export const MapDrawBezierLineAction = {
  id: "interaction_4",
  image: mapBezierLineSvg,
  name: "曲线",
  tipEn: "Multiple points can be obtained by Bézier curve drawing on a map.",
  tipZh: "通过地图绘制贝塞尔曲线获得多个点",
  action: MAP_DRAW_CURVE,
  enable: true,
  useIcon: true,
};

export const MapDrawRectangleAction = {
  id: "interaction_5",
  image: mapRectSvg,
  name: "矩形",
  tipEn: "Multiple points can be obtained by rectangle drawing on a map.",
  tipZh: "通过地图绘制矩形获得多个点",
  action: MAP_DRAW_RECTANGLE,
  enable: true,
  useIcon: true,
};

export const MapDrawPolygonAction = {
  id: "interaction_6",
  image: mapPolygonSvg,
  name: "多边形",
  tipEn: "Multiple points can be obtained by polygon drawing on a map.",
  tipZh: "通过地图绘制多边形获得多个点",
  action: MAP_DRAW_POLYGON,
  enable: true,
  useIcon: true,
};

export const MapDrawCircleAction = {
  id: "interaction_7",
  image: mapCircleSvg,
  name: "圆形",
  tipEn: "Multiple points can be obtained by circle drawing on a map.",
  tipZh: "通过地图绘制圆形获得多个点",
  action: MAP_DRAW_CIRCLE,
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
