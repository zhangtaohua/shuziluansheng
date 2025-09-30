import { nanoid } from "@/utils/common/nanoid";
import chroma from "chroma-js";

const DefaultColor = "rgba(255, 0, 0, 0.5)";

export class CssColorOptionsInput {
  public id = "css_background_color_" + nanoid(10);
  public name = "background-color";
  public vueName = "backgroundColor";
  public labelZh = "背景色";
  public labelEn = "background color";
  public tag = "ColorOptionsInput";
  public _value = "transparent";
  public defaultColor = DefaultColor;
  public _isColorValue = false;
  public _isPureColor = true;
  public description = "";
  public options = [];
  public isEnable = true;

  constructor(options: any) {
    this.id = options.id ? options.id : "css_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.vueName = options.vueName ? options.vueName : options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    this.tag = options.tag ? options.tag : "ColorOptionsInput";

    this._value = options.value;

    if (chroma.valid(options.value)) {
      if (options.defaultColor) {
        this.defaultColor = options.defaultColor;
      } else {
        this.defaultColor = options.value;
      }
      this._isColorValue = true;
    } else {
      if (options.defaultColor) {
        this.defaultColor = options.defaultColor;
      } else {
        this.defaultColor = DefaultColor;
      }
      this._isColorValue = false;
    }

    this.options = options.options;
    this.isEnable = options.isEnable ?? true;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  get isColorValue() {
    return this._isColorValue;
  }

  set isColorValue(newValue) {
    this._isColorValue = newValue;
  }

  get isPureColor() {
    return this._isPureColor;
  }

  set isPureColor(newValue) {
    this._isPureColor = newValue;
  }

  getStyle(model = "vue") {
    let name = this.name;
    if (model === "vue") {
      name = this.vueName;
    }
    // because ->  gradient,  so -> background!
    if (name == "background-color" || name == "backgroundColor") {
      name = "background";
    }
    return `"${name}": "${this.value}"`;
  }

  getStyleName(model = "vue") {
    let name = this.name;
    if (model === "vue") {
      name = this.vueName;
    }
    if (name == "background-color" || name == "backgroundColor") {
      name = "background";
    }
    return name;
  }

  getStyleValue() {
    return this.value;
  }

  getClass() {
    let name = this.name;
    if (name == "background-color" || name == "backgroundColor") {
      name = "background";
    }
    return `${name}: ${this.value}`;
  }

  getClassName() {
    return this.name;
  }
}

export default CssColorOptionsInput;

export const CssBackgroundColorOptions = {
  name: "background-color",
  vueName: "backgroundColor",
  labelZh: "背景色",
  labelEn: "background color",
  tag: "ColorOptionsInput",
  isEnable: true,

  value: DefaultColor,
  options: [
    { id: "value", value: "value", titleZh: "颜色值", titleEn: "color", default: true },
    { id: "transparent", value: "transparent", titleZh: "透明", titleEn: "transparent", default: false },
    { id: "currentcolor", value: "currentcolor", titleZh: "当前色", titleEn: "currentcolor", default: false },
    { id: "inherit", value: "inherit", titleZh: "继承", titleEn: "inherit", default: false },
    { id: "initial", value: "initial", titleZh: "初始", titleEn: "initial", default: false },
    { id: "revert", value: "revert", titleZh: "还原色", titleEn: "revert", default: false },
    { id: "revert-layer", value: "revert-layer", titleZh: "还原层", titleEn: "revert-layer", default: false },
    { id: "unset", value: "unset", titleZh: "取消设置", titleEn: "unset", default: false },
  ],

  /* 关键字值 */
  // background-color: red;
  // background-color: indigo;

  /* 特殊关键字值 */
  // background-color: currentcolor;
  // background-color: transparent;

  /* 全局值 */
  // background-color: inherit;
  // background-color: initial;
  // background-color: revert;
  // background-color: revert-layer;
  // background-color: unset;
};
