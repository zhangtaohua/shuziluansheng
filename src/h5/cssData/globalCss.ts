import { nanoid } from "@/utils/common/nanoid";

let globalCssZIndex = 0;

export const DefaultCssColor = "rgba(255, 0, 0, 0.5)";

export function getZIndex() {
  globalCssZIndex = globalCssZIndex + 1;
  return globalCssZIndex;
}

export function resetZIndex() {
  globalCssZIndex = 0;
}

export const cssDataType = {
  pureValue: "cssPureValue",
  combineValue: "cssCombineValue",
};

export const pxUnitOption = {
  id: "cssPxUnit",
  value: "px",
  labelZh: "像素",
  labelEn: "px",
};

export const remUnitOption = {
  id: "cssRemUnit",
  value: "rem",
  labelZh: "rem",
  labelEn: "rem",
};

export const percentageUnitOption = {
  id: "cssPercentageUnit",
  value: "%",
  labelZh: "百分比",
  labelEn: "%",
};

export const vwUnitOption = {
  id: "cssVwUnit",
  value: "vw",
  labelZh: "vw",
  labelEn: "vw",
};

export const vhUnitOption = {
  id: "cssVhUnit",
  value: "vh",
  labelZh: "vh",
  labelEn: "vh",
};

export const degUnitOption = {
  id: "cssDegUnit",
  value: "deg",
  labelZh: "deg",
  labelEn: "vh",
};

export const numberUnitOption = {
  id: "cssNumberUnit",
  value: "",
  labelZh: "",
  labelEn: "",
};

export const pxAllUnitOptions = [pxUnitOption, percentageUnitOption, vwUnitOption, vhUnitOption, remUnitOption];
export const fontSizeUnitOptions = [pxUnitOption, remUnitOption];

export function getControlTransform(styles) {
  let left = 0;
  let isCanModifyLeft = true;
  if (styles.left) {
    left = +styles.left.value;
    isCanModifyLeft = styles.left.isEnable;
  }

  let top = 0;
  let isCanModifyTop = true;
  if (styles.top) {
    top = +styles.top.value;
    isCanModifyTop = styles.top.isEnable;
  }

  let width = 0;
  let isCanModifyWidth = true;
  if (styles.width) {
    width = +styles.width.value;
    isCanModifyWidth = styles.width.isEnable;
  } else if (styles.right) {
    width = left + +styles.right.value;
    isCanModifyWidth = styles.right.isEnable;
  }

  let height = 0;
  let isCanModifyHeight = true;
  if (styles.height) {
    height = +styles.height.value;
    isCanModifyHeight = styles.height.isEnable;
  } else if (styles.bottom) {
    height = top + +styles.bottom.value;
    isCanModifyHeight = styles.bottom.isEnable;
  }

  let bottom = 0;
  let isCanModifyBottom = true;
  if (styles.bottom) {
    bottom = +styles.bottom.value;
    isCanModifyBottom = styles.bottom.isEnable;
  } else if (styles.height) {
    bottom = top + height;
    isCanModifyBottom = styles.height.isEnable;
  }

  let right = 0;
  let isCanModifyRight = true;
  if (styles.right) {
    right = +styles.right.value;
    isCanModifyRight = styles.right.isEnable;
  } else if (styles.width) {
    right = left + width;
    isCanModifyRight = styles.width.isEnable;
  }

  let rotate = 0;
  let isCanModifyRotate = true;
  if (styles.rotate) {
    rotate = +styles.rotate.value;
    isCanModifyRotate = styles.rotate.isEnable;
  }

  return {
    left,
    right,
    top,
    bottom,
    width,
    height,
    rotate,
    isCanModifyLeft,
    isCanModifyRight,
    isCanModifyTop,
    isCanModifyBottom,
    isCanModifyWidth,
    isCanModifyHeight,
    isCanModifyRotate,
  };
}
