import { nanoid } from "@/utils/common/nanoid";

export function getControlTransform(styles) {
  let left = 0;
  if (styles.left) {
    left = +styles.left.value;
  }

  let top = 0;
  if (styles.top) {
    top = +styles.top.value;
  }

  let width = 0;
  if (styles.width) {
    width = +styles.width.value;
  }

  let height = 0;
  if (styles.height) {
    height = +styles.height.value;
  }

  return {
    left,
    top,
    width,
    height,
    rotation: 0,
  };
}
