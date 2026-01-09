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

export const czmlChildProps = {
  billboard: {
    id: "billboard",
    name: "billboard",
    labelZh: "广告牌",
    labelEn: "Billboard",
    type: "billboard",
    icon: "",
    $ref: "Billboard.json",
    description:
      "A billboard, or viewport-aligned image, sometimes called a marker. The billboard is positioned in the scene by the `position` property.",
  },
  box: {
    id: "box",
    name: "box",
    labelZh: "盒子",
    labelEn: "Box",
    type: "box",
    icon: "",
    $ref: "Box.json",
    description:
      "A box, which is a closed rectangular cuboid. The box is positioned and oriented using the `position` and `orientation` properties.",
  },
  corridor: {
    id: "corridor",
    name: "corridor",
    labelZh: "走廊",
    labelEn: "Corridor",
    type: "corridor",
    icon: "",
    $ref: "Corridor.json",
    description: "A corridor, which is a shape defined by a centerline and width.",
  },
  cylinder: {
    id: "cylinder",
    name: "cylinder",
    labelZh: "圆柱体",
    labelEn: "Cylinder",
    type: "cylinder",
    icon: "",
    $ref: "Cylinder.json",
    description:
      "A cylinder, truncated cone, or cone defined by a length, top radius, and bottom radius. The cylinder is positioned and oriented using the `position` and `orientation` properties.",
  },
  ellipse: {
    id: "ellipse",
    name: "ellipse",
    labelZh: "椭圆",
    labelEn: "Ellipse",
    type: "ellipse",
    icon: "",
    $ref: "Ellipse.json",
    description:
      "An ellipse, which is a closed curve on the surface of the Earth. The ellipse is positioned using the `position` property.",
  },
  ellipsoid: {
    id: "ellipsoid",
    name: "ellipsoid",
    labelZh: "椭球体",
    labelEn: "Ellipsoid",
    type: "ellipsoid",
    icon: "",
    $ref: "Ellipsoid.json",
    description:
      "An ellipsoid, which is a closed quadric surface that is a three-dimensional analogue of an ellipse. The ellipsoid is positioned and oriented using the `position` and `orientation` properties.",
  },
  label: {
    id: "label",
    name: "label",
    labelZh: "标签",
    labelEn: "Label",
    type: "label",
    icon: "",
    $ref: "Label.json",
    description: "A string of text. The label is positioned in the scene by the `position` property.",
  },
  model: {
    id: "model",
    name: "model",
    labelZh: "模型",
    labelEn: "Model",
    type: "model",
    icon: "",
    $ref: "Model.json",
    description: "A 3D model. The model is positioned and oriented using the `position` and `orientation` properties.",
  },
  path: {
    id: "path",
    name: "path",
    labelZh: "路径",
    labelEn: "Path",
    type: "path",
    icon: "",
    $ref: "Path.json",
    description:
      "A path, which is a polyline defined by the motion of an object over time. The possible vertices of the path are specified by the `position` property.",
  },
  point: {
    id: "point",
    name: "point",
    labelZh: "点",
    labelEn: "Point",
    type: "point",
    icon: "",
    $ref: "Point.json",
    description:
      "A point, or viewport-aligned circle. The point is positioned in the scene by the `position` property.",
  },
  polygon: {
    id: "polygon",
    name: "polygon",
    labelZh: "多边形",
    labelEn: "Polygon",
    type: "polygon",
    icon: "",
    $ref: "Polygon.json",
    description: "A polygon, which is a closed figure on the surface of the Earth.",
  },
  polyline: {
    id: "polyline",
    name: "polyline",
    labelZh: "折线",
    labelEn: "Polyline",
    type: "polyline",
    icon: "",
    $ref: "Polyline.json",
    description: "A polyline, which is a line in the scene composed of multiple segments.",
  },
  polylineVolume: {
    id: "polylineVolume",
    name: "polylineVolume",
    labelZh: "折线体",
    labelEn: "PolylineVolume",
    type: "polylineVolume",
    icon: "",
    $ref: "PolylineVolume.json",
    description: "A polyline with a volume, defined as a 2D shape extruded along a polyline.",
  },
  rectangle: {
    id: "rectangle",
    name: "rectangle",
    labelZh: "矩形",
    labelEn: "Rectangle",
    type: "rectangle",
    icon: "",
    $ref: "Rectangle.json",
    description:
      "A cartographic rectangle, which conforms to the curvature of the globe and can be placed along the surface or at altitude.",
  },
  tileset: {
    id: "tileset",
    name: "tileset",
    labelZh: "3D 数据集",
    labelEn: "Tileset",
    type: "tileset",
    icon: "",
    $ref: "Tileset.json",
    description: "A 3D Tiles tileset.",
  },
  wall: {
    id: "wall",
    name: "wall",
    labelZh: "墙",
    labelEn: "Wall",
    type: "wall",
    icon: "",
    $ref: "Wall.json",
    description:
      "A two-dimensional wall which conforms to the curvature of the globe and can be placed along the surface or at altitude.",
  },
  // agi_conicSensor: {
  //   id: "agi_conicSensor",
  //   name: "agi_conicSensor",
  //   labelZh: "圆锥传感器",
  //   labelEn: "AGI ConicSensor",
  //   type: "agi_conicSensor",
  //   icon: "",
  //   $ref: "Extensions/AGI/ConicSensor.json",
  //   description:
  //     "A conical sensor volume taking into account occlusion of an ellipsoid, i.e., the globe. The sensor is positioned and oriented using the `position` and `orientation` properties.",
  // },
  // agi_customPatternSensor: {
  //   id: "agi_customPatternSensor",
  //   name: "agi_customPatternSensor",
  //   labelZh: "自定义模式传感器",
  //   labelEn: "AGI CustomPatternSensor",
  //   type: "agi_customPatternSensor",
  //   icon: "",
  //   $ref: "Extensions/AGI/CustomPatternSensor.json",
  //   description:
  //     "A custom sensor volume taking into account occlusion of an ellipsoid, i.e., the globe. The sensor is positioned and oriented using the `position` and `orientation` properties.",
  // },
  // agi_rectangularSensor: {
  //   id: "agi_rectangularSensor",
  //   name: "agi_rectangularSensor",
  //   labelZh: "矩形传感器",
  //   labelEn: "AGI RectangularSensor",
  //   type: "agi_rectangularSensor",
  //   icon: "",
  //   $ref: "Extensions/AGI/RectangularSensor.json",
  //   description:
  //     "A rectangular pyramid sensor volume taking into account occlusion of an ellipsoid, i.e., the globe. The sensor is positioned and oriented using the `position` and `orientation` properties.",
  // },
  // agi_fan: {
  //   id: "agi_fan",
  //   name: "agi_fan",
  //   labelZh: "扇形",
  //   labelEn: "AGI Fan",
  //   type: "agi_fan",
  //   icon: "",
  //   $ref: "Extensions/AGI/Fan.json",
  //   description:
  //     "Defines a fan, which starts at a point or apex and extends in a specified list of directions from the apex. Each pair of directions forms a face of the fan extending to the specified radius. The fan is positioned and oriented using the `position` and `orientation` properties.",
  // },
  // agi_vector: {
  //   id: "agi_vector",
  //   name: "agi_vector",
  //   labelZh: "向量",
  //   labelEn: "AGI Vector",
  //   type: "agi_vector",
  //   icon: "",
  //   $ref: "Extensions/AGI/Vector.json",
  //   description:
  //     "Defines a graphical vector that originates at the `position` property and extends in the provided direction for the provided length. The vector is positioned using the `position` property.",
  // },
};

