import { CssPureOptionsInput, CssFontStyleOptions, CssFontWeightOptions } from "../cssData/PureOptions";

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
