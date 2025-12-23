import { nanoid } from "@/utils/common/nanoid";

export function getControlTransform(styles) {
  let left = 0;
  let isCanModifyLeft = true;
  if (styles.left) {
    left = +styles.left.value;
    isCanModifyLeft = styles.left.isEnable;
  }

  let right = 0;
  let isCanModifyRight = true;
  if (styles.right) {
    right = +styles.right.value;
    isCanModifyRight = styles.right.isEnable;
  }

  let top = 0;
  let isCanModifyTop = true;
  if (styles.top) {
    top = +styles.top.value;
    isCanModifyTop = styles.top.isEnable;
  }

  let bottom = 0;
  let isCanModifyBottom = true;
  if (styles.bottom) {
    bottom = +styles.bottom.value;
    isCanModifyBottom = styles.bottom.isEnable;
  }

  let width = 0;
  let isCanModifyWidth = true;
  if (styles.width) {
    width = +styles.width.value;
    isCanModifyWidth = styles.width.isEnable;
  }

  let height = 0;
  let isCanModifyHeight = true;
  if (styles.height) {
    height = +styles.height.value;
    isCanModifyHeight = styles.height.isEnable;
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
