import { nanoid } from "@/utils/common/nanoid";
import { createFillProp, createOutlineProp, createShowProp } from "../properties/booleanProp";
import {
  createMaximumClockDoubleProp,
  createMaximumConeDoubleProp,
  createMinimumClockDoubleProp,
  createMinimumConeDoubleProp,
  createOutlineWidthDoubleProp,
} from "../properties/doubleProp";
import { createDistanceDisplayConditionProp } from "../properties/distanceDisplayConditionProp";
import { createHeightReferenceProp } from "../properties/heightReferenceProp";
import { createMaterialProp } from "../properties/materialProp";
import { createOutlineColorProp } from "../properties/colorProp";
import { createShadowsProp } from "../properties/shadowsProp";
import {
  createSlicePartitionsIntegerProp,
  createStackPartitionsIntegerProp,
  createSubdivisionsIntegerProp,
} from "../properties/integerProp";
import { createEllipsoidRadiiProp } from "../properties/ellipsoidRadii";

export class czmlEllipsoidEntity {
  public id = "czml_entity_ellipsoid_" + nanoid(10);
  public name = "ellipsoid";
  public _czmlName = "ellipsoid";
  public labelZh = "椭球体";
  public labelEn = "ellipsoid";
  public title = "ellipsoid";
  public description =
    "An ellipsoid, which is a closed quadric surface that is a three-dimensional analogue of an ellipse. The ellipsoid is positioned and oriented using the `position` and `orientation` properties.";
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
      this.id = "czml_entity_ellipsoid_" + options.name + "_" + nanoid(10);
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
      description: "Whether or not the ellipsoid is shown.",
      default: true,
    }),
    radii: createEllipsoidRadiiProp({
      isUsed: false,
      name: "radii",
      czmlName: "radii",
      labelZh: "椭球体半径",
      labelEn: "radii",
      $ref: "EllipsoidRadii.json",
      description: "The radii of the ellipsoid.",
      czmlRequiredForDisplay: true,
    }),
    innerRadii: createEllipsoidRadiiProp({
      isUsed: false,
      name: "innerRadii",
      czmlName: "innerRadii",
      labelZh: "椭球体内半径",
      labelEn: "inner radii",
      $ref: "EllipsoidRadii.json",
      description: "The inner radii of the ellipsoid.",
    }),
    minimumClock: createMinimumClockDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The minimum clock angle of the ellipsoid.",
      default: 0.0,
    }),
    maximumClock: createMaximumClockDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The maximum clock angle of the ellipsoid.",
      default: Math.PI * 2,
      // default: "2π",
    }),
    minimumCone: createMinimumConeDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The minimum cone angle of the ellipsoid.",
      default: 0.0,
    }),
    maximumCone: createMaximumConeDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The maximum cone angle of the ellipsoid.",
      default: Math.PI,
      // default: "π",
    }),
    heightReference: createHeightReferenceProp({
      isUsed: false,
      $ref: "HeightReference.json",
      description:
        "The height reference of the ellipsoid, which indicates if the position is relative to terrain or not.",
      default: "NONE",
    }),
    fill: createFillProp({
      isUsed: false,
      $ref: "Boolean.json",
      description: "Whether or not the ellipsoid is filled.",
      default: true,
    }),
    material: createMaterialProp({
      isUsed: false,
      $ref: "Material.json",
      description: "The material to display on the surface of the ellipsoid.",
      default: "solid white",
    }),
    outline: createOutlineProp({
      isUsed: false,
      $ref: "Boolean.json",
      description: "Whether or not the ellipsoid is outlined.",
      default: false,
    }),
    outlineColor: createOutlineColorProp({
      isUsed: false,
      $ref: "Color.json",
      description: "The color of the ellipsoid outline.",
      default: "black",
    }),
    outlineWidth: createOutlineWidthDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The width of the ellipsoid outline.",
      default: 1.0,
    }),
    stackPartitions: createStackPartitionsIntegerProp({
      isUsed: false,
      $ref: "Integer.json",
      description: "The number of times to partition the ellipsoid into stacks.",
      default: 64,
    }),
    slicePartitions: createSlicePartitionsIntegerProp({
      isUsed: false,
      $ref: "Integer.json",
      description: "The number of times to partition the ellipsoid into radial slices.",
      default: 64,
    }),
    subdivisions: createSubdivisionsIntegerProp({
      isUsed: false,
      $ref: "Integer.json",
      description: "The number of samples per outline ring, determining the granularity of the curvature.",
      default: 128,
    }),
    shadows: createShadowsProp({
      isUsed: false,
      $ref: "ShadowMode.json",
      description: "Whether or not the ellipsoid casts or receives shadows.",
      default: "DISABLED",
    }),
    distanceDisplayCondition: createDistanceDisplayConditionProp({
      isUsed: false,
      $ref: "DistanceDisplayCondition.json",
      description:
        "The display condition specifying at what distance from the camera this ellipsoid will be displayed.",
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

export default czmlEllipsoidEntity;
