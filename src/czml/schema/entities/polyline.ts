import { nanoid } from "@/utils/common/nanoid";
import { createclampToGroundProp, createFollowSurfaceProp, createShowProp } from "../properties/booleanProp";
import { createGranularityDoubleProp, createWidthDoubleProp } from "../properties/doubleProp";
import { createDistanceDisplayConditionProp } from "../properties/distanceDisplayConditionProp";
import { createDepthFailMaterialProp, createMaterialProp } from "../properties/materialProp";
import { createShadowsProp } from "../properties/shadowsProp";
import { createZIndexIntegerProp } from "../properties/integerProp";
import { createClassificationTypeCombineProp } from "../properties/classificationTypeProp";
import { createPositionListProp } from "../properties/positionProp";
import { createArcTypeProp } from "../properties/arcTypeProp";

export class czmlPolylineEntity {
  public id = "czml_entity_polyline_" + nanoid(10);
  public name = "polyline";
  public _czmlName = "polyline";
  public labelZh = "折线";
  public labelEn = "polyline";
  public title = "polyline";
  public description = "A polyline, which is a line in the scene composed of multiple segments.";
  public descriptionZh = "折线";

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
      this.id = "czml_entity_polyline_" + options.name + "_" + nanoid(10);
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
      description: "Whether or not the polyline is shown.",
      default: true,
    }),
    positions: createPositionListProp({
      isUsed: false,
      $ref: "PositionList.json",
      description: "The array of positions defining the polyline as a line strip.",
      czmlRequiredForDisplay: true,
    }),
    arcType: createArcTypeProp({
      isUsed: false,
      $ref: "ArcType.json",
      description: "The type of arc that should connect the positions of the polyline.",
      default: "GEODESIC",
    }),
    width: createWidthDoubleProp({
      isUsed: false,
      value: [1.0],
      $ref: "Double.json",
      description: "The width of the polyline.",
      default: 1.0,
    }),
    granularity: createGranularityDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The sampling distance, in radians.",
      default: "π / 180.0",
    }),
    material: createMaterialProp({
      isUsed: false,
      $ref: "PolylineMaterial.json",
      description: "The material to use to draw the polyline.",
      default: "solid white",
    }),
    followSurface: createFollowSurfaceProp({
      isUsed: false,
      $ref: "Boolean.json",
      description:
        "Whether or not the positions are connected as great arcs (the default) or as straight lines. This property has been superseded by `arcType`, which should be used instead.",
      default: true,
    }),
    shadows: createShadowsProp({
      isUsed: false,
      $ref: "ShadowMode.json",
      description: "Whether or not the polyline casts or receives shadows.",
      default: "DISABLED",
    }),
    depthFailMaterial: createDepthFailMaterialProp({
      isUsed: false,
      $ref: "PolylineMaterial.json",
      description: "The material to use to draw the polyline when it is below the terrain.",
    }),
    distanceDisplayCondition: createDistanceDisplayConditionProp({
      isUsed: false,
      $ref: "DistanceDisplayCondition.json",
      description: "The display condition specifying at what distance from the camera this polyline will be displayed.",
    }),
    clampToGround: createclampToGroundProp({
      $ref: "Boolean.json",
      description: "Whether or not the polyline should be clamped to the ground.",
      default: false,
    }),
    classificationType: createClassificationTypeCombineProp({
      $ref: "ClassificationType.json",
      description: "Whether a classification affects terrain, 3D Tiles, or both.",
      default: "BOTH",
    }),
    zIndex: createZIndexIntegerProp({
      isUsed: false,
      $ref: "Integer.json",
      description:
        "The z-index of the polyline, used for ordering ground geometry. Only has an effect if the polyline is constant, and `clampToGround` is true.",
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

export default czmlPolylineEntity;
