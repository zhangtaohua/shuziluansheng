import { nanoid } from "@/utils/common/nanoid";
import {
  createFillProp,
  createOutlineProp,
  createPerDirectionRadiusProp,
  createShowProp,
} from "../properties/booleanProp";
import { createOutlineWidthDoubleProp, createRadiusDoubleProp } from "../properties/doubleProp";
import { createMaterialProp } from "../properties/materialProp";
import { createOutlineColorProp } from "../properties/colorProp";
import { createNumberOfRingsIntegerProp } from "../properties/integerProp";
import { createDirectionsProp } from "../properties/directionProp";

export class czmlAgiFanEntity {
  public id = "czml_entity_agi_fan_" + nanoid(10);
  public name = "agi_fan";
  public _czmlName = "agi_fan";
  public labelZh = "扇形传感器";
  public labelEn = "agi fan sensor";
  public title = "agi_fan";
  public description = "A fan sensor volume taking into account occlusion of an ellipsoid, i.e., the globe.";
  public descriptionZh = "扇形传感器";

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
      this.id = "czml_entity_agi_conicSensor_" + options.name + "_" + nanoid(10);
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
      $ref: "../../Boolean.json",
      description: "Whether or not the fan is shown.",
      default: true,
    }),
    directions: createDirectionsProp({
      isUsed: false,
      $ref: "../../DirectionList.json",
      description: "The list of directions defining the fan.",
      czmlRequiredForDisplay: true,
    }),
    radius: createRadiusDoubleProp({
      isUsed: false,
      $ref: "../../Double.json",
      description: "The radial limit of the fan. If `perDirectionRadius` is false, then this value is required.",
    }),
    perDirectionRadius: createPerDirectionRadiusProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether the magnitude of each direction is used instead of a constant radius.",
      default: false,
    }),
    material: createMaterialProp({
      isUsed: false,
      $ref: "../../Material.json",
      description: "The material to display on the surface of the fan.",
      default: "solid white",
    }),
    fill: createFillProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether or not the fan is filled.",
      default: true,
    }),
    outline: createOutlineProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether or not the fan is outlined.",
      default: false,
    }),
    outlineColor: createOutlineColorProp({
      isUsed: false,
      $ref: "../../Color.json",
      description: "The color of the fan outline.",
      default: "black",
    }),
    outlineWidth: createOutlineWidthDoubleProp({
      isUsed: false,
      $ref: "../../Double.json",
      description: "The width of the fan outline.",
      default: 1.0,
    }),
    numberOfRings: createNumberOfRingsIntegerProp({
      isUsed: false,
      $ref: "../../Integer.json",
      description:
        "The number of outline rings to draw, starting from the outer edge and equidistantly spaced towards the center.",
      default: 6,
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

export default czmlAgiFanEntity;
