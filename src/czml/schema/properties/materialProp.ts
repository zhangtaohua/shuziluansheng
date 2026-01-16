import { nanoid } from "@/utils/common/nanoid";
import czmlMaterialProp from "../values/Material";
import { createColorProp, createEvenColorProp, createGapColorProp, createOddColorProp } from "./colorProp";
import { createImageProp } from "./urlProp";
import { createRepeatProp } from "./repeatProp";
import { createTransparentProp } from "./booleanProp";
import {
  createCellAlphaDoubleProp,
  createDashLengthDoubleProp,
  createGlowPowerDoubleProp,
  createOffsetDoubleProp,
  createOutlineWidthDoubleProp,
  createRepeatDoubleProp,
  createTaperPowerDoubleProp,
} from "./doubleProp";
import { createLineCountProp } from "./lineCountProp";
import { createLineThicknessProp } from "./lineThicknessProp";
import { createLineOffsetProp } from "./lineOffsetProp";
import { createStripeOrientationCombineProp } from "./stripeProp";
import { createDashPatternIntegerProp } from "./integerProp";

export function createSolidColorMaterialProp(options = {}) {
  return {
    id: "czml_prop_solidColor_" + nanoid(10),
    czmlName: "solidColor",
    isUsed: true,
    $ref: "SolidColorMaterial.json",
    description: "A material that fills the surface with a solid color, which may be translucent.",
    ...options,
    properties: {
      color: createColorProp({
        isUsed: true,
        isShowUsed: true,
        $ref: "Color.json",
        description: "The color of the surface.",
        default: "white",
      }),
    },
  };
}

export function createImageMaterialProp(options = {}) {
  return {
    id: "czml_prop_imageMaterial_" + nanoid(10),
    czmlName: "image",
    isUsed: false,
    $ref: "ImageMaterial.json",
    description: "A material that fills the surface with an image.",
    ...options,
    properties: {
      image: createImageProp({
        $ref: "Uri.json",
        name: "image",
        labelZh: "图像链接",
        labelEn: "image uri",
        czmlName: "image",
        isUsed: true,
        isShowUsed: true,
        description: "The image to display on the surface.",
      }),
      repeat: createRepeatProp(),
      color: createColorProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Color.json",
        description:
          "The color of the image. This color value is multiplied with the image to produce the final color.",
        default: "white",
      }),
      transparent: createTransparentProp({
        value: false,
        isEnable: true,
        isUsed: true,
        isShowUsed: true,
        $ref: "Boolean.json",
        description: "Whether or not the image has transparency.",
        default: false,
      }),
    },
  };
}

export function createGridMaterialProp(options = {}) {
  return {
    id: "czml_prop_gridMaterial_" + nanoid(10),
    czmlName: "grid",
    isUsed: false,
    $ref: "GridMaterial.json",
    description: "A material that fills the surface with a grid.",
    ...options,
    properties: {
      color: createColorProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Color.json",
        description: "The color of the surface.",
        default: "white",
      }),
      cellAlpha: createCellAlphaDoubleProp({
        $ref: "Double.json",
        description: "The alpha value for the space between grid lines. This will be combined with the color alpha.",
      }),
      lineCount: createLineCountProp(),
      lineThickness: createLineThicknessProp(),
      lineOffset: createLineOffsetProp(),
    },
  };
}

export function createStripeMaterialProp(options = {}) {
  return {
    id: "czml_prop_stripeMaterial_" + nanoid(10),
    czmlName: "stripe",
    isUsed: false,
    $ref: "StripeMaterial.json",
    description: "A material that fills the surface with alternating colors.",
    ...options,
    properties: {
      orientation: createStripeOrientationCombineProp(),
      evenColor: createEvenColorProp(),
      oddColor: createOddColorProp(),
      offset: createOffsetDoubleProp({
        $ref: "Double.json",
        description:
          "The value indicating where in the pattern to begin drawing, with 0.0 being the beginning of the even color, 1.0 the beginning of the odd color, 2.0 being the even color again, and any multiple or fractional values being in between.",
        default: [0.0],
      }),
      repeat: createRepeatDoubleProp({
        value: [1.0],
        $ref: "Double.json",
        description: "The number of times the stripes repeat.",
        default: [1.0],
      }),
    },
  };
}

export function createCheckerboardMaterialProp(options = {}) {
  return {
    id: "czml_prop_checkerboardMaterial_" + nanoid(10),
    czmlName: "checkerboard",
    isUsed: false,
    $ref: "CheckerboardMaterial.json",
    description: "A material that fills the surface with a checkerboard pattern.",
    ...options,
    properties: {
      evenColor: createEvenColorProp(),
      oddColor: createOddColorProp(),
      repeat: createRepeatProp({
        $ref: "Repeat.json",
        description: "The number of times the image repeats along each axis.",
        default: [2, 2],
      }),
    },
  };
}

