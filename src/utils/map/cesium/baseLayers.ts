// import * as Cesium from "cesium";

import CsBase from "@/utils/map/cesium/base";
import type { CesiumBasicOptions } from "@/utils/map/cesium/baseTypes";

import CsUrlTemplateLayers from "@/utils/map/cesium/urlTemplateLayers";
import type { UrlTemplateOptions } from "@/utils/map/cesium/urlTemplateLayersTypes";

import CsBingMapsLayers from "@/utils/map/cesium/bingmapsLayers";
import type { BingMapsOptions } from "@/utils/map/cesium/bingmapsLayersTypes";

import CsGoogleEarthLayers from "@/utils/map/cesium/googleEarthLayers";
import type { GoogleEarthOptions } from "@/utils/map/cesium/googleEarthLayersTypes";

import CsOsmMapsLayers from "@/utils/map/cesium/osmLayers";
import type { OsmOptions } from "@/utils/map/cesium/osmLayersTypes";

import CsWmtsLayers from "@/utils/map/cesium/wmtsLayers";
import type { WMTSOptions } from "@/utils/map/cesium/wmtsLayersTypes";

import {
  mapXYZUrl,
  bingmapImagerySet,
  bingMapCsBaseUrl,
  mapWMTSUrl,
  googleEarthCsBaseUrl,
  OsmCsBaseUrl,
  OsmStamenMapsCsBaseUrl,
} from "@/utils/map/sourceUrl";

import { defaultMapOptions, mapKeys } from "@/utils/map/geoConstant";

import { cesiumViewMode } from "@/utils/map/cesium/csConstant";

import {
  gaodeMap,
  googleImgUrlMap,
  googleVecUrlMap,
  googleEarthMap,
  bingMap,
  bingLightMap,
  mapboxBasic,
  mapboxAllBlue,
  osm,
  osmStamen,
  tianditu,
  tiandituZh,
  tiandituZhUrl,
  tiandituEn,
} from "@/utils/map/MapConst";

export default class CsBaseLayersMap extends CsBase {
  private __bgLayers: any = null;
  public csUrlIns: CsUrlTemplateLayers | null = null;
  public csBingmapIns: CsBingMapsLayers | null = null;
  public csGoogleEarthIns: CsGoogleEarthLayers | null = null;
  public csOsmIns: CsOsmMapsLayers | null = null;
  public csWmtsIns: CsWmtsLayers | null = null;

  private __gaodeUrlOptions: UrlTemplateOptions = {
    id: gaodeMap,
    name: gaodeMap,
    url: mapXYZUrl.aMap_vec_single,
  };

  private __googleImgUrlOptions: UrlTemplateOptions = {
    id: googleImgUrlMap,
    name: googleImgUrlMap,
    url: mapXYZUrl.google_img,
  };

  private __googleVecUrlOptions: UrlTemplateOptions = {
    id: googleVecUrlMap,
    name: googleVecUrlMap,
    url: mapXYZUrl.google_vec,
  };

  private __mapboxBasicUrlOptions: UrlTemplateOptions = {
    id: mapboxBasic,
    name: mapboxBasic,
    url: mapXYZUrl.mapbox_local_basic,
  };

  private __mapboxAllBlueUrlOptions: UrlTemplateOptions = {
    id: mapboxAllBlue,
    name: mapboxAllBlue,
    url: mapXYZUrl.mapbox_local_allblue,
  };

  private __tiandituUrlOptions: UrlTemplateOptions = {
    id: `${tianditu}_zhurl`,
    name: `${tianditu}_zhurl`,
    url: mapXYZUrl.tiandi_cs_spm_vec,
    subdomains: mapXYZUrl.tiandi_subdomains,
    // tilingScheme : new Cesium.WebMercatorTilingScheme(),
  };

  private __tiandituZhUrlLabelOptions: UrlTemplateOptions = {
    id: `${tianditu}_zhurl_label`,
    name: `${tianditu}_zhurl_label`,
    url: mapXYZUrl.tiandi_cs_spm_vec_zh_label,
    subdomains: mapXYZUrl.tiandi_subdomains,
    // tilingScheme : new Cesium.WebMercatorTilingScheme(),
  };

  private __bingMapAerialOptions: BingMapsOptions = {
    id: bingMap,
    name: bingMap,
    url: bingMapCsBaseUrl,
    mapStyle: bingmapImagerySet.Aerial,
    key: mapKeys.bingmapKey,
    useDefault: true,
  };

