import { nanoid } from "@/utils/common/nanoid";

export class CssPureOptions {
  public id = "css_pure_options_" + nanoid(10);
  public name = "pure_options";
  public vueName = "pureOptions";
  public labelZh = "纯选择式";
  public labelEn = "pure options";
  public tag = "OptionsInput";
  public _value = "";
  public description = "";
  public options = [];

  constructor(options: any) {
    this.id = options.id ? options.id : "css_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.vueName = options.vueName ? options.vueName : options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    this.tag = options.tag ? options.tag : "OptionsInput";

    this._value = options.value;
    this.options = options.options;
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

  getClass() {
    return `${this.name}: ${this.value}`;
  }

  getClassName() {
    return this.name;
  }
}
export default CssPureOptions;

export const CssDisplayOptions = {
  name: "display",
  vueName: "display",
  labelZh: "显示",
  labelEn: "display",
  tag: "OptionsInput",

  // real default value is static
  value: "flex",
  options: [
    { id: "flex", value: "flex", titleZh: "弹性显示", titleEn: "flex", default: true },
    { id: "inline-flex", value: "inline-flex", titleZh: "行内弹性", titleEn: "inline-flex", default: false },
    { id: "block", value: "block", titleZh: "块", titleEn: "block", default: false },
    { id: "inline-block", value: "inline-block", titleZh: "行内块", titleEn: "inline-block", default: false },
    { id: "inline", value: "inline", titleZh: "行元素", titleEn: "inline", default: false },

    { id: "inherit", value: "inherit", titleZh: "继承", titleEn: "inherit", default: false },
    { id: "initial", value: "initial", titleZh: "初始", titleEn: "initial", default: false },
    { id: "revert", value: "revert", titleZh: "还原色", titleEn: "revert", default: false },
    { id: "revert-layer", value: "revert-layer", titleZh: "还原层", titleEn: "revert-layer", default: false },
    { id: "unset", value: "unset", titleZh: "取消设置", titleEn: "unset", default: false },
  ],

  /* 预组合值 */
  // display: block;
  // display: inline;
  // display: inline-block;
  // display: flex;
  // display: inline-flex;
  // display: grid;
  // display: inline-grid;
  // display: flow-root;

  /* 生成盒子 */
  // display: none;
  // display: contents;

  /* 多关键字语法 */
  // display: block flex;
  // display: block flow;
  // display: block flow-root;
  // display: block grid;
  // display: inline flex;
  // display: inline flow;
  // display: inline flow-root;
  // display: inline grid;

  /* 其他值 */
  // display: table;
  // display: table-row; /* 所有的 table 元素 都有等效的 CSS display 值 */
  // display: list-item;

  /* 全局值 */
  // display: inherit;
  // display: initial;
  // display: revert;
  // display: revert-layer;
  // display: unset;
};

export const CssPositionOptions = {
  name: "position",
  vueName: "position",
  labelZh: "位置",
  labelEn: "位置",
  tag: "OptionsInput",

  // real default value is static
  value: "absolute",
  options: [
    { id: "absolute", value: "absolute", titleZh: "绝对值", titleEn: "absolute", default: true },
    { id: "static", value: "static", titleZh: "正常值", titleEn: "static", default: false },
    { id: "relative", value: "relative", titleZh: "相对值", titleEn: "relative", default: false },
    { id: "fixed", value: "fixed", titleZh: "固定值", titleEn: "fixed", default: false },
    { id: "sticky", value: "sticky", titleZh: "黏", titleEn: "sticky", default: false },

    { id: "inherit", value: "inherit", titleZh: "继承", titleEn: "inherit", default: false },
    { id: "initial", value: "initial", titleZh: "初始", titleEn: "initial", default: false },
    { id: "revert", value: "revert", titleZh: "还原色", titleEn: "revert", default: false },
    { id: "revert-layer", value: "revert-layer", titleZh: "还原层", titleEn: "revert-layer", default: false },
    { id: "unset", value: "unset", titleZh: "取消设置", titleEn: "unset", default: false },
  ],

  // position: static;
  // position: relative;
  // position: absolute;
  // position: fixed;
  // position: sticky;

  /* 全局值 */
  // position: inherit;
  // position: initial;
  // position: revert;
  // position: revert-layer;
  // position: unset;
};
