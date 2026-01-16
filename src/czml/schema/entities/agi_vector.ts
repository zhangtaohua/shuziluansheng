import { nanoid } from "@/utils/common/nanoid";
import { createShowProp } from "../properties/booleanProp";
import { createLengthDoubleProp, createMinimumLengthInPixelsDoubleProp } from "../properties/doubleProp";
import { createColorProp } from "../properties/colorProp";
import { createDirectionProp } from "../properties/directionProp";

export class czmlAgiVectorEntity {
  public id = "czml_entity_agi_vector_" + nanoid(10);
  public name = "agi_vector";
  public _czmlName = "agi_vector";
  public labelZh = "向量传感器";
  public labelEn = "agi vector sensor";
  public title = "agi_vector";
  public description =
    "Defines a graphical vector that originates at the `position` property and extends in the provided direction for the provided length.";
  public descriptionZh = "向量传感器";

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
      this.id = "czml_entity_agi_vector_" + options.name + "_" + nanoid(10);
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
      description: "Whether or not the vector is shown.",
      default: true,
    }),
    color: createColorProp({
      isUsed: false,
      $ref: "../../Color.json",
      description: "The color of the vector.",
      default: "white",
    }),
    direction: createDirectionProp({
      isUsed: false,
      $ref: "../../Direction.json",
      description: "The direction of the vector.",
      czmlRequiredForDisplay: true,
    }),
    length: createLengthDoubleProp({
      isUsed: false,
      $ref: "../../Double.json",
      description: "The graphical length of the vector, in meters.",
      default: 1.0,
    }),
    minimumLengthInPixels: createMinimumLengthInPixelsDoubleProp({
      isUsed: false,
      $ref: "../../Double.json",
      description: "The minimum graphical length of the vector in pixels.",
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

export default czmlAgiVectorEntity;
