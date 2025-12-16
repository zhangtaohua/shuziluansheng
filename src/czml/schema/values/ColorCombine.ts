import { nanoid } from "@/utils/common/nanoid";

import { createRgbaColorProp, createRgbafColorProp } from "../properties/colorProp.ts";
import { createReferenceProp } from "../properties/referenceProp.ts";

// 用于生成 color 像素 数值，纯数值，或者是带时间序的多个值。
export class czmlColorCombineProp {
  public id = "czml_prop_color_timetagged_" + nanoid(10);
  public name = "color";
  public _czmlName = "color";
  public labelZh = "颜色";
  public labelEn = "color";
  public title = "color";
  public description = "A color. The color can optionally vary over time.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public czmlValue = true; // 这个用于标示是不是 czml value的

  public tag = "CzmlCombineSelectSmPropInput";

  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = true;
  public isComplexProperty = false;
  public default = "rgba(255, 255, 255, 1)";

  public compUsedOptions = [
    { label: "rgba", value: "rgba" },
    { label: "rgbaf 浮点数", value: "rgbaf" },
    { label: "reference 参考值", value: "reference" },
  ];

  public currentProperty = "rgba";

  public properties = {};

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_color_timetagged_" + options.name + "_" + nanoid(10);
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

    if (options.default) {
      this.default = options.default;
    }

    this.properties = {
      rgba: createRgbaColorProp({
        default: this.default,
        $ref: "Values/RgbaValue.json",
        description:
          "The color specified as an array of color components `[Red, Green, Blue, Alpha]` where each component is an integer in the range 0-255.",
      }),
      rgbaf: createRgbafColorProp({
        isUsed: false,
        default: this.default,
        $ref: "Values/RgbafValue.json",
        description:
          "The color specified as an array of color components `[Red, Green, Blue, Alpha]` where each component is a double in the range 0.0-1.0.",
      }),
      reference: createReferenceProp({
        value: "",
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The color specified as a reference to another property.",
      }),
    };

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
        if (prop.getCzmlName && prop.isUsed) {
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

export default czmlColorCombineProp;
