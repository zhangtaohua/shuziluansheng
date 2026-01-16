import { nanoid } from "@/utils/common/nanoid";
import { createFillProp, createOutlineProp, createShowProp } from "../properties/booleanProp";
import { createGranularityDoubleProp, createOutlineWidthDoubleProp } from "../properties/doubleProp";
import { createDistanceDisplayConditionProp } from "../properties/distanceDisplayConditionProp";
import { createCornerTypeCombineProp } from "../properties/cornerProp";
import { createMaterialProp } from "../properties/materialProp";
import { createOutlineColorProp } from "../properties/colorProp";
import { createShadowsProp } from "../properties/shadowsProp";
import { createPositionListProp } from "../properties/positionProp";
import { createShapeProp } from "../properties/shapeProp";

export class czmlPolylineVolumeEntity {
  public id = "czml_entity_polylineVolume_" + nanoid(10);
  public name = "polylineVolume";
  public _czmlName = "polylineVolume";
  public labelZh = "多边形";
  public labelEn = "polylineVolume";
  public title = "polylineVolume";
  public description = "A polyline with a volume, defined as a 2D shape extruded along a polyline.";
  public descriptionZh = "多边形";

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
      this.id = "czml_entity_polylineVolume_" + options.name + "_" + nanoid(10);
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
      description: "Whether or not the volume is shown.",
      default: true,
    }),
    positions: createPositionListProp({
      isUsed: false,
      $ref: "PositionList.json",
      description: "The array of positions defining the center of the polyline volume.",
      czmlRequiredForDisplay: true,
    }),
    shape: createShapeProp({
      $ref: "Shape.json",
      description: "The array of positions defining the shape of the volume to be extruded.",
      czmlRequiredForDisplay: true,
    }),
    cornerType: createCornerTypeCombineProp({
      $ref: "CornerType.json",
      description: "The style of the corners of the volume.",
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
      description: "Whether or not the volume is filled.",
      default: true,
    }),
    material: createMaterialProp({
      isUsed: false,
      $ref: "Material.json",
      description: "The material to use to fill the volume.",
      default: "solid white",
    }),
    outline: createOutlineProp({
      isUsed: false,
      $ref: "Boolean.json",
      description: "Whether or not the volume is outlined.",
      default: false,
    }),
    outlineColor: createOutlineColorProp({
      isUsed: false,
      $ref: "Color.json",
      description: "The color of the volume outline.",
      default: "black",
    }),
    outlineWidth: createOutlineWidthDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The width of the volume outline.",
      default: 1.0,
    }),
    shadows: createShadowsProp({
      isUsed: false,
      $ref: "ShadowMode.json",
      description: "Whether or not the volume casts or receives shadows.",
      default: "DISABLED",
    }),
    distanceDisplayCondition: createDistanceDisplayConditionProp({
      isUsed: false,
      $ref: "DistanceDisplayCondition.json",
      description:
        "The display condition specifying the distance from the camera at which this volume will be displayed.",
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

export default czmlPolylineVolumeEntity;