export function createPolylineOutlineMaterialProp(options = {}) {
  return {
    id: "czml_prop_polylineOutlineMaterial_" + nanoid(10),
    czmlName: "polylineOutline",
    isUsed: false,
    $ref: "PolylineOutlineMaterial.json",
    description: "A material that fills the line with a color and outline.",
    ...options,
    properties: {
      color: createColorProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Color.json",
        description: "The color of the surface.",
        default: "white",
      }),
      outlineColor: createColorProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Color.json",
        description: "The color of the surface outline.",
        default: "black",
      }),
      outlineWidth: createOutlineWidthDoubleProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Double.json",
        description: "The width of the outline.",
        default: 1.0,
      }),
    },
  };
}

export function createPolylineArrowMaterialProp(options = {}) {
  return {
    id: "czml_prop_polylineArrowMaterial_" + nanoid(10),
    czmlName: "polylineArrow",
    isUsed: false,
    $ref: "PolylineArrowMaterial.json",
    description: "A material that fills the line with an arrow.",
    ...options,
    properties: {
      color: createColorProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Color.json",
        description: "The color of the surface.",
        default: "white",
      }),
    },
  };
}

export function createPolylineDashMaterialProp(options = {}) {
  return {
    id: "czml_prop_polylineDashMaterial_" + nanoid(10),
    czmlName: "polylineDash",
    isUsed: false,
    $ref: "PolylineDashMaterial.json",
    description: "A material that fills the line with a pattern of dashes.",
    ...options,
    properties: {
      color: createColorProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Color.json",
        description: "The color of the dashes on the line.",
        default: "white",
      }),
      gapColor: createGapColorProp({
        $ref: "Color.json",
        description: "The color of the gaps between dashes on the line.",
        default: "transparent",
      }),
      dashLength: createDashLengthDoubleProp({
        $ref: "Double.json",
        description: "The length in screen-space pixels of a single dash and gap pattern.",
        default: 16.0,
      }),
      dashPattern: createDashPatternIntegerProp({
        $ref: "Integer.json",
        description:
          "A 16-bit bitfield representing which portions along a single dashLength are the dash (1) and which are the gap (0). The default value, 255 (0000000011111111), indicates 50% gap followed by 50% dash.",
        default: 255,
      }),
    },
  };
}

export function createPolylineGlowMaterialProp(options = {}) {
  return {
    id: "czml_prop_polylineGlowMaterial_" + nanoid(10),
    czmlName: "polylineGlowMaterial",
    isUsed: false,
    $ref: "PolylineGlowMaterial.json",
    description: "A material that fills the surface of a line with a glowing color.",
    ...options,
    properties: {
      color: createColorProp({
        isUsed: false,
        isShowUsed: true,
        $ref: "Color.json",
        description: "The color of the dashes on the line.",
        default: "white",
      }),
      glowPower: createGlowPowerDoubleProp({
        $ref: "Double.json",
        description: "The strength of the glow.",
        default: 0.25,
      }),
      taperPower: createTaperPowerDoubleProp({
        $ref: "Double.json",
        description: "The strength of the tapering effect.  1.0 and higher means no tapering.",
        default: 1.0,
      }),
    },
  };
}

export function createMaterialProp(options = {}) {
  return new czmlMaterialProp({
    id: "czml_prop_material_" + nanoid(10),
    name: "material",
    czmlName: "material",
    labelZh: "材质",
    labelEn: "material",
    tag: "CzmlMaterialPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Material.json",
    description: "The material to display on the surface of the box.",
    descriptionZh: "",
    default: "solid white",
    ...options,
  });
}

export function createLateralSurfaceMaterialProp(options = {}) {
  return new czmlMaterialProp({
    id: "czml_prop_lateralSurfaceMaterial_" + nanoid(10),
    name: "lateralSurfaceMaterial",
    czmlName: "lateralSurfaceMaterial",
    labelZh: "侧面材料",
    labelEn: "lateral surface material",
    tag: "CzmlMaterialPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Material.json",
    description: "The material to display on the surface of the box.",
    descriptionZh: "",
    default: "solid white",
    ...options,
  });
}

export function createEllipsoidSurfaceMaterialProp(options = {}) {
  return new czmlMaterialProp({
    id: "czml_prop_ellipsoidSurfaceMaterial_" + nanoid(10),
    name: "ellipsoidSurfaceMaterial",
    czmlName: "ellipsoidSurfaceMaterial",
    labelZh: "椭球材料",
    labelEn: "ellipsoid surface material",
    tag: "CzmlMaterialPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Material.json",
    description: "The material to display on the surface of the box.",
    descriptionZh: "",
    default: "solid white",
    ...options,
  });
}

