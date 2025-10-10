import CsBaseLayersMap from "@/utils/map/cesium/baseLayers";
import { csOnlySphereOptions } from "@/utils/map/cesium/csConstant";

import CsVueNodePopup from "@/utils/map/cesium/vueNodePopupLayers";

export let csBaseMap = null;
export let map = null;
export let viewer = null;

export let graphicLayer = null;
export const czmlGraphicLayerMap = new Map();
export const eventCanvasHandler = null;
export const eventTarget = new mars3d.BaseClass();
export let keyDownCode = undefined;

export let vuePopupIns = null;

let isEntityGraphic = true;

export function changeDrawEntity(value) {
  isEntityGraphic = value;
}

export function initMap(container: string) {
  csBaseMap = new CsBaseLayersMap(container, csOnlySphereOptions);
  viewer = csBaseMap!.viewer;
  vuePopupIns = new CsVueNodePopup(csBaseMap);

  map = new mars3d.Map(viewer, {
    scene: {
      center: { lat: 30.054604, lng: 108.885436, alt: 17036414, heading: 0, pitch: -90 },
      fxaa: true,
    },
    control: {
      contextmenu: { hasDefault: false }, // 右键菜单
    },
  });
}

export function destroyMap() {
  if (csBaseMap) {
    destroyGraphicLayer();
    vuePopupIns?.destructor();
    csBaseMap?.destructor();
    csBaseMap = null;
    map.destroy();
    map = null;
  }
}

const closeSmallTooltip = (event) => {
  map.closeSmallTooltip();
};

export function addCloseSmallTipEvent() {
  map.on(mars3d.EventType.mouseOut, closeSmallTooltip);
}

export function removeCloseSmallTipEvent() {
  map.off(mars3d.EventType.mouseOut, closeSmallTooltip);
}

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

export function addKeyDownEvent() {
  map.on(mars3d.EventType.keydown, keyDownCb);
  map.on(mars3d.EventType.keyup, keyUpCb);
}

export function removeKeyDownEvent() {
  map.off(mars3d.EventType.keydown, keyDownCb);
  map.off(mars3d.EventType.keyup, keyUpCb);
}

export function createGraphicLayer() {
  graphicLayer = new mars3d.layer.GraphicLayer({
    isAutoEditing: true, // 是否自动激活编辑
    // isRestorePositions: true,
    // drawAddEventType: false,
    // drawEndEventType: mars3d.EventType.rightClick,
    // drawDelEventType: mars3d.EventType.middleClick
  });
  map.addLayer(graphicLayer);
  addCloseSmallTipEvent();
  addKeyDownEvent();
}

export function destroyGraphicLayer() {
  removeCloseSmallTipEvent();
  removeKeyDownEvent();
  if (graphicLayer) {
    map.removeLayer(graphicLayer);
    graphicLayer.destroy();
    graphicLayer = null;
  }
}

function getDrawStyle(clampToGround = true) {
  // 不贴地偏蓝色， 贴地偏黄色
  return {
    color: clampToGround ? "#ffff00" : "#FFC800",
    opacity: 0.3,
    outline: true,
    outlineColor: "#FFC800",
    outlineWidth: 2.0,
    clampToGround,
  };
}

function getDrawedShowStyle(clampToGround = true) {
  // 不贴地偏蓝色， 贴地偏黄色
  return {
    color: "#FFC800",
    opacity: 0.2,
    outline: true,
    outlineColor: "#FFC800",
    outlineWidth: 4.0,
    clampToGround,
  };
}

export function getDrawedShowStyleByColor(color: string, clampToGround = true) {
  // 不贴地偏蓝色， 贴地偏黄色
  return {
    color: color,
    opacity: 0.2,
    outline: true,
    outlineColor: color,
    outlineWidth: 4.0,
    clampToGround,
  };
}

export function updateGraphicStyle(graphic: any, newStyle = null, useDefault = true) {
  if (graphic) {
    if (useDefault) {
      graphic.setStyle(getDrawedShowStyle());
    } else {
      graphic.setStyle(newStyle);
    }
  }
}

export async function drawRectangle(clampToGround = true) {
  if (graphicLayer) {
    const graphic = await graphicLayer.startDraw({
      type: isEntityGraphic ? "rectangle" : "rectangleP",
      style: getDrawStyle(clampToGround),
    });

    console.log("Rectangle 绘制完成", graphic.toJSON());
    return graphic;
  }

  return null;
}

export async function drawPolygon(clampToGround = true) {
  if (graphicLayer) {
    const graphic = await graphicLayer.startDraw({
      type: isEntityGraphic ? "polygon" : "polygonP",
      style: getDrawStyle(clampToGround),
    });

    console.log("Polygon 绘制完成", graphic.toJSON());
    return graphic;
  }

  return null;
}

export async function drawEllipse(clampToGround = true) {
  if (graphicLayer) {
    const graphic = await graphicLayer.startDraw({
      type: isEntityGraphic ? "circle" : "circleP",
      style: getDrawStyle(clampToGround),
    });

    console.log("Circle 绘制完成", graphic.toJSON());
    return graphic;
  }
  return null;
}

