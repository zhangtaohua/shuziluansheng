import { nanoid } from "@/utils/common/nanoid";
import { createShowProp } from "../properties/booleanProp";
import {
  createLeadTimeDoubleProp,
  createResolutionDoubleProp,
  createTrailTimeDoubleProp,
  createWidthDoubleProp,
} from "../properties/doubleProp";
import { createDistanceDisplayConditionProp } from "../properties/distanceDisplayConditionProp";
import { createPolylineMaterialProp } from "../properties/materialProp";

export class czmlPathEntity {
  public id = "czml_entity_path_" + nanoid(10);
  public name = "path";
  public _czmlName = "path";
  public labelZh = "标签";
  public labelEn = "path";
  public title = "path";
  public description =
    "A path, which is a polyline defined by the motion of an object over time. The possible vertices of the path are specified by the `position` property. Note that because clients cannot render a truly infinite path, the path must be limited, either by defining availability for this object, or by using the `leadTime` and `trailTime` properties.";

  public descriptionZh = "";

  public type = "entity";
  public componentType = "czml#packet#entity";
  public tag = "CzmlEntityRender";
  public isEnable = true; // for can edit
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
      this.id = "czml_entity_path_" + options.name + "_" + nanoid(10);
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

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
    this.isExpand = options.isExpand ?? true;
  }

  public properties = {
    show: createShowProp({
      $ref: "Boolean.json",
      description: "Whether or not the path is shown.",
      default: true,
    }),
    leadTime: createLeadTimeDoubleProp({
      $ref: "Double.json",
      description:
        "The time ahead of the animation time, in seconds, to show the path. The time will be limited to not exceed the object's availability. By default, the value is unlimited, which effectively results in drawing the entire available path of the object.",
    }),
    trailTime: createTrailTimeDoubleProp({
      $ref: "Double.json",
      description:
        "The time behind the animation time, in seconds, to show the path. The time will be limited to not exceed the object's availability. By default, the value is unlimited, which effectively results in drawing the entire available path of the object.",
    }),
    width: createWidthDoubleProp({
      $ref: "Double.json",
      description: "The width of the path line.",
      default: 1.0,
    }),
    resolution: createResolutionDoubleProp({
      $ref: "Double.json",
      description:
        "The maximum step-size, in seconds, used to sample the path. If the `position` property has data points farther apart than resolution specifies, additional samples will be computed, creating a smoother path.",
      default: 60.0,
    }),
    material: createPolylineMaterialProp({
      $ref: "PolylineMaterial.json",
      description: "The material to use to draw the path.",
      default: "solid white",
    }),
    distanceDisplayCondition: createDistanceDisplayConditionProp({
      $ref: "DistanceDisplayCondition.json",
      description: "The display condition specifying at what distance from the camera this path will be displayed.",
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
        [this.name]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlPathEntity;
