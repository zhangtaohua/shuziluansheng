import { nanoid } from "@/utils/common/nanoid";

import { createColorProp, createEvenColorProp, createOddColorProp } from "../properties/colorProp.ts";
import { createImageProp } from "../properties/urlProp.ts";
import { createRepeatProp } from "../properties/repeatProp.ts";
import { createTransparentProp } from "../properties/booleanProp.ts";
import { createCellAlphaDoubleProp, createOffsetDoubleProp, createRepeatDoubleProp } from "../properties/doubleProp.ts";
import { createLineCountProp } from "../properties/lineCountProp.ts";
import { createLineThicknessProp } from "../properties/lineThicknessProp.ts";
import { createLineOffsetProp } from "../properties/lineOffsetProp.ts";
import { createStripeOrientationCombineProp } from "../properties/stripeProp.ts";

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
    solidColor: {
      id: nanoid(),
      czmlName: "solidColor",
      isUsed: true,
      $ref: "SolidColorMaterial.json",
      description: "A material that fills the surface with a solid color, which may be translucent.",
      properties: {
        color: createColorProp({
          isUsed: true,
          isShowUsed: true,
          $ref: "Color.json",
          description: "The color of the surface.",
          default: "white",
        }),
      },
    },
    image: {
      id: nanoid(),
      czmlName: "image",
      isUsed: false,
      $ref: "ImageMaterial.json",
      description: "A material that fills the surface with an image.",
      properties: {
        image: createImageProp({
          $ref: "Uri.json",
          name: "image",
          labelZh: "图像链接",
          labelEn: "image uri",
          czmlName: "image",
          isUsed: true,
          isShowUsed: true,
          description: "The image to display on the surface.",
        }),
        repeat: createRepeatProp(),
        color: createColorProp({
          isUsed: false,
          isShowUsed: true,
          $ref: "Color.json",
          description:
            "The color of the image. This color value is multiplied with the image to produce the final color.",
          default: "white",
        }),
        transparent: createTransparentProp({
          value: false,
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          $ref: "Boolean.json",
          description: "Whether or not the image has transparency.",
          default: false,
        }),
      },
    },
    grid: {
      id: nanoid(),
      czmlName: "grid",
      isUsed: false,
      $ref: "GridMaterial.json",
      description: "A material that fills the surface with a grid.",
      properties: {
        color: createColorProp({
          isUsed: false,
          isShowUsed: true,
          $ref: "Color.json",
          description: "The color of the surface.",
          default: "white",
        }),
        cellAlpha: createCellAlphaDoubleProp({
          $ref: "Double.json",
          description: "The alpha value for the space between grid lines. This will be combined with the color alpha.",
        }),
        lineCount: createLineCountProp(),
        lineThickness: createLineThicknessProp(),
        lineOffset: createLineOffsetProp(),
      },
    },
    stripe: {
      id: nanoid(),
      czmlName: "stripe",
      isUsed: false,
      $ref: "StripeMaterial.json",
      description: "A material that fills the surface with alternating colors.",
      properties: {
        orientation: createStripeOrientationCombineProp(),
        evenColor: createEvenColorProp(),
        oddColor: createOddColorProp(),
        offset: createOffsetDoubleProp({
          $ref: "Double.json",
          description:
            "The value indicating where in the pattern to begin drawing, with 0.0 being the beginning of the even color, 1.0 the beginning of the odd color, 2.0 being the even color again, and any multiple or fractional values being in between.",
          default: [0.0],
        }),
        repeat: createRepeatDoubleProp({
          value: [1.0],
          $ref: "Double.json",
          description: "The number of times the stripes repeat.",
          default: [1.0],
        }),
      },
    },
    checkerboard: {
      id: nanoid(),
      czmlName: "checkerboard",
      isUsed: false,
      $ref: "CheckerboardMaterial.json",
      description: "A material that fills the surface with a checkerboard pattern.",
      properties: {
        evenColor: createEvenColorProp(),
        oddColor: createOddColorProp(),
        repeat: createRepeatProp({
          $ref: "Repeat.json",
          description: "The number of times the image repeats along each axis.",
          default: [2, 2],
        }),
      },
    },
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