  private __bingMapLightOptions: BingMapsOptions = {
    id: bingLightMap,
    name: bingLightMap,
    url: bingMapCsBaseUrl,
    mapStyle: bingmapImagerySet.CanvasLight,
    key: mapKeys.bingmapKey,
    // useDefault: true,
  };

  private __googleEarthOptions: GoogleEarthOptions = {
    id: googleEarthMap,
    name: googleEarthMap,
    url: googleEarthCsBaseUrl,
  };

  private __osmOptions: OsmOptions = {
    id: osm,
    name: osm,
    // url: OsmCsBaseUrl,
  };

  private __osmStamenOptions: OsmOptions = {
    id: osmStamen,
    name: osmStamen,
    url: OsmStamenMapsCsBaseUrl,
  };

  private __tiandituImgOptions: WMTSOptions = {
    id: `${tianditu}_img`,
    name: `${tianditu}_img`,
    url: mapWMTSUrl.tiandi_sp_img_full,
  };

  private __tiandituZhLabelOptions: WMTSOptions = {
    id: `${tianditu}_zh_label`,
    name: `${tianditu}_zh_label`,
    url: mapWMTSUrl.tiandi_sp_img_zh_label_full,
  };

  private __tiandituEnLabelOptions: WMTSOptions = {
    id: `${tianditu}_en_label`,
    name: `${tianditu}_en_label`,
    url: mapWMTSUrl.tiandi_sp_img_en_label_full,
  };

  constructor(target: string, csBasicOptions: CesiumBasicOptions) {
    super(target, csBasicOptions);
    this.__bgLayers = new Map();

    this.csUrlIns = new CsUrlTemplateLayers(this);
    this.csBingmapIns = new CsBingMapsLayers(this);
    this.csGoogleEarthIns = new CsGoogleEarthLayers(this);
    this.csOsmIns = new CsOsmMapsLayers(this);
    this.csWmtsIns = new CsWmtsLayers(this);
  }

  public destructor() {
    this.csUrlIns!.destructor();
    this.csBingmapIns!.destructor();
    this.csGoogleEarthIns!.destructor();
    this.csOsmIns!.destructor();
    this.csWmtsIns!.destructor();

    this.__bgLayers = null;
    super.destructor();
  }

  public __addBgLayer(ins: any, options: any) {
    if (this.__bgLayers && this.__bgLayers.has(options.id)) {
      ins!.showHiddenLayerByID(options.id, true);
    } else {
      const isAdded = ins!.addLayer(options);
      if (!this.__bgLayers) {
        this.__bgLayers = new Map();
      }
      if (isAdded) {
        this.__bgLayers.set(options, ins);
      }
    }
  }

  public __hiddenBgLayer(options: any) {
    if (this.__bgLayers && this.__bgLayers.has(options.id)) {
      const ins = this.__bgLayers.get(options.id);
      ins!.showHiddenLayerByID(options.id, false);
    }
  }

  public hiddenAllBgLayers() {
    if (this.__bgLayers && this.__bgLayers.size) {
      for (const [optionsKey, valueHandle] of this.__bgLayers.entries()) {
        valueHandle.showHiddenLayerByID(optionsKey.id, false);
      }
      return true;
    } else {
      return false;
    }
  }

  public __removeBgLayer(options: any) {
    if (this.__bgLayers && this.__bgLayers.has(options.id)) {
      const ins = this.__bgLayers.get(options.id);
      ins!.removeLayerByID(options.id, false);
    }
  }

  public addBgLayer(id: string) {
    // 先隐藏map
    this.hiddenAllBgLayers();
    switch (id) {
      case gaodeMap: {
        this.__addBgLayer(this.csUrlIns, this.__gaodeUrlOptions);
        break;
      }
      case googleImgUrlMap: {
        this.__addBgLayer(this.csUrlIns, this.__googleImgUrlOptions);
        break;
      }
      case googleVecUrlMap: {
        this.__addBgLayer(this.csUrlIns, this.__googleVecUrlOptions);
        break;
      }
      // case googleEarthMap: {
      //   this.__addBgLayer(this.csGoogleEarthIns, this.__googleEarthOptions);
      //   break;
      // }
      case bingMap: {
        this.__addBgLayer(this.csBingmapIns, this.__bingMapAerialOptions);
        break;
      }
      case bingLightMap: {
        this.__addBgLayer(this.csBingmapIns, this.__bingMapLightOptions);
        break;
      }
      case mapboxBasic: {
        this.__addBgLayer(this.csUrlIns, this.__mapboxBasicUrlOptions);
        break;
      }
      case mapboxAllBlue: {
        this.__addBgLayer(this.csUrlIns, this.__mapboxAllBlueUrlOptions);
        break;
      }
      case osm: {
        this.__addBgLayer(this.csOsmIns, this.__osmOptions);

        break;
      }
      case osmStamen: {
        this.__addBgLayer(this.csOsmIns, this.__osmStamenOptions);
        break;
      }
      case tiandituZh: {
        this.__addBgLayer(this.csWmtsIns, this.__tiandituImgOptions);
        setTimeout(() => {
          this.__addBgLayer(this.csWmtsIns, this.__tiandituZhLabelOptions);
        }, 1000);
        break;
      }
      case tiandituZhUrl: {
        this.__addBgLayer(this.csUrlIns, this.__tiandituUrlOptions);
        this.__addBgLayer(this.csUrlIns, this.__tiandituZhUrlLabelOptions);
        break;
      }
      case tiandituEn: {
        this.__addBgLayer(this.csWmtsIns, this.__tiandituImgOptions);
        this.__addBgLayer(this.csWmtsIns, this.__tiandituEnLabelOptions);
        break;
      }
      default: {
        break;
      }
    }
  }

