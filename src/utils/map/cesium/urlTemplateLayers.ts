// import * as Cesium from "cesium";
import type { UrlTemplateOptions } from "./urlTemplateLayersTypes";
import CesiumBase from "./base";
import { earthExtent } from "../geoConstant";
import { nanoid } from "nanoid";
export default class CsUrlTemplateLayers {
  public csBaseHandle: CesiumBase | null = null;
  public imageryLayers: any = null;

  private __layers: any = null;
  private __layerIdPrefix = "URL_IMAGERY_";
  private __tileCache = new Map();

  constructor(mapBaseIns: CesiumBase) {
    this.csBaseHandle = mapBaseIns;
    this.imageryLayers = mapBaseIns.imageryLayers;
    this.__layers = new Map();
  }

  public destructor() {
    this.clearLayer();
    this.csBaseHandle = null;
    this.imageryLayers = null;
    this.__layers = null;
  }

  private __Id(id: string) {
    return `${this.__layerIdPrefix}${id}`;
  }

  private __Name(name: string) {
    return `${this.__layerIdPrefix}${name}`;
  }

  public createLayer(
    options: UrlTemplateOptions = {
      url: "",
      id: "",
      name: "",
      extent: [],
      minZoom: 0,
      maxZoom: 21,
    },
  ) {
    if (!options.url || !options.id) {
      return null;
    }
    const id = this.__Id(options.id);
    let name = options.name ? options.name : nanoid(10);
    name = this.__Name(name);

    let extent = earthExtent;
    if (options.extent && options.extent.length && options.extent.length === 4) {
      extent = options.extent;
    }

    const minZoom = options.minZoom ? options.minZoom : 0;
    const maxZoom = options.maxZoom ? options.maxZoom : 21;
    const subdomains = options.subdomains ? options.subdomains : "";

    const zIndex = this.csBaseHandle!.getCurrentzIndex(options.zIndex);

    const urlTemplateOptions = {
      url: options.url,
      rectangle: Cesium.Rectangle.fromDegrees(extent[0], extent[1], extent[2], extent[3]),
      minimumLevel: minZoom,
      maximumLevel: maxZoom,
      subdomains: subdomains,
      tileWidth: options.tileWidth ? options.tileWidth : 256,
      tileHeight: options.tileHeight ? options.tileHeight : 256,
    };

    const provider = new Cesium.UrlTemplateImageryProvider(urlTemplateOptions);
    // this.__tileCache = new Map();
    // // 覆写请求瓦片的逻辑
    // provider.requestImage = async (x, y, level) => {
    //   const tileKey = `${level}-${x}-${y}`;
    //   if (this.__tileCache.has(tileKey)) {
    //     return this.__tileCache.get(tileKey); // 从缓存中返回瓦片
    //   }

    //   const image = await Cesium.UrlTemplateImageryProvider.prototype.requestImage.call(this, x, y, level);
    //   this.__tileCache.set(tileKey, image);
    //   return image;
    // };

    const layer = new Cesium.ImageryLayer(provider);
    layer.name = name;
    layer.id = id;

    const layerObj = {
      options,
      provider,
      layer,
      zIndex,
    };
    return layerObj;
  }

  public addLayer(options: UrlTemplateOptions) {
    if (this.csBaseHandle) {
      const layerObj = this.createLayer(options);
      if (layerObj) {
        this.imageryLayers.add(layerObj.layer);
        this.__layers.set(this.__Id(options.id), layerObj);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public flyToView(options: UrlTemplateOptions) {
    if (this.csBaseHandle) {
      if (options.extent) {
        this.csBaseHandle.fitToExtent(options.extent);
        return true;
      }
    } else {
      return false;
    }
  }

  public hasLayer(options: UrlTemplateOptions) {
    if (this.csBaseHandle && this.__layers.size) {
      return this.__layers.has(this.__Id(options.id));
    }
    return false;
  }

  public hasLayerByID(id: string) {
    if (this.csBaseHandle && this.__layers.size) {
      return this.__layers.has(this.__Id(id));
    }
    return false;
  }

  public removeLayer(options: UrlTemplateOptions, destroy = true) {
    return this.removeLayerByID(options.id, destroy);
  }

  public removeLayerByID(id: string, destroy: boolean) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        this.imageryLayers.remove(layerObj.layer, destroy);
        this.__layers.delete(this.__Id(id));
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public clearLayer(destroy = true) {
    if (this.csBaseHandle && this.__layers.size) {
      this.__layers.forEach((layerObj: any) => {
        this.imageryLayers.remove(layerObj.layer, destroy);
      });
      this.__layers.clear();
      return true;
    } else {
      return false;
    }
  }

  public setLayerOpacity(options: UrlTemplateOptions, opacity: number) {
    return this.setLayerOpacityByID(options.id, opacity);
  }

  public setLayerOpacityByID(id: string, opacity: number) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        layerObj.layer.alpha = opacity;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public showHiddenLayer(options: UrlTemplateOptions, isShow: boolean) {
    return this.showHiddenLayerByID(options.id, isShow);
  }

  public showHiddenLayerByID(id: string, isShow: boolean) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        layerObj.layer.show = isShow;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public setSplitLayer(options: UrlTemplateOptions, direction: string | null = null) {
    return this.setSplitLayerByID(options.id, direction);
  }

  public setSplitLayerByID(id: string, direction: string | null = null) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        if (direction) {
          if (direction.toUpperCase().includes("L")) {
            layerObj.layer.splitDirection = Cesium.SplitDirection.LEFT;
          } else {
            layerObj.layer.splitDirection = Cesium.SplitDirection.RIGHT;
          }
        } else {
          layerObj.layer.splitDirection = Cesium.SplitDirection.NONE;
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // end class
}
