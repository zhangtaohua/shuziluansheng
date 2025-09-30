import { nanoid } from "@/utils/common/nanoid";
import chroma from "chroma-js";

const DefaultColor = "rgba(255, 0, 0, 0.5)";

export class CssColorInput {
  public id = "css_background_color_" + nanoid(10);
  public name = "background-color";
  public vueName = "backgroundColor";
  public labelZh = "背景色";
  public labelEn = "background color";
  public tag = "ColorInput";
  public _value = "transparent";
  public defaultColor = DefaultColor;
  public _isColorValue = true;
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
    this.tag = options.tag ? options.tag : "ColorInput";

    if (chroma.valid(options.value)) {
      this._value = options.value;

      if (options.defaultColor) {
        this.defaultColor = options.defaultColor;
      } else {
        this.defaultColor = options.value;
      }
    } else {
      if (options.defaultColor) {
        this._value = options.defaultColor;
        this.defaultColor = options.defaultColor;
      } else {
        this._value = DefaultColor;
        this.defaultColor = DefaultColor;
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

export default CssColorInput;

export const CssColorOptions = {
  name: "color",
  vueName: "color",
  labelZh: "颜色",
  labelEn: "color",
  tag: "ColorInput",
  isEnable: true,
  value: DefaultColor,
};
