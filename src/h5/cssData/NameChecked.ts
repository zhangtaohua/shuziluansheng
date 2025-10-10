import { nanoid } from "@/utils/common/nanoid";


export class CssCheckedInput {
  public id = "css_checked_color_" + nanoid(10);
  public name = "checked";
  public vueName = "checked";
  public labelZh = "使能";
  public labelEn = "checked";
  public tag = "CheckInput";
  public _value = "false";
  public description = "";
  public isEnable = true;

  constructor(options: any) {
    this.id = options.id ? options.id : "css_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.vueName = options.vueName ? options.vueName : options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    this.tag = options.tag ? options.tag : "CheckInput";

    this._value = options.value;
    this.isEnable = options.isEnable ?? true;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  getStyle(model = "vue") {
    let name = this.name;
    if (model === "vue") {
      name = this.vueName;
    }
    return `"${name}": "${this.value}"`;
  }

  getStyleName(model = "vue") {
    let name = this.name;
    if (model === "vue") {
      name = this.vueName;
    }
    return name;
  }

  getStyleValue() {
    return this.value;
  }

  // getClass() {
  //   return `${this.name}: ${this.value}`;
  // }

  getClass() {
    return "";
  }

  getClassName() {
    return this.name;
  }
}

export default CssCheckedInput;

export const CssBackgroundClipTextOptions = {
  name: "background-clip-text",
  vueName: "backgroundClipText",
  labelZh: "文字裁剪背景",
  labelEn: "background clip text",
  tag: "CheckInput",
  isEnable: true,
};