  // 一般不需要移出的，直接隐藏切换
  public removeBgLayer(id: string) {
    switch (id) {
      case gaodeMap: {
        this.__removeBgLayer(this.__gaodeUrlOptions);
        break;
      }
      case googleImgUrlMap: {
        this.__removeBgLayer(this.__googleImgUrlOptions);
        break;
      }
      case googleVecUrlMap: {
        this.__removeBgLayer(this.__googleVecUrlOptions);
        break;
      }
      // case googleEarthMap: {
      //   this.__removeBgLayer(this.__googleEarthOptions);
      //   break;
      // }
      case bingMap: {
        this.__removeBgLayer(this.__bingMapAerialOptions);
        break;
      }
      case bingLightMap: {
        this.__removeBgLayer(this.__bingMapLightOptions);
        break;
      }
      case mapboxBasic: {
        this.__removeBgLayer(this.__mapboxBasicUrlOptions);
        break;
      }
      case mapboxAllBlue: {
        this.__removeBgLayer(this.__mapboxAllBlueUrlOptions);
        break;
      }
      case osm: {
        this.__removeBgLayer(this.__osmOptions);

        break;
      }
      case osmStamen: {
        this.__removeBgLayer(this.__osmStamenOptions);
        break;
      }
      case tiandituZh: {
        this.__removeBgLayer(this.__tiandituImgOptions);
        setTimeout(() => {
          this.__removeBgLayer(this.__tiandituZhLabelOptions);
        }, 1000);
        break;
      }
      case tiandituZhUrl: {
        this.__removeBgLayer(this.__tiandituUrlOptions);
        this.__removeBgLayer(this.__tiandituZhUrlLabelOptions);
        break;
      }
      case tiandituEn: {
        this.__removeBgLayer(this.__tiandituImgOptions);
        this.__removeBgLayer(this.__tiandituEnLabelOptions);
        break;
      }
      default: {
        break;
      }
    }
  }

  debugMouseMoveCb = (movement: any) => {
    if (this.viewer) {
      // 获取鼠标移动到的屏幕坐标
      const cartesian = this.viewer.scene.pickPosition(movement.endPosition);

      if (Cesium.defined(cartesian)) {
        // 将 Cartesian3 转换为经纬度
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        const height = cartographic.height;

        // 打印经纬度和高度信息
        console.log("鼠标点取位置 Longitude: " + longitude + ", Latitude: " + latitude + ", Height: " + height);
        const positionCartographic = this.camera.positionCartographic.clone();
        const cLongitude = Cesium.Math.toDegrees(positionCartographic.longitude);
        const cLatitude = Cesium.Math.toDegrees(positionCartographic.latitude);
        console.log(
          "摄像机 Longitude: " + cLongitude + ", Latitude: " + cLatitude + ", height: " + positionCartographic.height,
        );
        console.log(
          "摄像机 Heading: " + this.camera.heading + ", pitch: " + this.camera.pitch + ", Roll: " + this.camera.roll,
        );
      }
    }
  };

  addDebugLngLatHeightByMousemove() {
    // 添加鼠标移动事件监听器
    if (this.eventCanvasHandler) {
      this.eventCanvasHandler.setInputAction(this.debugMouseMoveCb, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
  }

  removeDebugLngLatHeightByMousemove() {
    if (this.eventCanvasHandler) {
      this.eventCanvasHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE, this.debugMouseMoveCb);
    }
  }

  // end class
}
