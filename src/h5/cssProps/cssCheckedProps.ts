import { CssCheckedInput } from "../cssData/NameChecked";

export const CssBackgroundClipTextOptions = {
  name: "background-clip-text",
  vueStyleName: "backgroundClipText",
  cssStyleName: "background-clip-text",
  labelZh: "文字裁剪背景",
  labelEn: "background clip text",
  tag: "CheckInput",
  isEnable: true,
};

export function createCssBackgroundClipTextProp(options = {}) {
  return new CssCheckedInput({
    ...CssBackgroundClipTextOptions,
    ...options,
  });
}
