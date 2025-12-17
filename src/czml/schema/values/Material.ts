import { nanoid } from "@/utils/common/nanoid";

import {
  createCheckerboardMaterialProp,
  createGridMaterialProp,
  createImageMaterialProp,
  createSolidColorMaterialProp,
  createStripeMaterialProp,
} from "../properties/materialProp.ts";

export class czmlMaterialProp {
  public id = "czml_prop_material_" + nanoid(10);
  public name = "material";
  public _czmlName = "material";
  public labelZh = "材质";
  public labelEn = "material";
  public title = "material";
  public description = "A definition of how a surface is colored or shaded.";
  public descriptionZh = "";

  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlMaterialPropInput";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = true;
  public isComplexProperty = false;

  public compUsedOptions = [
    { label: "solidColor 固定色", value: "solidColor" },
    { label: "image 图像", value: "image" },
    { label: "grid 网格", value: "grid" },
    { label: "stripe 条状", value: "stripe" },
    { label: "checkerboard 棋盘", value: "checkerboard" },
  ];

  public currentProperty = "solidColor";

  public properties = {
    solidColor: createSolidColorMaterialProp(),
    image: createImageMaterialProp(),
    grid: createGridMaterialProp(),
    stripe: createStripeMaterialProp(),
    checkerboard: createCheckerboardMaterialProp(),
  };

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_material_" + options.name + "_" + nanoid(10);
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

    if (options.properties) {
      this.properties = options.properties;
    }

    if (options.compUsedOptions) {
      this.compUsedOptions = options.compUsedOptions;
    }

    if (options.currentProperty) {
      this.currentProperty = options.currentProperty;
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
      const usedProps = this.properties[this.currentProperty];
      if (usedProps) {
        const czmlData = {};
        const keys = Object.keys(usedProps.properties);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const prop = usedProps.properties[key];
          if (prop.getCzmlName && prop.isUsed) {
            const propKey = prop.getCzmlName();
            const propValue = prop.getCzmlValue();
            if (propKey && propValue) {
              czmlData[propKey] = propValue;
            }
          }
        }

        return {
          [usedProps.czmlName]: czmlData,
        };
      } else {
        return null;
      }
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

export default czmlMaterialProp;