export function createEllipsoidHorizonSurfaceMaterialProp(options = {}) {
  return new czmlMaterialProp({
    id: "czml_prop_ellipsoidHorizonSurfaceMaterial_" + nanoid(10),
    name: "ellipsoidHorizonSurfaceMaterial",
    czmlName: "ellipsoidHorizonSurfaceMaterial",
    labelZh: "椭球水平材料",
    labelEn: "ellipsoid horizon surface material",
    tag: "CzmlMaterialPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Material.json",
    description: "The material to display on the surface of the box.",
    descriptionZh: "",
    default: "solid white",
    ...options,
  });
}

export function createDomeSurfaceMaterialProp(options = {}) {
  return new czmlMaterialProp({
    id: "czml_prop_domeSurfaceMaterial_" + nanoid(10),
    name: "domeSurfaceMaterial",
    czmlName: "domeSurfaceMaterial",
    labelZh: "半球材料",
    labelEn: "dome surface material",
    tag: "CzmlMaterialPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Material.json",
    description: "The material to display on the surface of the box.",
    descriptionZh: "",
    default: "solid white",
    ...options,
  });
}

export function createEnvironmentOcclusionMaterialProp(options = {}) {
  return new czmlMaterialProp({
    id: "czml_prop_environmentOcclusionMaterial_" + nanoid(10),
    name: "environmentOcclusionMaterial",
    czmlName: "environmentOcclusionMaterial",
    labelZh: "环境遮挡材料",
    labelEn: "environment occlusion material",
    tag: "CzmlMaterialPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Material.json",
    description: "The material to display on the surface of the box.",
    descriptionZh: "",
    default: "solid white",
    ...options,
  });
}

export function createPolylineMaterialProp(options = {}) {
  return new czmlMaterialProp({
    id: "czml_prop_material_" + nanoid(10),
    name: "material",
    czmlName: "material",
    labelZh: "材质",
    labelEn: "material",
    tag: "CzmlMaterialPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "PolylineMaterial.json",
    description: "The material to use to draw the path.",
    descriptionZh: "",
    default: "solid white",
    compUsedOptions: [
      { label: "solidColor 固定色", value: "solidColor" },
      { label: "polylineOutline 轮廓线", value: "polylineOutline" },
      { label: "polylineArrow 箭头", value: "polylineArrow" },
      { label: "polylineDash 虚线", value: "polylineDash" },
      { label: "polylineGlow 发光", value: "polylineGlow" },
      { label: "image 图像", value: "image" },
      { label: "grid 网格", value: "grid" },
      { label: "stripe 条状", value: "stripe" },
      { label: "checkerboard 棋盘", value: "checkerboard" },
    ],
    currentProperty: "solidColor",
    properties: {
      solidColor: createSolidColorMaterialProp({
        isUsed: true,
        $ref: "SolidColorMaterial.json",
        description: "A material that fills the line with a solid color, which may be translucent.",
      }),
      polylineOutline: createPolylineOutlineMaterialProp({
        isUsed: false,
        $ref: "PolylineOutlineMaterial.json",
        description: "A material that fills the line with a color and outline.",
      }),
      polylineArrow: createPolylineArrowMaterialProp({
        isUsed: false,
        $ref: "PolylineArrowMaterial.json",
        description: "A material that fills the line with an arrow.",
      }),
      polylineDash: createPolylineDashMaterialProp({
        isUsed: false,
        $ref: "PolylineDashMaterial.json",
        description: "A material that fills the line with a pattern of dashes.",
      }),
      polylineGlow: createPolylineGlowMaterialProp({
        isUsed: false,
        $ref: "PolylineGlowMaterial.json",
        description: "A material that fills the line with a glowing color.",
      }),
      image: createImageMaterialProp({
        isUsed: false,
        $ref: "ImageMaterial.json",
        description: "A material that fills the line with an image.",
      }),
      grid: createGridMaterialProp({
        isUsed: false,
        $ref: "GridMaterial.json",
        description: "A material that fills the line with a grid.",
      }),
      stripe: createStripeMaterialProp({
        isUsed: false,
        $ref: "StripeMaterial.json",
        description: "A material that fills the line with alternating colors.",
      }),
      checkerboard: createCheckerboardMaterialProp({
        isUsed: false,
        $ref: "CheckerboardMaterial.json",
        description: "A material that fills the line with a checkerboard pattern.",
      }),
    },
    ...options,
  });
}

export function createDepthFailMaterialProp(options = {}) {
  return createPolylineMaterialProp({
    id: "czml_prop_depthFailMaterial_" + nanoid(10),
    name: "depthFailMaterial",
    czmlName: "depthFailMaterial",
    labelZh: "深度失败材质",
    labelEn: "depth fail material",
    ...options,
  });
}
