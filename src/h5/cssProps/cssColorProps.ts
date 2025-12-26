import { CssColorOptionsInput, CssBackgroundColorOptions } from "../cssData/NameColorOptions";
import { CssColorInput, CssColorOptions } from "../cssData/NameColor";

export function createCssBackgroundColorProp(options = {}) {
  return new CssColorOptionsInput({
    ...CssBackgroundColorOptions,
    ...options,
  });
}

export function createCssColorProp(options = {}) {
  return new CssColorInput({
    ...CssColorOptions,
    ...options,
  });
}
