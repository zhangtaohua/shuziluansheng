import { nanoid } from "@/utils/common/nanoid";

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
  }

  let height = 0;
  let isCanModifyHeight = true;
  if (styles.height) {
    height = +styles.height.value;
    isCanModifyHeight = styles.height.isEnable;
  }

  return {
    left,
    top,
    width,
    height,
    isCanModifyLeft,
    isCanModifyTop,
    isCanModifyWidth,
    isCanModifyHeight,
    rotation: 0,
  };
}
