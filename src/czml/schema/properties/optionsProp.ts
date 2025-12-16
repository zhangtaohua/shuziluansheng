import { nanoid } from "@/utils/common/nanoid";
import czmlOptionsPureProp from "../values/OptionsPure";

export const CzmlReferenceFrameOptions = {
  name: "referenceFrame",
  czmlName: "referenceFrame",
  labelZh: "参考帧",
  labelEn: "reference frame",
  isEnable: true,

  // real default value is static
  value: "FIXED",
  options: [
    {
      id: "FIXED",
      value: "FIXED",
      label: "固定值",
      labelZh: "固定值",
      labelEn: "FIXED",
      note: "FIXED",
      default: true,
    },
    {
      id: "INERTIAL",
      value: "INERTIAL",
      label: "惯性值",
      labelZh: "惯性值",
      labelEn: "INERTIAL",
      note: "INERTIAL",
      default: false,
    },
  ],
};

export function createReferenceFrameProp(options = {}) {
  const opt = {
    ...CzmlReferenceFrameOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export const CzmlInterpolationAlgorithmOptions = {
  name: "interpolationAlgorithm",
  czmlName: "interpolationAlgorithm",
  labelZh: "插值算法",
  labelEn: "interpolation algorithm",
  isEnable: true,
  description:
    'The interpolation algorithm to use when interpolating. Valid values are "LINEAR", "LAGRANGE", and "HERMITE".',
  type: "string",
  default: "LINEAR",

  // real default value is static
  value: "LINEAR",
  options: [
    {
      id: "LINEAR",
      value: "LINEAR",
      label: "线性",
      labelZh: "线性",
      labelEn: "LINEAR",
      note: "LINEAR",
      default: true,
      description: "",
    },
    {
      id: "LAGRANGE",
      value: "LAGRANGE",
      label: "拉格朗日",
      labelZh: "拉格朗日",
      labelEn: "LAGRANGE",
      note: "LAGRANGE",
      default: false,
      description: "",
    },
    {
      id: "HERMITE",
      value: "HERMITE",
      label: "埃尔米特",
      labelZh: "埃尔米特",
      labelEn: "HERMITE",
      note: "HERMITE",
      default: false,
      description: "",
    },
  ],
};

export function createInterpolationAlgorithmProp(options = {}) {
  const opt = {
    ...CzmlInterpolationAlgorithmOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export const CzmlSensorVolumePortionToDisplayOptions = {
  name: "SensorVolumePortionToDisplay",
  czmlName: "sensorVolumePortionToDisplay",
  labelZh: "弧型",
  labelEn: "sensor volume portion to display",
  isEnable: true,

  // real default value is static
  value: "NONE",
  options: [
    {
      id: "COMPLETE",
      value: "COMPLETE",
      label: "完全的",
      labelZh: "完全的",
      labelEn: "COMPLETE",
      note: "COMPLETE",
      default: true,
      description: "Display the complete sensor volume.",
    },
    {
      id: "BELOW_ELLIPSOID_HORIZON",
      value: "BELOW_ELLIPSOID_HORIZON",
      label: "低于椭球面地平线",
      labelZh: "低于椭球面地平线",
      labelEn: "BELOW_ELLIPSOID_HORIZON",
      note: "BELOW_ELLIPSOID_HORIZON",
      default: true,
      description: "Display the portion of the sensor volume that lies below the true horizon of the ellipsoid.",
    },
    {
      id: "ABOVE_ELLIPSOID_HORIZON",
      value: "ABOVE_ELLIPSOID_HORIZON",
      label: "高于椭球面地平线",
      labelZh: "高于椭球面地平线",
      labelEn: "ABOVE_ELLIPSOID_HORIZON",
      note: "ABOVE_ELLIPSOID_HORIZON",
      default: true,
      description: "Display the portion of the sensor volume that lies above the true horizon of the ellipsoid.",
    },
  ],
};

export function createSensorVolumePortionToDisplayProp(options = {}) {
  const opt = {
    ...CzmlSensorVolumePortionToDisplayOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export const CzmlForwardExtrapolationTypeOptions = {
  name: "forwardExtrapolationType",
  czmlName: "forwardExtrapolationType",
  labelZh: "前向推导类型",
  labelEn: "forward extrapolation type",
  isEnable: true,
  description:
    'The type of extrapolation to perform when a value is requested at a time after any available samples. Valid values are "NONE", "HOLD", and "EXTRAPOLATE".',
  type: "string",
  default: "NONE",

  // real default value is static
  value: "NONE",
  options: [
    {
      id: "NONE",
      value: "NONE",
      label: "无",
      labelZh: "无",
      labelEn: "NONE",
      note: "NONE",
      default: true,
      description: "",
    },
    {
      id: "HOLD",
      value: "HOLD",
      label: "保持",
      labelZh: "保持",
      labelEn: "HOLD",
      note: "HOLD",
      default: false,
      description: "",
    },
    {
      id: "EXTRAPOLATE",
      value: "EXTRAPOLATE",
      label: "推断",
      labelZh: "推断",
      labelEn: "EXTRAPOLATE",
      note: "EXTRAPOLATE",
      default: false,
      description: "",
    },
  ],
};

export function createForwardExtrapolationTypeProp(options = {}) {
  const opt = {
    ...CzmlForwardExtrapolationTypeOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export const CzmlBackwardExtrapolationTypeOptions = {
  name: "backwardExtrapolationType",
  czmlName: "backwardExtrapolationType",
  labelZh: "后向推导类型",
  labelEn: "backward extrapolation type",
  isEnable: true,
  description:
    'The type of extrapolation to perform when a value is requested at a time before any available samples. Valid values are "NONE", "HOLD", and "EXTRAPOLATE".',
  type: "string",
  default: "NONE",

  // real default value is static
  value: "NONE",
  options: [
    {
      id: "NONE",
      value: "NONE",
      label: "无",
      labelZh: "无",
      labelEn: "NONE",
      note: "NONE",
      default: true,
      description: "",
    },
    {
      id: "HOLD",
      value: "HOLD",
      label: "保持",
      labelZh: "保持",
      labelEn: "HOLD",
      note: "HOLD",
      default: false,
      description: "",
    },
    {
      id: "EXTRAPOLATE",
      value: "EXTRAPOLATE",
      label: "推断",
      labelZh: "推断",
      labelEn: "EXTRAPOLATE",
      note: "EXTRAPOLATE",
      default: false,
      description: "",
    },
  ],
};

export function createBackwardExtrapolationTypeProp(options = {}) {
  const opt = {
    ...CzmlBackwardExtrapolationTypeOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export const CzmlClassificationTypeOptions = {
  name: "classificationType",
  czmlName: "classificationType",
  labelZh: "分类类型",
  labelEn: "classification type",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://analyticalgraphicsinc.github.io/czml-writer/Schema/Values/ClassificationTypeValue.json",
  title: "ClassificationType",
  description: "Whether a classification affects terrain, 3D Tiles, or both.",
  type: "string",
  czmlValue: true,

  // real default value is static
  value: "BOTH",
  options: [
    {
      id: "TERRAIN",
      value: "TERRAIN",
      label: "地形",
      labelZh: "地形",
      labelEn: "TERRAIN",
      note: "TERRAIN",
      default: false,
      description: "Only terrain will be classified.",
    },
    {
      id: "CESIUM_3D_TILE",
      value: "CESIUM_3D_TILE",
      label: "3d瓦片",
      labelZh: "3d瓦片",
      labelEn: "CESIUM_3D_TILE",
      note: "CESIUM_3D_TILE",
      default: false,
      description: "Only 3D Tiles will be classified.",
    },
    {
      id: "BOTH",
      value: "BOTH",
      label: "全部",
      labelZh: "全部",
      labelEn: "BOTH",
      note: "BOTH",
      default: true,
      description: "Both terrain and 3D Tiles will be classified.",
    },
  ],
};

export function createClassificationTypeProp(options = {}) {
  const opt = {
    ...CzmlClassificationTypeOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export const CzmlColorBlendModeOptions = {
  name: "colorBlendMode",
  czmlName: "colorBlendMode",
  labelZh: "颜色混合模式",
  labelEn: "color blend mode",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,

  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://analyticalgraphicsinc.github.io/czml-writer/Schema/Values/ColorBlendModeValue.json",
  title: "ColorBlendMode",
  description: "The mode of blending between a target color and an entity's source color.",
  type: "string",
  czmlValue: true,

  // real default value is static
  value: "HIGHLIGHT",
  options: [
    {
      id: "HIGHLIGHT",
      value: "HIGHLIGHT",
      label: "高亮",
      labelZh: "高亮",
      labelEn: "HIGHLIGHT",
      note: "HIGHLIGHT",
      default: true,
      description: "Multiplies the source color by the target color.",
    },
    {
      id: "REPLACE",
      value: "REPLACE",
      label: "替换",
      labelZh: "替换",
      labelEn: "REPLACE",
      note: "REPLACE",
      default: false,
      description: "Replaces the source color with the target color.",
    },
    {
      id: "MIX",
      value: "MIX",
      label: "混合",
      labelZh: "混合",
      labelEn: "MIX",
      note: "MIX",
      default: false,
      description: "Blends the source color and target color together.",
    },
  ],
};

export function createColorBlendModeProp(options = {}) {
  const opt = {
    ...CzmlColorBlendModeOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export const CzmlCornerTypeOptions = {
  name: "cornerType",
  czmlName: "cornerType",
  labelZh: "圆角类型",
  labelEn: "corner type",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,

  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://analyticalgraphicsinc.github.io/czml-writer/Schema/Values/CornerTypeValue.json",
  title: "CornerType",
  description: "The style of a corner.",
  type: "string",
  czmlValue: true,

  // real default value is static
  value: "ROUNDED",
  options: [
    {
      id: "ROUNDED",
      value: "ROUNDED",
      label: "高亮",
      labelZh: "高亮",
      labelEn: "ROUNDED",
      note: "ROUNDED",
      default: true,
      description: "The corner has a smooth edge.",
    },
    {
      id: "MITERED",
      value: "MITERED",
      label: "交点",
      labelZh: "交点",
      labelEn: "MITERED",
      note: "MITERED",
      default: false,
      description: "The corner point is the intersection of adjacent edges.",
    },
    {
      id: "BEVELED",
      value: "BEVELED",
      label: "斜切",
      labelZh: "斜切",
      labelEn: "BEVELED",
      note: "BEVELED",
      default: false,
      description: "The corner is clipped.",
    },
  ],
};

export function createCornerTypeProp(options = {}) {
  const opt = {
    ...CzmlCornerTypeOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export const CzmlStripeOrientationOptions = {
  name: "stripeOrientation",
  czmlName: "stripeOrientation", // orientation
  labelZh: "条纹方向",
  labelEn: "stripe orientation",
  isEnable: true,
  isUsed: false,
  isShowUsed: true,

  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://analyticalgraphicsinc.github.io/czml-writer/Schema/Values/StripeOrientationValue.json",
  title: "StripeOrientation",
  description: "The orientation of stripes in the stripe material.",
  type: "string",
  czmlValue: true,

  // real default value is static
  value: "HORIZONTAL",
  options: [
    {
      id: "HORIZONTAL",
      value: "HORIZONTAL",
      label: "水平",
      labelZh: "水平",
      labelEn: "HORIZONTAL",
      note: "HORIZONTAL",
      default: true,
      description: "The stripes are oriented horizontally along the X axis.",
    },
    {
      id: "VERTICAL",
      value: "VERTICAL",
      label: "垂直",
      labelZh: "垂直",
      labelEn: "VERTICAL",
      note: "VERTICAL",
      default: false,
      description: "The stripes are oriented vertically along the Y axis.",
    },
  ],
};

export function createStripeOrientationProp(options = {}) {
  const opt = {
    ...CzmlStripeOrientationOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}
