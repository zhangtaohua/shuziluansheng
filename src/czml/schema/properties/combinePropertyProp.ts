import { nanoid } from "@/utils/common/nanoid";
import czmlCartesian3PixelProp from "./Cartesian3PixelProp";
import czmlReferencesProp from "./ReferencesProps";

export class czmlCombineProp {
  public id = "czml_prop_combine_" + nanoid(10);
  public name = "CombineProperty";
  public _czmlName = "CombineProperty";
  public labelZh = "组合值";
  public labelEn = "combine";
  public title = "CombineProperty";
  public description =
    "The base schema for a property whose value may be determined by interpolating over provided time-tagged samples.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  // public tag = "CzmlCombinePropInput";
  public tag = "CzmlCombineSmPropInput";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = true;
  public isComplexProperty = false;

  public properties = {};

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_combine_" + options.name + "_" + nanoid(10);
    }

    if (options.properties) {
      this.properties = options.properties;
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

export default czmlCombineProp;

export const czmlBoxDimensionsOptions = {
  id: "czml_prop_dimensions_" + nanoid(10),
  name: "dimensions",
  czmlName: "dimensions",
  labelZh: "维度",
  labelEn: "dimensions",
  isEnable: true,
  isUsed: true,
  isShowUsed: true,
  description: "The dimensions of the box.",
  tag: "CzmlCombineSmPropInput",
  properties: {
    cartesian: new czmlCartesian3PixelProp({
      czmlName: "cartesian",
      $ref: "Values/Cartesian3Value.json",
      description:
        "The dimensions specified as a three-dimensional Cartesian value `[X, Y, Z]`, with X representing width, Y representing depth, and Z representing height, in world coordinates in meters.",
    }),
    reference: new czmlReferencesProp({
      name: "reference",
      czmlName: "reference",
      labelZh: "参考",
      labelEn: "reference",
      value: "",
      isEnable: true,
      isUsed: false,
      isShowUsed: true,
      $ref: "Values/ReferenceValue.json",
      description: "The dimensions specified as a reference to another property.",
    }),
  },
};
