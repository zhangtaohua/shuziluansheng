import {
  CssNamePixel,
  CssWidthOptions,
  CssMaxWidthOptions,
  CssMinWidthOptions,
  CssHeightOptions,
  CssTopOptions,
  CssLeftOptions,
  CssFontSizeOptions,
  CssLineHeightOptions,
  CssTextEllipseLines,
} from "../cssData/NamePixel.ts";

export const CssRightOptions = {
  name: "right",
  vueName: "right",
  labelZh: "右侧",
  labelEn: "right",
  tag: "NumberInputSlider",
  value: 10,
  unit: "px",
  max: 2000,
  min: -1000,
  isEnable: true,
};

export const CssBottomOptions = {
  name: "bottom",
  vueName: "bottom",
  labelZh: "底部",
  labelEn: "bottom",
  tag: "NumberInputSlider",
  value: 10,
  unit: "px",
  max: 2000,
  min: -1000,
  isEnable: true,
};

export const CssRotateOptions = {
  name: "rotate",
  vueName: "rotate",
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
  vueName: "z-index",
  labelZh: "层级",
  labelEn: "z index",
  tag: "NumberInputSlider",
  value: 1,
  unit: "",
  max: 300,
  min: 1,
  isEnable: true,
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
