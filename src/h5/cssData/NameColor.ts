import { nanoid } from "@/utils/common/nanoid";
import chroma from "chroma-js";

import { cssDataType, DefaultCssColor } from "./globalCss";

export class CssColorInput {
  public id = "css_color_" + nanoid(10);
  public name = "color";
  public title = "color";

  public vueStyleName = "color";
  public cssStyleName = "color";

  public labelZh = "颜色";
  public labelEn = "color";
  public description = "";
  public descriptionZh = "";

  public type = cssDataType.pureValue;

  public tag = "ColorInput";
  public _value = "transparent";

  public defaultColor = DefaultCssColor;

  public properties = undefined;

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

    if (chroma.valid(options.value)) {
      this._value = options.value;

      if (options.defaultColor && chroma.valid(options.defaultColor)) {
        this.defaultColor = options.defaultColor;
      } else {
        this.defaultColor = options.value;
      }
    } else {
      if (options.defaultColor && chroma.valid(options.defaultColor)) {
        this._value = options.defaultColor;
        this.defaultColor = options.defaultColor;
      } else {
        this._value = DefaultCssColor;
        this.defaultColor = DefaultCssColor;
      }
    }

    this.isEnable = options.isEnable ?? true;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
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

export default CssColorInput;

export const CssColorOptions = {
  name: "color",
  vueStyleName: "color",
  cssStyleName: "color",
  labelZh: "颜色",
  labelEn: "color",
  tag: "ColorInput",
  isEnable: true,
  value: DefaultCssColor,
};
