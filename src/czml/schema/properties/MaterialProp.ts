import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import {
  CZMLPUREVALUE,
  CZMLTIMESECONDS,
  CZMLTIMESTRING,
  CZMLVALUESNOTINTERPOLATE,
  CZMLVALUESWITHINTERPOLATE,
  CZMLCARTESIAN3METERTYPE,
  CZMLCARTESIAN3DEGREESTYPE,
  CZMLCARTESIAN3RADIANSTYPE,
  propValuesCartesian3TypeOptions,
  propValuesInterpolateOptions,
  defaultTimeFormatStr,
  propValuesTimeTypeOptions,
} from "./commondata.ts";

import { czmlOptionsPureProp, CzmlStripeOrientationOptions } from "./OptionsPureProp.ts";
import { czmlStringProp, czmlReferenceValueStrOptions } from "./StringProp.ts";
import czmlCartesian3Prop from "./Cartesian3Prop.ts";
import czmlCartesian3VelocityProp from "./Cartesian3VelocityProp.ts";
import czmlInterpolatableProp from "./InterpolatablePropertyProp.ts";
import { czmlReferencesProp, czmlReferenceValueOptions } from "./ReferencesProps.ts";
import czmlColorProp from "./ColorProp.ts";
import czmlUriProp from "./UriProp.ts";
import czmlCartesian2Prop from "./Cartesian2Prop.ts";
import czmlBooleanIntervalProp from "./BooleanIntervalProp.ts";
import czmlDoubleProp from "./DoubleProp.ts";
import czmlCombineProp from "./CombinePropertyProp.ts";

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
        color: new czmlColorProp({
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
        image: new czmlUriProp({
          $ref: "Uri.json",
          name: "image",
          czmlName: "image",
          isUsed: true,
          isShowUsed: true,
          description: "The image to display on the surface.",
        }),
        repeat: new czmlCombineProp({
          name: "repeat",
          czmlName: "repeat",
          labelZh: "重复数",
          labelEn: "repeat",
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          $ref: "Repeat.json",
          description: "The number of times the image repeats along each axis.",
          default: "[1, 1]",
          properties: {
            cartesian2: new czmlCartesian2Prop({
              name: "cartesian2",
              czmlName: "cartesian2",
              labelZh: "重复数",
              labelEn: "cartesian2",
              isEnable: true,
              isUsed: true,
              isShowUsed: true,
              value: [1, 1],
              $ref: "Values/Cartesian2Value.json",
              description: "The number of times the image repeats along each axis.",
              default: "[1, 1]",
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
              description: "The number of times the image repeats specified as a reference to another property.",
            }),
          },
        }),
        // 是不是可以不用 reference 属性呢，不然感觉界面太复杂了
        // repeat: new czmlCartesian2Prop({
        //   name: "repeat",
        //   czmlName: "repeat",
        //   labelZh: "重复数",
        //   labelEn: "repeat",
        //   isEnable: true,
        //   isUsed: false,
        //   isShowUsed: true,
        //   value: [1, 1],
        //   $ref: "Repeat.json",
        //   description: "The number of times the image repeats along each axis.",
        //   default: "[1, 1]",
        // }),
        color: new czmlColorProp({
          isUsed: false,
          isShowUsed: true,
          $ref: "Color.json",
          description:
            "The color of the image. This color value is multiplied with the image to produce the final color.",
          default: "white",
        }),
        transparent: new czmlBooleanIntervalProp({
          id: "czml_prop_transparent_" + nanoid(10),
          name: "transparent",
          czmlName: "transparent",
          labelZh: "透明",
          labelEn: "transparent",
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
        color: new czmlColorProp({
          isUsed: false,
          isShowUsed: true,
          $ref: "Color.json",
          description: "The color of the surface.",
          default: "white",
        }),
        cellAlpha: new czmlDoubleProp({
          name: "cellAlpha",
          czmlName: "cellAlpha",
          labelZh: "间隔透明度",
          labelEn: "cellAlpha",
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          value: [0.1],
          $ref: "Double.json",
          description: "The alpha value for the space between grid lines. This will be combined with the color alpha.",
          default: [0.1],
        }),
        lineCount: new czmlCartesian2Prop({
          name: "lineCount",
          czmlName: "lineCount",
          labelZh: "间隔数",
          labelEn: "lineCount",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          value: [8, 8],
          $ref: "LineCount.json",
          description: "The number of grid lines along each axis.",
          default: [8, 8],
        }),
        lineThickness: new czmlCartesian2Prop({
          name: "lineThickness",
          czmlName: "lineThickness",
          labelZh: "间隔数",
          labelEn: "lineThickness",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          value: [1.0, 1.0],
          $ref: "LineThickness.json",
          description: "The thickness of grid lines along each axis, in pixels.",
          default: [1.0, 1.0],
        }),
        lineOffset: new czmlCartesian2Prop({
          name: "lineOffset",
          czmlName: "lineOffset",
          labelZh: "行偏移",
          labelEn: "lineOffset",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          value: [0.0, 0.0],
          $ref: "LineOffset.json",
          description: "The offset of grid lines along each axis, as a percentage from 0 to 1.",
          default: [0.0, 0.0],
        }),
      },
    },
    stripe: {
      id: nanoid(),
      czmlName: "stripe",
      isUsed: false,
      $ref: "StripeMaterial.json",
      description: "A material that fills the surface with alternating colors.",
      properties: {
        orientation: new czmlOptionsPureProp({
          ...CzmlStripeOrientationOptions,
          czmlName: "orientation",
          $ref: "StripeOrientation.json",
          description: "The value indicating if the stripes are horizontal or vertical.",
          default: "HORIZONTAL",
        }),
        evenColor: new czmlColorProp({
          labelZh: "偶颜色",
          labelEn: "even color",
          czmlName: "evenColor",
          isUsed: true,
          isShowUsed: true,
          $ref: "Color.json",
          description: "The even color.",
          default: "white",
        }),
        oddColor: new czmlColorProp({
          labelZh: "奇颜色",
          labelEn: "odd color",
          czmlName: "oddColor",
          isUsed: true,
          isShowUsed: true,
          $ref: "Color.json",
          description: "The odd color.",
          default: "black",
        }),
        offset: new czmlDoubleProp({
          name: "offset",
          czmlName: "offset",
          labelZh: "偏移",
          labelEn: "offset",
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          value: [0.0],
          $ref: "Double.json",
          description:
            "The value indicating where in the pattern to begin drawing, with 0.0 being the beginning of the even color, 1.0 the beginning of the odd color, 2.0 being the even color again, and any multiple or fractional values being in between.",
          default: [0.0],
        }),
        repeat: new czmlDoubleProp({
          name: "repeat",
          czmlName: "repeat",
          labelZh: "重复数",
          labelEn: "repeat",
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
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
        evenColor: new czmlColorProp({
          labelZh: "偶颜色",
          labelEn: "even color",
          czmlName: "evenColor",
          isUsed: true,
          isShowUsed: true,
          $ref: "Color.json",
          description: "The even color.",
          default: "white",
        }),
        oddColor: new czmlColorProp({
          labelZh: "奇颜色",
          labelEn: "odd color",
          czmlName: "oddColor",
          isUsed: true,
          isShowUsed: true,
          $ref: "Color.json",
          description: "The odd color.",
          default: "black",
        }),
        repeat: new czmlCartesian2Prop({
          name: "repeat",
          czmlName: "repeat",
          labelZh: "重复数",
          labelEn: "repeat",
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          value: [1, 1],
          $ref: "Repeat.json",
          description: "The number of times the tiles repeat along each axis.",
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
