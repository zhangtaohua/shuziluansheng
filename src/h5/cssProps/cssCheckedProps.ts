import { CssCheckedInput, CssBackgroundClipTextOptions } from "../cssData/NameChecked";

export function createCssBackgroundClipTextProp(options = {}) {
  return new CssCheckedInput({
    ...CssBackgroundClipTextOptions,
    ...options,
  });
}
