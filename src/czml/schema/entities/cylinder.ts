import { nanoid } from "@/utils/common/nanoid";
import { createFillProp, createOutlineProp, createShowProp } from "../properties/booleanProp";
import {
  createBottomRadiusDoubleProp,
  createLeadTimeDoubleProp,
  createLengthDoubleProp,
  createOutlineWidthDoubleProp,
  createResolutionDoubleProp,
  createTopRadiusDoubleProp,
  createTrailTimeDoubleProp,
  createWidthDoubleProp,
} from "../properties/doubleProp";
import { createDistanceDisplayConditionProp } from "../properties/distanceDisplayConditionProp";
import { createMaterialProp, createPolylineMaterialProp } from "../properties/materialProp";
import { createHeightReferenceProp } from "../properties/heightReferenceProp";
import { createOutlineColorProp } from "../properties/colorProp";
import { createNumberOfVerticalLinesIntegerProp, createSlicesIntegerProp } from "../properties/integerProp";
import { createShadowsProp } from "../properties/shadowsProp";

export class czmlCylinderEntity {
  public id = "czml_entity_cylinder_" + nanoid(10);
  public name = "cylinder";
  public _czmlName = "cylinder";
  public labelZh = "圆柱";
  public labelEn = "cylinder";
  public title = "Cylinder";
  public description =
    "A cylinder, truncated cone, or cone defined by a length, top radius, and bottom radius. The cylinder is positioned and oriented using the `position` and `orientation` properties.";

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
      this.id = "czml_entity_cylinder_" + options.name + "_" + nanoid(10);
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
      description: "Whether or not the cylinder is shown.",
      default: true,
    }),
    length: createLengthDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The length of the cylinder.",
      czmlRequiredForDisplay: true,
    }),
    topRadius: createTopRadiusDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The radius of the top of the cylinder.",
      czmlRequiredForDisplay: true,
    }),
    bottomRadius: createBottomRadiusDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The radius of the bottom of the cylinder.",
      czmlRequiredForDisplay: true,
    }),
    heightReference: createHeightReferenceProp({
      isUsed: false,
      $ref: "HeightReference.json",
      description:
        "The height reference of the cylinder, which indicates if the position is relative to terrain or not.",
      default: "NONE",
    }),
    fill: createFillProp({
      isUsed: false,
      $ref: "Boolean.json",
      description: "Whether or not the cylinder is filled.",
      default: true,
    }),
    material: createMaterialProp({
      isUsed: false,
      $ref: "Material.json",
      description: "The material to display on the surface of the cylinder.",
      default: "solid white",
    }),
    outline: createOutlineProp({
      isUsed: false,
      $ref: "Boolean.json",
      description: "Whether or not the cylinder is outlined.",
      default: false,
    }),
    outlineColor: createOutlineColorProp({
      isUsed: false,
      $ref: "Color.json",
      description: "The color of the cylinder outline.",
      default: "black",
    }),
    outlineWidth: createOutlineWidthDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The width of the cylinder outline.",
      default: 1.0,
    }),
    numberOfVerticalLines: createNumberOfVerticalLinesIntegerProp({
      isUsed: false,
      $ref: "Integer.json",
      description: "The number of vertical lines to draw along the perimeter for the outline.",
      default: 16,
    }),
    slices: createSlicesIntegerProp({
      isUsed: false,
      $ref: "Integer.json",
      description: "The number of edges around the perimeter of the cylinder.",
      default: 128,
    }),
    shadows: createShadowsProp({
      isUsed: false,
      $ref: "ShadowMode.json",
      description: "Whether or not the cylinder casts or receives shadows.",
      default: "DISABLED",
    }),
    distanceDisplayCondition: createDistanceDisplayConditionProp({
      isUsed: false,
      $ref: "DistanceDisplayCondition.json",
      description:
        "The display condition specifying the distance from the camera at which this cylinder will be displayed.",
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

export default czmlCylinderEntity;