export const globalCzmlMapData = {
  drawData: null,
  viewDrawData: null,
  czmlDatas: new Map(),
  currentCzmlData: null,
  currentCzmlChildProp: null,
};

export const useCzmlMapDataConfigStore = defineStore("useCzmlMapDataConfigStore", () => {
  const czmlMapDataConfig = reactive({
    currentDrawAction: null,
    currentActionRefresh: 0,
    currentDataId: "",
    currentDataRefresh: 0,
    currentViewDataId: "",
    currentViewDataRefresh: 0,
    isViewDrawDataPath: true,
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

  function setCzmlMapCurrentDrawData(data: any) {
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

  // 这个是用来回绘制的地图路径数据的.
  function setCzmlMapViewDrawData(data: any, isForceRefresh = false) {
    if (data) {
      czmlMapDataConfig.currentViewDataRefresh = czmlMapDataConfig.currentViewDataRefresh + 1;
    } else {
      czmlMapDataConfig.currentViewDataRefresh = 0;
      if (isForceRefresh) {
        czmlMapDataConfig.currentViewDataRefresh = czmlMapDataConfig.currentViewDataRefresh + 1;
      }
    }

    globalCzmlMapData.viewDrawData = data;
  }

  // 整体控制显示的。
  function setCzmlIsViewDrawDataPath(isView: boolean) {
    czmlMapDataConfig.isViewDrawDataPath = isView;
  }

  return {
    czmlMapDataConfig,
    setCzmlMapCurrentAction,
    setCzmlMapCurrentDrawData,
    setCzmlMapIsConfirmDrawData,
    setCzmlMapViewDrawData,
    setCzmlIsViewDrawDataPath,
  };
});

export const useCzmlStateStore = defineStore("useCzmlStateStore", () => {
  const czmlState = reactive({
    currentCzmlState: "",
    czmlDatasRefresh: 0,
    currentCzmlDataId: "",
    currentCzmlDataRefresh: 0,
    currentCzmlChildPropId: "",
    currentCzmlChildPropRefresh: 0,
  });

  function setCzmlCurrentCzmlState(state: string) {
    czmlState.currentCzmlState = state;
  }

  function setCzmlDatas(data: any) {
    if (data) {
      globalCzmlMapData.czmlDatas.set(data.id, data);
      czmlState.czmlDatasRefresh++;
    }
  }

  function resetCzmlDatas() {
    globalCzmlMapData.czmlDatas.clear();
    czmlState.czmlDatasRefresh = 0;
  }

  function removeCzmlDatas(data: any) {
    if (data) {
      globalCzmlMapData.czmlDatas.delete(data.id);
      czmlState.czmlDatasRefresh++;
    }
  }

  function setCurrentCzmlData(data: any) {
    if (data) {
      czmlState.currentCzmlDataId = data.id;
      globalCzmlMapData.currentCzmlData = data;
      czmlState.currentCzmlDataRefresh++;
    } else {
      czmlState.currentCzmlDataId = "";
      czmlState.currentCzmlDataRefresh = 0;
    }
  }

  function setCurrentCzmlChildProp(data: any) {
    if (data) {
      czmlState.currentCzmlChildPropId = data.id;
      globalCzmlMapData.currentCzmlChildProp = data;
      czmlState.currentCzmlChildPropRefresh++;
    } else {
      czmlState.currentCzmlChildPropId = "";
      czmlState.currentCzmlChildPropRefresh = 0;
    }
  }

  return {
    czmlState,
    setCzmlDatas,
    resetCzmlDatas,
    removeCzmlDatas,
    setCzmlCurrentCzmlState,
    setCurrentCzmlData,
    setCurrentCzmlChildProp,
  };
});

export const czmlPropNameToComponent = {
  clock: {},
  billboard: "Billboard",
  box: "Box",
  corridor: "Corridor",
  cylinder: "Cylinder",
  ellipse: "Ellipse",
  ellipsoid: "Ellipsoid",
  label: "Label",
  model: "Model",
  path: "Path",
  point: "Point",
  polygon: "Polygon",
  polyline: "Polyline",
  polylineVolume: "PolylineVolume",
  rectangle: "Rectangle",
  tileset: "Tileset",
  wall: "Wall",
};