export function stopDrawGraphic() {
  if (graphicLayer) {
    graphicLayer.stopDraw();
  }
}

export function stopEditGraphic() {
  if (graphicLayer) {
    graphicLayer.stopEditing();
  }
}

export function removeGraphic(graphicObj: any) {
  if (graphicLayer && graphicObj) {
    graphicLayer.removeGraphic(graphicObj);
  }
}

export function clearAllGraphic() {
  if (graphicLayer) {
    graphicLayer.clear();
  }
}

// 还原编辑(还原到初始)
export function restoreEditedGraphic(graphic: any) {
  if (graphic.editing?.restore) {
    graphic.editing.restore();
  } else if (graphic.parent?.editing?.restore) {
    graphic.parent.editing.restore();
  }
}

// 撤销编辑(还原到上一步)
export function revokeEditedGraphic(graphic: any) {
  if (graphic.editing?.revoke) {
    graphic.editing.revoke();
  } else if (graphic.parent?.editing?.revoke) {
    graphic.parent.editing.revoke();
  }
}

export function calcDistanceGraphic(graphic: any) {
  const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance);
  console.log("长度为:" + strDis);
}

export function calcPerimeterGraphic(graphic: any) {
  const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance);
  console.log("周长为:" + strDis);
}

export function calcAreaGraphic(graphic: any) {
  const strArea = mars3d.MeasureUtil.formatArea(graphic.area);
  console.log("面积为:" + strArea);
}

export let __oldCpLabelGraphics = [];

export function clearOldCpLableGeodata() {
  if (!graphicLayer) {
    return null;
  }
  if (__oldCpLabelGraphics && __oldCpLabelGraphics.length) {
    __oldCpLabelGraphics.forEach((gl) => {
      graphicLayer.removeGraphic(gl);
    });
    __oldCpLabelGraphics = [];
  }
}

export function drawOldCpLableGeodata(regionGeojson, color = "#FFC800") {
  if (!graphicLayer) {
    return null;
  }

  const oldCpLabelGraphics = graphicLayer.loadGeoJSON(regionGeojson, {
    flyTo: false,
    clear: false,
    style: {
      color: color,
      opacity: 0.2,
      outline: true,
      outlineColor: color,
      outlineWidth: 6.0,
      clampToGround: true,
    },
  });
  if (oldCpLabelGraphics && oldCpLabelGraphics.length) {
    oldCpLabelGraphics.forEach((gl) => {
      gl.hasEdit = false;
      _oldCpLabelGraphics.push(gl);
    });
  }

  console.log("drawOldCpLableGeodata", __oldCpLabelGraphics);
}

export function openGeoJSON(file) {
  if (!graphicLayer) {
    return null;
  }
  const fileName = file.name;
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase();

  if (fileType === "json" || fileType === "geojson") {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onloadend = function (e) {
      const geojson = JSON.parse(this.result);
      console.log("打开了json文件", geojson);
      graphicLayer.loadJSON(geojson, { flyTo: true, clear: true });
    };
  } else {
    console.log("暂不支持 " + fileType + " 文件类型的数据！");
  }
}

// 点击保存JSON
export function saveJSON() {
  if (graphicLayer.length === 0) {
    console.log("当前没有标注任何数据，无需保存！");
    return;
  }
  const geojson = graphicLayer.toJSON();
  mars3d.Util.downloadFile("我的标注.json", JSON.stringify(geojson));
}

// 点击保存GeoJSON
export function saveGeoJSON() {
  if (graphicLayer.length === 0) {
    console.log("当前没有标注任何数据，无需保存！");
    return;
  }
  const geojson = graphicLayer.toGeoJSON();
  mars3d.Util.downloadFile("我的标注geojson.json", JSON.stringify(geojson));
}

export function clearVuePopup() {
  if (vuePopupIns) {
    vuePopupIns.clearLayer();
  }
}

export function addVuePopup(options) {
  if (vuePopupIns) {
    vuePopupIns.updateLayer(options);
  }
}

export function removeVuePopup(options) {
  if (vuePopupIns) {
    vuePopupIns.removeLayer(options);
  }
}

export function hiddenVuePopup(options) {
  if (vuePopupIns) {
    vuePopupIns.hiddenPopup(options);
  }
}

export function showVuePopup(options) {
  if (vuePopupIns) {
    vuePopupIns.showPopup(options);
  }
}

export function addCzmlGraphicLayer(options: any) {
  if (map) {
    const czmlGraphicLayer = new mars3d.layer.CzmlLayer(options);
    map.addLayer(czmlGraphicLayer);
    czmlGraphicLayerMap.set(options.id, {
      layer: czmlGraphicLayer,
      options,
    });
  }
}

export function removeCzmlGraphicLayer(options: any) {
  if (map) {
    const layerObj = czmlGraphicLayerMap.get(options.id);
    if (layerObj) {
      map.removeLayer(layerObj.layer);
      czmlGraphicLayerMap.delete(options.id);
    }
  }
}
