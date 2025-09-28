import { nanoid } from "@/utils/common/nanoid";

export default class CssBackgroundColor {
  public id = "css_background_color_" + nanoid(10);
  public name = "background-color";
  public vueName = "backgroundColor";
  public labelZh = "背景色";
  public labelEn = "background color";
  public tag = "OptionsInput";
  public value = "transparent";
  public isColorValue = false;
  public description = "";

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

  public options = [
    { id: "value", value: "value", titleZh: "颜色值", titleEn: "color", default: true },
    { id: "transparent", value: "transparent", titleZh: "透明", titleEn: "transparent", default: false },
    { id: "currentcolor", value: "currentcolor", titleZh: "当前色", titleEn: "currentcolor", default: false },
    { id: "inherit", value: "inherit", titleZh: "继承", titleEn: "inherit", default: false },
    { id: "initial", value: "initial", titleZh: "初始", titleEn: "initial", default: false },
    { id: "revert", value: "revert", titleZh: "还原色", titleEn: "revert", default: false },
    { id: "revert-layer", value: "revert-layer", titleZh: "还原层", titleEn: "revert-layer", default: false },
    { id: "unset", value: "unset", titleZh: "取消设置", titleEn: "unset", default: false },
  ];

  constructor(value: string = "transparent") {
    this.value = value;
    this.updateIsColorValue(value);
  }

  updateIsColorValue(value: string) {
    if (value === "value") {
      this.isColorValue = true;
    } else {
      this.isColorValue = false;
    }
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

  getClass() {
    return `${this.name}: ${this.value}`;
  }

  getClassName() {
    return this.name;
  }
}
