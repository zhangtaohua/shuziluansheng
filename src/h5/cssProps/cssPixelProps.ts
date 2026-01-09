import { fontSizeUnitOptions, pxAllUnitOptions } from "../cssData/globalCss.ts";
import { CssNamePixel } from "../cssData/NamePixel.ts";

// width
// height
// max-width
// min-width
// max-height
// min-height
// font-size
// line-height (行高，如果设置为具体值，可以使用 px)
// top
// bottom
// left
// right
// margin
// padding
// border-width
// border-radius (边框圆角半径)
// box-shadow (盒子阴影的偏移量和模糊半径)
// background-position (背景图片的定位)

export const CssWidthOptions = {
  name: "width",
  vueStyleName: "width",
  cssStyleName: "width",
  labelZh: "宽度",
  labelEn: "width",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssMaxWidthOptions = {
  name: "max-width",
  vueStyleName: "maxWidth",
  cssStyleName: "max-width",
  labelZh: "最大宽度",
  labelEn: "max width",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssMinWidthOptions = {
  name: "min-width",
  vueStyleName: "minWidth",
  cssStyleName: "min-width",
  labelZh: "最小宽度",
  labelEn: "min width",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssHeightOptions = {
  name: "height",
  vueStyleName: "height",
  cssStyleName: "height",
  labelZh: "高度",
  labelEn: "height",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssMaxHeightOptions = {
  name: "max-height",
  vueStyleName: "maxHeight",
  cssStyleName: "max-height",
  labelZh: "最大高度",
  labelEn: "max height",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssMinHeightOptions = {
  name: "min-height",
  vueStyleName: "minHeight",
  cssStyleName: "min-height",
  labelZh: "最小高度",
  labelEn: "min height",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssFontSizeOptions = {
  name: "font-size",
  vueStyleName: "fontSize",
  cssStyleName: "font-size",
  labelZh: "文字大小",
  labelEn: "font-size",
  tag: "NumberInputSlider",
  value: 16,
  unit: "px",
  max: 300,
  min: 8,
  isEnable: true,
  unitOptions: fontSizeUnitOptions,
};

export const CssLineHeightOptions = {
  name: "line-height",
  vueStyleName: "lineHeight",
  cssStyleName: "line-height",
  labelZh: "行高",
  labelEn: "line height",
  tag: "NumberInputSlider",
  value: 16,
  unit: "px",
  max: 100,
  min: 0,
  isEnable: true,
  unitOptions: fontSizeUnitOptions,
};

export const CssTextEllipseLines = {
  name: "text-ellipse-lines",
  vueStyleName: "text-ellipse-lines",
  cssStyleName: "text-ellipse-lines",
  labelZh: "文本省略行数",
  labelEn: "text ellipse lines",
  tag: "NumberInputSlider",
  value: 0,
  unit: "",
  max: 10,
  min: 0,
  isEnable: true,
  unitOptions: null,
};

export const CssTopOptions = {
  name: "top",
  vueStyleName: "top",
  cssStyleName: "top",
  labelZh: "顶部",
  labelEn: "top",
  tag: "NumberInputSlider",
  value: 48,
  unit: "px",
  max: 2000,
  min: -1000,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssLeftOptions = {
  name: "left",
  vueStyleName: "left",
  cssStyleName: "left",
  labelZh: "左侧",
  labelEn: "left",
  tag: "NumberInputSlider",
  value: 48,
  unit: "px",
  max: 2000,
  min: -1000,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssRightOptions = {
  name: "right",
  vueStyleName: "right",
  cssStyleName: "right",
  labelZh: "右侧",
  labelEn: "right",
  tag: "NumberInputSlider",
  value: 10,
  unit: "px",
  max: 2000,
  min: -1000,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBottomOptions = {
  name: "bottom",
  vueStyleName: "bottom",
  cssStyleName: "bottom",
  labelZh: "底部",
  labelEn: "bottom",
  tag: "NumberInputSlider",
  value: 10,
  unit: "px",
  max: 2000,
  min: -1000,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssRotateOptions = {
  name: "rotate",
  vueStyleName: "rotate",
  cssStyleName: "rotate",
  labelZh: "旋转",
  labelEn: "rotate",
  tag: "NumberInputSlider",
  value: 0,
  unit: "deg",
  max: 360,
  min: -360,
  isEnable: true,
};

export const CssZindexOptions = {
  name: "z-index",
  vueStyleName: "zIndex",
  cssStyleName: "z-index",
  labelZh: "层级",
  labelEn: "z index",
  tag: "NumberInputSlider",
  value: 1,
  unit: "",
  max: 300,
  min: 1,
  isEnable: true,
};

export const CssBorderWidthOptions = {
  name: "border-width",
  vueStyleName: "borderWidth",
  cssStyleName: "border-width",
  labelZh: "边框宽度",
  labelEn: "border width",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBorderLeftWidthOptions = {
  name: "border-left-width",
  vueStyleName: "borderLeftWidth",
  cssStyleName: "border-left-width",
  labelZh: "边框左侧宽度",
  labelEn: "border left width",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBorderRightWidthOptions = {
  name: "border-right-width",
  vueStyleName: "borderRightWidth",
  cssStyleName: "border-right-width",
  labelZh: "边框右侧宽度",
  labelEn: "border right width",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBorderTopWidthOptions = {
  name: "border-top-width",
  vueStyleName: "borderTopWidth",
  cssStyleName: "border-top-width",
  labelZh: "边框顶部宽度",
  labelEn: "border top width",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBorderBottomWidthOptions = {
  name: "border-bottom-width",
  vueStyleName: "borderBottomWidth",
  cssStyleName: "border-bottom-width",
  labelZh: "边框底部宽度",
  labelEn: "border bottom width",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBorderRadiusOptions = {
  name: "border-radius",
  vueStyleName: "borderRadius",
  cssStyleName: "border-radius",
  labelZh: "边框圆角",
  labelEn: "border radius",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBorderTopLeftRadiusOptions = {
  name: "border-top-left-radius",
  vueStyleName: "borderTopLeftRadius",
  cssStyleName: "border-top-left-radius",
  labelZh: "边框左上圆角",
  labelEn: "border top left radius",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBorderBottomLeftRadiusOptions = {
  name: "border-bottom-left-radius",
  vueStyleName: "borderBottomLeftRadius",
  cssStyleName: "border-bottom-left-radius",
  labelZh: "边框左下圆角",
  labelEn: "border bottom left radius",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBorderTopRightRadiusOptions = {
  name: "border-top-right-radius",
  vueStyleName: "borderTopRightRadius",
  cssStyleName: "border-top-right-radius",
  labelZh: "边框右上圆角",
  labelEn: "border top right radius",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export const CssBorderBottomRightRadiusOptions = {
  name: "border-bottom-right-radius",
  vueStyleName: "borderBottomRightRadius",
  cssStyleName: "border-bottom-right-radius",
  labelZh: "边框右下圆角",
  labelEn: "border bottom right radius",
  tag: "NumberInputSlider",
  value: 0,
  unit: "px",
  max: 1024,
  min: 0,
  isEnable: true,
  unitOptions: pxAllUnitOptions,
};

export function createCssWidthProp(options = {}) {
  return new CssNamePixel({
    ...CssWidthOptions,
    ...options,
  });
}

export function createCssHeightProp(options = {}) {
  return new CssNamePixel({
    ...CssHeightOptions,
    ...options,
  });
}

export function createCssToptProp(options = {}) {
  return new CssNamePixel({
    ...CssTopOptions,
    ...options,
  });
}

export function createCssLeftProp(options = {}) {
  return new CssNamePixel({
    ...CssLeftOptions,
    ...options,
  });
}

export function createCssRightProp(options = {}) {
  return new CssNamePixel({
    ...CssRightOptions,
    ...options,
  });
}

export function createCssBottomProp(options = {}) {
  return new CssNamePixel({
    ...CssRightOptions,
    ...options,
  });
}

export function createCssRotateProp(options = {}) {
  return new CssNamePixel({
    ...CssRotateOptions,
    ...options,
  });
}

export function createCssZIndexProp(options = {}) {
  return new CssNamePixel({
    ...CssZindexOptions,
    ...options,
  });
}

export function createCssFontSizeProp(options = {}) {
  return new CssNamePixel({
    ...CssFontSizeOptions,
    ...options,
  });
}

export function createCssLineHeightProp(options = {}) {
  return new CssNamePixel({
    ...CssLineHeightOptions,
    ...options,
  });
}

export function createCssTextEllipseLinesProp(options = {}) {
  return new CssNamePixel({
    ...CssTextEllipseLines,
    ...options,
  });
}

export function createCssBorderWidthProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderWidthOptions,
    ...options,
  });
}

export function createCssBorderLeftWidthProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderLeftWidthOptions,
    ...options,
  });
}

export function createCssBorderRightWidthProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderRightWidthOptions,
    ...options,
  });
}

export function createCssBorderTopWidthProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderTopWidthOptions,
    ...options,
  });
}

export function createCssBorderBottomWidthProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderBottomWidthOptions,
    ...options,
  });
}

export function createCssBorderRadiusProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderRadiusOptions,
    ...options,
  });
}

export function createCssBorderTopLeftRadiusProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderTopLeftRadiusOptions,
    ...options,
  });
}

export function createCssBorderBottomLeftRadiusProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderBottomLeftRadiusOptions,
    ...options,
  });
}

export function createCssBorderTopRightRadiusProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderTopRightRadiusOptions,
    ...options,
  });
}

export function createCssBorderBottomRightRadiusProp(options = {}) {
  return new CssNamePixel({
    ...CssBorderBottomRightRadiusOptions,
    ...options,
  });
}
