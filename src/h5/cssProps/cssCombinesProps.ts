import { CssBasicCombineInput, CssBorderCombineInput } from "../cssData/combineCss";
import { createCssBackgroundColorProp, createCssColorProp } from "./cssColorProps";
import {
  createCssBorderBottomLeftRadiusProp,
  createCssBorderBottomRightRadiusProp,
  createCssBorderBottomWidthProp,
  createCssBorderLeftWidthProp,
  createCssBorderRightWidthProp,
  createCssBorderTopLeftRadiusProp,
  createCssBorderTopRightRadiusProp,
  createCssBorderTopWidthProp,
  createCssHeightProp,
  createCssLeftProp,
  createCssRotateProp,
  createCssToptProp,
  createCssWidthProp,
  createCssZIndexProp,
} from "./cssPixelProps";
import {
  createCssBorderBottomStyleProp,
  createCssBorderLeftStyleProp,
  createCssBorderRightStyleProp,
  createCssBorderTopStyleProp,
} from "./cssPureOptionsProps";

export function createCssBasicCombineProp(options = {}) {
  return new CssBasicCombineInput({
    properties: {
      top: createCssToptProp(),
      left: createCssLeftProp(),
      width: createCssWidthProp(),
      height: createCssHeightProp(),
      rotate: createCssRotateProp(),
      zIndex: createCssZIndexProp(),
      backgroundColor: createCssBackgroundColorProp(),
    },
    ...options,
  });
}

export function createCssBorderCombineProp(options = {}) {
  return new CssBorderCombineInput({
    properties: {
      borderTopWidth: createCssBorderTopWidthProp(),
      borderTopStyle: createCssBorderTopStyleProp(),
      borderTopColor: createCssColorProp({
        name: "border-top-color",
        vueStyleName: "borderTopColor",
        labelZh: "边框顶部颜色",
        labelEn: "border top color",
      }),
      borderRightWidth: createCssBorderRightWidthProp(),
      borderRightStyle: createCssBorderRightStyleProp(),
      borderRightColor: createCssColorProp({
        name: "border-right-color",
        vueStyleName: "borderRightColor",
        labelZh: "边框右侧颜色",
        labelEn: "border right color",
      }),

      borderBottomWidth: createCssBorderBottomWidthProp(),
      borderBottomStyle: createCssBorderBottomStyleProp(),
      borderBottomColor: createCssColorProp({
        name: "border-bottom-color",
        vueStyleName: "borderBottomColor",
        labelZh: "边框底部颜色",
        labelEn: "border bottom color",
      }),
      borderLeftWidth: createCssBorderLeftWidthProp(),
      borderLeftStyle: createCssBorderLeftStyleProp(),
      borderLeftColor: createCssColorProp({
        name: "border-left-color",
        vueStyleName: "borderLeftColor",
        labelZh: "边框左侧颜色",
        labelEn: "border left color",
      }),
      borderTopLeftRadius: createCssBorderTopLeftRadiusProp(),
      borderTopRightRadius: createCssBorderTopRightRadiusProp(),
      borderBottomRightRadius: createCssBorderBottomRightRadiusProp(),
      borderBottomLeftRadius: createCssBorderBottomLeftRadiusProp(),
    },
    ...options,
  });
}
