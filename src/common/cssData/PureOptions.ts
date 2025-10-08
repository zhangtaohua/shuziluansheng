import { nanoid } from "@/utils/common/nanoid";

export class CssPureOptionsInput {
  public id = "css_pure_options_" + nanoid(10);
  public name = "pure_options";
  public vueName = "pureOptions";
  public labelZh = "纯选择式";
  public labelEn = "pure options";
  public tag = "OptionsInput";
  public _value = "";
  public description = "";
  public options = [];
  public isEnable = true;

  constructor(options: any) {
    this.id = options.id ? options.id : "css_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.vueName = options.vueName ? options.vueName : options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    this.tag = options.tag ? options.tag : "OptionsInput";

    this._value = options.value;
    this.options = options.options;
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

  getClass() {
    return `${this.name}: ${this.value}`;
  }

  getClassName() {
    return this.name;
  }
}

export default CssPureOptionsInput;

export const CssDisplayOptions = {
  name: "display",
  vueName: "display",
  labelZh: "显示",
  labelEn: "display",
  tag: "OptionsInput",
  isEnable: true,

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
  labelEn: "position",
  tag: "OptionsInput",
  isEnable: false,

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

export const CssfontWeightOptions = {
  name: "font-weight",
  vueName: "fontWeight",
  labelZh: "字体粗细",
  labelEn: "font weight",
  tag: "OptionsInput",
  isEnable: true,

  value: "normal",
  options: [
    { id: "normal", value: "normal", titleZh: "正常值", titleEn: "normal", default: true },
    { id: "bold", value: "bold", titleZh: "粗体", titleEn: "bold", default: false },

    { id: "lighter", value: "lighter", titleZh: "相对更细", titleEn: "lighter", default: false },
    { id: "bolder", value: "bolder", titleZh: "相对更粗", titleEn: "bolder", default: false },

    { id: "100", value: "100", titleZh: "100", titleEn: "100", default: false },
    { id: "200", value: "200", titleZh: "200", titleEn: "200", default: false },
    { id: "300", value: "300", titleZh: "300", titleEn: "300", default: false },
    { id: "400", value: "400", titleZh: "400", titleEn: "400", default: false },
    { id: "500", value: "500", titleZh: "500", titleEn: "500", default: false },
    { id: "600", value: "600", titleZh: "600", titleEn: "600", default: false },
    { id: "700", value: "700", titleZh: "700", titleEn: "700", default: false },
    { id: "800", value: "800", titleZh: "800", titleEn: "800", default: false },
    { id: "900", value: "900", titleZh: "900", titleEn: "900", default: false },
    { id: "1000", value: "1000", titleZh: "1000", titleEn: "1000", default: false },

    { id: "inherit", value: "inherit", titleZh: "继承", titleEn: "inherit", default: false },
    { id: "initial", value: "initial", titleZh: "初始", titleEn: "initial", default: false },
    { id: "unset", value: "unset", titleZh: "取消设置", titleEn: "unset", default: false },
  ],
};

export const CssfontStyleOptions = {
  name: "font-style",
  vueName: "fontStyle",
  labelZh: "字体样式",
  labelEn: "font style",
  tag: "OptionsInput",
  isEnable: true,

  value: "normal",
  options: [
    { id: "normal", value: "normal", titleZh: "常规", titleEn: "normal", default: true },
    { id: "italic", value: "italic", titleZh: "斜体", titleEn: "italic", default: false },

    // font-style: oblique;
    // font-style: oblique 10deg;
    // Valid values are degree values of -90deg to 90deg inclusive. If an angle is not specified, an angle of 14 degrees is used.
    { id: "oblique", value: "oblique", titleZh: "oblique", titleEn: "oblique", default: false },
    {
      id: "oblique-neg-14deg",
      value: "oblique -14deg",
      titleZh: "oblique -14deg",
      titleEn: "oblique -14deg",
      default: false,
    },

    { id: "inherit", value: "inherit", titleZh: "继承", titleEn: "inherit", default: false },
    { id: "initial", value: "initial", titleZh: "初始", titleEn: "initial", default: false },
    { id: "unset", value: "unset", titleZh: "取消设置", titleEn: "unset", default: false },
  ],
};
