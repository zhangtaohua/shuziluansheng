import { nanoid } from "@/utils/common/nanoid";
import czmlColorCombineProp from "../values/ColorCombine";
import czmlColorProp from "../values/Color";

export function createRgbaColorProp(options = {}) {
  return new czmlColorProp({
    name: "rgba",
    czmlName: "rgba",
    labelZh: "颜色",
    labelEn: "rgba",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Values/RgbaValue.json",
    description:
      "The color specified as an array of color components `[Red, Green, Blue, Alpha]` where each component is an integer in the range 0-255.",
    descriptionZh: "",
    default: "white",
    ...options,
  });
}

export function createRgbafColorProp(options = {}) {
  return new czmlColorProp({
    name: "rgbaf",
    czmlName: "rgbaf",
    labelZh: "颜色",
    labelEn: "rgbaf",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "Values/RgbafValue.json",
    description:
      "The color specified as an array of color components `[Red, Green, Blue, Alpha]` where each component is a double in the range 0.0-1.0.",
    descriptionZh: "",
    default: "white",
    ...options,
  });
}

export function createColorProp(options = {}) {
  return new czmlColorCombineProp({
    name: "color",
    czmlName: "color",
    labelZh: "颜色",
    labelEn: "color",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Color.json",
    description: "A color. The color can optionally vary over time.",
    descriptionZh: "",
    default: "white",
    ...options,
  });
}

export function createOutlineColorProp(options = {}) {
  return new czmlColorCombineProp({
    id: "czml_prop_outlineColor_" + nanoid(10),
    name: "outlineColor",
    czmlName: "outlineColor",
    labelZh: "轮廓颜色",
    labelEn: "outline color",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Color.json",
    description: "A color. The color can optionally vary over time.",
    descriptionZh: "",
    default: "white",
    ...options,
  });
}

export function createBackgroundColorProp(options = {}) {
  return new czmlColorCombineProp({
    id: "czml_prop_backgroundColor_" + nanoid(10),
    name: "backgroundColor",
    czmlName: "backgroundColor",
    labelZh: "背景色",
    labelEn: "background color",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Color.json",
    description: "A color. The color can optionally vary over time.",
    descriptionZh: "",
    default: "white",
    ...options,
  });
}

export function createFillColorProp(options = {}) {
  return new czmlColorCombineProp({
    id: "czml_prop_fillColor_" + nanoid(10),
    name: "fillColor",
    czmlName: "fillColor",
    labelZh: "填充色",
    labelEn: "fill color",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Color.json",
    description: "A color. The color can optionally vary over time.",
    descriptionZh: "",
    default: "white",
    ...options,
  });
}

export function createEvenColorProp(options = {}) {
  return new czmlColorCombineProp({
    id: "czml_prop_evenColor_" + nanoid(10),
    name: "evenColor",
    czmlName: "evenColor",
    labelZh: "偶颜色",
    labelEn: "even color",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Color.json",
    description: "The even color.",
    descriptionZh: "",
    default: "white",
    ...options,
  });
}

export function createOddColorProp(options = {}) {
  return new czmlColorCombineProp({
    id: "czml_prop_oddColor_" + nanoid(10),
    name: "oddColor",
    czmlName: "oddColor",
    labelZh: "奇颜色",
    labelEn: "odd color",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Color.json",
    description: "The odd color.",
    descriptionZh: "",
    default: "white",
    ...options,
  });
}

export function createSilhouetteColorProp(options = {}) {
  return new czmlColorCombineProp({
    id: "czml_prop_silhouetteColor_" + nanoid(10),
    name: "silhouetteColor",
    czmlName: "silhouetteColor",
    labelZh: "轮廓色",
    labelEn: "silhouette color",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Color.json",
    description: "The color of the silhouette drawn around the model.",
    descriptionZh: "",
    default: "red",
    ...options,
  });
}
