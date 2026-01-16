import { nanoid } from "@/utils/common/nanoid";
import { createFillProp, createOutlineProp, createShowProp } from "../properties/booleanProp";
import {
  createExtrudedHeightDoubleProp,
  createGranularityDoubleProp,
  createHeightDoubleProp,
  createOutlineWidthDoubleProp,
  createWidthDoubleProp,
} from "../properties/doubleProp";
import { createDistanceDisplayConditionProp } from "../properties/distanceDisplayConditionProp";
import { createExtrudedHeightReferenceProp, createHeightReferenceProp } from "../properties/heightReferenceProp";
import { createCornerTypeCombineProp } from "../properties/cornerProp";
import { createMaterialProp } from "../properties/materialProp";
import { createOutlineColorProp } from "../properties/colorProp";
import { createShadowsProp } from "../properties/shadowsProp";
import { createZIndexIntegerProp } from "../properties/integerProp";
import { createClassificationTypeCombineProp } from "../properties/classificationTypeProp";
import { createPositionListProp } from "../properties/positionProp";

export class czmlCorridorEntity {
  public id = "czml_entity_corridor_" + nanoid(10);
  public name = "corridor";
  public _czmlName = "corridor";
  public labelZh = "走廊";
  public labelEn = "corridor";
  public title = "corridor";
  public description =
    "A corridor, which is a shape defined by a centerline and width that conforms to the curvature of the globe. It can be placed on the surface or at altitude and can optionally be extruded into a volume.";
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
      this.id = "czml_entity_corridor_" + options.name + "_" + nanoid(10);
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
      description: "Whether or not the corridor is shown.",
      default: true,
    }),
    positions: createPositionListProp({
      isUsed: false,
      $ref: "PositionList.json",
      description: "The array of positions defining the centerline of the corridor.",
      czmlRequiredForDisplay: true,
    }),
    width: createWidthDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The width of the corridor, which is the distance between the edges of the corridor.",
      czmlRequiredForDisplay: true,
    }),
    height: createHeightDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The height of the corridor, which is the altitude of the corridor relative to the surface.",
      default: 0.0,
    }),
    heightReference: createHeightReferenceProp({
      isUsed: false,
      $ref: "HeightReference.json",
      description: "The height reference of the corridor, which indicates if `height` is relative to terrain or not.",
      default: "NONE",
    }),
    extrudedHeight: createExtrudedHeightDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description:
        "The extruded height of the corridor, which is the altitude of the corridor's extruded face relative to the surface.",
    }),
    extrudedHeightReference: createExtrudedHeightReferenceProp({
      isUsed: false,
      $ref: "HeightReference.json",
      description:
        "The extruded height reference of the corridor, which indicates if `extrudedHeight` is relative to terrain or not.",
      default: "NONE",
    }),
    cornerType: createCornerTypeCombineProp({
      isUsed: false,
      $ref: "CornerType.json",
      description: "The style of the corners of the corridor.",
      default: "ROUNDED",
    }),
    granularity: createGranularityDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The sampling distance, in radians.",
      default: "π / 180.0",
    }),
    fill: createFillProp({
      isUsed: false,
      $ref: "Boolean.json",
      description: "Whether or not the corridor is filled.",
      default: true,
    }),
    material: createMaterialProp({
      isUsed: false,
      $ref: "Material.json",
      description: "The material to display on the surface of the corridor.",
      default: "solid white",
    }),
    outline: createOutlineProp({
      isUsed: false,
      $ref: "Boolean.json",
      description: "Whether or not the corridor is outlined.",
      default: false,
    }),
    outlineColor: createOutlineColorProp({
      isUsed: false,
      $ref: "Color.json",
      description: "The color of the corridor outline.",
      default: "black",
    }),
    outlineWidth: createOutlineWidthDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The width of the corridor outline.",
      default: 1.0,
    }),
    shadows: createShadowsProp({
      isUsed: false,
      $ref: "ShadowMode.json",
      description: "Whether or not the corridor casts or receives shadows.",
      default: "DISABLED",
    }),
    distanceDisplayCondition: createDistanceDisplayConditionProp({
      isUsed: false,
      $ref: "DistanceDisplayCondition.json",
      description:
        "The display condition specifying the distance from the camera at which this corridor will be displayed.",
    }),
    classificationType: createClassificationTypeCombineProp({
      isUsed: false,
      $ref: "ClassificationType.json",
      description: "Whether a classification affects terrain, 3D Tiles, or both.",
      default: "BOTH",
    }),
    zIndex: createZIndexIntegerProp({
      isUsed: false,
      $ref: "Integer.json",
      description:
        "The z-index of the corridor, used for ordering ground geometry. Only has an effect if the corridor is constant, and `height` and `extrudedHeight` are not specified.",
      default: "0",
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

export default czmlCorridorEntity;
