import { nanoid } from "@/utils/common/nanoid";
import { createFillProp, createOutlineProp, createShowProp } from "../properties/booleanProp";
import {
  createDisableDepthTestDistanceDoubleProp,
  createOutlineWidthDoubleProp,
  createPixelSizeDoubleProp,
} from "../properties/doubleProp";
import { createDistanceDisplayConditionProp } from "../properties/distanceDisplayConditionProp";
import { createHeightReferenceProp } from "../properties/heightReferenceProp";
import { createColorProp, createOutlineColorProp } from "../properties/colorProp";

import { createScaleByDistanceProp, createTranslucencyByDistanceProp } from "../properties/nearFarDistanceProp";

export class czmlPointEntity {
  public id = "czml_entity_point_" + nanoid(10);
  public name = "point";
  public _czmlName = "point";
  public labelZh = "点";
  public labelEn = "point";
  public title = "point";
  public description =
    "A point, or viewport-aligned circle. The point is positioned in the scene by the `position` property.";
  public descriptionZh = "";

  public type = "entity";
  public componentType = "czml#packet#entity";
  public tag = "CzmlEntityRender";
  public isRequired = false;
  public isEnable = true;
  // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI
  public _isEntity = true;
  public isCombinedProperty = false;
  public isComplexProperty = false;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_entity_point_" + options.name + "_" + nanoid(10);
    }

    if (options.name) {
      this.name = options.name;
    }

    if (options.czmlName) {
      this._czmlName = options.czmlName;
    }

    if (options.labelZh) {
      this.labelZh = options.labelZh;
    }

    if (options.labelEn) {
      this.labelEn = options.labelEn;
    }

    if (options.title) {
      this.title = options.title;
    }

    if (options.description) {
      this.description = options.description;
    }

    if (options.descriptionZh) {
      this.descriptionZh = options.descriptionZh;
    }

    if (options.tag) {
      this.tag = options.tag;
    }

    this.isRequired = options.isRequired ?? false;
    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
    this.isExpand = options.isExpand ?? true;
  }

  public properties = {
    show: createShowProp({
      $ref: "Boolean.json",
      description: "Whether or not the point is shown.",
      default: true,
    }),
    pixelSize: createPixelSizeDoubleProp({
      $ref: "Double.json",
      description: "The size of the point, in pixels.",
      default: 1.0,
    }),
    heightReference: createHeightReferenceProp({
      isUsed: false,
      $ref: "HeightReference.json",
      description: "The height reference of the point, which indicates if the position is relative to terrain or not.",
      default: "NONE",
    }),
    color: createColorProp({
      isUsed: false,
      $ref: "Color.json",
      description: "The color of the point.",
      default: "white",
    }),
    outlineColor: createOutlineColorProp({
      isUsed: false,
      $ref: "Color.json",
      description: "The color of the outline of the point.",
      default: "black",
    }),
    outlineWidth: createOutlineWidthDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The width of the outline of the point.",
      default: 0.0,
    }),
    scaleByDistance: createScaleByDistanceProp({
      isUsed: false,
      $ref: "NearFarScalar.json",
      description:
        "How the point's scale should change based on the point's distance from the camera. This scalar value will be multiplied by `pixelSize`.",
    }),
    translucencyByDistance: createTranslucencyByDistanceProp({
      isUsed: false,
      $ref: "NearFarScalar.json",
      description:
        "How the point's translucency should change based on the point's distance from the camera. This scalar value should range from 0 to 1.",
    }),
    distanceDisplayCondition: createDistanceDisplayConditionProp({
      isUsed: false,
      $ref: "DistanceDisplayCondition.json",
      description:
        "The display condition specifying the distance from the camera at which this point will be displayed.",
    }),
    disableDepthTestDistance: createDisableDepthTestDistanceDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description:
        "The distance from the camera at which to disable the depth test. This can be used to prevent clipping against terrain, for example. When set to zero, the depth test is always applied. When set to Infinity, the depth test is never applied.",
      default: 0.0,
    }),
  };
  // end properties

  get isEntity() {
    return this._isEntity;
  }

  set isEntity(newValue) {
    return;
  }

  get czmlName() {
    return this._czmlName;
  }

  set czmlName(newValue) {
    return;
    // this._czmlName = newValue;
  }

  public getCzmlName() {
    if (this.isUsed) {
      return this.czmlName;
    } else {
      return null;
    }
  }

  public getCzmlValue() {
    if (this.isUsed) {
      const czmlData = {};
      const keys = Object.keys(this.properties);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const prop = this.properties[key];
        if (prop.getCzmlName) {
          const propKey = prop.getCzmlName();
          const propValue = prop.getCzmlValue();
          if (propKey && propValue) {
            czmlData[propKey] = propValue;
          }
        }
      }

      return czmlData;
    } else {
      return null;
    }
  }

  public getCzmlData() {
    if (this.isUsed) {
      return {
        [this.czmlName]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlPointEntity;
