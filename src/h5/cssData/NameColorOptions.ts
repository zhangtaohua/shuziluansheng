import { nanoid } from "@/utils/common/nanoid";
import chroma from "chroma-js";

import { cssDataType, DefaultCssColor } from "./globalCss";

export class CssColorOptionsInput {
  public id = "css_background_color_" + nanoid(10);
  public name = "background-color";
  public title = "backgroundColor";

  public vueStyleName = "backgroundColor";
  public cssStyleName = "background-color";

  public labelZh = "背景色";
  public labelEn = "background color";
  public description = "";
  public descriptionZh = "";

  public type = cssDataType.pureValue;

  public tag = "ColorOptionsInput";
  public _value = "transparent";

  public defaultColor = DefaultCssColor;

  public properties = undefined;

  public _isColorValue = false;
  public _isPureColor = true;

  public options = [];
  public isEnable = true;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "css_checked_" + options.name + "_" + nanoid(10);
    }

    if (options.name) {
      this.name = options.name;
    }

    if (options.title) {
      this.title = options.title;
    }

    if (options.vueStyleName) {
      this.vueStyleName = options.vueStyleName;
    }

    if (options.cssStyleName) {
      this.cssStyleName = options.cssStyleName;
    }

    if (options.labelZh) {
      this.labelZh = options.labelZh;
    }

    if (options.labelEn) {
      this.labelEn = options.labelEn;
    }

    if (options.description) {
      this.description = options.description;
    }

    if (options.descriptionZh) {
      this.descriptionZh = options.descriptionZh;
    }

    if (options.type) {
      this.type = options.type;
    }

    if (options.tag) {
      this.tag = options.tag;
    }

    if (options.properties) {
      this.properties = options.properties;
    }

    if (options.value) {
      this._value = options.value;

      if (chroma.valid(options.value)) {
        if (options.defaultColor && chroma.valid(options.defaultColor)) {
          this.defaultColor = options.defaultColor;
        } else {
          this.defaultColor = options.value;
        }

        this._isColorValue = true;
      } else {
        if (options.defaultColor && chroma.valid(options.defaultColor)) {
          this.defaultColor = options.defaultColor;
        } else {
          this.defaultColor = DefaultCssColor;
        }
        this._isColorValue = false;
      }
    } else {
      if (options.defaultColor && chroma.valid(options.defaultColor)) {
        this.defaultColor = options.defaultColor;
      } else {
        this.defaultColor = DefaultCssColor;
      }
    }

    if (options.options) {
      this.options = options.options;
    }

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
    let name = this.cssStyleName;
    if (model === "vue") {
      name = this.vueStyleName;
    }
    // because ->  gradient,  so -> background!
    if (name == "background-color" || name == "backgroundColor") {
      name = "background";
    }
    return `"${name}": "${this.value}"`;
  }

  getStyleName(model = "vue") {
    let name = this.cssStyleName;
    if (model === "vue") {
      name = this.vueStyleName;
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
    let name = this.cssStyleName;
    if (name == "background-color" || name == "backgroundColor") {
      name = "background";
    }
    return `${name}: ${this.value}`;
  }

  getClassName() {
    return this.cssStyleName;
  }
}

export default CssColorOptionsInput;

export const CssBackgroundColorOptions = {
  name: "background-color",
  vueStyleName: "backgroundColor",
  labelZh: "背景色",
  labelEn: "background color",
  tag: "ColorOptionsInput",
  isEnable: true,

  value: DefaultCssColor,
  options: [
    { id: "value", value: "value", labelZh: "颜色值", labelEn: "color", default: true },
    { id: "transparent", value: "transparent", labelZh: "透明", labelEn: "transparent", default: false },
    { id: "currentcolor", value: "currentcolor", labelZh: "当前色", labelEn: "currentcolor", default: false },
    { id: "inherit", value: "inherit", labelZh: "继承", labelEn: "inherit", default: false },
    { id: "initial", value: "initial", labelZh: "初始", labelEn: "initial", default: false },
    { id: "revert", value: "revert", labelZh: "还原色", labelEn: "revert", default: false },
    { id: "revert-layer", value: "revert-layer", labelZh: "还原层", labelEn: "revert-layer", default: false },
    { id: "unset", value: "unset", labelZh: "取消设置", labelEn: "unset", default: false },
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
