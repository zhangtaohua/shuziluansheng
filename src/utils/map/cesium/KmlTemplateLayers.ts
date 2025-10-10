// import * as Cesium from "cesium";
import type { KmlTemplateOptions } from "./KmlTemplateLayersTypes.d";
import CesiumBase from "./base";
import { earthExtent } from "../geoConstant";
import { nanoid } from "nanoid";

export default class CsKmlTemplateLayers {
  public csBaseHandle: CesiumBase | null = null;
  public dataSources: any = null;

  private __layers: any = null;
  private __layerIdPrefix = "KML_IMAGERY_";

  constructor(mapBaseIns: CesiumBase) {
    this.csBaseHandle = mapBaseIns;
    this.dataSources = mapBaseIns.viewer.dataSources;
    this.__layers = new Map();
  }

  public destructor() {
    this.clearLayer();
    this.csBaseHandle = null;
    this.dataSources = null;
    this.__layers = null;
  }

  private __Id(id: string) {
    return `${this.__layerIdPrefix}${id}`;
  }

  private __Name(name: string) {
    return `${this.__layerIdPrefix}${name}`;
  }

  public createLayer(
    options: KmlTemplateOptions = {
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

    const zIndex = this.csBaseHandle!.getCurrentzIndex(options.zIndex);

    const kmlTemplateOptions = {
      // sourceUri: options.url,
      rectangle: Cesium.Rectangle.fromDegrees(extent[0], extent[1], extent[2], extent[3]),
      minimumLevel: minZoom,
      maximumLevel: maxZoom,
      tileWidth: options.tileWidth ? options.tileWidth : 256,
      tileHeight: options.tileHeight ? options.tileHeight : 256,
    };

    // const dataSource = new Cesium.KmlDataSource({
    //   ...kmlTemplateOptions,
    //   camera: this.csBaseHandle?.camera,
    //   canvas: this.csBaseHandle?.canvas,
    // });

    const dataSourcePromise = Cesium.KmlDataSource.load(options.url, {
      camera: this.csBaseHandle?.camera,
      canvas: this.csBaseHandle?.canvas,
    });

    console.log("kzml", kmlTemplateOptions, dataSourcePromise);

    const layerObj = {
      options,
      dataSourcePromise,
      zIndex,
    };
    return layerObj;
  }

  public async addLayer(options: KmlTemplateOptions) {
    if (this.csBaseHandle) {
      const layerObj = this.createLayer(options);
      if (layerObj) {
        //  layerObj.dataSourcePromise
        //    .then((dataSource) => {
        //      layerObj.dataSource = dataSource;
        //      this.dataSources.add(layerObj.dataSource);
        //      this.__layers.set(this.__Id(options.id), layerObj);
        //      return true;
        //    })
        //    .catch((err) => {
        //      console.log("add kml data error", err);
        //    });
        const dataSource = await layerObj.dataSourcePromise;
        layerObj.dataSource = dataSource;
        console.log("ddd", layerObj);
        this.dataSources.add(layerObj.dataSource);
        if (options.isFitToView) {
          this.csBaseHandle.viewer.flyTo(layerObj.dataSource);
        }
        this.__layers.set(this.__Id(options.id), layerObj);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public flyToView(options: KmlTemplateOptions) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(options.id));
      if (layerObj) {
        if (layerObj.dataSource) {
          this.csBaseHandle.viewer.flyTo(layerObj.dataSource);
        }
        return true;
      }

      if (options.extent) {
        this.csBaseHandle.fitToExtent(options.extent);
        return true;
      }
    } else {
      return false;
    }
  }

  public hasLayer(options: KmlTemplateOptions) {
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

  public removeLayer(options: KmlTemplateOptions, destroy = true) {
    return this.removeLayerByID(options.id, destroy);
  }

  public removeLayerByID(id: string, destroy: boolean) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        this.dataSources.remove(layerObj.dataSource, destroy);
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
        this.dataSources.remove(layerObj.dataSource, destroy);
      });
      this.__layers.clear();
      return true;
    } else {
      return false;
    }
  }

  public setLayerOpacity(options: KmlTemplateOptions, opacity: number) {
    return this.setLayerOpacityByID(options.id, opacity);
  }

  public setLayerOpacityByID(id: string, opacity: number) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        layerObj.dataSource.alpha = opacity;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public showHiddenLayer(options: KmlTemplateOptions, isShow: boolean) {
    return this.showHiddenLayerByID(options.id, isShow);
  }

  public showHiddenLayerByID(id: string, isShow: boolean) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        layerObj.dataSource.show = isShow;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public setSplitLayer(options: KmlTemplateOptions, direction: string | null = null) {
    return this.setSplitLayerByID(options.id, direction);
  }

  public setSplitLayerByID(id: string, direction: string | null = null) {
    if (this.csBaseHandle) {
      const layerObj = this.__layers.get(this.__Id(id));
      if (layerObj) {
        if (direction) {
          if (direction.toUpperCase().includes("L")) {
            layerObj.dataSource.splitDirection = Cesium.SplitDirection.LEFT;
          } else {
            layerObj.dataSource.splitDirection = Cesium.SplitDirection.RIGHT;
          }
        } else {
          layerObj.dataSource.splitDirection = Cesium.SplitDirection.NONE;
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
