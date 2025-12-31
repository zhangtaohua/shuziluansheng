import { CssPureOptionsInput } from "../cssData/PureOptions";

export const CssDisplayOptions = {
  name: "display",
  vueStyleName: "display",
  labelZh: "显示",
  labelEn: "display",
  tag: "OptionsInput",
  isEnable: true,

  // real default value is static
  value: "flex",
  options: [
    { id: "flex", value: "flex", labelZh: "弹性显示", labelEn: "flex", default: true },
    { id: "inline-flex", value: "inline-flex", labelZh: "行内弹性", labelEn: "inline-flex", default: false },
    { id: "block", value: "block", labelZh: "块", labelEn: "block", default: false },
    { id: "inline-block", value: "inline-block", labelZh: "行内块", labelEn: "inline-block", default: false },
    { id: "inline", value: "inline", labelZh: "行元素", labelEn: "inline", default: false },

    { id: "inherit", value: "inherit", labelZh: "继承", labelEn: "inherit", default: false },
    { id: "initial", value: "initial", labelZh: "初始", labelEn: "initial", default: false },
    { id: "revert", value: "revert", labelZh: "还原色", labelEn: "revert", default: false },
    { id: "revert-layer", value: "revert-layer", labelZh: "还原层", labelEn: "revert-layer", default: false },
    { id: "unset", value: "unset", labelZh: "取消设置", labelEn: "unset", default: false },
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
  vueStyleName: "position",
  labelZh: "位置",
  labelEn: "position",
  tag: "OptionsInput",
  isEnable: false,

  // real default value is static
  value: "absolute",
  options: [
    { id: "absolute", value: "absolute", labelZh: "绝对值", labelEn: "absolute", default: true },
    { id: "static", value: "static", labelZh: "正常值", labelEn: "static", default: false },
    { id: "relative", value: "relative", labelZh: "相对值", labelEn: "relative", default: false },
    { id: "fixed", value: "fixed", labelZh: "固定值", labelEn: "fixed", default: false },
    { id: "sticky", value: "sticky", labelZh: "黏", labelEn: "sticky", default: false },

    { id: "inherit", value: "inherit", labelZh: "继承", labelEn: "inherit", default: false },
    { id: "initial", value: "initial", labelZh: "初始", labelEn: "initial", default: false },
    { id: "revert", value: "revert", labelZh: "还原色", labelEn: "revert", default: false },
    { id: "revert-layer", value: "revert-layer", labelZh: "还原层", labelEn: "revert-layer", default: false },
    { id: "unset", value: "unset", labelZh: "取消设置", labelEn: "unset", default: false },
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

export const CssFontWeightOptions = {
  name: "font-weight",
  vueStyleName: "fontWeight",
  labelZh: "字体粗细",
  labelEn: "font weight",
  tag: "OptionsInput",
  isEnable: true,

  value: "normal",
  options: [
    { id: "normal", value: "normal", labelZh: "正常值", labelEn: "normal", default: true },
    { id: "bold", value: "bold", labelZh: "粗体", labelEn: "bold", default: false },

    { id: "lighter", value: "lighter", labelZh: "相对更细", labelEn: "lighter", default: false },
    { id: "bolder", value: "bolder", labelZh: "相对更粗", labelEn: "bolder", default: false },

    { id: "100", value: "100", labelZh: "100", labelEn: "100", default: false },
    { id: "200", value: "200", labelZh: "200", labelEn: "200", default: false },
    { id: "300", value: "300", labelZh: "300", labelEn: "300", default: false },
    { id: "400", value: "400", labelZh: "400", labelEn: "400", default: false },
    { id: "500", value: "500", labelZh: "500", labelEn: "500", default: false },
    { id: "600", value: "600", labelZh: "600", labelEn: "600", default: false },
    { id: "700", value: "700", labelZh: "700", labelEn: "700", default: false },
    { id: "800", value: "800", labelZh: "800", labelEn: "800", default: false },
    { id: "900", value: "900", labelZh: "900", labelEn: "900", default: false },
    { id: "1000", value: "1000", labelZh: "1000", labelEn: "1000", default: false },

    { id: "inherit", value: "inherit", labelZh: "继承", labelEn: "inherit", default: false },
    { id: "initial", value: "initial", labelZh: "初始", labelEn: "initial", default: false },
    { id: "unset", value: "unset", labelZh: "取消设置", labelEn: "unset", default: false },
  ],
};

export const CssFontStyleOptions = {
  name: "font-style",
  vueStyleName: "fontStyle",
  labelZh: "字体样式",
  labelEn: "font style",
  tag: "OptionsInput",
  isEnable: true,

  value: "normal",
  options: [
    { id: "normal", value: "normal", labelZh: "常规", labelEn: "normal", default: true },
    { id: "italic", value: "italic", labelZh: "斜体", labelEn: "italic", default: false },

    // font-style: oblique;
    // font-style: oblique 10deg;
    // Valid values are degree values of -90deg to 90deg inclusive. If an angle is not specified, an angle of 14 degrees is used.
    { id: "oblique", value: "oblique", labelZh: "oblique", labelEn: "oblique", default: false },
    {
      id: "oblique-neg-14deg",
      value: "oblique -14deg",
      labelZh: "oblique -14deg",
      labelEn: "oblique -14deg",
      default: false,
    },

    { id: "inherit", value: "inherit", labelZh: "继承", labelEn: "inherit", default: false },
    { id: "initial", value: "initial", labelZh: "初始", labelEn: "initial", default: false },
    { id: "unset", value: "unset", labelZh: "取消设置", labelEn: "unset", default: false },
  ],
};

export const CssObjectFitOptions = {
  name: "object-fit",
  vueStyleName: "objectFit",
  labelZh: "自适应",
  labelEn: "object fit",
  tag: "OptionsInput",
  isEnable: true,

  value: "fill",
  options: [
    { id: "fill", value: "fill", labelZh: "填充", labelEn: "fill", default: true },
    { id: "cover", value: "cover", labelZh: "覆盖", labelEn: "cover", default: false },
    { id: "contain", value: "contain", labelZh: "包含", labelEn: "contain", default: false },
    { id: "none", value: "none", labelZh: "无", labelEn: "none", default: false },
    { id: "scale-down", value: "scale-down", labelZh: "降级", labelEn: "scale-down", default: false },
  ],
};

// RJTODO
// 这个因为复杂一些，目前用不上，后期再优化实现
export const CssObjectPosition = {
  /* 关键字值 */
  // object-position: top;
  // object-position: bottom;
  // object-position: left;
  // object-position: right;
  // object-position: center;
  /* <percentage> 值 */
  // object-position: 25% 75%;
  /* <length> 值 */
  // object-position: 0 0;
  // object-position: 1cm 2cm;
  // object-position: 10ch 8em;
  /* 边缘偏移值 */
  // object-position: bottom 10px right 20px;
  // object-position: right 3em bottom 10px;
  // object-position: top 0 right 10px;
  /* 全局关键字 */
  // object-position: inherit;
  // object-position: initial;
  // object-position: revert;
  // object-position: revert-layer;
  // object-position: unset;
};

export const CssBorderStyleOptions = {
  name: "border-style",
  vueStyleName: "borderStyle",
  labelZh: "边框样式",
  labelEn: "border style",
  tag: "OptionsInput",
  isEnable: true,

  value: "none",
  options: [
    { id: "none", value: "none", labelZh: "无", labelEn: "none", default: true },
    { id: "hidden", value: "hidden", labelZh: "隐藏", labelEn: "hidden", default: false },
    { id: "solid", value: "solid", labelZh: "实线", labelEn: "solid", default: false },
    { id: "dotted", value: "dotted", labelZh: "圆点", labelEn: "dotted", default: false },
    { id: "dashed", value: "dashed", labelZh: "虚线", labelEn: "dashed", default: false },
    { id: "double", value: "double", labelZh: "双实线", labelEn: "double", default: false },

    { id: "groove", value: "groove", labelZh: "雕刻", labelEn: "groove", default: false },
    { id: "ridge", value: "ridge", labelZh: "浮雕", labelEn: "ridge", default: false },
    { id: "inset", value: "inset", labelZh: "陷入", labelEn: "inset", default: false },
    { id: "outset", value: "outset", labelZh: "突出", labelEn: "outset", default: false },
  ],
};

export function createCssFontStyleProp(options = {}) {
  return new CssPureOptionsInput({
    ...CssFontStyleOptions,
    ...options,
  });
}

export function createCssFontWeightProp(options = {}) {
  return new CssPureOptionsInput({
    ...CssFontWeightOptions,
    ...options,
  });
}

export function createCssBorderStyleProp(options = {}) {
  return new CssPureOptionsInput({
    ...CssBorderStyleOptions,
    ...options,
  });
}

export function createCssBorderTopStyleProp(options = {}) {
  return new CssPureOptionsInput({
    ...CssBorderStyleOptions,
    name: "border-top-style",
    vueStyleName: "borderTopStyle",
    labelZh: "边框顶部样式",
    labelEn: "border top style",
    ...options,
  });
}

export function createCssBorderBottomStyleProp(options = {}) {
  return new CssPureOptionsInput({
    ...CssBorderStyleOptions,
    name: "border-bottom-style",
    vueStyleName: "borderBottomStyle",
    labelZh: "边框底部样式",
    labelEn: "border bottom style",
    ...options,
  });
}

export function createCssBorderLeftStyleProp(options = {}) {
  return new CssPureOptionsInput({
    ...CssBorderStyleOptions,
    name: "border-left-style",
    vueStyleName: "borderLeftStyle",
    labelZh: "边框左侧样式",
    labelEn: "border left style",
    ...options,
  });
}

export function createCssBorderRightStyleProp(options = {}) {
  return new CssPureOptionsInput({
    ...CssBorderStyleOptions,
    name: "border-right-style",
    vueStyleName: "borderRightStyle",
    labelZh: "边框右侧样式",
    labelEn: "border right style",
    ...options,
  });
}

export function createCssObjectFitProp(options = {}) {
  return new CssPureOptionsInput({
    ...CssObjectFitOptions,
    ...options,
  });
}
